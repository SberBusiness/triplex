```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency
    componentTitle="Slider"
    isMobileComponent={false}
/>
```

```jsx
import {Slider} from '@sberbusiness/triplex/desktop/components/Slider/Slider';
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';

const [min, setMin] = React.useState(0);
const [max, setMax] = React.useState(100);
const [step, setStep] = React.useState(1);
const [value, setValue] = React.useState(50);

const marks = [
    {label: min, value: min},
    {label: 40, value: 40},
    {label: 60, value: 60},
    {label: max, value: max},
];

<div style={{width: '300px'}}>
    <div>
        <ExampleControlPanel>
            <span>Текущее значение - {value}</span>
            <select value={min} onChange={(event) => setMin(event.target.value)} style={{width: 50}} data-label="Минимальное значение:">
                {[0, 10, 20, 30].map((value) => (
                    <option key={value}>{value}</option>
                ))}
            </select>
            <select value={max} onChange={(event) => setMax(event.target.value)} style={{width: 50}} data-label="Максимальное значение:">
                {[80, 90, 100].map((value) => (
                    <option key={value}>{value}</option>
                ))}
            </select>
            <select value={step} onChange={(event) => setStep(parseInt(event.target.value))} style={{width: 50}} data-label="Шаг: ">
                {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value}>{value}</option>
                ))}
            </select>
        </ExampleControlPanel>
    </div>

    <Slider
        marks={marks}
        min={min}
        max={max}
        onChange={setValue}
        step={step}
        value={value}
    />
</div>
```