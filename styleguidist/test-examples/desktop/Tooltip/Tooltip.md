```jsx
import React, {useEffect, useRef, useState} from 'react';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';
import {TooltipTarget} from '@sberbusiness/triplex/desktop/components/Tooltip/TooltipTarget';
import {TooltipBody} from '@sberbusiness/triplex/desktop/components/Tooltip/TooltipBody';
import {TooltipXButton} from '@sberbusiness/triplex/desktop/components/Tooltip/TooltipXButton';
import {Tooltip} from '@sberbusiness/triplex/desktop/components/Tooltip/Tooltip';
import {ETooltipPreferPlace, ETooltipSize, ETooltipAlign} from '@sberbusiness/triplex/desktop/components/Tooltip/enums';

const [preferPlace, setPreferPlace] = useState(ETooltipPreferPlace.ABOVE);
const [alignTip, setAlignTip] = useState(ETooltipAlign.CENTER);
const [showTooltip, setShowTooltip] = useState(false);

const tooltipRef = useRef(null);

useEffect(() => {
    if (tooltipRef.current && showTooltip) {
        tooltipRef.current.click();
    }
}, [showTooltip]);

const checkboxOptions = [
    {
        id: 'showTooltip',
        onChange: setShowTooltip,
        checked: showTooltip,
        hidden: true,
    },
];

const inputOptions = [
    {
        id: 'preferPlace',
        label: 'Расположение тултипа',
        onChange: setPreferPlace,
        value: preferPlace,
    },
    {
        id: 'alignTip',
        label: 'Расположение указателя',
        onChange: setAlignTip,
        value: alignTip,
    },
];

<>
    <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions} />
    <ComponentPreview style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 250, width: 900}}>
        <Tooltip size={ETooltipSize.LG} toggleType="click" preferPlace={preferPlace} alignTip={alignTip}>
            <TooltipBody>
                Tooltip body Tooltip body Tooltip body Tooltip body Tooltip body Tooltip body Tooltip body Tooltip body Tooltip body Tooltip
            </TooltipBody>
            <TooltipXButton />
            <TooltipTarget>
                <span ref={tooltipRef}>target</span>
            </TooltipTarget>
        </Tooltip>
    </ComponentPreview>
</>;
```
