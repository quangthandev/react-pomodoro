import React from 'react';
import styled from 'styled-components';

import TimeInput from '../TimeInput/TimeInput';

import { QUERIES } from '../../constants';

const TimeSetting = ({ intervals }) => {
    return (
        <Wrapper>
            <TimeInput 
                id="pomodoro" 
                labelText="Pomodoro" 
                name="pomodoroInterval"
                initValue={intervals.pomodoro}
            />
            <TimeInput 
                id="shortBreak" 
                labelText="Short Break" 
                name="shortBreakInterval" 
                initValue={intervals.shortBreak}
            />
            <TimeInput 
                id="longBreak" 
                labelText="Long Break" 
                name="longBreakInterval" 
                initValue={intervals.longBreak}
            />
        </Wrapper>
    )
};

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-top: 8px;

    @media ${QUERIES.phoneAndSmaller} {
        flex-direction: column;
    }
`;

export default TimeSetting;
