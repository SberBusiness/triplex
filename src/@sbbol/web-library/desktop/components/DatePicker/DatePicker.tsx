import {dateFormatYYYYMMDD, globalLimitRange} from '@sbbol/web-library/desktop/common/consts/DateConst';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {ICalendarNestedProps, TPickedDate} from '@sbbol/web-library/desktop/components/Calendar/types';
import {IDateLimitRange} from '@sbbol/web-library/desktop/common/types/DateTypes';
import {Calendar} from '@sbbol/web-library/desktop/components/Calendar/Calendar';
import {DateInput} from '@sbbol/web-library/desktop/components/DatePicker/components/DateInput';
import {inputDateFormat} from '@sbbol/web-library/desktop/components/DatePicker/const';
import moment, {Moment} from 'moment';
import * as React from 'react';
import {getFormattedDate} from '@sbbol/web-library/desktop/utils/dateUtils';
import {EVENT_KEYS} from '@sbbol/web-library/desktop/utils/keyboard';

/** Направление открытия календаря. */
export enum EDatePickerOrientation {
    BOTTOM,
    TOP,
}

export interface IDatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onBlur'>, ICalendarNestedProps {
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
    /** Диапазон даты начала и конца периода ограничения. */
    limitRange?: IDateLimitRange;
    /** Отмеченные дни. */
    markedDays?: string[];
    /** Отключенные дни */
    disabledDays?: string[];
    /** Callback для события потери фокуса. */
    onBlur?: () => void;
    /** Callback для события изменения значения. */
    onChange: (date: string | null) => void;
    /** Направление открытия календаря. */
    orientation?: EDatePickerOrientation;
    /** Символы для заполнения пустых редактируемых позиций в маске (например, строка вида "дд.мм.гггг"). */
    placeholderAsMask?: string;
    /**  Обратный порядок выбора даты. */
    reversedPick?: boolean;
    /** Значение даты текстом. */
    value: string | null;
}

interface IDatePickerState {
    /** Value для компонента Calendar. */
    calendarValue: TPickedDate;
    /** Фокус в поле открывает popover с выбором даты, а так же позволяет вводить дату вручную. */
    focused: boolean;
    /** Value для комопнента DateInput. */
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
        orientation: EDatePickerOrientation.BOTTOM,
    };

    constructor(props: IDatePickerProps) {
        super(props);
        const {value, format, limitRange} = props;

        this.state = {
            calendarValue: this.getCalendarValueFromValue(),
            focused: false,
            lastValidValue: value && moment(value, format, true).isValid() ? value : '',
            inputValue: this.getInputValueFromValue(),
            limitRange: {
                dateFrom: limitRange?.dateFrom || globalLimitRange.dateFrom,
                dateTo: limitRange?.dateTo || globalLimitRange.dateTo,
            },
        };
    }

    /** Ссылка на wrapper у DatePicker. */
    private datePickerWrapperNode: Node | null = null;

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
            orientation,
            reversedPick,
            value,
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

        const cn = classnames(className, 'cssClass[datePicker]', {
            'cssClass[topOrientation]': orientation === EDatePickerOrientation.TOP,
        });

        return (
            <div ref={this.setRef} className={cn}>
                <DateInput
                    {...htmlProps}
                    value={inputValue}
                    focused={focused}
                    disabled={disabled}
                    error={error}
                    onFocus={this.handleFocus}
                    onChange={this.handleValueChangeFromInput}
                    onKeyDown={this.handleInputKeyDown}
                    onBlur={this.handleInputBlur}
                    placeholderAsMask={placeholderAsMask}
                />
                {focused && (
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
                )}
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
        let inputValue = value ?? '';
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

    private getCalendarValueFromValue = (): TPickedDate => {
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
            onChange(null);
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
     * @param {string} date Новое значение поля даты.
     */
    private handleValueChangeFromInput = (date: string): void => {
        const inputDate: Moment = moment(date, inputDateFormat, true);
        if (inputDate.isValid()) {
            this.setState({
                inputValue: date,
                calendarValue: inputDate,
            });
        } else {
            this.setState({
                inputValue: date,
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
    private handleClickOutside = (event: Event) => {
        const {focused} = this.state;
        const wrapperContainsTarget = this.datePickerWrapperNode && !this.datePickerWrapperNode.contains(event.target as Node);

        if (wrapperContainsTarget && focused) {
            this.handleBlur();
        }
    };

    /**
     * Установить ссылку на wrapper у DatePicker.
     * @param {HTMLDivElement} el Элемент wrapper DatePicker.
     */
    private setRef = (el: HTMLDivElement) => {
        this.datePickerWrapperNode = el;
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
