import styled from 'styled-components';

const Clock = ({ seconds, interval }) => {
	let elapsed = interval - seconds;

	if (elapsed < 0) {
		elapsed = interval;
	}

	const sec = elapsed % 60;
	const min = Math.floor(elapsed / 60);

	return (
		<Wrapper>
			{formatTime(min)}:{formatTime(sec)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	color: inherit;
	font-size: 3.5rem;
`;

const formatTime = (t) => {
	return ('0' + t).slice(-2);
};

export default Clock;
