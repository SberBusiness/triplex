```jsx
import React, {useState} from 'react';
import {StepperExtended} from '@sberbusiness/triplex/desktop/components/Stepper/StepperExtended';
import {EStepperStepIconType} from '@sberbusiness/triplex/desktop/components/Stepper/StepperStepIcon';

const [selectedStepId, setSelectedStepId] = useState('');

const getStepIcon = (type) => <StepperExtended.Step.Icon type={type} />;

<StepperExtended.Wrapper>
    <StepperExtended selectedStepId={selectedStepId} onSelectStep={setSelectedStepId}>
        <StepperExtended.Step id="stepper-extended-step-1" icon={getStepIcon(EStepperStepIconType.FILLED)}>
            Completed
        </StepperExtended.Step>
        <StepperExtended.Step id="stepper-extended-step-2" icon={getStepIcon(EStepperStepIconType.FILLED)}>
            Completed
        </StepperExtended.Step>
        <StepperExtended.Step id="stepper-extended-step-3" icon={getStepIcon(EStepperStepIconType.FILLED)}>
            Completed
        </StepperExtended.Step>
        <StepperExtended.Step id="stepper-extended-step-4" icon={getStepIcon(EStepperStepIconType.FILLED)}>
            Completed
        </StepperExtended.Step>
        <StepperExtended.Step id="stepper-extended-step-5" icon={getStepIcon(EStepperStepIconType.SUCCESS)}>
            Completed
        </StepperExtended.Step>
    </StepperExtended>
    <StepperExtended.Progress value={100} />
</StepperExtended.Wrapper>
```
