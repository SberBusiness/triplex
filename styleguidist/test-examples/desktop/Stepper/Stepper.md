```jsx
import React, {useState, useEffect} from 'react';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import {Stepper} from '@sberbusiness/triplex/desktop/components/Stepper/Stepper';
import {EStepperStepIconType} from '@sberbusiness/triplex/desktop/components/Stepper/StepperStepIcon';

const [steps, setSteps] = useState([]);
const [count, setCount] = useState(5);
const [selectedStepId, setSelectedStepId] = useState();
const [icon, setIcon] = useState();
const [disabled, setDisabled] = useState();

const icons = [
    <Stepper.Step.Icon type={EStepperStepIconType.SUCCESS} />,
    <Stepper.Step.Icon type={EStepperStepIconType.FILLED} />,
    <Stepper.Step.Icon type={EStepperStepIconType.WARNING} />,
    <Stepper.Step.Icon type={EStepperStepIconType.ERROR} />,
    <Stepper.Step.Icon type={EStepperStepIconType.WAIT} />,
];

useEffect(() => {
    setSteps(
        Array(+count)
            .fill()
            .map((value, index) => ({id: `${index}`, label: `Step Name`, disabled: disabled, icon: icon && icons[index % 5]}))
    );
}, [count, icon, disabled]);

const checkboxOptions = [
    {
        id: 'icon',
        label: 'Icon',
        checked: icon,
        onChange: setIcon,
    },
    {
        id: 'disabled',
        label: 'Disabled',
        checked: disabled,
        onChange: setDisabled,
    },
];

const inputOptions = [
    {
        id: 'count',
        onChange: setCount,
        value: count,
    },
    {
        id: 'selectedStepId',
        onChange: setSelectedStepId,
        value: selectedStepId,
    },
];

<>
    <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions} hidden />
    <ComponentPreview>
        <Stepper steps={steps} selectedStepId={selectedStepId} onSelectStep={(id) => setSelectedStepId(id)} />
    </ComponentPreview>
</>
```
