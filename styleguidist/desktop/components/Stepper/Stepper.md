```jsx
import {EStepperStepIconType} from '@sberbusiness/triplex/desktop/components/Stepper/StepperStepIcon';
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';

const [selectedStepId, setSelectedStepId] = React.useState('stepper-step-3');
const [iconType, setIconType] = React.useState(EStepperStepIconType.SUCCESS);
const [progress, setProgress] = React.useState(60);
const [shadow, setShadow] = React.useState(false);

const renderControlPanel = () => (
    <ExampleControlPanel>
        <select value={iconType} onChange={(event) => setIconType(event.target.value)} data-label="Icon type">
            {Object.values(EStepperStepIconType).map((value, index) => (
                <option key={index}>{value}</option>
            ))}
        </select>
        <input type="number" value={progress} onChange={(event) => setProgress(event.target.value)} min={0} max={100} data-label="Progress" />
        <input type="checkbox" checked={shadow} onChange={(event) => setShadow(event.target.checked)} data-label="Shadow" />
    </ExampleControlPanel>
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
import {EStepperStepIconType} from '@sberbusiness/triplex/desktop/components/Stepper/StepperStepIcon';
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';

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