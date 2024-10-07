import React from 'react';
import {ChipDatePicker} from '@sberbusiness/triplex/components/Chip';

interface IDatePickerToProps {
    value: string;
    onChange: (value: string) => void;
}

const DatePickerTo: React.FC<IDatePickerToProps> = ({onChange, value}) => (
    <ChipDatePicker value={value} label="Дата по" onChange={onChange} />
);

export default DatePickerTo;
