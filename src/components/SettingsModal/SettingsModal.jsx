import React from 'react';
import styled, { useTheme } from 'styled-components';
import UnstyledButton from '../UnstyledButton/UnstyledButton';
import Icon from '../Icon/Icon';
import TimeInput from '../TimeInput/TimeInput';
import TimeSetting from '../TimeSetting/TimeSetting';
import FontSetting from '../FontSetting/FontSetting';
import ColorSetting from '../ColorSetting/ColorSetting';

import { QUERIES } from '../../constants';
import Button from '../Button/Button';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';

import * as Dialog from '@radix-ui/react-dialog';

const SettingsModal = ({
	open,
	setOpen,
	onSubmit,
	intervals,
	autoStartBreaks,
	autoStartPomodoros,
	longBreakCycle,
	colorTheme,
	fontSize
}) => {
	const theme = useTheme();

	const handleSubmit = (e) => {
		e.preventDefault();

		onSubmit({
			pomodoroInterval: Number(e.target.pomodoroInterval.value),
			shortBreakInterval: Number(e.target.shortBreakInterval.value),
			longBreakInterval: Number(e.target.longBreakInterval.value),
			autoStartBreaks: e.target.autoStartBreaks.checked,
			autoStartPomodoros: e.target.autoStartPomodoros.checked,
			longBreakCycle: Number(e.target.longBreakCycle.value),
			colorTheme: e.target.color.value,
			fontSize: e.target.font.value
		});

		setOpen(false);
	};

	return (
		<Dialog.Root
			open={open}
			onOpenChange={(open) => {
				setOpen(open);
			}}
		>
			<Backdrop />
			<Dialog.Trigger asChild>
				<IconButton aria-label="Open settings" title="Open settings">
					<Icon id="settings" strokeWidth={1} size={20} />
				</IconButton>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Content
					aria-label="settings"
					style={{
						'--color-theme': `${theme.colors[colorTheme]}`,
						'--font-size': `${theme.fontSizes[fontSize]}`
					}}
				>
					<ContentHeader>
						<h2>Settings</h2>
						<Dialog.Close asChild>
							<CloseButton aria-label="Close settings" title="Close settings">
								<Icon id="close" size="20" />
							</CloseButton>
						</Dialog.Close>
					</ContentHeader>
					<ContentBody onSubmit={handleSubmit}>
						<TimeSection>
							<Title>time (minutes)</Title>
							<TimeSetting intervals={intervals} />
						</TimeSection>
						<AutoStartSection>
							<Title>Auto start breaks?</Title>
							<CustomCheckbox name="autoStartBreaks" initChecked={autoStartBreaks} />
						</AutoStartSection>
						<AutoStartSection>
							<Title>Auto start pomodoros?</Title>
							<CustomCheckbox name="autoStartPomodoros" initChecked={autoStartPomodoros} />
						</AutoStartSection>
						<AutoStartSection>
							<Title>Long break cycle</Title>
							<TimeInput
								id="longBreakCycle"
								labelText=""
								name="longBreakCycle"
								initValue={longBreakCycle}
							/>
						</AutoStartSection>
						<FontSection>
							<Title>font size</Title>
							<FontSetting fontSize={fontSize} />
						</FontSection>
						<ColorSection>
							<Title>color</Title>
							<ColorSetting colorTheme={colorTheme} />
						</ColorSection>
						<ButtonWrapper>
							<Button type="submit">Apply</Button>
						</ButtonWrapper>
					</ContentBody>
				</Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

const Backdrop = styled(Dialog.Overlay)`
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background: var(--color-backdrop);
`;

const Content = styled(Dialog.Content)`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: var(--color-white);
	width: min(400px, 90vw);
	border-radius: 16px;
`;

const ContentHeader = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 16px 32px 16px 32px;
	border-top-left-radius: 16px;
	border-top-right-radius: 16px;
	border-bottom: 1px solid var(--color-gray-100);
	background-color: var(--color-theme);
`;

const ContentBody = styled.form`
	padding: 0px 32px;
`;

const Section = styled.section`
	padding: 16px 0px;

	&:not(:last-of-type) {
		border-bottom: 1px solid var(--color-gray-100);
	}
`;

const Title = styled.h6`
	text-transform: uppercase;
	font-size: 0.8rem;
`;

const TimeSection = styled(Section)`
	@media ${QUERIES.phoneAndSmaller} {
		text-align: center;
	}
`;

const AutoStartSection = styled(Section)`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const FontSection = styled(Section)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 8px;

	@media ${QUERIES.phoneAndSmaller} {
		flex-direction: column;
	}
`;

const ColorSection = styled(Section)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 8px;

	@media ${QUERIES.phoneAndSmaller} {
		flex-direction: column;
	}
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
	transform: translateY(50%);
`;

const CloseButton = styled(UnstyledButton)`
	color: var(--color-gray-900);
`;

const IconButton = styled(UnstyledButton)`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 32px;
	color: var(--color-gray-100);
	opacity: 0.8;

	&:hover {
		opacity: revert;
	}
`;

export default SettingsModal;
