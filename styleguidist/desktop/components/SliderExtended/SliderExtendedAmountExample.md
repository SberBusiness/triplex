```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency
    componentTitle="Slider"
    isMobileComponent={false}
/>
```

```jsx
import range from 'lodash.range';
import {SliderExtended} from '@sberbusiness/triplex/desktop/components/SliderExtended/SliderExtended';

const [value, setValue] = React.useState(1000000);

const amounts =  [
    0,
    10000,
    ...range(20000, 240000, 20000),
    ...range(240000, 1000000, 40000),
    ...range(1000000, 2150000, 50000),
    ...range(2150000, 2600000, 75000),
    ...range(2600000, 3000000, 100000),
    ...range(3000000, 3800000, 200000),
    ...range(3800000, 9000000, 400000),
    ...range(9000000, 10000000, 500000),
    ...range(10000000, 25000000, 2500000),
    ...range(25000000, 40000000, 5000000),
    ...range(40000000, 90000001, 10000000),
    100000000,
];

<div style={{width: '300px'}}>
    <div>
        <div>Значение: {new Intl.NumberFormat('ru-RU').format(value)}</div>
    </div>
    <br /><br />

    <SliderExtended
        min={0}
        max={99}
        step={[...range(0, 100, 1)]}
    >
        <SliderExtended.Rail />
        <SliderExtended.Dot value={amounts.findIndex((v) => value === v)} onChange={(value) => setValue(amounts[value])} />
        <SliderExtended.Track />
        <SliderExtended.Marks>
            <SliderExtended.Mark value={0}>0 млн</SliderExtended.Mark>
            <SliderExtended.Mark value={32}>1 млн</SliderExtended.Mark>
            <SliderExtended.Mark value={65}>3 млн</SliderExtended.Mark>
            <SliderExtended.Mark value={99}>100 млн</SliderExtended.Mark>
        </SliderExtended.Marks>
    </SliderExtended>
</div>
```