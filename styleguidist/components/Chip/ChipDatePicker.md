```jsx
import React, {useState} from 'react';
import {ChipDatePicker} from '@sberbusiness/triplex/components/Chip';

const [value, setValue] = useState('');

<ChipDatePicker value={value} label="Chip name" onChange={setValue} />
```