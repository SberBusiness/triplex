```jsx
import React, {useState} from 'react';
import {ChipDatePicker} from '@sberbusiness/triplex/components/Chip';

const [value, setValue] = useState('');

<ChipDatePicker value={value} label="Chip name" onChange={setValue} />
```

### With displayedValue

Свойство displayedValue позволяет передать лейбл, который будет отображаться вместо выбранного значения.

```jsx
import React, {useState} from 'react';
import moment from 'moment';
import {ChipDatePicker} from '@sberbusiness/triplex/components/Chip';
import {ChipGroup} from '@sberbusiness/triplex/components/ChipGroup/ChipGroup';

const [valueFrom, setValueFrom] = useState('');
const [valueTo, setValueTo] = useState('');

const dateFrom = moment(valueFrom, 'YYYYMMDD', true);
const dateTo = moment(valueTo, 'YYYYMMDD', true);

<ChipGroup>
    <ChipDatePicker
        value={valueFrom}
        label="Дата с"
        onChange={setValueFrom}
        displayedValue={`С: ${dateFrom.format('DD.MM.YYYY')}`}
    />
    <ChipDatePicker
        value={valueTo}
        label="Дата по"
        onChange={setValueTo}
        displayedValue={`По: ${dateTo.format('DD.MM.YYYY')}`}
    />
</ChipGroup>
```