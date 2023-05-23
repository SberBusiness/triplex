### Single

```jsx
import {ESegmentedControlType} from '@sberbusiness/triplex/desktop/components/SegmentedControl/SegmentedControl';

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
import {ESegmentedControlType} from '@sberbusiness/triplex/desktop/components/SegmentedControl/SegmentedControl';

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
import {ESegmentedControlType} from '@sberbusiness/triplex/desktop/components/SegmentedControl/SegmentedControl';

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
