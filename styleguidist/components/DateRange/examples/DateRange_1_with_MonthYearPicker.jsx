import React, {useState} from 'react';
import {EDateRangeShiftUnit} from '@sberbusiness/triplex/components/DateRange/enums';
import {MonthYearPicker} from '@sberbusiness/triplex/components/MonthYearPicker/MonthYearPicker';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';

const [value, setValue] = useState(['', '']);

const shiftAmount = 1;
const shiftUnit = EDateRangeShiftUnit.MONTH;

const renderPicker = (props) => <MonthYearPicker {...props} />;
const renderButton = (props) => <ButtonIcon {...props} />;

<DateRange
    value={value}
    onChange={setValue}
    shiftAmount={shiftAmount}
    shiftUnit={shiftUnit}
    renderPickerFrom={renderPicker}
    renderPickerTo={renderPicker}
    renderButtonBack={renderButton}
    renderButtonForward={renderButton}
/>