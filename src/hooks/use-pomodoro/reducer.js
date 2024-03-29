import { getInitialSetting, persistSetting } from '../../helpers';
import {
	CHANGE_MODE,
	CLOSE_SETTINGS,
	OPEN_SETTINGS,
	PAUSE_TIMER,
	SAVE_SETTINGS,
	START_TIMER,
	TICK,
	TIMER_COMPLETED,
	TOGGLE_SOUND
} from '../../constants';
import { changeTimer } from '../../app.web-worker';
import { showNotification } from '../../notification';

const initialState = {
	mode: 'pomodoro', // pomodoro, shortBreak, longBreak
	status: 'idle', // idle, running, paused
	count: 0,
	mute: Boolean(Number(getInitialSetting('mute'))) || false,
	autoStartBreaks: Boolean(Number(getInitialSetting('auto-start-breaks'))) || false,
	autoStartPomodoros: Boolean(Number(getInitialSetting('auto-start-pomodoros'))) || false,
	pomodorosCount: 0,
	longBreakCycle: Number(getInitialSetting('long-break-cycle')) || 4,
	intervals: {
		pomodoro: Number(getInitialSetting('pomodoro-interval')) || 25,
		shortBreak: Number(getInitialSetting('short-break-interval')) || 5,
		longBreak: Number(getInitialSetting('long-break-interval')) || 15
	},
	colorTheme: getInitialSetting('color-theme') || '1',
	fontSize: getInitialSetting('font-size') || 'medium',
	showSettings: false
};

const reducer = (state, action) => {
	const {
		mode,
		status,
		autoStartBreaks,
		autoStartPomodoros,
		longBreakCycle,
		mute,
		pomodorosCount,
		intervals
	} = state;
	const { type, payload } = action;

	switch (type) {
		case TICK:
			return {
				...state,
				count: state.status === 'running' ? state.count + 1 : state.count
			};
		case START_TIMER: {
			return {
				...state,
				status: 'running'
			};
		}
		case PAUSE_TIMER:
			return {
				...state,
				status: 'paused'
			};
		case TIMER_COMPLETED: {
			if (mode === 'pomodoro') {
				let newPomodorosCount = pomodorosCount + 1;

				let newMode;
				if (newPomodorosCount >= longBreakCycle) {
					newMode = 'longBreak';
					newPomodorosCount = 0;
				} else {
					newMode = 'shortBreak';
				}
				const newInterval = intervals[newMode];

				// show notification
				let title, body;
				if (newMode === 'shortBreak') {
					title = 'Short Break Time!';
					body = `Take a short break for ${newInterval}min.`;
				} else {
					title = 'Long Break Time!';
					body = `Take a long break for ${newInterval}min.`;
				}
				if (Notification.permission === 'granted') {
					showNotification(title, { body });
				}

				changeTimer(newInterval * 60);

				return {
					...state,
					count: 0,
					mode: newMode,
					status: autoStartBreaks ? status : 'stop',
					pomodorosCount: newPomodorosCount
				};
			} else {
				changeTimer(intervals.pomodoro * 60);

				// show notification
				if (Notification.permission === 'granted') {
					showNotification('Focus Time!', {
						body: `Time to focus for ${intervals.pomodoro}min.`
					});
				}

				return {
					...state,
					count: 0,
					mode: 'pomodoro',
					status: autoStartPomodoros ? status : 'stop'
				};
			}
		}
		case TOGGLE_SOUND:
			return {
				...state,
				mute: !mute
			};
		case CHANGE_MODE: {
			return {
				...state,
				count: 0,
				mode: payload,
				status: 'idle'
			};
		}
		case OPEN_SETTINGS:
			return {
				...state,
				showSettings: true
			};
		case CLOSE_SETTINGS:
			return {
				...state,
				showSettings: false
			};
		case SAVE_SETTINGS:
			//Persist settings in local storage
			persistSetting('pomodoro-interval', payload.pomodoroInterval);
			persistSetting('short-break-interval', payload.shortBreakInterval);
			persistSetting('long-break-interval', payload.longBreakInterval);
			persistSetting('long-break-cycle', payload.longBreakCycle);
			persistSetting('auto-start-breaks', payload.autoStartBreaks ? '1' : '0');
			persistSetting('auto-start-pomodoros', payload.autoStartPomodoros ? '1' : '0');
			persistSetting('color-theme', payload.colorTheme);
			persistSetting('font-size', payload.fontSize);

			return {
				...state,
				autoStartBreaks: payload.autoStartBreaks,
				autoStartPomodoros: payload.autoStartPomodoros,
				longBreakCycle: payload.longBreakCycle,
				intervals: {
					pomodoro: payload.pomodoroInterval,
					shortBreak: payload.shortBreakInterval,
					longBreak: payload.longBreakInterval
				},
				colorTheme: payload.colorTheme,
				fontSize: payload.fontSize
			};
		default:
			return {
				...state
			};
	}
};

export { initialState, reducer };
