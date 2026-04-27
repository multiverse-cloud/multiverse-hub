import { NextRequest } from 'next/server'
import { API_BODY_LIMITS, API_RATE_LIMITS, guardRateLimit, readJsonBody } from '@/lib/api-protection'
import { err, getErrorStatus } from '@/lib/server-utils'
import { assertSafeRemoteUrl } from '@/lib/network-guards'
import crypto from 'crypto'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const url = new URL(req.url)
  const action = url.searchParams.get('action') || 'json-format'

  try {
    const limited = await guardRateLimit(req, 'tools:dev', API_RATE_LIMITS.toolJson, 'Too many developer tool requests. Please retry in a moment.')
    if (limited) return limited

    const body = await readJsonBody<{
      input?: string
      options?: Record<string, any>
    }>(req, API_BODY_LIMITS.jsonLarge)
    const { input = '', options = {} } = body

    switch (action) {
      // ── JSON formatter ──────────────────────────────────────
      case 'json-format': {
        try {
          const parsed = JSON.parse(input)
          const indent = parseInt(options.indent || '2')
          const sorted = options.sortKeys
            ? JSON.parse(JSON.stringify(parsed, (_, v) =>
                v && typeof v === 'object' && !Array.isArray(v)
                  ? Object.fromEntries(Object.entries(v).sort())
                  : v
              ))
            : parsed
          return Response.json({
            formatted: JSON.stringify(sorted, null, indent),
            minified: JSON.stringify(parsed),
            size: JSON.stringify(parsed).length,
            lines: JSON.stringify(sorted, null, indent).split('\n').length,
            valid: true,
          })
        } catch (e) {
          return Response.json({ valid: false, error: (e as Error).message })
        }
      }

      // ── Base64 ──────────────────────────────────────────────
      case 'base64-encode':
        return Response.json({ result: Buffer.from(input, 'utf8').toString('base64') })

      case 'base64-decode': {
        try {
          const decoded = Buffer.from(input.trim(), 'base64').toString('utf8')
          return Response.json({ result: decoded, valid: true })
        } catch {
          return Response.json({ result: '', valid: false, error: 'Invalid Base64' })
        }
      }

      // ── URL encode/decode ───────────────────────────────────
      case 'url-encode':
        return Response.json({
          encoded: encodeURIComponent(input),
          full: encodeURI(input),
          component: encodeURIComponent(input),
        })

      case 'url-decode':
        try {
          return Response.json({
            decoded: decodeURIComponent(input),
            full: decodeURI(input),
          })
        } catch {
          return Response.json({ decoded: input, error: 'Invalid URL encoding' })
        }

      // ── Hash generator ──────────────────────────────────────
      case 'hash': {
        const encoding = (options.encoding || 'hex') as crypto.BinaryToTextEncoding
        const results: Record<string, string> = {}
        for (const alg of ['md5', 'sha1', 'sha256', 'sha384', 'sha512']) {
          try { results[alg] = crypto.createHash(alg).update(input, 'utf8').digest(encoding) }
          catch {}
        }
        // CRC32-like (Adler32)
        let a = 1, b = 0
        for (let i = 0; i < input.length; i++) { a = (a + input.charCodeAt(i)) % 65521; b = (b + a) % 65521 }
        results['adler32'] = ((b << 16) | a).toString(16).padStart(8, '0')
        return Response.json(results)
      }

      // ── HMAC ────────────────────────────────────────────────
      case 'hmac': {
        const key = options.key || 'secret'
        const alg = options.algorithm || 'sha256'
        const hmac = crypto.createHmac(alg, key).update(input, 'utf8').digest('hex')
        return Response.json({ hmac, algorithm: alg, key })
      }

      // ── JWT decode ──────────────────────────────────────────
      case 'jwt-decode': {
        try {
          const parts = input.trim().split('.')
          if (parts.length !== 3) throw new Error('JWT must have 3 parts (header.payload.signature)')
          const decode = (s: string) => JSON.parse(Buffer.from(s.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'))
          const header = decode(parts[0])
          const payload = decode(parts[1])
          const now = Math.floor(Date.now() / 1000)
          return Response.json({
            header,
            payload,
            signature: parts[2],
            isExpired: payload.exp ? payload.exp < now : null,
            expiresAt: payload.exp ? new Date(payload.exp * 1000).toISOString() : null,
            issuedAt: payload.iat ? new Date(payload.iat * 1000).toISOString() : null,
            valid: true,
          })
        } catch (e) {
          return Response.json({ valid: false, error: (e as Error).message })
        }
      }

      // ── UUID generator ──────────────────────────────────────
      case 'uuid': {
        const version = options.version || 'v4'
        const count = Math.min(parseInt(options.count || '5'), 50)
        const uuids: string[] = []
        for (let i = 0; i < count; i++) {
          uuids.push(crypto.randomUUID()) // v4 UUID
        }
        return Response.json({ uuids, version, count })
      }

      // ── CSS minifier ────────────────────────────────────────
      case 'css-minify': {
        const original = input.length
        let minified = input
          .replace(/\/\*[\s\S]*?\*\//g, '')    // remove comments
          .replace(/\s+/g, ' ')                  // collapse whitespace
          .replace(/\s*([{}:;,>~+])\s*/g, '$1') // around special chars
          .replace(/;}/g, '}')                   // trailing semicolons
          .replace(/\s*!\s*important/g, '!important')
          .trim()
        return Response.json({
          minified,
          original,
          minifiedSize: minified.length,
          savings: Math.round((1 - minified.length / original) * 100),
        })
      }

      // ── JS minifier (basic) ─────────────────────────────────
      case 'js-minify': {
        const original = input.length
        let minified = input
          .replace(/\/\*[\s\S]*?\*\//g, '')  // block comments
          .replace(/\/\/[^\n]*/g, '')          // line comments
          .replace(/\n\s*/g, '\n')             // blank lines / indent
          .replace(/[ \t]+/g, ' ')             // multiple spaces
          .replace(/\n+/g, '\n')               // multiple newlines
          .trim()
        return Response.json({
          minified,
          original,
          minifiedSize: minified.length,
          savings: Math.round((1 - minified.length / original) * 100),
        })
      }

      // ── HTML minifier ───────────────────────────────────────
      case 'html-minify': {
        const original = input.length
        let minified = input
          .replace(/<!--[\s\S]*?-->/g, '')      // comments
          .replace(/\s+/g, ' ')                  // collapse whitespace
          .replace(/>\s+</g, '><')               // between tags
          .trim()
        return Response.json({
          minified,
          original,
          minifiedSize: minified.length,
          savings: Math.round((1 - minified.length / original) * 100),
        })
      }

      // ── Color converter ─────────────────────────────────────
      case 'color': {
        const hex = input.trim().replace('#', '')
        if (!/^[0-9A-Fa-f]{3,8}$/.test(hex)) return err('Invalid hex color')

        const full = hex.length === 3
          ? hex.split('').map((c: string) => c + c).join('')
          : hex.slice(0, 6)

        const r = parseInt(full.slice(0, 2), 16)
        const g = parseInt(full.slice(2, 4), 16)
        const b = parseInt(full.slice(4, 6), 16)
        const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1

        // RGB → HSL
        const r1 = r / 255, g1 = g / 255, b1 = b / 255
        const max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1)
        let h = 0, s = 0
        const l = (max + min) / 2
        if (max !== min) {
          const d = max - min
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
          switch (max) {
            case r1: h = ((g1 - b1) / d + (g1 < b1 ? 6 : 0)) / 6; break
            case g1: h = ((b1 - r1) / d + 2) / 6; break
            case b1: h = ((r1 - g1) / d + 4) / 6; break
          }
        }

        // RGB → HSB
        const hsb_s = max === 0 ? 0 : (max - min) / max
        const hsb_b = max

        return Response.json({
          hex: `#${full.toUpperCase()}`,
          rgb: `rgb(${r}, ${g}, ${b})`,
          rgba: `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`,
          hsl: `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`,
          hsla: `hsla(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, ${a.toFixed(2)})`,
          hsb: `hsb(${Math.round(h * 360)}, ${Math.round(hsb_s * 100)}%, ${Math.round(hsb_b * 100)}%)`,
          css: `background-color: #${full.toUpperCase()};`,
          tailwind: `bg-[#${full.toUpperCase()}]`,
          r, g, b, a,
        })
      }

      // ── Cron parser/generator ───────────────────────────────
      case 'cron': {
        const FIELDS = ['second', 'minute', 'hour', 'day', 'month', 'weekday']
        const parts = input.trim().split(/\s+/)
        const fullParts = parts.length === 5 ? ['0', ...parts] : parts
        const fieldDesc: Record<string, string> = {
          '0': 'at 0', '*': 'every', '*/2': 'every 2nd', '*/5': 'every 5th',
          '*/10': 'every 10th', '*/15': 'every 15th', '*/30': 'every 30th',
        }
        const descriptions = fullParts.slice(0, 6).map((v, i) => `${FIELDS[i]}: ${fieldDesc[v] || v}`)

        // Next 5 run times (approximate)
        const now = new Date()
        const nextRuns: string[] = []
        let cursor = new Date(now)
        cursor.setSeconds(0, 0)
        for (let i = 0; i < 5; i++) {
          cursor = new Date(cursor.getTime() + 60_000)
          nextRuns.push(cursor.toISOString())
        }

        return Response.json({
          expression: input,
          fields: descriptions,
          isValid: fullParts.length >= 5,
          nextRuns,
          humanReadable: `Runs ${fullParts[2] === '*' ? 'every hour' : `at ${fullParts[2]}:${fullParts[1].padStart(2, '0')}`} on ${fullParts[4] === '*' ? 'every day' : `day ${fullParts[4]}`}`,
        })
      }

      // ── .gitignore generator ────────────────────────────────
      case 'gitignore': {
        const techs = input.toLowerCase().split(/[\s,\n]+/).filter(Boolean)
        const patterns: Record<string, string[]> = {
          node: ['node_modules/', 'npm-debug.log*', 'yarn-debug.log*', 'yarn-error.log*', '.npm', '.yarn-integrity'],
          next: ['.next/', 'out/', 'build/', '.vercel', '*.tsbuildinfo', 'next-env.d.ts'],
          react: ['build/', '.DS_Store'],
          python: ['__pycache__/', '*.py[cod]', '*$py.class', '*.so', '.Python', 'env/', 'venv/', '*.egg-info/', 'dist/', '.eggs/'],
          django: ['*.log', 'local_settings.py', 'db.sqlite3', 'media/', 'staticfiles/'],
          java: ['*.class', '*.jar', '*.war', '*.ear', 'target/', '.classpath', '.project', '.settings/'],
          rust: ['target/', 'Cargo.lock'],
          go: ['*.exe', '*.exe~', '*.dll', '*.so', '*.dylib', '*.test', '*.out', 'vendor/'],
          dotnet: ['obj/', 'bin/', '*.user', '*.suo', '.vs/'],
          ruby: ['*.gem', '*.rbc', '.bundle/', 'vendor/bundle', '.ruby-version'],
          php: ['vendor/', '.env', 'composer.lock'],
          laravel: ['vendor/', '.env', 'storage/*.key', 'public/hot', 'public/storage'],
          vue: ['node_modules/', 'dist/', '.env.local', '.env.*.local'],
          angular: ['.angular/', 'dist/', 'node_modules/', '.env'],
          svelte: ['.svelte-kit/', 'build/', 'node_modules/'],
          docker: ['*.env', '.env*', '!.env.example'],
          terraform: ['.terraform/', '*.tfstate', '*.tfstate.*', 'crash.log', '*.tfvars'],
          macos: ['.DS_Store', '.AppleDouble', '.LSOverride', '._*', '.Spotlight-V100', '.Trashes'],
          windows: ['Thumbs.db', 'ehthumbs.db', 'Desktop.ini', '$RECYCLE.BIN/', '*.lnk'],
          linux: ['*~', '.fuse_hidden*', '.directory', '.Trash-*'],
          vscode: ['.vscode/', '!.vscode/settings.json', '!.vscode/tasks.json', '!.vscode/extensions.json'],
          idea: ['.idea/', '*.iml', '*.iws', '.idea_modules/', 'atlassian-ide-plugin.xml'],
          env: ['.env', '.env.local', '.env.*.local', '!.env.example'],
          logs: ['*.log', 'logs/', 'npm-debug.log*'],
        }

        const sections: string[] = ['# Generated by Multiverse Tools\n# https://multiverse-tools.vercel.app\n']
        const added = new Set<string>()

        for (const tech of techs) {
          const p = patterns[tech]
          if (p) {
            sections.push(`# ${tech.charAt(0).toUpperCase() + tech.slice(1)}`)
            p.forEach(line => { if (!added.has(line)) { sections.push(line); added.add(line) } })
            sections.push('')
          }
        }

        // Always add common patterns
        if (!techs.includes('env')) {
          sections.push('# Environment\n.env\n.env.local\n.env.*.local\n!.env.example\n')
        }
        if (!techs.includes('macos') && !techs.includes('windows')) {
          sections.push('# OS\n.DS_Store\nThumbs.db\n')
        }

        return Response.json({
          gitignore: sections.join('\n'),
          technologiesFound: techs.filter(t => patterns[t]),
          unknownTechs: techs.filter(t => !patterns[t]),
        })
      }

      // ── Regex tester ────────────────────────────────────────
      case 'regex': {
        const pattern = typeof options.pattern === 'string' ? options.pattern : ''
        const flags = typeof options.flags === 'string' ? options.flags : 'g'
        const testString = typeof options.testString === 'string' ? options.testString : input
        if (!pattern) return err('Missing pattern')
        try {
          const regex = new RegExp(pattern, flags)
          const matches: Array<{ match: string; index: number; groups: Record<string, string> | null }> = []
          let m: RegExpExecArray | null
          const source = testString || input
          const re = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g')
          while ((m = re.exec(source)) !== null) {
            matches.push({ match: m[0], index: m.index!, groups: m.groups || null })
            if (!flags.includes('g') || m.index === re.lastIndex) break
          }
          const highlighted = source.replace(new RegExp(pattern, flags.includes('g') ? flags : flags + 'g'), (match: string) => `[MATCH:${match}:MATCH]`)
          return Response.json({ matches, count: matches.length, highlighted, valid: true, pattern, flags })
        } catch (e) {
          return Response.json({ valid: false, error: (e as Error).message, matches: [], count: 0 })
        }
      }

      // ── Number base converter ───────────────────────────────
      case 'base-convert': {
        const num = input.trim()
        const fromBase = parseInt(options.from || '10')
        const decimal = parseInt(num, fromBase)
        if (isNaN(decimal)) return err('Invalid number for given base')
        return Response.json({
          decimal: decimal.toString(10),
          binary: decimal.toString(2),
          octal: decimal.toString(8),
          hex: decimal.toString(16).toUpperCase(),
          base32: decimal.toString(32).toUpperCase(),
          base64: Buffer.from(decimal.toString()).toString('base64'),
        })
      }

      // ── Random password generator ───────────────────────────
      case 'password': {
        const length = Math.min(parseInt(options.length || '16'), 128)
        const sets = {
          upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
          lower: 'abcdefghijklmnopqrstuvwxyz',
          digits: '0123456789',
          symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
        }
        const includeUpper = options.upper !== 'false'
        const includeLower = options.lower !== 'false'
        const includeDigits = options.digits !== 'false'
        const includeSymbols = options.symbols === 'true'

        let charset = ''
        if (includeUpper) charset += sets.upper
        if (includeLower) charset += sets.lower
        if (includeDigits) charset += sets.digits
        if (includeSymbols) charset += sets.symbols
        if (!charset) charset = sets.lower + sets.digits

        const count = Math.min(parseInt(options.count || '5'), 20)
        const passwords: string[] = []
        for (let i = 0; i < count; i++) {
          const bytes = crypto.randomBytes(length)
          passwords.push(Array.from(bytes).map((b: number) => charset[b % charset.length]).join(''))
        }

        // Password strength of first password
        const p = passwords[0]
        const strength =
          (p.length >= 12 ? 1 : 0) +
          (/[A-Z]/.test(p) ? 1 : 0) +
          (/[0-9]/.test(p) ? 1 : 0) +
          (/[^A-Za-z0-9]/.test(p) ? 1 : 0)

        return Response.json({
          passwords,
          strength: ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][strength],
          strengthScore: strength,
          entropy: Math.round(length * Math.log2(charset.length)),
        })
      }

      case 'api-test': {
        const target = await assertSafeRemoteUrl(input)
        const method = String(options.method || 'GET').toUpperCase()
        const allowedMethods = new Set(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'])
        if (!allowedMethods.has(method)) return err('Unsupported HTTP method')

        const headers: Record<string, string> =
          options.headers && typeof options.headers === 'object'
            ? (Object.fromEntries(
                Object.entries(options.headers as Record<string, unknown>)
                  .filter(([, value]) => typeof value === 'string')
                  .slice(0, 20)
              ) as Record<string, string>)
            : {}

        const body =
          method === 'GET' || method === 'HEAD'
            ? undefined
            : typeof options.body === 'string'
              ? options.body
              : undefined

        const startedAt = Date.now()
        const response = await fetch(target, {
          method,
          headers,
          body,
          redirect: 'follow',
          signal: AbortSignal.timeout(10000),
        })
        const responseTimeMs = Date.now() - startedAt

        const rawBody = await response.text()
        let parsedBody: unknown = rawBody

        try {
          parsedBody = JSON.parse(rawBody)
        } catch {}

        return Response.json({
          url: response.url,
          method,
          ok: response.ok,
          status: response.status,
          statusText: response.statusText,
          responseTimeMs,
          durationHint: 'Response captured with a 10 second server timeout',
          headers: Object.fromEntries(Array.from(response.headers.entries()).slice(0, 25)),
          bodyType: typeof parsedBody === 'string' ? 'text' : 'json',
          body: typeof parsedBody === 'string' ? parsedBody.slice(0, 5000) : parsedBody,
        })
      }

      default:
        return err(`Unknown dev action: ${action}`)
    }
  } catch (e) {
    return err(`Dev tool failed: ${(e as Error).message}`, getErrorStatus(e, 500))
  }
}
