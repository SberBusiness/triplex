import React from 'react';
import FocusTrap from 'focus-trap-react';
import moment, {Moment} from 'moment';
import {DatePickerInput} from '@sberbusiness/triplex/components/DatePicker/components/DatePickerInput/DatePickerInput';
import {inputDateFormat} from '@sberbusiness/triplex/components/DatePicker/const';
import {Calendar} from '@sberbusiness/triplex/components/Calendar/Calendar';
import {ICalendarNestedProps} from '@sberbusiness/triplex/components/Calendar/types';
import {EDropdownAlignment} from '@sberbusiness/triplex/components/Dropdown/Dropdown';
import {IDateLimitRange} from '@sberbusiness/triplex/types/DateTypes';
import {IMaskedInputProps} from '@sberbusiness/triplex/components/MaskedInput/MaskedInput';
import {dateFormatYYYYMMDD, globalLimitRange} from '@sberbusiness/triplex/consts/DateConst';
import {getFormattedDate} from '@sberbusiness/triplex/utils/dateUtils';
import {isKey, EVENT_KEY_CODES} from '@sberbusiness/triplex/utils/keyboard';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {KeyDownListener} from '@sberbusiness/triplex/components/KeyDownListener/KeyDownListener';
import {DatePickerDropdown} from './components/DatePickerDropdown/DatePickerDropdown';

/** Свойства компонента DatePicker. */
export interface IDatePickerProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'type' | 'onChange'>,
        ICalendarNestedProps {
    /** Использование запрещено. */
    children?: never;
    /** Отображаемая по умолчанию дата. */
    defaultViewDate?: string;
    /** Неактивное состояние. */
    disabled?: boolean;
    /** Состояние ошибки. */
    error?: boolean;
    /** Свойства FocusTrap. Используется npm-пакет focus-trap-react. */
    focusTrapProps?: FocusTrap.Props;
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
    /** Callback для события изменения значения. */
    onChange: (date: string) => void;
    /** Символы для заполнения пустых редактируемых позиций в маске (например, строка вида "дд.мм.гггг"). */
    placeholderMask?: string;
    /** Обратный порядок выбора даты. */
    reversedPick?: boolean;
    /** Значение даты текстом. */
    value: string;
    /** Свойства поля ввода в Dropdown. */
    dropdownInputProps?: Omit<IMaskedInputProps, 'value' | 'type' | 'onChange' | 'mask' | 'placeholderMask'>;
}

type TDatePickerProps = typeof DatePicker.defaultProps & IDatePickerProps;

/** Состояния компонента DatePicker. */
interface IDatePickerState {
    /** Value для компонента Calendar. */
    calendarValue: Moment | null;
    /** Value для компонента DateInput. */
    inputValue: string;
    /** Последняя валидная дата. */
    lastValidValue: string;
    /** Фокус в поле открывает popover с выбором даты, а так же позволяет вводить дату вручную. */
    inputFocused: boolean;
    /** Dropdown выбора даты открыт. */
    dropdownOpen: boolean;
    /** Пользователь использует клавиатуру для навигации. В этом случае Dropdown не открывается при фокусе на поле ввода. */
    keyboardNavigation: boolean;
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
export class DatePicker extends React.PureComponent<TDatePickerProps, IDatePickerState> {
    public static defaultProps = {
        format: dateFormatYYYYMMDD,
        limitRange: globalLimitRange,
        alignment: EDropdownAlignment.LEFT,
    };

    private readonly targetRef: React.RefObject<HTMLDivElement>;
    private readonly dropdownRef: React.RefObject<HTMLDivElement>;

    constructor(props: TDatePickerProps) {
        super(props);
        const {value, format} = props;

        this.state = {
            inputValue: this.getInputValueFromValue(),
            calendarValue: this.getCalendarValueFromValue(),
            lastValidValue: moment(value, format, true).isValid() ? value : '',
            inputFocused: false,
            dropdownOpen: false,
            keyboardNavigation: true,
        };

        this.targetRef = React.createRef();
        this.dropdownRef = React.createRef();
    }

    public componentDidMount(): void {
        document.addEventListener('mousedown', this.handleClickOutside);
        document.addEventListener('touchstart', this.handleClickOutside);
    }

    public componentDidUpdate(prevProps: Readonly<IDatePickerProps>): void {
        const {value, format} = this.props;

        if (value != prevProps.value) {
            this.setLastValidValue(value, format);
            this.setCalendarValue();
            this.setInputValue();
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
            focusTrapProps,
            format,
            limitRange,
            markedDays,
            disabledDays,
            onBlur,
            onChange,
            reversedPick,
            value,
            alignment,
            'aria-label': ariaLabel,
            dropdownInputProps,
            dayHtmlAttributes,
            monthHtmlAttributes,
            yearHtmlAttributes,
            prevButtonProps,
            nextButtonProps,
            changeViewLinkProps,
            placeholderMask,
            ...htmlProps
        } = this.props;
        const {inputValue, inputFocused, dropdownOpen, keyboardNavigation} = this.state;

        const classNames = classnames('cssClass[datePicker]', className);

        return (
            <KeyDownListener onMatch={this.handleEsc} eventKeyCode={EVENT_KEY_CODES.ESCAPE}>
                <div className={classNames} onMouseDown={this.handleMouseDown} ref={this.targetRef}>
                    <DatePickerInput>
                        <DatePickerInput.Target
                            {...htmlProps}
                            value={inputValue}
                            placeholderMask={placeholderMask}
                            disabled={disabled}
                            error={error}
                            onFocus={this.handleFocusInput}
                            onBlur={this.handleBlurInput}
                            onChange={this.handleChangeInput}
                            onKeyDown={this.handleKeyDownInput}
                        />
                        <DatePickerInput.Icon
                            active={inputFocused}
                            disabled={disabled}
                            aria-label={ariaLabel}
                            onClick={this.handleClickInputIcon}
                        />
                    </DatePickerInput>
                    <DatePickerDropdown
                        opened={dropdownOpen}
                        setOpened={this.setDropdownOpen}
                        alignment={alignment}
                        focusTrapProps={focusTrapProps}
                        targetRef={this.targetRef}
                        role="dialog"
                        aria-modal="true"
                        ref={this.dropdownRef}
                        renderCalendar={this.renderCalendar}
                        keyboardNavigation={keyboardNavigation}
                        inputProps={{
                            ...dropdownInputProps,
                            value: inputValue,
                            placeholderMask,
                            autoFocus: inputFocused == true,
                            onChange: this.handleChangeInput,
                        }}
                    />
                </div>
            </KeyDownListener>
        );
    }

    /** Геттер значения поля ввода. */
    private getInputValueFromValue = (): string => {
        const {format, value} = this.props;
        const date = moment(value, format, true);
        let inputValue = value;

        if (value && date.isValid()) {
            inputValue = date.format(inputDateFormat);
        }

        return inputValue;
    };

    /** Геттер значения календаря. */
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

    /** Сеттер валидного значения даты. */
    private setLastValidValue = (value: string | null, format: string | undefined): void => {
        const {lastValidValue} = this.state;
        const {onChange, limitRange} = this.props;

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

        const isOutOfRangeValue = checkOutOfRange(date, this.getCompletedLimitRange(limitRange));
        if (isOutOfRangeValue) {
            onChange(lastValidValue);
            return;
        }

        this.setState({lastValidValue: value});
    };

    /** Сеттер значения поля ввода. */
    private setInputValue = (): void => {
        const {inputValue} = this.state;
        const nextInputValue = this.getInputValueFromValue();

        if (inputValue !== nextInputValue) {
            this.setState({inputValue: nextInputValue});
        }
    };

    /** Сеттер значения календаря. */
    private setCalendarValue = (): void => {
        const {calendarValue} = this.state;
        const nextCalendarValue = this.getCalendarValueFromValue();

        if (!nextCalendarValue || !calendarValue || !moment(nextCalendarValue).isSame(calendarValue)) {
            this.setState({calendarValue: nextCalendarValue});
        }
    };

    /** Сеттер состояния открытости выпадающего меню. */
    private setDropdownOpen = (opened: boolean, closedByCalendar?: boolean) => {
        if (opened) {
            this.setState({dropdownOpen: opened});
        } else {
            this.setState({dropdownOpen: opened, keyboardNavigation: true}, () => {
                if (!closedByCalendar) {
                    this.makeValueChangeFromInput();
                }
            });
        }
    };

    /** Обработчик клика вне компонента. */
    private handleClickOutside = (event: UIEvent) => {
        const {dropdownOpen} = this.state;
        const {current: target} = this.targetRef;
        const {current: dropdown} = this.dropdownRef;

        if (dropdownOpen) {
            if (!target?.contains(event.target as Node) && !dropdown?.contains(event.target as Node)) {
                this.setDropdownOpen(false);
            }
        }
    };

    /** Обработчик нажатия клавиши Escape. */
    private handleEsc = () => {
        this.setDropdownOpen(false);
    };

    /** Обработчик нажатия мыши. */
    private handleMouseDown = () => {
        this.setState({keyboardNavigation: false});
    };

    /** Обработчик установки фокуса поля ввода. */
    private handleFocusInput = (): void => {
        const {keyboardNavigation, dropdownOpen} = this.state;
        const nextState = {inputFocused: true, dropdownOpen};

        if (!keyboardNavigation) {
            nextState.dropdownOpen = true;
        }

        this.setState(nextState);
    };

    /** Обработчик потери фокуса поля ввода. */
    private handleBlurInput = (event: React.FocusEvent<HTMLInputElement>): void => {
        const {onBlur} = this.props;
        const {dropdownOpen} = this.state;

        this.setState({inputFocused: false}, () => {
            if (dropdownOpen == false) {
                this.makeValueChangeFromInput();
            }
        });

        onBlur?.(event);
    };

    /** Обработчик изменения даты из поля для ввода. */
    private handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target;
        const inputDate = moment(event.target.value, inputDateFormat, true);

        if (inputDate.isValid()) {
            this.setState({inputValue: value, calendarValue: inputDate});
        } else {
            this.setState({inputValue: value});
        }
    };

    /** Обработчик нажатия клавиши. */
    private handleKeyDownInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const {dropdownOpen} = this.state;
        const {onKeyDown} = this.props;
        const key = event.code || event.keyCode;

        if (isKey(key, 'ENTER')) {
            this.makeValueChangeFromInput();
        } else if (dropdownOpen) {
            if (isKey(key, 'TAB')) {
                // Фокус переходит на предыдущий элемент – закрываем Dropdown.
                if (event.shiftKey) {
                    this.setDropdownOpen(false);
                }
            }
        }

        onKeyDown?.(event);
    };

    /** Обработчик клика по иконке календаря. */
    private handleClickInputIcon = () => {
        const {dropdownOpen} = this.state;

        this.setDropdownOpen(!dropdownOpen);
    };

    /** Вызов изменения значения по текущему внутреннему состоянию Input. */
    private makeValueChangeFromInput = () => {
        const {onChange, format, disabledDays, limitRange} = this.props;
        const {inputValue, lastValidValue} = this.state;

        if (inputValue === '' && inputValue !== lastValidValue) {
            onChange('');
        }

        const inputDate: Moment = moment(inputValue, inputDateFormat, true);

        const checkSuccess =
            inputDate.isValid() &&
            !checkOutOfRange(inputDate, this.getCompletedLimitRange(limitRange)) &&
            !checkDisabled(inputDate, disabledDays, format);

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

    /** Отрисовка календаря. */
    private renderCalendar = (adaptiveMode: boolean) => {
        const {
            defaultViewDate,
            limitRange,
            markedDays,
            disabledDays,
            reversedPick,
            dayHtmlAttributes,
            monthHtmlAttributes,
            yearHtmlAttributes,
            prevButtonProps,
            nextButtonProps,
            changeViewLinkProps,
        } = this.props;
        const {calendarValue} = this.state;

        return (
            <Calendar
                defaultViewDate={defaultViewDate}
                pickedDate={calendarValue}
                limitRange={this.getCompletedLimitRange(limitRange)}
                markedDays={markedDays}
                disabledDays={disabledDays}
                reversedPick={reversedPick}
                adaptiveMode={adaptiveMode}
                onChangeDate={this.handleChangeDateCalendar}
                dayHtmlAttributes={dayHtmlAttributes}
                monthHtmlAttributes={monthHtmlAttributes}
                yearHtmlAttributes={yearHtmlAttributes}
                prevButtonProps={prevButtonProps}
                nextButtonProps={nextButtonProps}
                changeViewLinkProps={changeViewLinkProps}
            />
        );
    };

    /** Получить обогащённый диапазон дат на случай, если один из ограничителей не задан. */
    private getCompletedLimitRange = (limitRange: IDateLimitRange) => {
        return {...globalLimitRange, ...limitRange};
    };

    /** Обработчик изменения даты из календаря. */
    private handleChangeDateCalendar = (date: Moment): void => {
        const {onChange, format} = this.props;

        onChange(getFormattedDate(date, format));

        this.setDropdownOpen(false, true);
    };
}
