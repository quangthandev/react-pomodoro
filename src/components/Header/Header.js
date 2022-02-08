import React from 'react';
import styled from 'styled-components';

import MaxWidthWrapper from '../MaxWidthWrapper/MaxWidthWrapper';
import UnstyledButton from '../UnstyledButton/UnstyledButton';
import Icon from '../Icon/Icon';

const Header = ({ showSettings, mute, onToggleSound }) => {
    return (
        <header>
          <MainHeader>
            <Title>pomodoro</Title>
            <IconWrapper>
              <IconButton
                aria-label={`${mute ? "Enable sound" : "Disable sound"}`}
                title={`${mute ? "Enable sound" : "Disable sound"}`}
                onClick={onToggleSound}
              >
                <Icon
                  id={`${mute ? "volumeDisabled" : "volumeEnabled"}`}
                  strokeWidth={1}
                  size={22}
                />
              </IconButton>
              <IconButton
                aria-label="Open settings"
                title="Open settings"
                onClick={showSettings}
              >
                <Icon id="settings" strokeWidth={1} size={20} />
              </IconButton>
            </IconWrapper>
          </MainHeader>
        </header>
    )
};

const MainHeader = styled(MaxWidthWrapper)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.h1`
  color: var(--color-white);
  z-index: 2;
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-right: -10px;
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

export default Header;
