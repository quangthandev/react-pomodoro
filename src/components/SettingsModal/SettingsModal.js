import React from 'react';
import styled, { useTheme } from 'styled-components';
import { DialogOverlay, DialogContent } from "@reach/dialog";
import UnstyledButton from '../UnstyledButton/UnstyledButton';
import Icon from '../Icon/Icon';
import TimeInput from '../TimeInput/TimeInput';
import TimeSetting from '../TimeSetting/TimeSetting';
import FontSetting from '../FontSetting/FontSetting';
import ColorSetting from '../ColorSetting/ColorSetting';

import { QUERIES } from '../../constants';
import Button from '../Button/Button';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';

import { persistSetting } from '../../helpers';

const SettingsModal = ({ isOpen, onDismiss, onSubmit, intervals, autoStartBreaks, autoStartPomodoros, longBreakCycle, colorTheme, fontSize }) => {
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

        //Persist settings in local storage
        persistSetting("pomodoro-interval", e.target.pomodoroInterval.value);
        persistSetting("short-break-interval", e.target.shortBreakInterval.value);
        persistSetting("long-break-interval", e.target.longBreakInterval.value);
        persistSetting("long-break-cycle", e.target.longBreakCycle.value);
        persistSetting("auto-start-breaks", e.target.autoStartBreaks.checked ? "1" : "0");
        persistSetting("auto-start-pomodoros", e.target.autoStartPomodoros.checked ? "1" : "0");
        persistSetting("color-theme", e.target.color.value);
        persistSetting("font-size", e.target.font.value);
        
        onDismiss();
    };

    return (
        <Wrapper
            style={{
                '--color-theme': `${theme.colors[colorTheme]}`,
                '--font-size': `${theme.fontSizes[fontSize]}`
            }}
            isOpen={isOpen}
            onDismiss={onDismiss
        }>
            <Backdrop />
            <Content aria-label="settings">
                <ContentHeader>
                    <h2>Settings</h2>
                    <CloseButton onClick={onDismiss}>
                        <Icon id="close" size="20" />
                    </CloseButton>
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
        </Wrapper>
    )
};

const Wrapper = styled(DialogOverlay)`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: grid;
    place-content: center;
    overflow: auto;
`;

const Backdrop = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: var(--color-backdrop);
`;

const Content = styled(DialogContent)`
    position: relative;
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

export default SettingsModal;
