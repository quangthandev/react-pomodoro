import React, { useState } from 'react';
import styled from 'styled-components';

const CustomCheckbox = ({ initChecked, ...delegated }) => {
    const [checked, setChecked] = useState(initChecked);

    const handleChange = (e) => {
        setChecked(e.target.checked);
    };

    return (
        <Wrapper>
            <PresentationalBit style={{
                '--background-color': checked
                    ? 'var(--color-secondary)'
                    : 'var(--color-gray-300)'
            }} >
                <Slider checked={checked} />
            </PresentationalBit>
            <NativeInput type="checkbox" checked={checked} onChange={handleChange} {...delegated} />
        </Wrapper>
    )
};

const Wrapper = styled.div`
    position: relative;
    width: 48px;
    height: 24px;
`;

const NativeInput = styled.input`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    cursor: pointer;
`;

const PresentationalBit = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: var(--background-color);
    border-radius: 5000px;
`;

const Slider = styled.div`
    position: absolute;
    --size: 20px;
    --margin-edge: 2px;
    left: var(--margin-edge);
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background-color: var(--color-white);
    transition: transform 350ms ease-out;

    ${({ checked }) => checked && `
        & {
            left: revert;
            right: calc(var(--size) + var(--margin-edge));
            transform: translateX(100%);
        }
    `}
`;

export default CustomCheckbox;
