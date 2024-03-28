import React from 'react';
import {CalendarSrvIcon20} from '@sberbusiness/icons/CalendarSrvIcon20';
import {defaultMonthYearPlaceholder} from '@sberbusiness/triplex/components/MonthYearPicker/const';
import {Input, IInputProps} from '@sberbusiness/triplex/components/Input/Input';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента MonthYearInput. */
export interface IMonthYearInputProps extends Omit<IInputProps, 'groupPosition'> {
    /** Состояние фокусировки элемента. */
    focused?: boolean;
    /** Обработчик фокусировки на элементе. */
    onFocus?: () => void;
}

/** Поля ввода для компонента выбора даты. */
export const MonthYearInput: React.FC<IMonthYearInputProps> = (props) => {
    const {value, placeholder = defaultMonthYearPlaceholder, disabled, error, focused, ...rest} = props;

    const renderIcon = () => {
        const classNames = classnames('cssClass[calendarIcon]', 'hoverable', {
            'cssClass[active]': Boolean(focused),
            'cssClass[disabled]': Boolean(disabled),
        });

        return (
            <span aria-hidden="true" className={classNames} onMouseDown={props.onFocus}>
                <CalendarSrvIcon20 />
            </span>
        );
    };

    return (
        <div className="cssClass[monthYearInput]">
            <Input {...rest} value={value} placeholder={placeholder} readOnly={true} disabled={disabled} error={error} />
            {renderIcon()}
        </div>
    );
};
