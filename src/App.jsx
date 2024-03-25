import styled, { useTheme } from 'styled-components';
import Header from './components/Header/Header';
import StatusBar from './components/StatusBar/StatusBar';
import ProgressDisplay from './components/ProgressDisplay/ProgressDisplay';
import SettingsModal from './components/SettingsModal/SettingsModal';
import MaxWidthWrapper from './components/MaxWidthWrapper/MaxWidthWrapper';
import usePomodoro from './hooks/use-pomodoro';

function App() {
	const {
		state,
		handleControl,
		handleSwitchMode,
		handleTimerCompleted,
		handleToggleOpenSettings,
		handleSubmitSettings,
		handleToggleSound
	} = usePomodoro();

	const {
		count,
		mode,
		status,
		intervals,
		autoStartBreaks,
		autoStartPomodoros,
		longBreakCycle,
		colorTheme,
		fontSize,
		mute,
		showSettings
	} = state;

	const interval = intervals[mode];

	const theme = useTheme();

	return (
		<Container
			style={{
				'--color-theme': `${theme.colors[colorTheme]}`,
				'--font-size': `${theme.fontSizes[fontSize]}`
			}}
		>
			<Header mute={mute} onToggleSound={handleToggleSound}>
				<SettingsModal
					open={showSettings}
					setOpen={handleToggleOpenSettings}
					intervals={intervals}
					autoStartBreaks={autoStartBreaks}
					autoStartPomodoros={autoStartPomodoros}
					longBreakCycle={longBreakCycle}
					colorTheme={colorTheme}
					fontSize={fontSize}
					onDismiss={() => handleToggleOpenSettings(false)}
					onSubmit={handleSubmitSettings}
				/>
			</Header>
			<Main>
				<StatusBar mode={mode} onChangeMode={handleSwitchMode} />
				<ProgressDisplay
					count={count}
					interval={interval}
					mode={mode}
					mute={mute}
					status={status}
					onTimerCompleted={handleTimerCompleted}
					onControl={handleControl}
				/>
			</Main>
		</Container>
	);
}

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
