## General

### Single

```jsx
import {ESegmentedControlType} from '@sberbusiness/triplex/components/SegmentedControl/SegmentedControl';

const [value, setValue] = React.useState('1');

<SegmentedControl type={ESegmentedControlType.SINGLE} onSelect={setValue} value={value}>
    {[1, 2, 3].map(segmentValue => (
        <SegmentedControl.Segment
            key={segmentValue}
            value={segmentValue}
        >
            {`Сегмент ${segmentValue}`}
        </SegmentedControl.Segment>
    ))}
</SegmentedControl>
```

### Multiple

```jsx
import {ESegmentedControlType} from '@sberbusiness/triplex/components/SegmentedControl/SegmentedControl';

const [value, setValue] = React.useState([]);

const segments = [
    {value: '1'},
    {value: '2'},
    {value: '3'},
];

<SegmentedControl type={ESegmentedControlType.MULTIPLE} onSelect={setValue} value={value}>
    {segments.map(s => (
        <SegmentedControl.Segment
            key={s.value}
            value={s.value}
        >
            {`Сегмент ${s.value}`}
        </SegmentedControl.Segment>
    ))}
</SegmentedControl>
```

### Disabled

```jsx
import {ESegmentedControlType} from '@sberbusiness/triplex/components/SegmentedControl/SegmentedControl';

const [value, setValue] = React.useState('1');

<SegmentedControl disabled type={ESegmentedControlType.SINGLE} onSelect={setValue} value={value}>
    {['1', '2', '3'].map(segmentValue => (
        <SegmentedControl.Segment
            key={segmentValue}
            value={segmentValue}
        >
            {`Сегмент ${segmentValue}`}
        </SegmentedControl.Segment>
    ))}
</SegmentedControl>
```

## Secondary

### Single

```jsx
import {
    ESegmentedControlTheme,
    ESegmentedControlType
} from '@sberbusiness/triplex/components/SegmentedControl/SegmentedControl';
import {BarchartNavIcon16} from '@sberbusiness/icons/BarchartNavIcon16';
import {LinechartNavIcon16} from '@sberbusiness/icons/LinechartNavIcon16';
import {DonutchartNavIcon16} from '@sberbusiness/icons/DonutchartNavIcon16';

const [value, setValue] = React.useState('LinechartNavIcon16');

<SegmentedControl theme={ESegmentedControlTheme.SECONDARY}
                  type={ESegmentedControlType.SINGLE}
                  onSelect={setValue}
                  style={{width: '94px'}}
                  value={value}>
    <SegmentedControl.Segment
        key="BarchartNavIcon16"
        value="BarchartNavIcon16"
        className={''}
    >
        <div style={{height: '16px'}}>
            <BarchartNavIcon16 />
        </div>
    </SegmentedControl.Segment>
    <SegmentedControl.Segment
        key="LinechartNavIcon16"
        value="LinechartNavIcon16"
    >
        <div style={{height: '16px'}}>
            <LinechartNavIcon16 />
        </div>
    </SegmentedControl.Segment>
    <SegmentedControl.Segment
        key="DonutchartNavIcon16"
        value="DonutchartNavIcon16"
    >
        <div style={{height: '16px'}}>
            <DonutchartNavIcon16 />
        </div>
    </SegmentedControl.Segment>
</SegmentedControl>
```

### Multiple

```jsx
import {
    ESegmentedControlTheme,
    ESegmentedControlType
} from '@sberbusiness/triplex/components/SegmentedControl/SegmentedControl';

const [value, setValue] = React.useState([]);

const segments = [
    {value: '1'},
    {value: '2'},
    {value: '3'},
];

<SegmentedControl theme={ESegmentedControlTheme.SECONDARY} type={ESegmentedControlType.MULTIPLE} onSelect={setValue}
                  value={value}>
    {segments.map(s => (
        <SegmentedControl.Segment
            key={s.value}
            value={s.value}
        >
            {`Сегмент ${s.value}`}
        </SegmentedControl.Segment>
    ))}
</SegmentedControl>
```

### Disabled

```jsx
import {
    ESegmentedControlTheme,
    ESegmentedControlType
} from '@sberbusiness/triplex/components/SegmentedControl/SegmentedControl';

const [value, setValue] = React.useState('1');

<SegmentedControl theme={ESegmentedControlTheme.SECONDARY} disabled type={ESegmentedControlType.SINGLE}
                  onSelect={setValue} value={value}>
    {['1', '2', '3'].map(segmentValue => (
        <SegmentedControl.Segment
            key={segmentValue}
            value={segmentValue}
        >
            {`Сегмент ${segmentValue}`}
        </SegmentedControl.Segment>
    ))}
</SegmentedControl>
```
