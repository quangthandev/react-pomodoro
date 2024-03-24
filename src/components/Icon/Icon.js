import React from 'react';
import styled from 'styled-components';
import { Settings, Volume2, VolumeX, X, PlayCircle, PauseCircle } from 'react-feather';

const icons = {
	settings: Settings,
	volumeEnabled: Volume2,
	volumeDisabled: VolumeX,
	close: X,
	play: PlayCircle,
	pause: PauseCircle
};

const Icon = ({ id, color, size, strokeWidth, ...delegated }) => {
	const Component = icons[id];

	if (!Component) {
		throw new Error(`No icon found for ID: ${id}`);
	}

	return (
		<Wrapper strokeWidth={strokeWidth} {...delegated}>
			<Component color={color} size={size} />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	& > svg {
		display: block;
		stroke-width: ${(p) => (p.strokeWidth !== undefined ? p.strokeWidth + 'px' : undefined)};
	}
`;

export default Icon;
