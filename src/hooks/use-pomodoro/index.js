import React from 'react';
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
import { persistSetting } from '../../helpers';
import useSound from 'use-sound';
import alarmClock from '../../sounds/alarm-clock.mp3';
import { startTimer, stopTimer } from '../../app.web-worker';
import { initialState, reducer } from './reducer';
import { showNotification } from '../../notification';

const usePomodoro = () => {
	const [state, dispatch] = React.useReducer(reducer, initialState);
	const { count, mode, intervals, status, mute } = state;

	const [playAlarm, { stop: stopAlarm }] = useSound(alarmClock, {
		volume: 0.25,
		soundEnabled: !mute
	});

	const interval = intervals[mode];

	const handleSwitchMode = React.useCallback((mode) => {
		stopTimer();
		dispatch({ type: CHANGE_MODE, payload: mode });
	}, []);

	const handleControl = React.useCallback(
		(control) => {
			switch (control) {
				case START_TIMER: {
					// Check Notification API permission
					if (Notification.permission === 'denied') return;

					// Request permission for Notification API
					if (Notification.permission !== 'granted') {
						Notification.requestPermission();
					}

					startTimer(interval * 60 - count, (e) => {
						dispatch({ type: TICK, payload: e.data });
					});

					dispatch({ type: control });
					break;
				}
				case PAUSE_TIMER: {
					stopTimer();
					dispatch({ type: control });
					break;
				}
				default:
			}
		},
		[count, interval]
	);

	const handleTimerCompleted = React.useCallback(() => {
		if (Notification.permission === 'granted') {
			showNotification(mode === 'pomodoro' ? 'Break time!' : 'Pomodoro time!', {
				body: mode === 'pomodoro' ? 'Time to take a break' : 'Time to start working'
			});
		}

		dispatch({ type: TIMER_COMPLETED });
		playAlarm();
	}, [mode, playAlarm]);

	const handleToggleOpenSettings = React.useCallback((open) => {
		if (open) {
			dispatch({ type: OPEN_SETTINGS });
		} else {
			dispatch({ type: CLOSE_SETTINGS });
		}
	}, []);

	const handleSubmitSettings = React.useCallback((settings) => {
		dispatch({ type: SAVE_SETTINGS, payload: settings });
	}, []);

	const handleToggleSound = React.useCallback(() => {
		dispatch({ type: TOGGLE_SOUND });

		persistSetting('mute', Number(!mute));

		if (mute) {
			stopAlarm();
		}
	}, [mute, stopAlarm]);

	React.useEffect(() => {
		if (status === 'running' && count >= interval * 60) {
			handleTimerCompleted();
		}
	}, [status, count, interval, handleTimerCompleted]);

	return {
		state,
		handleControl,
		handleSwitchMode,
		handleTimerCompleted,
		handleToggleOpenSettings,
		handleSubmitSettings,
		handleToggleSound
	};
};

export default usePomodoro;
