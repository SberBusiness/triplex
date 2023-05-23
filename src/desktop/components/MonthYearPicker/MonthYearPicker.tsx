import * as React from 'react';
import moment, {Moment} from 'moment';
import {MonthYearInput} from '@sberbusiness/triplex/desktop/components/MonthYearPicker/components/MonthYearInput';
import {inputMonthYearFormat} from '@sberbusiness/triplex/desktop/components/MonthYearPicker/const';
import {Calendar} from '@sberbusiness/triplex/desktop/components/Calendar/Calendar';
import {ICalendarNestedProps} from '@sberbusiness/triplex/desktop/components/Calendar/types';
import {EPickType} from '@sberbusiness/triplex/desktop/components/Calendar/enums';
import {Dropdown, EDropdownAlignment} from '@sberbusiness/triplex/desktop/components/Dropdown/Dropdown';
import {IDateLimitRange} from '@sberbusiness/triplex/desktop/common/types/DateTypes';
import {dateFormatYYYYMMDD, globalLimitRange} from '@sberbusiness/triplex/desktop/common/consts/DateConst';
import {getFormattedDate} from '@sberbusiness/triplex/desktop/utils/dateUtils';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

/** Свойства MonthYearPicker. */
export interface IMonthYearPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onBlur'>, ICalendarNestedProps {
    /** Значение даты текстом. */
    value: string;
    /** Callback для события изменения значения. */
    onChange: (date: string) => void;
    /** Callback для события потери фокуса. */
    onBlur?: () => void;
    /** Выравнивание календаря по горизонтали. */
    alignment?: EDropdownAlignment;
    /** Диапазон даты начала и конца периода ограничения. */
    limitRange?: IDateLimitRange;
    /** Формат для значения. */
    format?: string;
    /** Состояние ошибки. */
    error?: boolean;
    /** Отключённое состояние. */
    disabled?: boolean;
    /** Текст подсказки. */
    placeholder?: string;
    /** Обратный порядок выбора даты. */
    reversedPick?: boolean;
    /** Использование запрещено. */
    children?: never;
}

/** Состояния MonthYearPicker. */
interface IMonthYearPickerState {
    /** Value для компонента Calendar. */
    calendarValue: Moment;
    /** Фокус в поле открывает popover с выбором даты, а так же позволяет вводить дату вручную. */
    focused: boolean;
    /** Value для компонента DateInput. */
    inputValue: string;
    /** Последняя валидная дата. */
    lastValidValue: string;
    /** Диапазон даты начала и конца периода ограничения. */
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
        alignment: EDropdownAlignment.LEFT,
    };

    private readonly targetRef: React.RefObject<HTMLDivElement>;
    private readonly dropdownRef: React.RefObject<HTMLDivElement>;

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

        this.targetRef = React.createRef();
        this.dropdownRef = React.createRef();
    }

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
            className,
            value,
            format,
            error,
            disabled,
            alignment,
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

        const classNames = classnames('cssClass[monthYearPicker]', className);

        return (
            <div className={classNames} ref={this.targetRef}>
                <MonthYearInput
                    {...htmlProps}
                    value={inputValue}
                    focused={focused}
                    disabled={disabled}
                    error={error}
                    onFocus={this.handleFocus}
                    placeholder={placeholder}
                />
                <Dropdown opened={focused} targetRef={this.targetRef} forwardedRef={this.dropdownRef} alignment={alignment}>
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
                </Dropdown>
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
    private handleClickOutside = (event: UIEvent) => {
        const {focused} = this.state;
        const {current: target} = this.targetRef;
        const {current: dropdown} = this.dropdownRef;

        if (focused) {
            if (!target?.contains(event.target as Node) && !dropdown?.contains(event.target as Node)) {
                this.handleBlur();
            }
        }
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
