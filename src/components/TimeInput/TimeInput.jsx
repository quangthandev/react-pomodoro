import React, { useState } from 'react';
import styled from 'styled-components';

import { QUERIES } from '../../constants';

const TimeInput = ({ id, labelText, initValue, ...delegated }) => {
    const [value, setValue] = useState(initValue);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <Wrapper>
            <Label htmlFor={id}>
                {labelText}
            </Label>
            <Input
                id={id} 
                type="number" 
                value={value} 
                {...delegated} 
                min="0" 
                onChange={handleChange} 
            />
        </Wrapper>
    )
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    @media ${QUERIES.phoneAndSmaller} {
        flex-direction: revert;
        justify-content: space-between;
    }
`;

const Label = styled.label`
    display: block;
    color: var(--color-gray-500);
    font-size: 0.75rem;
`;

const Input = styled.input`
    max-width: 88px;
    border-radius: 8px;
    background: var(--color-gray-100);
    border: none;
    padding: 4px 8px;

    &:focus {
        outline: 1px solid var(--color-gray-500);
    }
`;

export default TimeInput;
