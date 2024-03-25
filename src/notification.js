/**
 * Show a notification by sending a message to the service worker.
 *
 * @param {string} title
 * @param {NotificationOptions} options
 */
export async function showNotification(title, options) {
	// Get a reference to the service worker registration.
	const registration = await navigator.serviceWorker.getRegistration();

	if (registration) {
		if (navigator.serviceWorker.controller) {
			navigator.serviceWorker.controller.postMessage({
				title,
				icon: '/apple-touch-icon.png',
				vibrate: [200, 100, 200, 100, 200, 100, 200],
				tag: 'pomodoro-notification',
				...options
			});
		}
	}
}
