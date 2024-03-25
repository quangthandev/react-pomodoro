import React from 'react';
import useSound from 'use-sound';
import styled from 'styled-components';
import CircularProgressBar from '../CircularProgressBar/CircularProgressBar';
import Clock from '../Clock/Clock';
import UnstyledButton from '../UnstyledButton/UnstyledButton';
import Icon from '../Icon/Icon';
import { START_TIMER, PAUSE_TIMER } from '../../constants';

import play from '../../sounds/pop-up.mp3';
import stop from '../../sounds/pause.mp3';

const size = 196;
const strokeWidth = 8;

const ProgressDisplay = (props) => {
	const { count, interval, mute, status, onControl } = props;

	const [playOn] = useSound(play, { volume: 0.25, soundEnabled: !mute });
	const [playOff] = useSound(stop, { volume: 0.5, soundEnabled: !mute });

	const percentValue = (count * 100) / (interval * 60);

	const controlButton =
		status === 'running' ? <Icon id="pause" size="28" /> : <Icon id="play" size="28" />;

	return (
		<Wrapper>
			<BlurryDisk />
			<VisibleDisk>
				<CircularProgressBar size={size} strokeWidth={strokeWidth} value={percentValue}>
					<Clock seconds={count} interval={interval * 60} />
					<Control
						aria-label={`${status === 'running' ? 'Pause timer' : 'Start timer'}`}
						title={`${status === 'running' ? 'Pause timer' : 'Start timer'}`}
						onClick={() => {
							onControl(status === 'running' ? PAUSE_TIMER : START_TIMER);
							status === 'running' ? playOff() : playOn();
						}}
					>
						{controlButton}
					</Control>
				</CircularProgressBar>
			</VisibleDisk>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	color: var(--color-white);
	z-index: 1;
`;

const Disk = styled.div`
	width: ${size + 32 + 'px'};
	height: ${size + 32 + 'px'};
	border-radius: 50%;
`;

const BlurryDisk = styled(Disk)`
	background-color: var(--color-bg-100);
	filter: blur(24px);
	transform: translate(-20%, -20%);
`;

const VisibleDisk = styled(Disk)`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: conic-gradient(
		from 90deg,
		var(--color-bg-100),
		var(--color-bg-300),
		var(--color-bg-500),
		var(--color-bg-300),
		var(--color-bg-100)
	);
	box-shadow: 8px 8px 2px 4px var(--color-background-500-shadow);
`;

const Control = styled(UnstyledButton)`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;
	font-size: 0.75em;
	margin-top: ${size / 2 + strokeWidth + 8}px;
	z-index: 3;
`;

export default ProgressDisplay;
