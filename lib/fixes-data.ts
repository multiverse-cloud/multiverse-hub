export type FixClusterId = 'mobile' | 'pc' | 'apps' | 'games' | 'internet' | 'device'

export interface FixesCluster {
  id: FixClusterId
  title: string
  description: string
  href: string
  problemCount: string
  examples: string[]
}

export interface FixStep {
  step: number
  title: string
  detail: string
}

export interface FixGuide {
  id: string
  slug: string
  title: string
  seoTitle: string
  metaDescription: string
  summary: string
  description: string
  quickAnswer: string
  cluster: FixClusterId
  clusterTitle: string
  platformLabel: string
  issueType: string
  updatedAt: string
  symptoms: string[]
  steps: FixStep[]
  whenToGetHelp: string[]
  tags: string[]
  imageAlt: string
  featured?: boolean
  relatedSlugs: string[]
}

export interface StarterFixGuide {
  title: string
  href: string
  platform: string
  summary: string
}

type FixStepPlanId =
  | 'mobileBattery'
  | 'mobileSpeed'
  | 'mobileHeat'
  | 'mobileCharge'
  | 'mobileStorage'
  | 'mobileConnectivity'
  | 'mobileApps'
  | 'mobileMedia'
  | 'mobileTouch'
  | 'mobileStability'
  | 'pcPerformance'
  | 'pcHeat'
  | 'pcBattery'
  | 'pcConnectivity'
  | 'pcPeripheral'
  | 'pcBrowser'
  | 'pcStorage'
  | 'pcStability'
  | 'appCrash'
  | 'appSync'
  | 'appLogin'
  | 'appMedia'
  | 'appStorage'
  | 'appTransaction'
  | 'gamePerformance'
  | 'gameNetwork'
  | 'gameInstall'
  | 'gameDevice'
  | 'gameStability'
  | 'internetSlow'
  | 'internetNoInternet'
  | 'internetSignal'
  | 'internetRouter'
  | 'deviceAudio'
  | 'deviceVideo'
  | 'deviceBluetooth'
  | 'deviceExternal'
  | 'deviceLocation'
  | 'deviceBiometrics'

type FixGuideSeedOptions = {
  featured?: boolean
  platformLabel?: string
  summary?: string
  quickAnswer?: string
  symptoms?: string[]
}

type FixGuideSeed = {
  slug: string
  title: string
  stepPlan: FixStepPlanId
  tags: string[]
  featured?: boolean
  platformLabel?: string
  summary?: string
  quickAnswer?: string
  symptoms?: string[]
}

const FIXES_UPDATED_AT = '2026-03-31'

const FIX_CLUSTER_META: Record<
  FixClusterId,
  {
    title: string
    description: string
    examples: string[]
  }
> = {
  mobile: {
    title: 'Mobile Problems',
    description: 'Battery, heat, charging, lag, apps, calls, storage, and signal problems on phones.',
    examples: ['Battery drain', 'Slow Android phone', 'Phone overheating', 'Charging too slow'],
  },
  pc: {
    title: 'PC & Laptop Problems',
    description: 'Startup lag, heat, battery, browser issues, black screens, drivers, and common laptop friction.',
    examples: ['Slow startup', 'Laptop overheating', 'Browser freezing', 'Laptop not charging'],
  },
  apps: {
    title: 'App Problems',
    description: 'Crashes, login loops, syncing failures, notification bugs, upload issues, and storage-heavy apps.',
    examples: ['Instagram crashing', 'WhatsApp not sending', 'CapCut export stuck', 'Apps not updating'],
  },
  games: {
    title: 'Game Problems',
    description: 'Lag, FPS drops, overheating, install failures, network spikes, and launch problems.',
    examples: ['BGMI lag', 'Valorant FPS drops', 'Steam game not launching', 'Game update stuck'],
  },
  internet: {
    title: 'Wi-Fi & Internet',
    description: 'Slow Wi-Fi, weak signal, DNS issues, packet loss, hotspot problems, and router instability.',
    examples: ['Slow Wi-Fi', 'No internet', 'Weak signal', 'High ping'],
  },
  device: {
    title: 'Audio, Camera & Device Access',
    description: 'Mic, camera, Bluetooth, second monitor, SD card, USB, and device-permission problems.',
    examples: ['Mic not working', 'Bluetooth disconnecting', 'Camera blocked', 'Second monitor missing'],
  },
}

function seed(
  slug: string,
  title: string,
  stepPlan: FixStepPlanId,
  tags: string[],
  options: FixGuideSeedOptions = {}
): FixGuideSeed {
  return {
    slug,
    title,
    stepPlan,
    tags,
    featured: options.featured,
    platformLabel: options.platformLabel,
    summary: options.summary,
    quickAnswer: options.quickAnswer,
    symptoms: options.symptoms,
  }
}

function lowerFirst(value: string) {
  return value.charAt(0).toLowerCase() + value.slice(1)
}

function stripGuidePrefix(title: string) {
  return title
    .replace(/^How to Fix /i, '')
    .replace(/^How to Tell if Your /i, '')
    .replace(/^How to Tell if /i, '')
    .trim()
}

function getPlanSummary(stepPlan: FixStepPlanId, problemLabel: string) {
  switch (stepPlan) {
    case 'mobileBattery':
      return `A short fix path for ${lowerFirst(problemLabel)}, starting with power usage instead of random battery-saving changes.`
    case 'mobileSpeed':
      return `A simple cleanup flow for ${lowerFirst(problemLabel)} focused on storage, background load, and update hygiene.`
    case 'mobileHeat':
      return `A quick troubleshooting path for ${lowerFirst(problemLabel)} without jumping straight to hardware panic.`
    case 'mobileCharge':
      return `An easy charging checklist for ${lowerFirst(problemLabel)} covering cable, port, power source, and background drain.`
    case 'mobileStorage':
      return `A simple storage recovery path for ${lowerFirst(problemLabel)} so you can free space without deleting the wrong things.`
    case 'mobileConnectivity':
      return `A practical connectivity fix path for ${lowerFirst(problemLabel)} that checks signal, settings, and network state in the right order.`
    case 'mobileApps':
      return `A calm app-fix flow for ${lowerFirst(problemLabel)} focused on cache, updates, and one clean retest.`
    case 'mobileMedia':
      return `A quick media and permission fix path for ${lowerFirst(problemLabel)} without over-resetting the phone.`
    case 'mobileTouch':
      return `A short step-by-step path for ${lowerFirst(problemLabel)} that checks overlays, heat, and display behavior first.`
    case 'mobileStability':
      return `A stability-focused path for ${lowerFirst(problemLabel)} that helps you isolate whether the issue is software, heat, or one recent change.`
    case 'pcPerformance':
      return `A clean laptop performance fix path for ${lowerFirst(problemLabel)} built around startup load, memory pressure, and heavy apps.`
    case 'pcHeat':
      return `A practical heat-control path for ${lowerFirst(problemLabel)} before you assume the laptop is dying.`
    case 'pcBattery':
      return `A battery troubleshooting flow for ${lowerFirst(problemLabel)} focused on power use, heavy apps, and one realistic unplugged test.`
    case 'pcConnectivity':
      return `A network-focused fix path for ${lowerFirst(problemLabel)} that separates laptop issues from router or ISP problems.`
    case 'pcPeripheral':
      return `A quick peripheral fix path for ${lowerFirst(problemLabel)} covering ports, permissions, drivers, and one clean reconnect.`
    case 'pcBrowser':
      return `A browser troubleshooting flow for ${lowerFirst(problemLabel)} built around extensions, cache, and a clean profile check.`
    case 'pcStorage':
      return `A practical storage fix path for ${lowerFirst(problemLabel)} that clears the biggest space hogs first.`
    case 'pcStability':
      return `A step-by-step stability path for ${lowerFirst(problemLabel)} that checks recent updates, heat, and power state before deeper resets.`
    case 'appCrash':
      return `A simple app-recovery flow for ${lowerFirst(problemLabel)} using cache, updates, and one clean reinstall only if needed.`
    case 'appSync':
      return `A sync-focused fix path for ${lowerFirst(problemLabel)} built around network, account state, and fresh test data.`
    case 'appLogin':
      return `A login recovery path for ${lowerFirst(problemLabel)} that checks credentials, session state, time sync, and one safe retry.`
    case 'appMedia':
      return `A media workflow fix path for ${lowerFirst(problemLabel)} focused on permissions, storage, and smaller test files.`
    case 'appStorage':
      return `A storage cleanup path for ${lowerFirst(problemLabel)} that removes cache bloat before you uninstall the app.`
    case 'appTransaction':
      return `A checkout and service-state fix path for ${lowerFirst(problemLabel)} built around permissions, payment state, and retry order.`
    case 'gamePerformance':
      return `A gaming performance fix path for ${lowerFirst(problemLabel)} focused on graphics load, background apps, and temperature.`
    case 'gameNetwork':
      return `A network-first gaming fix path for ${lowerFirst(problemLabel)} that helps you separate ping, server, and local device issues.`
    case 'gameInstall':
      return `A store-and-files fix path for ${lowerFirst(problemLabel)} covering storage, client state, and one clean retry.`
    case 'gameDevice':
      return `A device-side gaming fix path for ${lowerFirst(problemLabel)} focused on controllers, audio, overlays, and display setup.`
    case 'gameStability':
      return `A crash-and-launch fix path for ${lowerFirst(problemLabel)} built around updates, overlays, and one stable retest.`
    case 'internetSlow':
      return `A simple home-network path for ${lowerFirst(problemLabel)} that starts with speed, placement, and device load.`
    case 'internetNoInternet':
      return `A quick no-internet flow for ${lowerFirst(problemLabel)} that checks whether the fault is device-side, router-side, or upstream.`
    case 'internetSignal':
      return `A signal-quality fix path for ${lowerFirst(problemLabel)} focused on placement, band choice, and room-by-room testing.`
    case 'internetRouter':
      return `A router health path for ${lowerFirst(problemLabel)} covering heat, firmware, cables, and restart behavior.`
    case 'deviceAudio':
      return `A short audio-device fix path for ${lowerFirst(problemLabel)} using output routing, permissions, and one clean reconnect.`
    case 'deviceVideo':
      return `A camera and video-device fix path for ${lowerFirst(problemLabel)} focused on permissions, app conflicts, and driver freshness.`
    case 'deviceBluetooth':
      return `A Bluetooth recovery path for ${lowerFirst(problemLabel)} using pairing cleanup, battery checks, and one stable retest.`
    case 'deviceExternal':
      return `A quick external-device path for ${lowerFirst(problemLabel)} that checks cable, port, mode, and driver basics.`
    case 'deviceLocation':
      return `A location-services fix path for ${lowerFirst(problemLabel)} focused on permissions, accuracy mode, and real GPS testing.`
    case 'deviceBiometrics':
      return `A biometrics recovery path for ${lowerFirst(problemLabel)} that checks sensor condition, saved profiles, and recent updates.`
  }
}

function getQuickAnswer(stepPlan: FixStepPlanId) {
  switch (stepPlan) {
    case 'mobileBattery':
      return 'Open battery usage first so you can see what is draining power before you change a dozen settings.'
    case 'mobileSpeed':
      return 'Restart once, check free space, and look for one heavy background app before you clear random things.'
    case 'mobileHeat':
      return 'Stop charging or gaming, let the phone cool, and then find the app or task creating the heat.'
    case 'mobileCharge':
      return 'Check the charger, cable, and port first, because charging problems are often physical before they are software.'
    case 'mobileStorage':
      return 'Open storage usage and delete the largest junk first instead of removing small files one by one.'
    case 'mobileConnectivity':
      return 'Check whether the problem follows the network or stays with the phone before you reset all connectivity settings.'
    case 'mobileApps':
      return 'See if the issue is one app or the whole phone, then clear cache and update before reinstalling.'
    case 'mobileMedia':
      return 'Permissions, mute state, and one test in another app usually tell you faster than a full reset.'
    case 'mobileTouch':
      return 'Remove screen overlays and cool the phone first, because heat and bad touch layers often look like bigger problems.'
    case 'mobileStability':
      return 'Note when the issue happens, because random restarts and freezes often point back to one recent app, update, or heat event.'
    case 'pcPerformance':
      return 'A clean restart and a quick look at startup apps usually tell you more than opening ten cleanup tools.'
    case 'pcHeat':
      return 'Check vents, fans, and CPU load first so you know whether the heat is airflow, software load, or both.'
    case 'pcBattery':
      return 'Look for the app or setting draining power before lowering every system feature at once.'
    case 'pcConnectivity':
      return 'Test another network first so you know whether the laptop is the problem or the network is.'
    case 'pcPeripheral':
      return 'Try another port or app before reinstalling drivers, because many device issues are simple routing or permissions problems.'
    case 'pcBrowser':
      return 'Disable extensions and test one clean profile first, because browser slowdowns often come from add-ons.'
    case 'pcStorage':
      return 'Sort storage by size and remove the biggest disposable files first.'
    case 'pcStability':
      return 'Check recent updates, heat, and power state before deeper resets, because that is where many stability issues begin.'
    case 'appCrash':
      return 'Force stop, reopen, and clear cache before you reinstall, because reinstalling too early hides the real pattern.'
    case 'appSync':
      return 'Check network and account status first, because sync issues often look local when they are not.'
    case 'appLogin':
      return 'Time sync, OTP delivery, and one clean session reset usually solve login loops faster than repeated password attempts.'
    case 'appMedia':
      return 'Permissions and available storage are the first things to test when export, upload, or camera flows fail.'
    case 'appStorage':
      return 'Check how much is cache versus real user files before you delete anything important.'
    case 'appTransaction':
      return 'Confirm location, balance, and service status first so you do not mistake a service issue for a device issue.'
    case 'gamePerformance':
      return 'Lower graphics, close background apps, and watch temperature before chasing deeper fixes.'
    case 'gameNetwork':
      return 'Check whether the lag is server-side or network-side first, because the wrong assumption wastes time.'
    case 'gameInstall':
      return 'Look at storage and the launcher or store state before deleting the whole game.'
    case 'gameDevice':
      return 'Test the controller, audio, or display in one other game first so you know whether the issue is global or game-specific.'
    case 'gameStability':
      return 'If a game crashes on launch, start with updates and overlays before touching deeper system settings.'
    case 'internetSlow':
      return 'Run one speed test near the router and one where the problem happens so you can separate line speed from room coverage.'
    case 'internetNoInternet':
      return 'Check whether all devices are offline before you reset anything, because that tells you where the fault starts.'
    case 'internetSignal':
      return 'Move closer to the router first, because weak signal is often a placement problem before it is a hardware one.'
    case 'internetRouter':
      return 'Heat, loose power, and unstable firmware are the first router-health checks worth doing.'
    case 'deviceAudio':
      return 'Check output routing and mute state first, because the device may be working but sending sound somewhere else.'
    case 'deviceVideo':
      return 'Permissions and another quick app test usually tell you if the camera issue is app-specific or system-wide.'
    case 'deviceBluetooth':
      return 'Forget the device and pair again after checking battery level, because stale Bluetooth sessions break easily.'
    case 'deviceExternal':
      return 'Try another cable or port before deeper fixes, because accessories fail at the connection layer more often than people expect.'
    case 'deviceLocation':
      return 'Turn on precise location and test outside or near a window before blaming the app.'
    case 'deviceBiometrics':
      return 'Clean the sensor or camera area and retest before deleting the saved fingerprint or face data.'
  }
}

function getSymptoms(stepPlan: FixStepPlanId, problemLabel: string) {
  switch (stepPlan) {
    case 'mobileBattery':
      return ['Battery percentage drops too fast', 'Phone feels warm while idle', 'Normal daily use needs extra charging']
    case 'mobileSpeed':
      return ['Apps open slowly', 'Scrolling stutters', `${problemLabel} feels worse after storage fills up`]
    case 'mobileHeat':
      return ['Phone gets hot during light use', 'Camera or game sessions trigger heat quickly', 'Brightness drops or performance dips']
    case 'mobileCharge':
      return ['Charging takes much longer', 'Charge level barely moves', 'Charging stops if the cable shifts']
    case 'mobileStorage':
      return ['Storage warnings keep appearing', 'Camera or apps stop saving properly', 'Updates fail because space is low']
    case 'mobileConnectivity':
      return ['Signal or Wi-Fi keeps dropping', 'The issue changes by location or network', 'One network works while another does not']
    case 'mobileApps':
      return ['One or more apps close suddenly', 'The issue returns after reopening', 'Cache or update state seems involved']
    case 'mobileMedia':
      return ['The mic, speaker, or camera works in one place but not another', 'Permissions or accessory routing look suspicious', 'The problem changes after reconnecting devices']
    case 'mobileTouch':
      return ['Touches register late', 'Some parts of the screen feel unresponsive', 'Heat or screen layers make the problem worse']
    case 'mobileStability':
      return ['Restarts, freezes, or hangs happen at random times', 'The problem became worse after a recent change', 'Heat or one specific app seems connected']
    case 'pcPerformance':
      return ['Startup takes longer than usual', 'Apps lag while multitasking', 'The laptop feels busy even with light work']
    case 'pcHeat':
      return ['Fans spin loudly', 'Keyboard deck feels hot', 'Performance drops as the laptop warms up']
    case 'pcBattery':
      return ['Battery runs out faster off the charger', 'Sleep or idle still drains power', 'Heavy background activity keeps showing up']
    case 'pcConnectivity':
      return ['Wi-Fi or Bluetooth disconnects often', 'Another network behaves differently', 'The problem returns after sleep or restart']
    case 'pcPeripheral':
      return ['The device appears sometimes but not consistently', 'One port or app works while another does not', 'Permissions or routing look wrong']
    case 'pcBrowser':
      return ['Only the browser feels slow', 'Tabs freeze or use too much memory', 'Extensions seem to make things worse']
    case 'pcStorage':
      return ['The drive is close to full', 'Updates or downloads fail for lack of space', 'Temporary files keep growing back']
    case 'pcStability':
      return ['The laptop crashes, sleeps badly, or boots into problems', 'The issue started after an update or power event', 'The problem feels bigger than one app']
    case 'appCrash':
      return ['The app closes suddenly', 'The same action triggers the crash', 'Restarting helps only for a moment']
    case 'appSync':
      return ['Changes do not appear across devices', 'Uploads or backups stay pending', 'The account looks signed in but data is stale']
    case 'appLogin':
      return ['You get bounced back to login', 'OTP or verification arrives late', 'The app says the session is invalid again and again']
    case 'appMedia':
      return ['Uploads, exports, or camera flows stop midway', 'Large files fail more than small ones', 'Permissions or storage warnings appear']
    case 'appStorage':
      return ['The app size keeps growing', 'Cache looks much larger than expected', 'Deleting a little data does not help enough']
    case 'appTransaction':
      return ['Checkout, payment, or booking fails', 'Location or balance checks look inconsistent', 'Retrying quickly gives the same error']
    case 'gamePerformance':
      return ['FPS drops or stutter happens during action', 'The device runs hotter than usual', 'Background apps make the problem worse']
    case 'gameNetwork':
      return ['Ping spikes, packet loss, or rubber banding show up', 'The issue changes by server or network', 'Voice chat or multiplayer feels unstable']
    case 'gameInstall':
      return ['Downloads stall', 'Updates refuse to finish', 'The launcher or store behaves inconsistently']
    case 'gameDevice':
      return ['Controller, audio, or display works in some games but not all', 'The problem is tied to one accessory or overlay', 'Pairing or routing breaks mid-session']
    case 'gameStability':
      return ['The game crashes on launch or after update', 'The problem repeats in the same scene or loading phase', 'Overlays or drivers may be involved']
    case 'internetSlow':
      return ['Web pages, streams, or downloads feel slower than normal', 'The problem is worse in some rooms', 'One device or many devices can trigger the slowdown']
    case 'internetNoInternet':
      return ['Wi-Fi shows connected but nothing loads', 'Some devices may be offline together', 'A restart sometimes helps for only a little while']
    case 'internetSignal':
      return ['The connection weakens in one part of the house', '5GHz disappears or drops quickly', 'Walls or distance clearly affect speed']
    case 'internetRouter':
      return ['The router restarts or overheats', 'Lights or behavior change without warning', 'Power, cable, or firmware stability is suspect']
    case 'deviceAudio':
      return ['Audio is too low, routed wrong, or missing entirely', 'Another app or accessory changes the behavior', 'Reconnects help only sometimes']
    case 'deviceVideo':
      return ['The camera is blocked, black, or too dark', 'One app sees the camera while another does not', 'Privacy or driver state looks involved']
    case 'deviceBluetooth':
      return ['Pairing fails or drops randomly', 'Audio delay or disconnects show up mid-use', 'Battery or nearby paired devices seem to affect it']
    case 'deviceExternal':
      return ['The accessory is not detected', 'Another port or cable changes the result', 'The problem may be connection mode, not hardware failure']
    case 'deviceLocation':
      return ['Maps or apps show the wrong place', 'The signal is weak indoors', 'Accuracy changes depending on permissions or surroundings']
    case 'deviceBiometrics':
      return ['Fingerprint or face unlock fails more often than before', 'The sensor or camera may be dirty or blocked', 'Recent updates or re-enrollment changed behavior']
  }
}

function getHelpSignals(stepPlan: FixStepPlanId) {
  switch (stepPlan) {
    case 'mobileBattery':
    case 'mobileCharge':
      return ['Battery swelling or shutdowns start appearing', 'The phone gets very hot while charging', 'The charge level jumps wildly after basic checks']
    case 'mobileHeat':
    case 'mobileStability':
    case 'pcHeat':
    case 'pcStability':
    case 'gameStability':
      return ['The device shuts down by itself', 'The issue returns immediately after a clean restart', 'You suspect hardware damage or a failing component']
    case 'pcBattery':
    case 'pcPerformance':
      return ['Battery health drops sharply', 'The laptop is unusable even after a clean boot', 'Fans, storage, or memory faults point to hardware']
    case 'internetNoInternet':
    case 'internetRouter':
      return ['All devices stay offline after a full restart', 'Your ISP already shows an outage or line issue', 'The router overheats or reboots repeatedly']
    case 'deviceAudio':
    case 'deviceVideo':
    case 'deviceBluetooth':
    case 'deviceExternal':
    case 'deviceLocation':
    case 'deviceBiometrics':
      return ['The device fails on more than one port or app', 'The problem survives restart, reconnect, and update checks', 'There is visible hardware damage or moisture history']
    default:
      return ['The issue survives every basic step', 'The problem is getting worse instead of better', 'You may be dealing with a hardware fault or service-side outage']
  }
}

function buildSteps(stepPlan: FixStepPlanId): FixStep[] {
  const steps: Omit<FixStep, 'step'>[] = (() => {
    switch (stepPlan) {
      case 'mobileBattery':
        return [
          { title: 'Open battery usage', detail: 'Check which app or service is draining power before you change random settings.' },
          { title: 'Trim background drain', detail: 'Restrict always-on sync, location, and background refresh for the worst offenders.' },
          { title: 'Lower screen and heat load', detail: 'Reduce brightness, refresh rate, or always-on display if the phone is staying warm.' },
          { title: 'Update and restart once', detail: 'Bring the system and the main draining apps up to date, then reboot cleanly.' },
          { title: 'Test one normal day', detail: 'Use the phone normally and watch whether drain improves before replacing the battery.' },
        ]
      case 'mobileSpeed':
        return [
          { title: 'Restart and check free space', detail: 'A full restart and a quick storage check clear many slow-phone cases faster than cleanup apps.' },
          { title: 'Stop heavy background apps', detail: 'Close or uninstall apps that keep syncing, floating, or using memory all day.' },
          { title: 'Clear cache and downloads', detail: 'Remove junk from the apps that have grown large or keep rebuilding temporary files.' },
          { title: 'Update the phone and key apps', detail: 'Performance bugs often improve after current updates and one stable reboot.' },
          { title: 'Retest with one common task', detail: 'Open the apps you use every day and confirm whether the lag is actually gone.' },
        ]
      case 'mobileHeat':
        return [
          { title: 'Stop charging or gaming first', detail: 'Let the phone cool for a few minutes before you test anything else.' },
          { title: 'Find the hot app or task', detail: 'Check battery or task usage so you know whether the heat comes from one workload.' },
          { title: 'Reduce outside heat sources', detail: 'Remove the case if needed and keep the phone out of sunlight or heavy blankets.' },
          { title: 'Update the system and big apps', detail: 'Old app versions or bad updates can keep the phone hot for no good reason.' },
          { title: 'Test again after cooldown', detail: 'If the heat returns during light use, treat it as a bigger stability issue.' },
        ]
      case 'mobileCharge':
        return [
          { title: 'Check cable, charger, and port', detail: 'Try a known-good charger and inspect the port for lint or loose movement.' },
          { title: 'Use a stable power source', detail: 'Wall power is a better test than a weak laptop port or cheap extension setup.' },
          { title: 'Pause heavy tasks while charging', detail: 'Games, video exports, and hotspot use can hide the real charging speed.' },
          { title: 'Restart and update once', detail: 'A clean reboot helps if the charge icon appears but power intake stays odd.' },
          { title: 'Watch one full charge session', detail: 'If the problem stays after a good cable and port test, it may be hardware.' },
        ]
      case 'mobileStorage':
        return [
          { title: 'Open the storage breakdown', detail: 'See what is actually full before deleting random photos or messages.' },
          { title: 'Remove the largest junk first', detail: 'Start with big downloads, duplicate media, and offline files you can restore later.' },
          { title: 'Clear app cache carefully', detail: 'Large social, browser, and video apps often hide a lot of removable temporary data.' },
          { title: 'Move or back up heavy media', detail: 'Shift videos, backups, or offline packs to cloud or local storage if possible.' },
          { title: 'Keep a free-space buffer', detail: 'Leave enough free space so updates, camera saves, and app caches can work normally.' },
        ]
      case 'mobileConnectivity':
        return [
          { title: 'Check the simple toggles first', detail: 'Test airplane mode, mobile data, Wi-Fi, or Bluetooth state before deeper resets.' },
          { title: 'Compare another network or device', detail: 'That tells you whether the issue follows the phone or stays with the connection.' },
          { title: 'Forget and reconnect only the broken link', detail: 'Reset the specific Wi-Fi, hotspot, or pairing instead of wiping everything at once.' },
          { title: 'Update carrier, system, or app state', detail: 'Old network settings and outdated apps can make the same problem keep returning.' },
          { title: 'Retest in the same real scenario', detail: 'Check the same room, route, or accessory again so you know if the fix held.' },
        ]
      case 'mobileApps':
        return [
          { title: 'Check if one app is failing or many', detail: 'That helps you decide whether the issue is app-specific or phone-wide.' },
          { title: 'Force stop and reopen', detail: 'A clean reopen is still the fastest first test for crashes and stuck state.' },
          { title: 'Clear cache or temp files', detail: 'Keep the account signed in if possible and remove only stale local data first.' },
          { title: 'Update the app and the phone', detail: 'Crash loops and store problems often come from outdated app-system combinations.' },
          { title: 'Reinstall only if it still fails', detail: 'If the same error returns after update and cache cleanup, a reinstall is worth trying.' },
        ]
      case 'mobileMedia':
        return [
          { title: 'Check permissions and mute state', detail: 'Many audio and camera issues come from one blocked permission or routing choice.' },
          { title: 'Test in a second app', detail: 'If the feature works there, the problem is probably app-specific.' },
          { title: 'Disconnect accessories', detail: 'Bluetooth devices and USB accessories can quietly steal audio or camera control.' },
          { title: 'Update and restart', detail: 'A small restart after permissions and accessory cleanup often resets the media path.' },
          { title: 'Reset only the relevant settings', detail: 'Do this last if the mic, speaker, or camera still fails everywhere.' },
        ]
      case 'mobileTouch':
        return [
          { title: 'Remove overlays and test bare screen', detail: 'Bad screen protectors, gloves mode, or floating apps can create false touch problems.' },
          { title: 'Cool the phone and restart', detail: 'Heat can make touch response feel worse than the real underlying issue.' },
          { title: 'Test touch in one simple app', detail: 'Use notes or settings to see whether the issue is system-wide or app-specific.' },
          { title: 'Update display-related settings', detail: 'Refresh rate, gesture mode, or a pending update may be part of the problem.' },
          { title: 'Back up if the issue stays', detail: 'Persistent dead zones can point to hardware, so save important data early.' },
        ]
      case 'mobileStability':
        return [
          { title: 'Note when the issue appears', detail: 'See whether the freeze, restart, or hang is tied to heat, calls, charging, or one app.' },
          { title: 'Check storage and temperature', detail: 'Low storage and high heat are two of the most common stability triggers.' },
          { title: 'Remove the latest suspect change', detail: 'A recent app, update, or setting change can be enough to break stability.' },
          { title: 'Update and restart cleanly', detail: 'Use the latest stable software and give the phone one full clean reboot.' },
          { title: 'Back up if it keeps happening', detail: 'If the issue returns quickly, protect your data before deeper repair steps.' },
        ]
      case 'pcPerformance':
        return [
          { title: 'Restart and trim startup apps', detail: 'Start with the apps that launch every boot and keep the laptop busy all day.' },
          { title: 'Check memory and storage pressure', detail: 'Low free space and constant RAM pressure make normal tasks feel much slower.' },
          { title: 'Close heavy background work', detail: 'Browser tabs, cloud sync, and meeting apps can quietly create most of the lag.' },
          { title: 'Update the main system pieces', detail: 'Windows, drivers, and the slow app itself all matter more than random registry tweaks.' },
          { title: 'Retest after a clean boot', detail: 'Use one normal work session to see whether the laptop actually feels better.' },
        ]
      case 'pcHeat':
        return [
          { title: 'Check airflow first', detail: 'Blocked vents, blankets, or dust can create instant heat problems.' },
          { title: 'See what is using CPU or GPU', detail: 'Find the workload before assuming the fan or thermal paste is the only cause.' },
          { title: 'Lower load for a clean test', detail: 'Pause heavy browser, editing, or gaming tasks and see how fast heat drops.' },
          { title: 'Update power and driver state', detail: 'Power plans and drivers can make the laptop run hotter than needed.' },
          { title: 'Watch temperatures again', detail: 'If idle heat stays high, the problem may be deeper than software load.' },
        ]
      case 'pcBattery':
        return [
          { title: 'Check what is draining power', detail: 'Look for the process or setting that keeps using battery off the charger.' },
          { title: 'Lower display and sync load', detail: 'Brightness, refresh rate, cloud sync, and browser tabs add up quickly.' },
          { title: 'Disconnect power-hungry extras', detail: 'USB devices, backlit accessories, and external displays can drain faster than expected.' },
          { title: 'Update battery-related drivers', detail: 'Power management bugs often improve after a clean system update.' },
          { title: 'Test one unplugged session', detail: 'Use the laptop normally off the charger and measure whether the drain pattern improved.' },
        ]
      case 'pcConnectivity':
        return [
          { title: 'Test another network or device', detail: 'Find out whether the laptop is the problem or the network is.' },
          { title: 'Reconnect the broken connection', detail: 'Forget the Wi-Fi, repair the pairing, or re-seat the adapter before bigger resets.' },
          { title: 'Update the adapter or device driver', detail: 'Old drivers can cause reconnect loops after sleep or movement.' },
          { title: 'Reset only the affected network path', detail: 'Use a targeted reset so you do not wipe more than you need.' },
          { title: 'Retest after a clean wake or reboot', detail: 'If the issue returns after sleep, note that pattern for the next step.' },
        ]
      case 'pcPeripheral':
        return [
          { title: 'Try another port or cable', detail: 'Connection issues often start at the simplest physical layer.' },
          { title: 'Check app permissions or routing', detail: 'The device may work, but the system may be sending it to the wrong app or output path.' },
          { title: 'Test in a second app or service', detail: 'That tells you whether the problem is global or only inside one tool.' },
          { title: 'Update the driver or firmware', detail: 'Many recurring webcam, mic, and monitor issues improve here.' },
          { title: 'Reconnect from scratch if needed', detail: 'Remove the device cleanly and pair or plug it back in once.' },
        ]
      case 'pcBrowser':
        return [
          { title: 'See if the browser is the only slow part', detail: 'If the rest of the laptop is fine, keep the fix path focused on the browser.' },
          { title: 'Disable heavy extensions', detail: 'One bad extension is often enough to create freezes and delay.' },
          { title: 'Clear cache or test a new profile', detail: 'Use a clean browsing profile to rule out stale browser state.' },
          { title: 'Update browser and graphics path', detail: 'Browser and GPU updates matter for freezing, scrolling, and playback issues.' },
          { title: 'Retest the same sites', detail: 'Use the same workload so you can see whether the fix really worked.' },
        ]
      case 'pcStorage':
        return [
          { title: 'Sort by biggest files first', detail: 'Large folders move the needle faster than tiny cleanup wins.' },
          { title: 'Clear temp and download junk', detail: 'Old installers, zip files, and browser downloads add up quickly.' },
          { title: 'Move media and backups', detail: 'Shift videos, raw files, or backup archives off the main drive if possible.' },
          { title: 'Uninstall what you do not use', detail: 'Remove heavy apps you no longer need after saving project data.' },
          { title: 'Keep breathing room free', detail: 'A crowded drive can slow updates, paging, and normal work.' },
        ]
      case 'pcStability':
        return [
          { title: 'Look at the last change', detail: 'Updates, drivers, sleep state, and power events often explain new instability.' },
          { title: 'Check heat and storage basics', detail: 'High heat and low free space make many stability issues worse.' },
          { title: 'Disconnect extra hardware for one test', detail: 'A bad accessory or dock can trigger sleep, boot, or audio issues.' },
          { title: 'Update and restart cleanly', detail: 'Use a full reboot after updates instead of only closing the lid.' },
          { title: 'Back up if the issue continues', detail: 'Protect important files early if blue screens or black screens keep returning.' },
        ]
      case 'appCrash':
        return [
          { title: 'Check whether the issue is only one app', detail: 'If the whole device is unstable, do not treat it like a single-app problem.' },
          { title: 'Force stop and reopen', detail: 'This clears stuck state faster than repeated tapping and retrying.' },
          { title: 'Clear cache or local temp data', detail: 'Remove stale files before you remove the entire app.' },
          { title: 'Update the app and system', detail: 'Crash loops often come from old app builds after device updates.' },
          { title: 'Reinstall if the crash stays', detail: 'If it still dies on the same action, a clean reinstall is reasonable.' },
        ]
      case 'appSync':
        return [
          { title: 'Check account and internet first', detail: 'Sync problems often start with sign-in state or weak internet.' },
          { title: 'Trigger one manual sync', detail: 'Use one small item so you can see clearly whether syncing works.' },
          { title: 'Clear stale cached data', detail: 'Old offline state can trap an app in a fake sync loop.' },
          { title: 'Update permissions and app version', detail: 'Background sync, storage, and battery permissions matter more than people expect.' },
          { title: 'Retest with one fresh change', detail: 'Create one small new item and watch whether it appears everywhere.' },
        ]
      case 'appLogin':
        return [
          { title: 'Check credentials and verification path', detail: 'Confirm password, OTP, or magic-link basics before repeated retries.' },
          { title: 'Fix time, network, and delivery issues', detail: 'Bad clock sync or weak internet can break login flows and OTP handling.' },
          { title: 'Clear the stuck session', detail: 'Remove stale login state, cache, or saved session data if the app allows it.' },
          { title: 'Update and restart once', detail: 'A clean restart after update is often enough for loops or invalid-session errors.' },
          { title: 'Use the official recovery path', detail: 'If login still fails, use password reset or verified account recovery instead of guessing.' },
        ]
      case 'appMedia':
        return [
          { title: 'Check permissions first', detail: 'Storage, camera, mic, and photo access are common blockers.' },
          { title: 'Test a smaller file or clip', detail: 'A smaller export or upload shows whether size is the main issue.' },
          { title: 'Free storage and close heavy apps', detail: 'Media workflows fail more often when the phone is full or busy.' },
          { title: 'Update the app and device', detail: 'Media bugs usually improve faster with current versions than with random setting changes.' },
          { title: 'Retry with one clean sample', detail: 'If the sample works, scale back up carefully instead of repeating the old failing job.' },
        ]
      case 'appStorage':
        return [
          { title: 'Check the storage split', detail: 'See how much is cache, downloads, media, and real user data.' },
          { title: 'Clear safe temporary data', detail: 'Start with cache and offline leftovers before you remove important files.' },
          { title: 'Delete duplicate downloads', detail: 'Media-heavy apps often keep old drafts or offline bundles longer than needed.' },
          { title: 'Move important files elsewhere', detail: 'Back up what matters before you do aggressive cleanup.' },
          { title: 'Reopen and confirm the drop', detail: 'Make sure the app actually shrank and still works the way you need.' },
        ]
      case 'appTransaction':
        return [
          { title: 'Check service basics', detail: 'Balance, location, saved cards, and account verification all matter before deeper fixes.' },
          { title: 'Retry one simple action', detail: 'Use one small payment, order, or booking attempt so the result is easy to read.' },
          { title: 'Update the app and permissions', detail: 'Location, notifications, and payment permissions can quietly block the flow.' },
          { title: 'Clear stale local state', detail: 'Remove stuck cart, draft, or cached checkout state if it keeps breaking the same way.' },
          { title: 'Escalate if the service is down', detail: 'If the error is clearly server-side, stop retrying and wait for the platform to recover.' },
        ]
      case 'gamePerformance':
        return [
          { title: 'Lower graphics and frame targets', detail: 'Start by reducing the biggest load instead of tweaking everything at once.' },
          { title: 'Close background apps and overlays', detail: 'Recording, browser tabs, and chat overlays often eat the headroom you need.' },
          { title: 'Check heat and storage state', detail: 'Thermal throttling and low free space can make smooth games feel unstable.' },
          { title: 'Update the game and system', detail: 'Performance fixes often arrive through the game client, GPU driver, or OS.' },
          { title: 'Test one real match', detail: 'Use a normal play session to see whether stutter or FPS drops are really reduced.' },
        ]
      case 'gameNetwork':
        return [
          { title: 'Test the base connection first', detail: 'If the internet itself is unstable, the game will never feel right.' },
          { title: 'Try a closer server or different network', detail: 'That quickly tells you whether the problem is routing or your current connection.' },
          { title: 'Pause background downloads and streams', detail: 'Heavy traffic in the same home can cause instant spikes and packet loss.' },
          { title: 'Restart the network path cleanly', detail: 'One clean router or hotspot restart beats constant in-match reconnecting.' },
          { title: 'Retest the same game mode', detail: 'Use the same mode and time of day if possible so the comparison is fair.' },
        ]
      case 'gameInstall':
        return [
          { title: 'Check free space and permissions', detail: 'Stores and launchers fail fast when storage is tight or access is blocked.' },
          { title: 'Pause and resume once', detail: 'A clean queue refresh can break a stuck download loop.' },
          { title: 'Update the store or launcher', detail: 'Old client versions cause more install issues than people expect.' },
          { title: 'Verify files or reinstall only if needed', detail: 'Use the least destructive repair option before deleting the whole game.' },
          { title: 'Restart and retry once', detail: 'One clean restart after updates often finishes a stubborn install.' },
        ]
      case 'gameDevice':
        return [
          { title: 'Check the device inside another game', detail: 'This tells you whether the issue is game-specific or device-wide.' },
          { title: 'Reconnect the accessory cleanly', detail: 'Pair or reconnect the controller, headset, or display without other apps open.' },
          { title: 'Disable conflicting overlays or inputs', detail: 'Extra controller tools, remappers, and audio layers can confuse games.' },
          { title: 'Update firmware and client settings', detail: 'Accessory firmware and in-game input settings should both be current.' },
          { title: 'Retest one short session', detail: 'Confirm the device stays stable before you jump back into a long game session.' },
        ]
      case 'gameStability':
        return [
          { title: 'Check updates and recent changes', detail: 'Crashes often begin right after a patch, driver update, or new overlay install.' },
          { title: 'Turn off extras for one test', detail: 'Disable overlays, mods, or reshade-style tools before deeper repair steps.' },
          { title: 'Verify game files or repair install', detail: 'Broken files are a common reason for launch crashes and black screens.' },
          { title: 'Watch heat and memory use', detail: 'If the device is overheating or out of memory, the game may simply not stay stable.' },
          { title: 'Retest after a clean restart', detail: 'Give the game one clean boot path so you know whether the fix held.' },
        ]
      case 'internetSlow':
        return [
          { title: 'Test speed in two places', detail: 'Check one result near the router and one where the slowdown hurts most.' },
          { title: 'Pause background traffic', detail: 'Streaming, backups, and game downloads can hide the real line speed.' },
          { title: 'Check router placement', detail: 'Move the router into a cleaner, more open position if signal is blocked.' },
          { title: 'Separate device load from line speed', detail: 'One weak device can feel slow even when the internet line itself is fine.' },
          { title: 'Retest after one clean restart', detail: 'If speeds stay bad everywhere, the issue may be upstream rather than in-room.' },
        ]
      case 'internetNoInternet':
        return [
          { title: 'See if all devices are affected', detail: 'That one check tells you whether the problem is local or network-wide.' },
          { title: 'Restart modem and router in order', detail: 'Use one proper restart instead of quick power cycling over and over.' },
          { title: 'Check service status or outage signs', detail: 'If the whole neighborhood or ISP is down, your device is not the real problem.' },
          { title: 'Reconnect the affected device cleanly', detail: 'Forget and rejoin the network or renew the connection once.' },
          { title: 'Escalate if the outage stays', detail: 'If nothing reconnects after a clean restart, the next step may be the provider.' },
        ]
      case 'internetSignal':
        return [
          { title: 'Move closer to the router', detail: 'Use distance as the first test before you blame the whole connection.' },
          { title: 'Reposition the router or extender', detail: 'A small placement change can improve one dead room a lot.' },
          { title: 'Check 2.4GHz versus 5GHz', detail: 'One band reaches farther while the other is faster nearby.' },
          { title: 'Look for obstacles and interference', detail: 'Walls, mirrors, appliances, and thick furniture can all weaken signal.' },
          { title: 'Retest room by room', detail: 'Confirm whether the weak spot is fixed instead of guessing from one random speed test.' },
        ]
      case 'internetRouter':
        return [
          { title: 'Check power, heat, and cables', detail: 'Loose power or router heat can create restart loops and unstable behavior.' },
          { title: 'Look at the status lights and logs', detail: 'Even basic indicator changes can tell you whether the router is failing or the line is.' },
          { title: 'Update firmware safely', detail: 'Use the latest stable version if your current build is known to be flaky.' },
          { title: 'Reduce reboot triggers', detail: 'Move the router into cooler airflow and remove overloaded power setups.' },
          { title: 'Reset only if backed up', detail: 'A factory reset is useful only after you know the configuration can be restored cleanly.' },
        ]
      case 'deviceAudio':
        return [
          { title: 'Check output routing first', detail: 'Make sure sound is going to the device you actually want to hear.' },
          { title: 'Test another app or file', detail: 'That tells you whether the problem is global or tied to one service.' },
          { title: 'Disconnect conflicting devices', detail: 'Bluetooth speakers, headsets, and docks can quietly steal the audio path.' },
          { title: 'Update driver or permissions', detail: 'Low volume and missing sound can come from driver or app access issues.' },
          { title: 'Reconnect and retest', detail: 'Give the device one clean reconnect after the routing path is fixed.' },
        ]
      case 'deviceVideo':
        return [
          { title: 'Check privacy and camera access', detail: 'One blocked permission can make the camera look dead.' },
          { title: 'Close any other app using the camera', detail: 'Only one app may be allowed to hold the feed at a time.' },
          { title: 'Test another app quickly', detail: 'This tells you whether the camera itself works outside the failing app.' },
          { title: 'Update the app and driver', detail: 'Video issues often improve after the main software stack is current.' },
          { title: 'Restart and retest', detail: 'A clean reboot after permission cleanup often restores the feed.' },
        ]
      case 'deviceBluetooth':
        return [
          { title: 'Forget and pair again', detail: 'Old Bluetooth sessions break more often than new clean pairings.' },
          { title: 'Charge both devices', detail: 'Low battery creates surprisingly weird Bluetooth behavior.' },
          { title: 'Remove nearby conflicts', detail: 'Too many remembered or active devices can confuse pairing and routing.' },
          { title: 'Update firmware and system', detail: 'Codec delay and disconnect bugs often improve after updates.' },
          { title: 'Retest at short range', detail: 'Use a simple close-range test before you blame the accessory.' },
        ]
      case 'deviceExternal':
        return [
          { title: 'Check the cable or port first', detail: 'Most external-device issues begin here, not in deep settings.' },
          { title: 'Try another port or machine', detail: 'A quick swap tells you whether the accessory itself is the problem.' },
          { title: 'Confirm the right connection mode', detail: 'File transfer, tethering, display, and charging modes can all behave differently.' },
          { title: 'Update the driver or client', detail: 'Older systems may need a driver refresh before the device shows up properly.' },
          { title: 'Reconnect after restart', detail: 'One clean restart helps the system see the device with a fresh state.' },
        ]
      case 'deviceLocation':
        return [
          { title: 'Turn on precise location', detail: 'Use the highest accuracy mode available for the first test.' },
          { title: 'Check app permissions', detail: 'Background or while-in-use rules can change how location works.' },
          { title: 'Test outside or near a window', detail: 'Indoor walls make GPS look worse than it really is.' },
          { title: 'Restart the maps or tracking app', detail: 'A clean reopen helps after permissions or accuracy changes.' },
          { title: 'Calibrate and retest', detail: 'Repeat one simple route or location check to confirm improvement.' },
        ]
      case 'deviceBiometrics':
        return [
          { title: 'Clean the sensor area', detail: 'Fingerprints, dust, and oily camera glass reduce biometric accuracy fast.' },
          { title: 'Check light and positioning', detail: 'Face and fingerprint systems both fail more often with bad angle or coverage.' },
          { title: 'Remove damaged saved profiles', detail: 'Old or partial scans can make unlock feel unreliable.' },
          { title: 'Update the system once', detail: 'Recent security or camera fixes may improve biometrics without deeper resets.' },
          { title: 'Re-enroll only if needed', detail: 'If the sensor is clean and updated but still fails, create a fresh biometric profile.' },
        ]
    }
  })()

  return steps.map((step, index) => ({
    step: index + 1,
    ...step,
  }))
}

const FIX_GUIDE_SEED_GROUPS: Record<FixClusterId, FixGuideSeed[]> = {
  mobile: [
    seed('phone-battery-drain', 'How to Fix Phone Battery Drain', 'mobileBattery', ['battery', 'phone', 'power'], { featured: true, platformLabel: 'Mobile' }),
    seed('slow-android-phone', 'How to Fix a Slow Android Phone', 'mobileSpeed', ['android', 'lag', 'performance'], { featured: true, platformLabel: 'Android' }),
    seed('phone-overheating', 'How to Fix Phone Overheating', 'mobileHeat', ['heat', 'phone', 'temperature']),
    seed('slow-phone-charging', 'How to Fix Slow Phone Charging', 'mobileCharge', ['charging', 'battery', 'power']),
    seed('phone-storage-full', 'How to Fix Phone Storage Full', 'mobileStorage', ['storage', 'phone', 'space']),
    seed('mobile-data-not-working', 'How to Fix Mobile Data Not Working', 'mobileConnectivity', ['mobile-data', 'network', 'signal']),
    seed('wifi-disconnecting-on-phone', 'How to Fix Wi-Fi Disconnecting on Phone', 'mobileConnectivity', ['wifi', 'phone', 'network']),
    seed('phone-apps-crashing', 'How to Fix Phone Apps Crashing', 'mobileApps', ['apps', 'crash', 'phone']),
    seed('phone-camera-not-working', 'How to Fix Phone Camera Not Working', 'mobileMedia', ['camera', 'phone', 'permissions']),
    seed('phone-microphone-not-working', 'How to Fix Phone Microphone Not Working', 'mobileMedia', ['microphone', 'phone', 'permissions']),
    seed('phone-bluetooth-not-connecting', 'How to Fix Bluetooth Not Connecting on Phone', 'mobileConnectivity', ['bluetooth', 'phone', 'pairing']),
    seed('phone-notifications-delayed', 'How to Fix Phone Notifications Arriving Late', 'mobileApps', ['notifications', 'phone', 'apps']),
    seed('play-store-not-downloading', 'How to Fix Google Play Store Not Downloading', 'mobileApps', ['play-store', 'downloads', 'android']),
    seed('phone-keyboard-lag', 'How to Fix Keyboard Lag on Phone', 'mobileSpeed', ['keyboard', 'phone', 'lag']),
    seed('touchscreen-delay-on-phone', 'How to Fix Touchscreen Delay on Phone', 'mobileTouch', ['touchscreen', 'phone', 'lag']),
    seed('phone-speaker-low-volume', 'How to Fix Phone Speaker Low Volume', 'mobileMedia', ['speaker', 'audio', 'phone']),
    seed('hotspot-not-working-on-phone', 'How to Fix Hotspot Not Working on Phone', 'mobileConnectivity', ['hotspot', 'phone', 'internet']),
    seed('battery-percentage-jumping', 'How to Fix Battery Percentage Jumping', 'mobileBattery', ['battery', 'phone', 'calibration']),
    seed('phone-hanging-during-calls', 'How to Fix Phone Hanging During Calls', 'mobileStability', ['calls', 'phone', 'freeze']),
    seed('phone-restarting-randomly', 'How to Fix Phone Restarting Randomly', 'mobileStability', ['restarts', 'phone', 'stability']),
    seed('auto-brightness-not-working', 'How to Fix Auto Brightness Not Working', 'mobileTouch', ['display', 'phone', 'brightness']),
    seed('phone-update-stuck', 'How to Fix Phone Update Stuck', 'mobileStability', ['update', 'phone', 'stability']),
    seed('phone-signal-dropping', 'How to Fix Phone Signal Dropping', 'mobileConnectivity', ['signal', 'phone', 'network']),
    seed('phone-screen-freezing', 'How to Fix Phone Screen Freezing', 'mobileStability', ['screen', 'freeze', 'phone']),
    seed('phone-backup-not-completing', 'How to Fix Phone Backup Not Completing', 'mobileStorage', ['backup', 'phone', 'storage']),
  ],
  pc: [
    seed('slow-laptop-startup', 'How to Fix Slow Laptop Startup', 'pcPerformance', ['laptop', 'startup', 'performance'], { featured: true, platformLabel: 'Laptop' }),
    seed('laptop-overheating', 'How to Fix Laptop Overheating', 'pcHeat', ['laptop', 'heat', 'fans']),
    seed('laptop-battery-draining-fast', 'How to Fix Laptop Battery Draining Fast', 'pcBattery', ['battery', 'laptop', 'power']),
    seed('browser-freezing-on-laptop', 'How to Fix Browser Freezing on Laptop', 'pcBrowser', ['browser', 'laptop', 'freeze']),
    seed('laptop-wifi-disconnecting', 'How to Fix Laptop Wi-Fi Disconnecting', 'pcConnectivity', ['wifi', 'laptop', 'network']),
    seed('bluetooth-not-working-on-laptop', 'How to Fix Bluetooth Not Working on Laptop', 'pcConnectivity', ['bluetooth', 'laptop', 'pairing']),
    seed('laptop-microphone-not-working', 'How to Fix Laptop Microphone Not Working', 'pcPeripheral', ['microphone', 'laptop', 'audio']),
    seed('no-sound-on-laptop', 'How to Fix No Sound on Laptop', 'pcPeripheral', ['sound', 'laptop', 'audio']),
    seed('laptop-camera-not-working', 'How to Fix Laptop Camera Not Working', 'pcPeripheral', ['camera', 'laptop', 'video']),
    seed('laptop-storage-full', 'How to Fix Laptop Storage Full', 'pcStorage', ['storage', 'laptop', 'space']),
    seed('high-ram-usage-on-laptop', 'How to Fix High RAM Usage on Laptop', 'pcPerformance', ['ram', 'laptop', 'performance']),
    seed('hundred-percent-disk-usage', 'How to Fix 100 Percent Disk Usage', 'pcPerformance', ['disk', 'windows', 'performance']),
    seed('windows-update-stuck', 'How to Fix Windows Update Stuck', 'pcStability', ['windows', 'update', 'stability']),
    seed('keyboard-delay-on-laptop', 'How to Fix Keyboard Delay on Laptop', 'pcPeripheral', ['keyboard', 'laptop', 'lag']),
    seed('trackpad-not-working', 'How to Fix Trackpad Not Working', 'pcPeripheral', ['trackpad', 'laptop', 'input']),
    seed('laptop-not-charging', 'How to Fix Laptop Not Charging', 'pcBattery', ['charging', 'laptop', 'battery']),
    seed('laptop-black-screen', 'How to Fix Laptop Black Screen', 'pcStability', ['black-screen', 'laptop', 'display']),
    seed('laptop-lag-while-multitasking', 'How to Fix Laptop Lag While Multitasking', 'pcPerformance', ['laptop', 'multitasking', 'lag']),
    seed('chrome-running-slow-on-laptop', 'How to Fix Chrome Running Slow on Laptop', 'pcBrowser', ['chrome', 'laptop', 'browser']),
    seed('usb-device-not-detected', 'How to Fix USB Device Not Detected', 'pcPeripheral', ['usb', 'laptop', 'device']),
    seed('hdmi-no-signal-on-laptop', 'How to Fix HDMI No Signal on Laptop', 'pcPeripheral', ['hdmi', 'laptop', 'display']),
    seed('fan-noise-on-laptop', 'How to Fix Fan Noise on Laptop', 'pcHeat', ['fan', 'laptop', 'heat']),
    seed('blue-screen-after-update', 'How to Fix Blue Screen After Update', 'pcStability', ['blue-screen', 'windows', 'update']),
    seed('laptop-bluetooth-audio-delay', 'How to Fix Laptop Bluetooth Audio Delay', 'pcConnectivity', ['bluetooth', 'audio', 'laptop']),
    seed('laptop-sleep-not-working', 'How to Fix Laptop Sleep Not Working', 'pcStability', ['sleep', 'laptop', 'power']),
  ],
  apps: [
    seed('instagram-crashing', 'How to Fix Instagram Crashing', 'appCrash', ['instagram', 'crash', 'social'], { featured: true, platformLabel: 'Apps' }),
    seed('whatsapp-not-sending-messages', 'How to Fix WhatsApp Not Sending Messages', 'appSync', ['whatsapp', 'messages', 'network']),
    seed('play-store-not-downloading-apps', 'How to Fix Play Store Not Downloading Apps', 'appCrash', ['play-store', 'downloads', 'android']),
    seed('capcut-export-stuck', 'How to Fix CapCut Export Stuck', 'appMedia', ['capcut', 'export', 'editing']),
    seed('youtube-buffering-in-app', 'How to Fix YouTube Buffering in the App', 'appMedia', ['youtube', 'buffering', 'streaming']),
    seed('telegram-notifications-not-showing', 'How to Fix Telegram Notifications Not Showing', 'appSync', ['telegram', 'notifications', 'sync']),
    seed('gmail-not-syncing', 'How to Fix Gmail Not Syncing', 'appSync', ['gmail', 'sync', 'email']),
    seed('google-maps-location-wrong', 'How to Fix Google Maps Location Wrong', 'appSync', ['maps', 'location', 'gps']),
    seed('spotify-keeps-pausing', 'How to Fix Spotify Keeps Pausing', 'appMedia', ['spotify', 'audio', 'playback']),
    seed('photos-backup-stuck', 'How to Fix Photos Backup Stuck', 'appSync', ['photos', 'backup', 'cloud']),
    seed('app-login-loop', 'How to Fix App Login Loop', 'appLogin', ['login', 'app', 'session']),
    seed('otp-not-receiving-in-apps', 'How to Fix OTP Not Receiving in Apps', 'appLogin', ['otp', 'verification', 'app']),
    seed('app-permission-denied', 'How to Fix App Permission Denied', 'appCrash', ['permissions', 'app', 'access']),
    seed('app-taking-too-much-storage', 'How to Fix App Taking Too Much Storage', 'appStorage', ['storage', 'app', 'cache']),
    seed('apps-not-updating', 'How to Fix Apps Not Updating', 'appCrash', ['apps', 'update', 'store']),
    seed('reels-not-loading', 'How to Fix Reels Not Loading', 'appMedia', ['reels', 'instagram', 'media']),
    seed('app-camera-black-screen', 'How to Fix App Camera Black Screen', 'appMedia', ['camera', 'app', 'video']),
    seed('in-app-file-upload-failing', 'How to Fix In-App File Upload Failing', 'appMedia', ['upload', 'app', 'files']),
    seed('app-keeps-stopping', 'How to Fix App Keeps Stopping', 'appCrash', ['app', 'crash', 'android']),
    seed('payment-app-not-working', 'How to Fix Payment App Not Working', 'appTransaction', ['payment', 'app', 'transaction']),
    seed('notes-app-not-syncing', 'How to Fix Notes App Not Syncing', 'appSync', ['notes', 'sync', 'productivity']),
    seed('shopping-app-checkout-error', 'How to Fix Shopping App Checkout Error', 'appTransaction', ['shopping', 'checkout', 'payment']),
    seed('food-delivery-app-location-issue', 'How to Fix Food Delivery App Location Issue', 'appTransaction', ['delivery', 'location', 'app']),
    seed('cloud-drive-upload-stuck', 'How to Fix Cloud Drive Upload Stuck', 'appSync', ['cloud', 'upload', 'storage']),
    seed('music-app-offline-download-failing', 'How to Fix Music App Offline Download Failing', 'appMedia', ['music', 'offline', 'download']),
  ],
  games: [
    seed('bgmi-lag', 'How to Fix BGMI Lag', 'gamePerformance', ['bgmi', 'lag', 'gaming']),
    seed('free-fire-lag', 'How to Fix Free Fire Lag', 'gamePerformance', ['free-fire', 'lag', 'gaming']),
    seed('roblox-crashing', 'How to Fix Roblox Crashing', 'gameStability', ['roblox', 'crash', 'gaming']),
    seed('minecraft-lag', 'How to Fix Minecraft Lag', 'gamePerformance', ['minecraft', 'lag', 'gaming']),
    seed('valorant-fps-drops', 'How to Fix Valorant FPS Drops', 'gamePerformance', ['valorant', 'fps', 'gaming'], { featured: true, platformLabel: 'PC Gaming' }),
    seed('game-update-stuck', 'How to Fix Game Update Stuck', 'gameInstall', ['game-update', 'downloads', 'gaming']),
    seed('game-audio-delay', 'How to Fix Game Audio Delay', 'gameDevice', ['game-audio', 'delay', 'gaming']),
    seed('phone-heating-while-gaming', 'How to Fix Phone Heating While Gaming', 'gamePerformance', ['heat', 'phone', 'gaming']),
    seed('game-login-failed', 'How to Fix Game Login Failed', 'gameNetwork', ['game-login', 'network', 'gaming']),
    seed('high-ping-in-games', 'How to Fix High Ping in Games', 'gameNetwork', ['ping', 'gaming', 'network']),
    seed('game-download-stuck', 'How to Fix Game Download Stuck', 'gameInstall', ['game-download', 'store', 'gaming']),
    seed('controller-not-working-in-games', 'How to Fix Controller Not Working in Games', 'gameDevice', ['controller', 'gaming', 'device']),
    seed('black-screen-when-opening-a-game', 'How to Fix Black Screen When Opening a Game', 'gameStability', ['black-screen', 'game', 'launch']),
    seed('touch-controls-lag-in-games', 'How to Fix Touch Controls Lag in Games', 'gameDevice', ['touch-controls', 'lag', 'gaming']),
    seed('emulator-lag-on-pc', 'How to Fix Emulator Lag on PC', 'gamePerformance', ['emulator', 'pc', 'lag']),
    seed('stuttering-after-a-game-update', 'How to Fix Stuttering After a Game Update', 'gameStability', ['stutter', 'update', 'gaming']),
    seed('low-fps-on-budget-pc', 'How to Fix Low FPS on Budget PC', 'gamePerformance', ['fps', 'budget-pc', 'gaming']),
    seed('voice-chat-not-working-in-games', 'How to Fix Voice Chat Not Working in Games', 'gameDevice', ['voice-chat', 'gaming', 'audio']),
    seed('steam-game-not-launching', 'How to Fix Steam Game Not Launching', 'gameStability', ['steam', 'launch', 'game']),
    seed('game-save-not-syncing', 'How to Fix Game Save Not Syncing', 'gameNetwork', ['game-save', 'sync', 'cloud']),
    seed('gpu-overheating-while-gaming', 'How to Fix GPU Overheating While Gaming', 'gamePerformance', ['gpu', 'heat', 'gaming']),
    seed('game-keeps-closing-on-startup', 'How to Fix Game Keeps Closing on Startup', 'gameStability', ['game', 'startup', 'crash']),
    seed('graphics-settings-resetting', 'How to Fix Graphics Settings Resetting', 'gameStability', ['graphics-settings', 'gaming', 'reset']),
    seed('game-screen-tearing', 'How to Fix Game Screen Tearing', 'gameDevice', ['screen-tearing', 'display', 'gaming']),
    seed('game-matchmaking-taking-too-long', 'How to Fix Game Matchmaking Taking Too Long', 'gameNetwork', ['matchmaking', 'gaming', 'network']),
  ],
  internet: [
    seed('slow-wifi-at-home', 'How to Fix Slow Wi-Fi at Home', 'internetSlow', ['wifi', 'internet', 'speed'], { featured: true, platformLabel: 'Wi-Fi' }),
    seed('wifi-connected-but-no-internet', 'How to Fix Wi-Fi Connected but No Internet', 'internetNoInternet', ['wifi', 'internet', 'router']),
    seed('weak-wifi-signal-in-one-room', 'How to Fix Weak Wi-Fi Signal in One Room', 'internetSignal', ['wifi', 'signal', 'home']),
    seed('router-restarting-often', 'How to Fix Router Restarting Often', 'internetRouter', ['router', 'restart', 'wifi']),
    seed('lag-during-video-calls', 'How to Fix Lag During Video Calls', 'internetSlow', ['video-calls', 'lag', 'internet']),
    seed('high-ping-while-gaming', 'How to Fix High Ping While Gaming', 'internetSlow', ['ping', 'gaming', 'internet']),
    seed('dns-problems-at-home', 'How to Fix DNS Problems at Home', 'internetNoInternet', ['dns', 'internet', 'router']),
    seed('five-ghz-wifi-not-showing', 'How to Fix 5GHz Wi-Fi Not Showing', 'internetSignal', ['5ghz', 'wifi', 'signal']),
    seed('hotspot-connected-but-no-internet', 'How to Fix Hotspot Connected but No Internet', 'internetNoInternet', ['hotspot', 'internet', 'network']),
    seed('mobile-data-slow-speeds', 'How to Fix Mobile Data Slow Speeds', 'internetSlow', ['mobile-data', 'internet', 'speed']),
    seed('ethernet-not-working', 'How to Fix Ethernet Not Working', 'internetNoInternet', ['ethernet', 'network', 'internet']),
    seed('internet-problem-is-isp-or-router', 'How to Tell if Your Internet Problem Is ISP or Router', 'internetRouter', ['isp', 'router', 'internet']),
    seed('websites-not-opening-on-wifi', 'How to Fix Websites Not Opening on Wi-Fi', 'internetNoInternet', ['websites', 'wifi', 'browser']),
    seed('zoom-connection-unstable', 'How to Fix Zoom Connection Unstable', 'internetSlow', ['zoom', 'internet', 'video-calls']),
    seed('smart-tv-wifi-disconnecting', 'How to Fix Smart TV Wi-Fi Disconnecting', 'internetSignal', ['smart-tv', 'wifi', 'signal']),
    seed('wifi-after-a-power-cut', 'How to Fix Wi-Fi After a Power Cut', 'internetNoInternet', ['wifi', 'power-cut', 'router']),
    seed('wifi-password-rejected', 'How to Fix Wi-Fi Password Rejected', 'internetNoInternet', ['wifi', 'password', 'router']),
    seed('limited-connection-on-laptop', 'How to Fix Limited Connection on Laptop', 'internetNoInternet', ['limited-connection', 'laptop', 'wifi']),
    seed('router-overheating', 'How to Fix Router Overheating', 'internetRouter', ['router', 'heat', 'wifi']),
    seed('range-extender-not-improving-signal', 'How to Fix Range Extender Not Improving Signal', 'internetSignal', ['extender', 'wifi', 'signal']),
    seed('slow-wifi-when-many-devices-connect', 'How to Fix Slow Wi-Fi When Many Devices Connect', 'internetSlow', ['wifi', 'devices', 'speed']),
    seed('slow-upload-speeds', 'How to Fix Slow Upload Speeds', 'internetSlow', ['upload', 'internet', 'speed']),
    seed('public-wifi-login-page-not-opening', 'How to Fix Public Wi-Fi Login Page Not Opening', 'internetNoInternet', ['public-wifi', 'login', 'internet']),
    seed('packet-loss-on-home-internet', 'How to Fix Packet Loss on Home Internet', 'internetSlow', ['packet-loss', 'internet', 'gaming']),
    seed('buffering-on-streaming-apps', 'How to Fix Buffering on Streaming Apps', 'internetSlow', ['buffering', 'streaming', 'internet']),
  ],
  device: [
    seed('microphone-not-working', 'How to Fix Microphone Not Working', 'deviceAudio', ['microphone', 'audio', 'device']),
    seed('camera-access-blocked', 'How to Fix Camera Access Blocked', 'deviceVideo', ['camera', 'permissions', 'device']),
    seed('bluetooth-disconnecting', 'How to Fix Bluetooth Disconnecting', 'deviceBluetooth', ['bluetooth', 'disconnect', 'device']),
    seed('speaker-volume-too-low', 'How to Fix Speaker Volume Too Low', 'deviceAudio', ['speaker', 'audio', 'device']),
    seed('earbuds-only-one-side-working', 'How to Fix Earbuds Only One Side Working', 'deviceAudio', ['earbuds', 'audio', 'device']),
    seed('webcam-looking-too-dark', 'How to Fix Webcam Looking Too Dark', 'deviceVideo', ['webcam', 'video', 'camera']),
    seed('fingerprint-sensor-not-working', 'How to Fix Fingerprint Sensor Not Working', 'deviceBiometrics', ['fingerprint', 'security', 'device']),
    seed('face-unlock-not-working', 'How to Fix Face Unlock Not Working', 'deviceBiometrics', ['face-unlock', 'security', 'device']),
    seed('external-microphone-not-detected', 'How to Fix External Microphone Not Detected', 'deviceAudio', ['microphone', 'external', 'audio']),
    seed('screen-recording-without-audio', 'How to Fix Screen Recording Without Audio', 'deviceAudio', ['screen-recording', 'audio', 'device']),
    seed('printer-not-detected', 'How to Fix Printer Not Detected', 'deviceExternal', ['printer', 'external', 'device']),
    seed('usb-headset-not-working', 'How to Fix USB Headset Not Working', 'deviceAudio', ['usb-headset', 'audio', 'device']),
    seed('airpods-microphone-issues', 'How to Fix AirPods Microphone Issues', 'deviceBluetooth', ['airpods', 'microphone', 'bluetooth']),
    seed('bluetooth-pairing-failed', 'How to Fix Bluetooth Pairing Failed', 'deviceBluetooth', ['bluetooth', 'pairing', 'device']),
    seed('location-not-detected', 'How to Fix Location Not Detected', 'deviceLocation', ['location', 'gps', 'device']),
    seed('gps-signal-weak', 'How to Fix GPS Signal Weak', 'deviceLocation', ['gps', 'location', 'signal']),
    seed('nfc-not-working', 'How to Fix NFC Not Working', 'deviceExternal', ['nfc', 'tap', 'device']),
    seed('usb-file-transfer-not-showing', 'How to Fix USB File Transfer Not Showing', 'deviceExternal', ['usb', 'file-transfer', 'device']),
    seed('sd-card-not-detected', 'How to Fix SD Card Not Detected', 'deviceExternal', ['sd-card', 'storage', 'device']),
    seed('wireless-mouse-lag', 'How to Fix Wireless Mouse Lag', 'deviceExternal', ['mouse', 'wireless', 'device']),
    seed('external-keyboard-not-working', 'How to Fix External Keyboard Not Working', 'deviceExternal', ['keyboard', 'external', 'device']),
    seed('touchpad-gestures-not-working', 'How to Fix Touchpad Gestures Not Working', 'deviceExternal', ['touchpad', 'gestures', 'device']),
    seed('second-monitor-not-detected', 'How to Fix Second Monitor Not Detected', 'deviceVideo', ['monitor', 'display', 'device']),
    seed('hdmi-sound-not-working', 'How to Fix HDMI Sound Not Working', 'deviceAudio', ['hdmi', 'sound', 'device']),
    seed('usb-tethering-not-working', 'How to Fix USB Tethering Not Working', 'deviceExternal', ['usb-tethering', 'internet', 'device']),
  ],
}

const FIX_GUIDE_SEED_TOTAL = Object.values(FIX_GUIDE_SEED_GROUPS).reduce(
  (total, seeds) => total + seeds.length,
  0
)

if (FIX_GUIDE_SEED_TOTAL !== 150) {
  throw new Error(`Expected 150 fix guide seeds, received ${FIX_GUIDE_SEED_TOTAL}`)
}

function buildFixGuide(clusterId: FixClusterId, seedEntry: FixGuideSeed): FixGuide {
  const clusterMeta = FIX_CLUSTER_META[clusterId]
  const issueType = stripGuidePrefix(seedEntry.title)
  const summary = seedEntry.summary || getPlanSummary(seedEntry.stepPlan, issueType)
  const quickAnswer = seedEntry.quickAnswer || getQuickAnswer(seedEntry.stepPlan)
  const symptoms = seedEntry.symptoms || getSymptoms(seedEntry.stepPlan, issueType)

  return {
    id: `fix-${seedEntry.slug}`,
    slug: seedEntry.slug,
    title: seedEntry.title,
    seoTitle: `${seedEntry.title} - Easy Step-by-Step Guide`,
    metaDescription: `Easy steps to fix ${lowerFirst(issueType)} with common checks, likely causes, and a clear next move.`,
    summary,
    description: `Simple troubleshooting for ${lowerFirst(issueType)} in ${lowerFirst(clusterMeta.title)}.`,
    quickAnswer,
    cluster: clusterId,
    clusterTitle: clusterMeta.title,
    platformLabel: seedEntry.platformLabel || clusterMeta.title,
    issueType,
    updatedAt: FIXES_UPDATED_AT,
    symptoms,
    steps: buildSteps(seedEntry.stepPlan),
    whenToGetHelp: getHelpSignals(seedEntry.stepPlan),
    tags: Array.from(new Set([clusterId, ...seedEntry.tags])),
    imageAlt: `${issueType} troubleshooting guide`,
    featured: Boolean(seedEntry.featured),
    relatedSlugs: [],
  }
}

function buildRelatedSlugs(guides: FixGuide[], guide: FixGuide) {
  return guides
    .filter(candidate => candidate.slug !== guide.slug)
    .map(candidate => {
      const sharedTags = candidate.tags.filter(tag => guide.tags.includes(tag)).length
      const sameCluster = candidate.cluster === guide.cluster ? 3 : 0
      const featuredScore = candidate.featured ? 1 : 0

      return {
        slug: candidate.slug,
        score: sharedTags + sameCluster + featuredScore,
        title: candidate.title,
      }
    })
    .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title))
    .slice(0, 4)
    .map(candidate => candidate.slug)
}

const baseFixGuides = (Object.entries(FIX_GUIDE_SEED_GROUPS) as Array<[FixClusterId, FixGuideSeed[]]>)
  .flatMap(([clusterId, guides]) => guides.map(guide => buildFixGuide(clusterId, guide)))

export const FIX_GUIDES: FixGuide[] = baseFixGuides.map(guide => ({
  ...guide,
  relatedSlugs: buildRelatedSlugs(baseFixGuides, guide),
}))

export const FEATURED_FIX_GUIDES = FIX_GUIDES.filter(guide => guide.featured)

export const FIXES_CLUSTERS: FixesCluster[] = (Object.entries(FIX_CLUSTER_META) as Array<
  [FixClusterId, (typeof FIX_CLUSTER_META)[FixClusterId]]
>).map(([id, meta]) => ({
  id,
  title: meta.title,
  description: meta.description,
  href: `/fixes?cluster=${id}`,
  problemCount: `${FIX_GUIDE_SEED_GROUPS[id].length} guides`,
  examples: meta.examples,
}))

export const STARTER_FIX_GUIDES: StarterFixGuide[] = FEATURED_FIX_GUIDES.slice(0, 4).map(guide => ({
  title: guide.title,
  href: `/fixes/${guide.slug}`,
  platform: guide.platformLabel,
  summary: guide.summary,
}))

export const FIXES_SIGNAL_BLOCKS = [
  {
    title: 'People search like this',
    items: ['How to fix ...', '... not working', 'Why is my ...', 'What to do if ...'],
  },
  {
    title: 'What exists now',
    items: ['150 starter pages', '6 problem clusters', '5 easy steps per page'],
  },
  {
    title: 'Built for expansion',
    items: ['Apps and games', 'Phones and PCs', 'Wi-Fi and device access'],
  },
] as const

export const FIXES_SCALE_PLAN = {
  starterGuides: FIX_GUIDES.length,
  nextTarget: 500,
  longTailTarget: 2000,
}

export function getFixGuideBySlug(slug: string) {
  return FIX_GUIDES.find(guide => guide.slug === slug) || null
}

export function getRelatedFixGuides(slug: string, limit = 4) {
  const guide = getFixGuideBySlug(slug)
  if (!guide) return []

  return guide.relatedSlugs
    .map(relatedSlug => getFixGuideBySlug(relatedSlug))
    .filter((related): related is FixGuide => Boolean(related))
    .slice(0, limit)
}
