import React, { useReducer } from 'react';
import useSound from 'use-sound';
import styled, { useTheme } from 'styled-components';

import Header from './components/Header/Header';
import StatusBar from './components/StatusBar/StatusBar';
import ProgressDisplay from './components/ProgressDisplay/ProgressDisplay';
import SettingsModal from './components/SettingsModal/SettingsModal';
import MaxWidthWrapper from './components/MaxWidthWrapper/MaxWidthWrapper';

import { getInitialSetting, persistSetting } from "./helpers";

import alarmClock from './sounds/alarm-clock.mp3';

const initialState = {
  mode: "pomodoro",
  status: "stop",
  mute: Boolean(Number(getInitialSetting("mute"))) || false,
  autoStartBreaks: Boolean(Number(getInitialSetting("auto-start-breaks"))) || false,
  autoStartPomodoros: Boolean(Number(getInitialSetting("auto-start-pomodoros"))) || false,
  pomodorosCount: 0,
  longBreakCycle: Number(getInitialSetting("long-break-cycle")) || 4,
  intervals: {
    pomodoro: Number(getInitialSetting("pomodoro-interval")) || 25,
    shortBreak: Number(getInitialSetting("short-break-interval")) || 5,
    longBreak: Number(getInitialSetting("long-break-interval")) || 15,
  },
  colorTheme: getInitialSetting("color-theme") || "1",
  fontSize: getInitialSetting("font-size") || "medium",
  showSettings: false
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "START":
      return {
        ...state,
        status: "running"
      };
    case "STOP":
      return {
        ...state,
        status: "stop"
      };
    case "TOGGLE_SOUND":
      persistSetting("mute", !state.mute ? "1" : "0");

      return {
        ...state,
        mute: !state.mute
      };
    case "TIMER_COMPLETED":
      if (state.mode === "pomodoro") {
        const pomodorosCount = state.pomodorosCount + 1;

        return {
          ...state,
          mode: pomodorosCount === state.longBreakCycle ? "longBreak" : "shortBreak",
          status: state.autoStartBreaks ? state.status : "stop",
          pomodorosCount: pomodorosCount === state.longBreakCycle ? 0 : pomodorosCount
        };
      } else {
        return {
          ...state,
          mode: "pomodoro",
          status: state.autoStartPomodoros ? state.status : "stop"
        };
      }
    case "CHANGE_MODE":
      return {
        ...state,
        mode: payload,
        status: "stop"
      };
    case "OPEN_SETTINGS":
      return {
        ...state,
        showSettings: true
      };
    case "CLOSE_SETTINGS":
      return {
        ...state,
        showSettings: false
      };
    case "SAVE_SETTINGS":
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
      }
    default:
      return {
        ...state
      };
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    mode,
    mute,
    status,
    autoStartBreaks,
    autoStartPomodoros,
    longBreakCycle,
    intervals,
    colorTheme,
    fontSize,
    showSettings
  } = state;

  const interval = intervals[mode];

  const theme = useTheme();

  const [playAlarm, { stop: stopSound }] = useSound(alarmClock, {
    volume: 0.25,
    soundEnabled: !mute
  });

  const handleTimerComplete = () => {
    dispatch({ type: "TIMER_COMPLETED" });
    playAlarm();
  };

  const handleOpenSettings = () => {
    dispatch({ type: "OPEN_SETTINGS" });
  };

  const handleChangeMode = (m) => {
    if (status === "running") {
      const feedback = window.confirm("The timer is running, are you sure you want to switch mode?");

      if (!feedback) {
        return;
      }
    }

    dispatch({ type: "CHANGE_MODE", payload: m });
  };

  const handleControl = (control) => {
    dispatch({ type: control });
  };

  const handleSubmitSettings = (payload) => {
    dispatch({ type: "SAVE_SETTINGS", payload });
  };

  const handleToggleSound = () => {
    dispatch({ type: "TOGGLE_SOUND" });

    if (!mute) {
      stopSound();
    }
  };

  return (
    <Container style={{
      '--color-theme': `${theme.colors[colorTheme]}`,
      '--font-size': `${theme.fontSizes[fontSize]}`
    }}>
      <Header
        showSettings={handleOpenSettings}
        mute={mute}
        onToggleSound={handleToggleSound}
      />
      <Main>
        <StatusBar
          mode={mode}
          onChangeMode={handleChangeMode}
        />
        <ProgressDisplay
          interval={interval}
          mode={mode}
          mute={mute}
          status={status}
          onTimerCompleted={handleTimerComplete}
          onControl={handleControl}
        />
      </Main>
      <SettingsModal 
          isOpen={showSettings}
          intervals={intervals}
          autoStartBreaks={autoStartBreaks}
          autoStartPomodoros={autoStartPomodoros}
          longBreakCycle={longBreakCycle}
          colorTheme={colorTheme}
          fontSize={fontSize}
          onDismiss={() => dispatch({ type: "CLOSE_SETTINGS" })}
          onSubmit={handleSubmitSettings}
      />
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  padding: 32px 0;
  font-size: var(--font-size);
  background-color: var(--color-bg-300);
  overflow: auto;
`;

const Main = styled(MaxWidthWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin-top: 32px;
  isolation: isolate;
`;

export default App;
