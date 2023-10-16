```jsx
import {Slider} from '@sberbusiness/triplex/components/Slider/Slider';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

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
        <ComponentControlPanel>
            <div>Текущее значение - {value}</div>
            <br />
            <ComponentControlPanel.Select
                value={min}
                setValue={setMin}
                options={[0, 10, 20, 30]}
            >
                Минимальное значение:
            </ComponentControlPanel.Select>
            <ComponentControlPanel.Select
                value={max}
                setValue={setMax}
                options={[80, 90, 100]}
            >
                Максимальное значение:
            </ComponentControlPanel.Select>
            <ComponentControlPanel.Select
                value={step}
                setValue={(value) => setStep(parseInt(value))}
                options={[1, 2, 3, 4, 5]}
            >
                Шаг:
            </ComponentControlPanel.Select>
        </ComponentControlPanel>
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
