```jsx
import React, {useState, useEffect, useRef} from 'react';
import ComponentOptions from '../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../common/components/ComponentPreview/ComponentPreview';
import {Tooltip} from '@sberbusiness/triplex/components/Tooltip/Tooltip';
import {
    ETooltipPreferPlace,
    ETooltipSize,
    ETooltipAlign
} from '@sberbusiness/triplex/components/Tooltip/enums';

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
    <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions}/>
    <ComponentPreview
        style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 250, width: 900}}>
        <Tooltip size={ETooltipSize.LG} toggleType="click" preferPlace={preferPlace} alignTip={alignTip}>
            <Tooltip.Body>
                Tooltip body Tooltip body Tooltip body Tooltip body Tooltip body Tooltip body Tooltip body Tooltip body
                Tooltip body Tooltip
            </Tooltip.Body>
            <Tooltip.XButton />
            <Tooltip.Target>
                <span ref={tooltipRef}>target</span>
            </Tooltip.Target>
        </Tooltip>
    </ComponentPreview>
</>;
```
