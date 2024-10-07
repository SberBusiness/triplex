import React, {useState} from 'react';
import {DatePicker} from '@sberbusiness/triplex/components/DatePicker/DatePicker';

const [value, setValue] = useState('');

<DatePicker value={value} onChange={setValue} disabled />
