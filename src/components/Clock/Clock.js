import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Clock = ({ seconds, interval }) => {
    var elapsed = interval - seconds;

    if (elapsed < 0) {
        elapsed = interval;
    }

    const [sec, setSec] = useState(elapsed % 60);
    const [min, setMin] = useState(Math.floor(elapsed / 60));

    useEffect(() => {
        setSec(elapsed % 60);
        setMin(Math.floor(elapsed / 60));
    }, [elapsed]);

    return (
        <Wrapper>
            {formatTime(min)}:{formatTime(sec)}
        </Wrapper>
    )
};

const Wrapper = styled.div`
    color: inherit;
    font-size: 3.5rem;
`;

const formatTime = (t) => {
    return ('0' + t).slice(-2);
};

export default Clock;
