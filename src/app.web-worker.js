const timeWorker = new Worker(new URL('./time-worker.js', import.meta.url), {
	type: 'module'
});

let savedTick = null;

/**
 * Starts the time worker with the given interval in seconds
 *
 * @param {number} interval
 * @param {Function} tick
 */
function startTimer(interval, tick) {
	timeWorker.postMessage(`start-timer_${interval}`);

	savedTick = tick;
	timeWorker.addEventListener('message', tick);
}

/**
 * Stops the time worker
 */
function stopTimer() {
	timeWorker.postMessage('stop-timer');
	timeWorker.removeEventListener('message', savedTick);
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
