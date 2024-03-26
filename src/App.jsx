import React from 'react';
import styled, { useTheme } from 'styled-components';
import Header from './components/Header/Header';
import StatusBar from './components/StatusBar/StatusBar';
import ProgressDisplay from './components/ProgressDisplay/ProgressDisplay';
import SettingsModal from './components/SettingsModal/SettingsModal';
import MaxWidthWrapper from './components/MaxWidthWrapper/MaxWidthWrapper';
import usePomodoro from './hooks/use-pomodoro';
import UnstyledButton from './components/UnstyledButton/UnstyledButton';

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

	const [bipEvent, setBipEvent] = React.useState(null);

	React.useEffect(() => {
		const handleBeforeInstallPrompt = (event) => {
			event.preventDefault();

			setBipEvent(event);
		};

		const handleAppInstalled = () => {
			setBipEvent(null);
		};

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
		window.addEventListener('appinstalled', handleAppInstalled);

		return () => {
			window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
			window.removeEventListener('appinstalled', handleAppInstalled);
		};
	}, []);

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
			<Footer>
				{bipEvent && (
					<InstallButton
						aria-label="install"
						onClick={() => {
							if (bipEvent) {
								bipEvent.prompt();
							} else {
								alert(
									"To install the app look for Add to Homescreen or Install in your browser's menu"
								);
							}
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							width={24}
							height={24}
						>
							<path d="M17 14L22 9L20.6 7.6L18 10.2V3H16V10.2L13.4 7.6L12 9L17 14M23 14V16C23 17.1 22.1 18 21 18H14V20H16V22H8V20H10V18H3C1.9 18 1 17.1 1 16V4C1 2.9 1.9 2 3 2H12V4H3V16H21V14H23Z" />
						</svg>
						<span>Install</span>
					</InstallButton>
				)}
			</Footer>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 32px;
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

const Footer = styled.footer`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 8px;
	padding: 16px;
	color: var(--color-white);
	font-size: 0.75em;
`;

const InstallButton = styled(UnstyledButton)`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 8px 16px;
	border-radius: 8px;
	gap: 8px;
	background-color: var(--color-accent);
	color: var(--color-white);

	&:hover {
		opacity: 0.9;
	}

	@media (display-mode: standalone), (display-mode: minimal-ui) {
		display: none;
	}
`;

export default App;
