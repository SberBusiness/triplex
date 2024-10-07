import React, {useState} from 'react';
import moment from 'moment';
import {DatePicker} from '@sberbusiness/triplex/components/DatePicker/DatePicker';

const [value, setValue] = useState('');

const limitRange = {dateFrom: moment().startOf('month'), dateTo: moment().endOf('month')};

<DatePicker value={value} onChange={setValue} limitRange={limitRange} />