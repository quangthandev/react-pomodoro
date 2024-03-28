import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('message', onMessage);
self.addEventListener('fetch', onFetch);

function onMessage(e) {
	const data = e.data;
	const { title, body, icon } = data;

	const options = {
		body,
		icon,
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1
		}
	};
	e.waitUntil(self.registration.showNotification(title, options));
}

function onFetch(e) {
	// Check if request is GET and same origin
	if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) {
		return;
	}

	e.respondWith(respond());

	async function respond() {
		const cache = await caches.open('assets');
		const cachedResponse = await cache.match(e.request);

		// Use network first strategy
		try {
			const response = await fetch(e.request);
			await cache.put(e.request, response.clone());

			return response;
		} catch (error) {
			return cachedResponse;
		}
	}
}
