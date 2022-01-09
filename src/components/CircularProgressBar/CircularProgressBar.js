import React from 'react';
import styled from 'styled-components';

const CircularProgressBar = ({ size, strokeWidth, value, children }) => {
    return (
        <Wrapper
            style={{
                "--size": size,
                "--stroke-width": strokeWidth,
                "--value": value
            }}
        >
            <OuterCircle>
                <InnerCirle>
                    {children}
                </InnerCirle>
            </OuterCircle>
            <SVG viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
                <ProgressBar cx={size/2} cy={size/2} r={size/2 - strokeWidth/2} strokeLinecap="round" />
            </SVG>
        </Wrapper>
    )
};

const Wrapper = styled.div`
    position: relative;
`;

const OuterCircle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(var(--size) * 1px);
    height: calc(var(--size) * 1px);
    border-radius: 50%;
    background-color: var(--color-bg-500);
    /* border: 1px solid var(--color-gray-100); */
    /* box-shadow:
        inset 0 1px 1px hsl(0deg 0% 0% / 0.075),
        inset 0 2px 2px hsl(0deg 0% 0% / 0.075),
        inset 0 4px 4px hsl(0deg 0% 0% / 0.075),
        inset 0 8px 8px hsl(0deg 0% 0% / 0.075),
        inset 0 16px 16px hsl(0deg 0% 0% / 0.075) */
`;

const InnerCirle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: calc((var(--size) - var(--stroke-width)) * 1px);
    height: calc((var(--size) - var(--stroke-width)) * 1px);
    border-radius: 50%;
    /* background-color: var(--color-bg-500); */
    /* border: 1px solid var(--color-gray-100); */
    /* box-shadow:
        0 1px 1px hsl(0deg 0% 0% / 0.075),
        0 2px 2px hsl(0deg 0% 0% / 0.075),
        0 4px 4px hsl(0deg 0% 0% / 0.075),
        0 8px 8px hsl(0deg 0% 0% / 0.075),
        0 16px 16px hsl(0deg 0% 0% / 0.075)
    ; */
`;

const SVG = styled.svg`
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(-90deg);
`;

const ProgressBar = styled.circle`
    fill: none;
    --pi: calc(22 / 7);
    --circumference: calc(2 * var(--pi) * (var(--size) - var(--stroke-width)) / 2);
    stroke: var(--color-theme);
    stroke-width: calc(var(--stroke-width) * 1px);
    stroke-dasharray: calc(var(--circumference) * 1px);
    stroke-dashoffset: calc((var(--circumference) - var(--value) * var(--circumference) / 100) * 1px);
`;

export default CircularProgressBar;
