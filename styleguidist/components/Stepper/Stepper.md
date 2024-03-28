```jsx
import {EStepperStepIconType} from '@sberbusiness/triplex/components/Stepper/StepperStepIcon';

const [selectedStepId, setSelectedStepId] = React.useState('stepper-step-3');

const steps = [
    {
        id: 'stepper-step-1',
        label: 'Completed',
        icon: <Stepper.Step.Icon type={EStepperStepIconType.FILLED} />,
    },
    {
        id: 'stepper-step-2',
        label: 'Disabled',
        icon: <Stepper.Step.Icon type={EStepperStepIconType.FILLED} />,
        disabled: true,
    },
    {
        id: 'stepper-step-3',
        label: 'Completed',
        icon: <Stepper.Step.Icon type={EStepperStepIconType.SUCCESS} />,
    },
    {
        id: 'stepper-step-4',
        label: selectedStepId !== 'stepper-step-4' ? 'Available' : 'In progress',
    },
    {
        id: 'stepper-step-5',
        label: 'Disabled',
        disabled: true,
    },
];

<Stepper.Wrapper>
    <Stepper steps={steps} onSelectStep={setSelectedStepId} selectedStepId={selectedStepId} />
    <Stepper.Progress value={60} />
</Stepper.Wrapper>
```

### With shadow

```jsx
import {EStepperStepIconType} from '@sberbusiness/triplex/components/Stepper/StepperStepIcon';

const [selectedStepId, setSelectedStepId] = React.useState('stepper-shadow-step-3');

const steps = [
    {
        id: 'stepper-shadow-step-1',
        label: 'Completed',
        icon: <Stepper.Step.Icon type={EStepperStepIconType.FILLED} />,
    },
    {
        id: 'stepper-shadow-step-2',
        label: 'Disabled',
        icon: <Stepper.Step.Icon type={EStepperStepIconType.FILLED} />,
        disabled: true,
    },
    {
        id: 'stepper-shadow-step-3',
        label: 'Completed',
        icon: <Stepper.Step.Icon type={EStepperStepIconType.SUCCESS} />,
    },
    {
        id: 'stepper-shadow-step-4',
        label: selectedStepId != 'stepper-shadow-step-4' ? 'Available' : 'In progress',
    },
    {
        id: 'stepper-shadow-step-5',
        label: 'Disabled',
        disabled: true,
    },
];

<Stepper.Wrapper shadow>
    <Stepper steps={steps} onSelectStep={setSelectedStepId} selectedStepId={selectedStepId} />
    <Stepper.Progress value={60} />
</Stepper.Wrapper>
```

### With many steps (overflow)

```jsx
import {EStepperStepIconType} from '@sberbusiness/triplex/components/Stepper/StepperStepIcon';

const [selectedStepId, setSelectedStepId] = React.useState('stepper-overflow-step-2');

const steps = Array(12)
    .fill(undefined)
    .map((value, index) => ({
        id: `stepper-overflow-step-${index + 1}`,
        label: `Completed`,
        icon: <Stepper.Step.Icon type={EStepperStepIconType.FILLED} />,
    }));

<Stepper.Wrapper>
    <Stepper steps={steps} onSelectStep={setSelectedStepId} selectedStepId={selectedStepId} />
    <Stepper.Progress value={100} />
</Stepper.Wrapper>
```
