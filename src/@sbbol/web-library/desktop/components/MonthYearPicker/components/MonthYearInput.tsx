import {CalendarSrvIcon20} from '@sberbusiness/icons/CalendarSrvIcon20';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {defaultMonthYearPlaceholder} from '@sbbol/web-library/desktop/components/MonthYearPicker/const';
import {IInputProps} from '@sbbol/web-library/desktop/components/Input/Input';
import * as React from 'react';

export interface IMonthYearInputProps extends IInputProps {
    /** Состояние фокусировки элемента. */
    focused?: boolean;
    /** Обработчик фокусировки на элементе. */
    onFocus?: () => void;
}

/** Поля ввода для компонента выбора даты. */
export class MonthYearInput extends React.PureComponent<IMonthYearInputProps> {
    public render(): JSX.Element {
        const {error, focused, disabled, placeholder, value, ...inputProps} = this.props;
        const inputClassNames = classnames('cssClass[pseudoInput]', {
            'cssClass[disabled]': Boolean(disabled),
            'cssClass[error]': Boolean(error),
            'cssClass[focus]': Boolean(focused),
        });
        const iconClassNames = classnames({
            'cssClass[calendarIcon]': true,
            'cssClass[disabled]': Boolean(disabled),
            'cssClass[error]': Boolean(error),
            'cssClass[focused]': Boolean(focused),
        });

        return (
            <div className="cssClass[inputBlock]">
                <div {...inputProps} className={inputClassNames} tabIndex={disabled ? undefined : 0}>
                    {value || <span className="cssClass[placeholder]">{placeholder || defaultMonthYearPlaceholder}</span>}
                </div>
                <span aria-hidden="true" className={iconClassNames} onClick={this.props.onFocus}>
                    <CalendarSrvIcon20 />
                </span>
            </div>
        );
    }
}
