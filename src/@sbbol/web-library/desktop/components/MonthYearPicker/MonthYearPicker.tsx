import {dateFormatYYYYMMDD, globalLimitRange} from '@sbbol/web-library/desktop/common/consts/DateConst';
import {ICalendarNestedProps} from '@sbbol/web-library/desktop/components/Calendar/types';
import {IDateLimitRange} from '@sbbol/web-library/desktop/common/types/DateTypes';
import {Calendar} from '@sbbol/web-library/desktop/components/Calendar/Calendar';
import {EPickType} from '@sbbol/web-library/desktop/components/Calendar/enums';
import {MonthYearInput} from '@sbbol/web-library/desktop/components/MonthYearPicker/components/MonthYearInput';
import {inputMonthYearFormat} from '@sbbol/web-library/desktop/components/MonthYearPicker/const';
import {getFormattedDate} from '@sbbol/web-library/desktop/utils/dateUtils';
import moment, {Moment} from 'moment';
import * as React from 'react';

/**
 * @prop {string} value Значение даты текстом.
 * @prop {Function} onChange Callback для события изменения значения.
 * @prop {Function} onBlur Callback для события потери фокуса.
 * @prop {IDateLimitRange} [limitRange] Диапазон даты начала и конца периода ограничения.
 * @prop {string} [format] Формат для значения.
 * @prop {boolean} [error] Состояние ошибки.
 * @prop {boolean} [disabled] Неактивное состояние.
 * @param {never} [children] Использование запрещено.
 * @prop {string} [placeholder] Плейсхолдер.
 * @prop {boolean} [reversedPick] Обратный порядок выбора даты.
 */
export interface IMonthYearPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onBlur'>, ICalendarNestedProps {
    value: string;
    onChange: (date: string) => void;
    onBlur?: () => void;
    limitRange?: IDateLimitRange;
    format?: string;
    error?: boolean;
    disabled?: boolean;
    children?: never;
    placeholder?: string;
    reversedPick?: boolean;
}

/**
 * @prop {moment.Moment} calendarValue Value для компонента Calendar.
 * @prop {boolean} focused Фокус в поле открывает popover с выбором даты, а так же позволяет вводить дату вручную.
 * @prop {string} inputValue Value для комопнента DateInput.
 * @prop {string} lastValidValue Последняя валидная дата.
 * @prop {IDateLimitRange} limitRange Диапазон даты начала и конца периода ограничения.
 */
interface IMonthYearPickerState {
    calendarValue: moment.Moment;
    focused: boolean;
    inputValue: string;
    lastValidValue: string;
    limitRange: IDateLimitRange;
}

/**
 * Проверяет дату на лимиты.
 *
 * @prop {Moment} date Дата для проверки.
 * @prop {IDateLimitRange} limitRange Диапазон даты начала и конца периода ограничения.
 */
function checkOutOfRange(date: Moment, limitRange: IDateLimitRange): boolean {
    return date.isBefore(limitRange.dateFrom) || date.isAfter(limitRange.dateTo);
}

/** Компонент ввода и выбора даты. */
export class MonthYearPicker extends React.PureComponent<IMonthYearPickerProps, IMonthYearPickerState> {
    public static defaultProps = {
        format: dateFormatYYYYMMDD,
        limitRange: globalLimitRange,
    };

    constructor(props: IMonthYearPickerProps) {
        super(props);
        const {value, format, limitRange} = props;

        this.state = {
            calendarValue: this.getCalendarValueFromValue(),
            focused: false,
            lastValidValue: moment(value, format, true).isValid() ? value : '',
            inputValue: this.getInputValueFromValue(),
            limitRange: {
                dateFrom: limitRange?.dateFrom || globalLimitRange.dateFrom,
                dateTo: limitRange?.dateTo || globalLimitRange.dateTo,
            },
        };
    }

    /** Ссылка на wrapper у MonthYearPicker. */
    private monthYearPickerWrapperNode: Node | null = null;

    public componentDidMount(): void {
        document.addEventListener('mousedown', this.handleClickOutside);
        document.addEventListener('touchstart', this.handleClickOutside);
    }

    public componentDidUpdate(prevProps: Readonly<IMonthYearPickerProps>): void {
        const {value, format, limitRange} = this.props;
        const {limitRange: stateLimitRange} = this.state;
        if (value != prevProps.value) {
            this.setLastValidValue(value, format);
            this.setCalendarValue();
            this.setInputValue();
        }

        const dateFrom = limitRange?.dateFrom || globalLimitRange.dateFrom;
        const dateTo = limitRange?.dateTo || globalLimitRange.dateTo;

        if (!stateLimitRange.dateFrom?.isSame(dateFrom) || !stateLimitRange.dateTo?.isSame(dateTo)) {
            this.setState({
                limitRange: {
                    dateFrom,
                    dateTo,
                },
            });
        }
    }

    public componentWillUnmount(): void {
        document.removeEventListener('mousedown', this.handleClickOutside);
        document.removeEventListener('touchstart', this.handleClickOutside);
    }

    public render(): JSX.Element {
        const {
            value,
            format,
            error,
            disabled,
            limitRange: limitRangeProp,
            onChange,
            onBlur,
            reversedPick,
            dayHtmlAttributes,
            monthHtmlAttributes,
            yearHtmlAttributes,
            prevButtonProps,
            nextButtonProps,
            changeViewLinkProps,
            placeholder,
            ...htmlProps
        } = this.props;
        const {calendarValue, focused, inputValue, limitRange} = this.state;

        return (
            <div ref={this.setRef} className="cssClass[monthYearPicker]">
                <MonthYearInput
                    {...htmlProps}
                    value={inputValue}
                    focused={focused}
                    disabled={disabled}
                    error={error}
                    onFocus={this.handleFocus}
                    placeholder={placeholder}
                />
                {focused && (
                    <Calendar
                        pickedDate={calendarValue}
                        limitRange={limitRange}
                        onChangeDate={this.handleValueChangeFromCalendar}
                        onBlur={this.handleBlur}
                        pickType={EPickType.monthYearPick}
                        reversedPick={reversedPick}
                        dayHtmlAttributes={dayHtmlAttributes}
                        monthHtmlAttributes={monthHtmlAttributes}
                        yearHtmlAttributes={yearHtmlAttributes}
                        prevButtonProps={prevButtonProps}
                        nextButtonProps={nextButtonProps}
                        changeViewLinkProps={changeViewLinkProps}
                    />
                )}
            </div>
        );
    }

    private setInputValue = (): void => {
        const {inputValue} = this.state;
        const nextInputValue = this.getInputValueFromValue();

        if (inputValue !== nextInputValue) {
            this.setState({
                inputValue: nextInputValue,
            });
        }
    };

    private getInputValueFromValue = (): string => {
        const {format, value} = this.props;
        const date = moment(value, format, true);

        let inputValue = value;

        if (value && date.isValid()) {
            inputValue = date.format(inputMonthYearFormat);
        }

        return inputValue;
    };

    private setCalendarValue = (): void => {
        const {calendarValue} = this.state;
        const nextCalendarValue = this.getCalendarValueFromValue();

        if (!moment(nextCalendarValue).isSame(calendarValue)) {
            this.setState({
                calendarValue: nextCalendarValue,
            });
        }
    };

    private getCalendarValueFromValue = (): moment.Moment => {
        const {format, value} = this.props;
        const lastValidValue = this.state ? this.state.lastValidValue : '';
        const date = moment(value, format, true);
        let calendarValue = moment();

        if (value) {
            if (date.isValid()) {
                calendarValue = date;
            } else if (lastValidValue) {
                calendarValue = moment(lastValidValue);
            }
        }

        return calendarValue;
    };

    /** Обработчик установки фокуса. */
    private handleFocus = (): void => {
        const {disabled} = this.props;
        if (!disabled) {
            this.setState({focused: true});
        }
    };

    /** Обработчик потери фокуса. */
    private handleBlur = (): void => {
        this.setState({focused: false});

        // Необходимо чтобы onBlur был всегда позже onChange (Не правильная последовательность происходит
        // при замене не валидного значения валидным при потере фокуса)
        setTimeout(() => {
            if (this.props.onBlur) {
                this.props.onBlur();
            }
        });
    };

    /**
     * Обработчик изменения даты из календаря.
     * @param {Moment} date Новое значение поля.
     */
    private handleValueChangeFromCalendar = (date: Moment): void => {
        const {onChange, format} = this.props;

        onChange(getFormattedDate(date, format));

        this.handleBlur();
    };

    /** При клике вне компонента скрываем выпадающий список. */
    private handleClickOutside = (event: Event) => {
        const {focused} = this.state;
        const wrapperContainsTarget = this.monthYearPickerWrapperNode && !this.monthYearPickerWrapperNode.contains(event.target as Node);

        if (wrapperContainsTarget && focused) {
            this.handleBlur();
        }
    };

    /**
     * Установить ссылку на wrapper у DatePicker.
     * @param {HTMLDivElement} el Элемент wrapper DatePicker.
     */
    private setRef = (el: HTMLDivElement) => {
        this.monthYearPickerWrapperNode = el;
    };

    /** Заполнение валидного значения даты. */
    private setLastValidValue = (value: string, format: string | undefined): void => {
        const {lastValidValue, limitRange} = this.state;

        const wasChanged = lastValidValue !== value;
        if (!wasChanged) {
            return;
        }

        if (!value) {
            this.setState({lastValidValue: ''});
            return;
        }

        const date = moment(value, format, true);
        const isValid = date.isValid();
        if (!isValid) {
            return;
        }

        const isOutOfRangeValue = checkOutOfRange(date, limitRange);
        if (isOutOfRangeValue) {
            return;
        }

        this.setState({lastValidValue: value});
    };
}
