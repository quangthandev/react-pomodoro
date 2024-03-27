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

const usePomodoro = () => {
	const [state, dispatch] = React.useReducer(reducer, initialState);
	const { count, mode, intervals, status, mute } = state;

	const [playAlarm, { stop: stopAlarm }] = useSound(alarmClock, {
		volume: 0.25,
		soundEnabled: !mute
	});

	const interval = intervals[mode];

	const cleanup = React.useRef(() => {});

	const handleSwitchMode = React.useCallback((mode) => {
		stopTimer();
		cleanup.current();
		dispatch({ type: CHANGE_MODE, payload: mode });
	}, []);

	const tick = React.useCallback((e) => {
		dispatch({ type: TICK, payload: e.data });
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

					cleanup.current = startTimer(interval * 60 - count, tick);

					dispatch({ type: control });
					break;
				}
				case PAUSE_TIMER: {
					stopTimer();
					cleanup.current();
					dispatch({ type: control });
					break;
				}
				default:
			}
		},
		[count, interval, tick]
	);

	const handleTimerCompleted = React.useCallback(() => {
		dispatch({ type: TIMER_COMPLETED });
		playAlarm();
	}, [playAlarm]);

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
