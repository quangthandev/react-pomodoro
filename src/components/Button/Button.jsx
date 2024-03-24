import React from 'react';
import styled from 'styled-components';
import UnstyledButton from '../UnstyledButton/UnstyledButton';

const Button = ({ children }) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
};

const Wrapper = styled(UnstyledButton)`
    background-color: var(--color-theme);
    padding: 8px 24px;
    border-radius: 5000px;
    text-align: center;
`;

export default Button;
