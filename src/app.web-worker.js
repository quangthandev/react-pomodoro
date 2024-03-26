const timeWorker = new Worker(new URL('./time-worker.js', import.meta.url), {
	type: 'module'
});

/**
 * Starts the time worker with the given interval in seconds and a tick callback function
 *
 * @param {number} interval
 * @param {Function} tick
 *
 * @returns {Function} function to remove the message event listener
 */
function startTimer(interval, tick) {
	timeWorker.postMessage(`start-timer_${interval}`);

	timeWorker.addEventListener('message', tick);

	return () => {
		timeWorker.removeEventListener('message', tick);
	};
}

/**
 * Stops the time worker
 */
function stopTimer() {
	timeWorker.postMessage('stop-timer');
}

/**
 * Changes the time worker interval
 *
 * @param {number} interval
 */
function changeTimer(interval) {
	timeWorker.postMessage(`change-timer_${interval}`);
}

export default timeWorker;
export { startTimer, stopTimer, changeTimer };
