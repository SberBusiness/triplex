```jsx
import {EStepperStepIconType} from '@sberbusiness/triplex/components/Stepper/StepperStepIcon';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

const [selectedStepId, setSelectedStepId] = React.useState('stepper-step-3');
const [iconType, setIconType] = React.useState(EStepperStepIconType.SUCCESS);
const [progress, setProgress] = React.useState(60);
const [shadow, setShadow] = React.useState(false);

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Select
            value={iconType}
            setValue={setIconType}
            options={Object.values(EStepperStepIconType)}
        >
            Icon type
        </ComponentControlPanel.Select>
        <ComponentControlPanel.Number
            value={progress}
            setValue={setProgress}
            min={0}
            max={100}
        >
            Progress
        </ComponentControlPanel.Number>
        <ComponentControlPanel.Checkbox checked={shadow} setChecked={setShadow}>
            Shadow
        </ComponentControlPanel.Checkbox>
    </ComponentControlPanel>
);

const getStepIcon = (type) => <Stepper.Step.Icon type={type} />;

const steps = [
    {
        id: 'stepper-step-1',
        label: 'Completed',
        icon: getStepIcon(EStepperStepIconType.FILLED),
    },
    {
        id: 'stepper-step-2',
        label: 'Disabled',
        icon: getStepIcon(EStepperStepIconType.FILLED),
        disabled: true,
    },
    {
        id: 'stepper-step-3',
        label: 'Completed',
        icon: getStepIcon(iconType),
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

<>
    {renderControlPanel()}
    <Stepper.Wrapper shadow={shadow}>
        <Stepper steps={steps} onSelectStep={setSelectedStepId} selectedStepId={selectedStepId} />
        <Stepper.Progress value={progress} />
    </Stepper.Wrapper>
</>
```

### With many steps (overflow)

```jsx
import {EStepperStepIconType} from '@sberbusiness/triplex/components/Stepper/StepperStepIcon';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

const [selectedStepId, setSelectedStepId] = React.useState('stepper-step-overflow-2');

const getStepIcon = (type) => <Stepper.Step.Icon type={type} />;

const steps = Array(12)
    .fill(undefined)
    .map((value, index) => ({
        id: `stepper-step-overflow-${index + 1}`,
        label: `Completed`,
        icon: getStepIcon(EStepperStepIconType.FILLED),
    }));

<Stepper.Wrapper>
    <Stepper steps={steps} onSelectStep={setSelectedStepId} selectedStepId={selectedStepId} />
    <Stepper.Progress value={100} />
</Stepper.Wrapper>
```
