const cacheName = 'lotusFrameWork';

self.addEventListener('install', event => {

    event.waitUntil(
        (async () => {

            const cache = await caches.open(cacheName);

            const files = [
                '/',
                '/APP/manifest.webmanifest',
                '/APP/src/core/PWA/main/PWA.js'
            ];

            console.log(files)
            for (const file of files) {

                try {

                    console.log("Adicionando:", file);

                    await cache.add(file);

                } catch (e) {

                    console.error("Erro em:", file, e);

                }

            }

        })()
    );

    self.skipWaiting();

});

self.addEventListener('activate', event => {

    event.waitUntil(
        self.clients.claim()
    );

});

self.addEventListener('fetch', event => {

    const req = event.request;
    const url = new URL(req.url);

    if (url.origin === location.origin) {

        event.respondWith(cacheFirst(req));

    } else {

        event.respondWith(networkAndCache(req));

    }

});

async function cacheFirst(req) {

    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);

    return cached || fetch(req);

}

async function networkAndCache(req) {

    const cache = await caches.open(cacheName);

    try {

        const refresh = await fetch(req);

        await cache.put(req, refresh.clone());

        return refresh;

    } catch (e) {

        const cached = await cache.match(req);

        return cached;

    }

}