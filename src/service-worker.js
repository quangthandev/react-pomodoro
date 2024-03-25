self.addEventListener('message', (e) => {
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
});
