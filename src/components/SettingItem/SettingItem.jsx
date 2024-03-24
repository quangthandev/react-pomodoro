import React from 'react';
import styled from 'styled-components';

const SettingItem = ({ variant, backgroundColor, size, fontSize, value, selected, onChange, children, ...delegated }) => {
    const isSelected = selected === value;

    const handleChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <Wrapper size={size} fontSize={fontSize}>
            <PresentationalBit variant={variant} isSelected={isSelected}
                style={{
                    '--background-color':
                        variant === 'color'
                        ? `var(--color-primary-${backgroundColor})`
                        : isSelected
                            ? 'black'
                            : 'var(--color-gray-300)',
                    '--color':
                        isSelected
                        ? 'var(--color-white)'
                        : 'var(--color-gray-900)'
                }}
            >
                {children}
            </PresentationalBit>
            <NativeRadio
                type="radio"
                value={value}
                checked={isSelected}
                onChange={handleChange}
                {...delegated}
            />
        </Wrapper>
    )
};

const Wrapper = styled.div`
    position: relative;
    font-size: ${props => props.fontSize}rem;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
`;

const NativeRadio = styled.input`
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: var(--color);
    background-color: var(--background-color);
    border-radius: 50%;

    ${({ variant, isSelected }) => variant === 'color' && isSelected && `
        &::after {
            content: "";
            width: 4px;
            height: 10px;
            border-bottom: 1px solid var(--color-gray-900);
            border-right: 1px solid var(--color-gray-900);
            transform: rotate(45deg);
        }
    `}
`;

export default SettingItem;
