import React, { useState } from 'react';
import styled from 'styled-components';

import SettingItem from '../SettingItem/SettingItem';

const ColorSetting = ({ colorTheme }) => {
    const [selected, setSelected] = useState(colorTheme);

    return (
        <Wrapper>
            <SettingItem
                variant="color"
                backgroundColor="1"
                size={24} 
                id="colorPrimary1"
                name="color"
                value="1"
                selected={selected}
                onChange={setSelected}
            >
            </SettingItem>
            <SettingItem 
                variant="color" 
                backgroundColor="2"
                size={24} 
                id="colorPrimary2"
                name="color"
                value="2"
                selected={selected}
                onChange={setSelected}
            >
            </SettingItem>
            <SettingItem 
                variant="color" 
                backgroundColor="3"
                size={24}
                id="colorPrimary3"
                name="color"
                value="3"
                selected={selected}
                onChange={setSelected}
            >
            </SettingItem>
        </Wrapper>
    )
};

const Wrapper = styled.div`
    display: flex;
    gap: 8px;
`;

export default ColorSetting;
