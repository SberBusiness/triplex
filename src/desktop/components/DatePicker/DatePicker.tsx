import * as React from 'react';
import moment, {Moment} from 'moment';
import {DateInput} from '@sberbusiness/triplex/desktop/components/DatePicker/components/DateInput';
import {inputDateFormat} from '@sberbusiness/triplex/desktop/components/DatePicker/const';
import {Calendar} from '@sberbusiness/triplex/desktop/components/Calendar/Calendar';
import {ICalendarNestedProps} from '@sberbusiness/triplex/desktop/components/Calendar/types';
import {Dropdown, EDropdownAlignment} from '@sberbusiness/triplex/desktop/components/Dropdown/Dropdown';
import {IDateLimitRange} from '@sberbusiness/triplex/desktop/common/types/DateTypes';
import {dateFormatYYYYMMDD, globalLimitRange} from '@sberbusiness/triplex/desktop/common/consts/DateConst';
import {getFormattedDate} from '@sberbusiness/triplex/desktop/utils/dateUtils';
import {EVENT_KEYS} from '@sberbusiness/triplex/desktop/utils/keyboard';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

/** Свойства DatePicker. */
export interface IDatePickerProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'type' | 'onChange' | 'onBlur'>,
        ICalendarNestedProps {
    /** Использование запрещено. */
    children?: never;
    /** Отображаемая по умолчанию дата. */
    defaultViewDate?: string;
    /** Неактивное состояние. */
    disabled?: boolean;
    /** Состояние ошибки. */
    error?: boolean;
    /** Формат для значения. */
    format?: string;
    /** Выравнивание календаря по горизонтали. */
    alignment?: EDropdownAlignment;
    /** Диапазон даты начала и конца периода ограничения. */
    limitRange?: IDateLimitRange;
    /** Отмеченные дни. */
    markedDays?: string[];
    /** Отключенные дни */
    disabledDays?: string[];
    /** Callback для события потери фокуса. */
    onBlur?: () => void;
    /** Callback для события изменения значения. */
    onChange: (date: string) => void;
    /** Символы для заполнения пустых редактируемых позиций в маске (например, строка вида "дд.мм.гггг"). */
    placeholderAsMask?: string;
    /** Обратный порядок выбора даты. */
    reversedPick?: boolean;
    /** Значение даты текстом. */
    value: string;
}

/** Состояния DatePicker. */
interface IDatePickerState {
    /** Value для компонента Calendar. */
    calendarValue: Moment | null;
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
const checkOutOfRange = (date: Moment, limitRange: IDateLimitRange): boolean =>
    date.isBefore(limitRange.dateFrom, 'day') || date.isAfter(limitRange.dateTo, 'day');

/** Проверяет дату на disabled. */
const checkDisabled = (inputDate: Moment, disabledDays: string[] | undefined, format: string) => {
    if (!disabledDays) {
        return;
    }

    const inputDateFormatted = inputDate.format(format);
    return !disabledDays.every((disabledDay) => disabledDay !== inputDateFormatted);
};

/** Компонент ввода и выбора даты. */
export class DatePicker extends React.PureComponent<IDatePickerProps, IDatePickerState> {
    public static defaultProps = {
        format: dateFormatYYYYMMDD,
        limitRange: globalLimitRange,
        alignment: EDropdownAlignment.LEFT,
    };

    private readonly targetRef: React.RefObject<HTMLDivElement>;
    private readonly dropdownRef: React.RefObject<HTMLDivElement>;

    constructor(props: IDatePickerProps) {
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

    public componentDidUpdate(prevProps: Readonly<IDatePickerProps>): void {
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
            error,
            defaultViewDate,
            disabled,
            format,
            limitRange: limitRangeProp,
            markedDays,
            disabledDays,
            onBlur,
            onChange,
            reversedPick,
            value,
            alignment,
            dayHtmlAttributes,
            monthHtmlAttributes,
            yearHtmlAttributes,
            prevButtonProps,
            nextButtonProps,
            changeViewLinkProps,
            placeholderAsMask,
            ...htmlProps
        } = this.props;
        const {calendarValue, focused, inputValue, limitRange} = this.state;

        const classNames = classnames('cssClass[datePicker]', className);

        return (
            <div className={classNames} ref={this.targetRef}>
                <DateInput
                    {...htmlProps}
                    value={inputValue}
                    disabled={disabled}
                    focused={focused}
                    error={error}
                    onFocus={this.handleFocus}
                    onChange={this.handleValueChangeFromInput}
                    onKeyDown={this.handleInputKeyDown}
                    onBlur={this.handleInputBlur}
                    placeholderAsMask={placeholderAsMask}
                />
                <Dropdown opened={focused} targetRef={this.targetRef} forwardedRef={this.dropdownRef} alignment={alignment}>
                    <Calendar
                        pickedDate={calendarValue}
                        limitRange={limitRange}
                        markedDays={markedDays}
                        defaultViewDate={defaultViewDate}
                        disabledDays={disabledDays}
                        onChangeDate={this.handleValueChangeFromCalendar}
                        onBlur={this.handleBlur}
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

    /**
     * Обработчик нажатия с клавиатуры.
     * @param {React.KeyboardEvent<HTMLInputElement>} e Событие нажатия клавиши.
     */
    private handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (EVENT_KEYS.ENTER.includes(e.key)) {
            this.makeValueChangeFromInput();
        }
    };

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
        let inputValue = value;
        const date = moment(inputValue, format, true);

        if (value && date.isValid()) {
            inputValue = date.format(inputDateFormat);
        }

        return inputValue;
    };

    private setCalendarValue = (): void => {
        const {calendarValue} = this.state;
        const nextCalendarValue = this.getCalendarValueFromValue();

        if (!nextCalendarValue || !calendarValue || !moment(nextCalendarValue).isSame(calendarValue)) {
            this.setState({
                calendarValue: nextCalendarValue,
            });
        }
    };

    private getCalendarValueFromValue = (): Moment | null => {
        const {format, value} = this.props;
        const lastValidValue = this.state ? this.state.lastValidValue : '';
        let calendarValue = null;

        if (value) {
            const date = moment(value, format, true);

            if (date.isValid()) {
                calendarValue = date;
            } else if (lastValidValue) {
                calendarValue = moment(lastValidValue);
            }
        }

        return calendarValue;
    };

    /** Вызов изменения значения по текущему внутреннему состоянию Input. */
    private makeValueChangeFromInput = () => {
        const {onChange, format, disabledDays} = this.props;
        const {inputValue, lastValidValue, limitRange} = this.state;

        if (inputValue === '' && inputValue !== lastValidValue) {
            onChange('');
        }

        const inputDate: Moment = moment(inputValue, inputDateFormat, true);

        const checkSuccess =
            inputDate.isValid() && !checkOutOfRange(inputDate, limitRange) && !checkDisabled(inputDate, disabledDays, format!);
        if (checkSuccess) {
            const newValue = inputDate.format(format);
            if (newValue !== lastValidValue) {
                onChange(newValue);
            }
        } else {
            // возврат состояния к value, которое валидно в этом случае и равно lastValidValue
            this.setCalendarValue();
            this.setInputValue();
        }
    };

    /** Обработчик установки фокуса. */
    private handleFocus = (): void => {
        this.setState({focused: true});
    };

    /** Обработчик потери фокуса. */
    private handleBlur = (): void => {
        this.setState({focused: false});

        // Не обходимо чтобы onBlur был всегда позже onChange (Не правильная последовательность происходит
        // при замене не валидного значения валидным при потере фокуса)
        setTimeout(() => {
            if (this.props.onBlur) {
                this.props.onBlur();
            }
        });
    };

    /**
     * Обработчик потери фокуса поля ввода даты.
     */
    private handleInputBlur = (): void => {
        this.makeValueChangeFromInput();
    };

    /**
     * Обработчик изменения даты из поля для ввода.
     */
    private handleValueChangeFromInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target;
        const inputDate: Moment = moment(event.target.value, inputDateFormat, true);
        if (inputDate.isValid()) {
            this.setState({
                inputValue: value,
                calendarValue: inputDate,
            });
        } else {
            this.setState({
                inputValue: value,
            });
        }
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
    private setLastValidValue = (value: string | null, format: string | undefined): void => {
        const {lastValidValue, limitRange} = this.state;
        const {onChange} = this.props;

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
            onChange(lastValidValue);
            return;
        }

        const isOutOfRangeValue = checkOutOfRange(date, limitRange);
        if (isOutOfRangeValue) {
            onChange(lastValidValue);
            return;
        }

        this.setState({lastValidValue: value});
    };
}
