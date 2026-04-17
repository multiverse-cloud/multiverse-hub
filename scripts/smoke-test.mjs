import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'

const args = process.argv.slice(2)
const shouldStartServer = args.includes('--start')
const shouldStartDevServer = args.includes('--start-dev')
const port = readArgValue('--port') || process.env.SMOKE_PORT || '3000'
const explicitBaseUrl = readArgValue('--base-url') || process.env.SMOKE_BASE_URL
const baseUrl = explicitBaseUrl || `http://127.0.0.1:${port}`
const requestTimeoutMs = Number(process.env.SMOKE_TIMEOUT_MS || 15_000)

let serverProcess = null

function readArgValue(flag) {
  const index = args.indexOf(flag)
  if (index === -1) return null
  return args[index + 1] || null
}

function log(message) {
  process.stdout.write(`${message}\n`)
}

function fail(message) {
  throw new Error(message)
}

async function fetchWithTimeout(url, init = {}) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs)

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timeout)
  }
}

async function assertPage(path, { contains = [], excludes = [] } = {}) {
  const response = await fetchWithTimeout(`${baseUrl}${path}`)
  const body = await response.text()

  if (response.status !== 200) {
    fail(`${path} returned ${response.status} instead of 200`)
  }

  if (body.includes('Cannot read properties of undefined')) {
    fail(`${path} rendered a runtime error payload`)
  }

  for (const snippet of contains) {
    if (!body.includes(snippet)) {
      fail(`${path} is missing expected content: ${snippet}`)
    }
  }

  for (const snippet of excludes) {
    if (body.includes(snippet)) {
      fail(`${path} unexpectedly contains: ${snippet}`)
    }
  }

  log(`PASS ${path} -> 200`)
}

async function assertRedirect(path, { status, location }) {
  const response = await fetchWithTimeout(`${baseUrl}${path}`, { redirect: 'manual' })
  const actualLocation = response.headers.get('location')

  if (response.status !== status) {
    fail(`${path} returned ${response.status} instead of ${status}`)
  }

  if (actualLocation !== location) {
    fail(`${path} redirected to ${actualLocation || 'nothing'} instead of ${location}`)
  }

  log(`PASS ${path} -> ${status} ${location}`)
}

async function waitForServer() {
  const readyPath = '/sign-in'

  for (let attempt = 1; attempt <= 60; attempt += 1) {
    if (serverProcess?.exitCode !== null) {
      fail(`Smoke test server exited early with code ${serverProcess.exitCode}`)
    }

    try {
      const response = await fetchWithTimeout(`${baseUrl}${readyPath}`)
      if (response.ok) {
        log(`Server ready on ${baseUrl}`)
        return
      }
    } catch {}

    await sleep(1_000)
  }

  fail(`Timed out waiting for ${baseUrl}${readyPath}`)
}

function startServer(mode) {
  const command =
    process.platform === 'win32'
      ? ['cmd', ['/c', 'npm', 'run', mode === 'dev' ? 'dev' : 'start', '--', '-p', port]]
      : ['sh', ['-lc', `npm run ${mode === 'dev' ? 'dev' : 'start'} -- -p ${port}`]]

  serverProcess = spawn(command[0], command[1], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      PORT: port,
    },
    stdio: 'inherit',
  })
}

async function stopServer() {
  if (!serverProcess || serverProcess.exitCode !== null) {
    return
  }

  const stopSignal = process.platform === 'win32' ? 'SIGTERM' : 'SIGTERM'
  serverProcess.kill(stopSignal)

  await Promise.race([
    new Promise(resolve => {
      serverProcess.once('exit', resolve)
    }),
    sleep(5_000).then(() => {
      if (serverProcess?.exitCode === null) {
        serverProcess.kill('SIGKILL')
      }
    }),
  ])
}

async function run() {
  if (shouldStartServer) {
    log(`Starting production server on ${baseUrl}`)
    startServer('prod')
    await waitForServer()
  } else if (shouldStartDevServer) {
    log(`Starting dev server on ${baseUrl}`)
    startServer('dev')
    await waitForServer()
  } else {
    log(`Using existing server at ${baseUrl}`)
  }

  await assertPage('/', {
    contains: ['Explore All Tools'],
  })

  await assertPage('/sign-in', {
    contains: ['Welcome back'],
  })

  await assertPage('/sign-up', {
    contains: ['Create account'],
  })

  await assertPage('/forgot-password', {
    contains: ['Get back into your account'],
  })

  await assertRedirect('/admin', {
    status: 307,
    location: '/admin-login?next=%2Fadmin',
  })

  await assertPage('/prompts', {
    contains: ['Prompt Hub'],
  })

  await assertPage('/templates', {
    contains: ['ShopElite Ecommerce UI Kit'],
    excludes: ['Obsidian Launchpad', 'Aether Dashboard', 'Identity Auth Kit'],
  })

  await assertPage('/search?q=pdf', {
    contains: ['Search Across The Multiverse', 'pdf'],
  })

  await assertPage('/sw.js', {
    contains: ['self.registration.unregister'],
  })

  log('Smoke test suite passed.')
}

try {
  await run()
} catch (error) {
  log(`FAIL ${error instanceof Error ? error.message : String(error)}`)
  process.exitCode = 1
} finally {
  await stopServer()
}
