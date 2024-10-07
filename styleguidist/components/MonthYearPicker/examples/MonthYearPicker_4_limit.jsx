import React, {useState} from 'react';
import moment from 'moment';
import {MonthYearPicker} from '@sberbusiness/triplex/components/MonthYearPicker/MonthYearPicker';

const [value, setValue] = useState('');

const limitRange = {dateFrom: moment().startOf('year'), dateTo: moment().endOf('year')};

<MonthYearPicker value={value} onChange={setValue} limitRange={limitRange} />