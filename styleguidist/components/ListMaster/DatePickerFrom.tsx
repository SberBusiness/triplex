import React from 'react';
import {ChipDatePicker} from '@sberbusiness/triplex/components/Chip';

interface IDatePickerFromProps {
    value: string;
    onChange: (value: string) => void;
}

const DatePickerFrom: React.FC<IDatePickerFromProps> = ({onChange, value}) => (
    <ChipDatePicker value={value} label="Дата с" onChange={onChange} />
);

export default DatePickerFrom;
