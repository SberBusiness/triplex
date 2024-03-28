```jsx
import {EStepperStepIconType} from '@sberbusiness/triplex/components/Stepper/StepperStepIcon';

const [selectedStepId, setSelectedStepId] = React.useState('stepper-extended-step-5');

const steps = [
    {
        id: 'stepper-extended-step-1',
        label: 'Completed',
        icon: <StepperExtended.Step.Icon type={EStepperStepIconType.FILLED} />,
    },
    {
        id: 'stepper-extended-step-2',
        label: 'Completed',
        icon: <StepperExtended.Step.Icon type={EStepperStepIconType.FILLED} />,
    },
    {
        id: 'stepper-extended-step-3',
        label: 'Completed',
        icon: <StepperExtended.Step.Icon type={EStepperStepIconType.FILLED} />,
    },
    {
        id: 'stepper-extended-step-4',
        label: 'Completed',
        icon: <StepperExtended.Step.Icon type={EStepperStepIconType.FILLED} />,
    },
    {
        id: 'stepper-extended-step-5',
        label: 'Completed',
        icon: <StepperExtended.Step.Icon type={EStepperStepIconType.SUCCESS} />,
    },
];

<StepperExtended.Wrapper>
    <StepperExtended selectedStepId={selectedStepId} onSelectStep={setSelectedStepId}>
        {steps.map(({id, label, icon}) => (
            <StepperExtended.Step key={id} id={id} icon={icon}>
                {label}
            </StepperExtended.Step>
        ))}
    </StepperExtended>
    <StepperExtended.Progress value={100} />
</StepperExtended.Wrapper>
```
