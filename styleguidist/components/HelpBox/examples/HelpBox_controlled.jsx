import React, {useState} from 'react';
import {HelpBox} from '@sberbusiness/triplex/components/HelpBox/HelpBox';
import {ETooltipSize, ETooltipPreferPlace} from '@sberbusiness/triplex/components/Tooltip/enums';
import {ComponentControlPanel} from '../../common/components/ComponentControlPanel/ComponentControlPanel';

const [isOpen, setIsOpen] = useState(false);

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Checkbox checked={isOpen} setChecked={setIsOpen}>
            Open
        </ComponentControlPanel.Checkbox>
    </ComponentControlPanel>
);

<>
    {renderControlPanel()}
    <HelpBox
        tooltipSize={ETooltipSize.SM}
        preferPlace={ETooltipPreferPlace.RIGHT}
        isOpen={isOpen}
        toggle={setIsOpen}
    >
        Текст подсказки.
    </HelpBox>
</>