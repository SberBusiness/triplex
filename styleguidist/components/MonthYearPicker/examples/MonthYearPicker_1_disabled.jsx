import React, {useState} from 'react';
import {MonthYearPicker} from '@sberbusiness/triplex/components/MonthYearPicker/MonthYearPicker';

const [value, setValue] = useState('');

<MonthYearPicker value={value} onChange={setValue} disabled />