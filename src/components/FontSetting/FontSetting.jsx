import React, { useState } from 'react';
import styled from 'styled-components';

import SettingItem from '../SettingItem/SettingItem';

const FontSetting = ({ fontSize }) => {
    const [selected, setSelected] = useState(fontSize);

    return (
        <Wrapper>
            <SettingItem
                variant="font" 
                size={24} 
                fontSize={0.75}
                id="fontLarge"
                name="font"
                value="large"
                selected={selected}
                onChange={setSelected}
            >
                Aa
            </SettingItem>
            <SettingItem 
                variant="font" 
                size={24} 
                fontSize={0.65}
                id="fontMedium"
                name="font"
                value="medium"
                selected={selected}
                onChange={setSelected}
            >
                Aa
            </SettingItem>
            <SettingItem 
                variant="font" 
                size={24} 
                fontSize={0.55}
                id="fontSmall"
                name="font"
                value="small"
                selected={selected}
                onChange={setSelected}
            >
                Aa
            </SettingItem>
        </Wrapper>
    )
};

const Wrapper = styled.div`
    display: flex;
    gap: 8px;
`;

export default FontSetting;
