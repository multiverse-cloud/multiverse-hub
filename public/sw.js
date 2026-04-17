self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', event => {
  event.waitUntil(
    self.registration.unregister().then(async () => {
      const clients = await self.clients.matchAll({ type: 'window' })

      for (const client of clients) {
        client.navigate(client.url)
      }
    })
  )
})
