import React from 'react';
import styled from 'styled-components';

import Button from '../Button/Button';
import UnstyledButton from '../UnstyledButton/UnstyledButton';

const StatusBar = ({ mode, onChangeMode }) => {
	const pomodoroBtn =
		mode === 'pomodoro' ? (
			<ActiveButton>Pomodoro</ActiveButton>
		) : (
			<InactiveButton onClick={() => onChangeMode('pomodoro')}>Pomodoro</InactiveButton>
		);

	const shortBreakBtn =
		mode === 'shortBreak' ? (
			<ActiveButton>Short Break</ActiveButton>
		) : (
			<InactiveButton onClick={() => onChangeMode('shortBreak')}>Short Break</InactiveButton>
		);

	const longBreakBtn =
		mode === 'longBreak' ? (
			<ActiveButton>Long Break</ActiveButton>
		) : (
			<InactiveButton onClick={() => onChangeMode('longBreak')}>Long Break</InactiveButton>
		);

	return (
		<Wrapper>
			{pomodoroBtn}
			{shortBreakBtn}
			{longBreakBtn}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	width: max-content;
	max-width: 100%;
	padding: 16px;
	font-size: 0.6em;
	background-color: var(--color-bg-500);
	border-radius: 5000px;
	z-index: 2;
`;

const ActiveButton = styled(Button)`
	color: black;
`;

const InactiveButton = styled(UnstyledButton)`
	text-align: center;
	color: var(--color-gray-300);
	padding: 8px 24px;

	&:hover {
		outline: 1px solid white;
	}
`;

export default StatusBar;
