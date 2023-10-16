import React from 'react';
import moment, {Moment} from 'moment';
import FocusTrap from 'focus-trap-react';
import {DateInput} from '@sberbusiness/triplex/components/DatePicker/components/DateInput';
import {inputDateFormat} from '@sberbusiness/triplex/components/DatePicker/const';
import {Calendar} from '@sberbusiness/triplex/components/Calendar/Calendar';
import {ICalendarNestedProps} from '@sberbusiness/triplex/components/Calendar/types';
import {Dropdown, EDropdownAlignment} from '@sberbusiness/triplex/components/Dropdown/Dropdown';
import {IDateLimitRange} from '@sberbusiness/triplex/types/DateTypes';
import {dateFormatYYYYMMDD, globalLimitRange} from '@sberbusiness/triplex/consts/DateConst';
import {getFormattedDate} from '@sberbusiness/triplex/utils/dateUtils';
import {EVENT_KEY_CODES, EVENT_KEYS} from '@sberbusiness/triplex/utils/keyboard';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {KeyDownListener} from '@sberbusiness/triplex/components/KeyDownListener/KeyDownListener';

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

type TDatePickerProps = typeof DatePicker.defaultProps & IDatePickerProps;

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
    /** Dropdown выбора даты открыт. */
    opened: boolean;
    /** Активна ловушка фокуса внутри Dropdown. */
    focusTrapActive: boolean;
    /** Пользователь взаимодействует с компонентом через клавиатуру, а не мышь. В этом режиме Dropdown не открывается при фокусе на input. */
    accessibilityMode: boolean;
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
            accessibilityMode: true,
            calendarValue: this.getCalendarValueFromValue(),
            focused: false,
            focusTrapActive: false,
            opened: false,
            lastValidValue: moment(value, format, true).isValid() ? value : '',
            inputValue: this.getInputValueFromValue(),
        };

        this.targetRef = React.createRef();
        this.dropdownRef = React.createRef();
    }

    public componentDidMount(): void {
        document.addEventListener('mousedown', this.handleClickOutside);
        document.addEventListener('touchstart', this.handleClickOutside);
    }

    public componentDidUpdate(prevProps: Readonly<IDatePickerProps>, prevState: Readonly<IDatePickerState>): void {
        const {value, format} = this.props;
        const {opened} = this.state;
        const {opened: prevOpened} = prevState;

        if (value != prevProps.value) {
            this.setLastValidValue(value, format);
            this.setCalendarValue();
            this.setInputValue();
        }

        if (!prevOpened && opened) {
            this.setState({
                focusTrapActive: true,
            });
        } else if (prevOpened && !opened) {
            this.setState({
                focusTrapActive: false,
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
            limitRange,
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
        const {accessibilityMode, calendarValue, focused, focusTrapActive, inputValue, opened} = this.state;

        const classNames = classnames('cssClass[datePicker]', className);

        return (
            <KeyDownListener onMatch={this.handleEsc} eventKeyCode={EVENT_KEY_CODES.ESCAPE}>
                <div className={classNames} ref={this.targetRef}>
                    <DateInput
                        {...htmlProps}
                        value={inputValue}
                        disabled={disabled}
                        focused={focused}
                        error={error}
                        onClickIcon={this.handleClickCalendarIcon}
                        onBlur={this.handleInputBlur}
                        onFocus={this.handleFocus}
                        onChange={this.handleValueChangeFromInput}
                        onKeyDown={this.handleInputKeyDown}
                        onMouseDown={this.handleInputMouseDown}
                        placeholderAsMask={placeholderAsMask}
                    />
                    <Dropdown
                        opened={opened}
                        setOpened={this.setOpenedDropdown}
                        alignment={alignment}
                        targetRef={this.targetRef}
                        ref={this.dropdownRef}
                        aria-modal="true"
                        role="dialog"
                        aria-label={htmlProps['aria-label']}
                    >
                        <FocusTrap active={accessibilityMode && focusTrapActive} focusTrapOptions={{clickOutsideDeactivates: true}}>
                            <div>
                                <Calendar
                                    pickedDate={calendarValue}
                                    limitRange={limitRange}
                                    markedDays={markedDays}
                                    defaultViewDate={defaultViewDate}
                                    disabledDays={disabledDays}
                                    onChangeDate={this.handleValueChangeFromCalendar}
                                    reversedPick={reversedPick}
                                    dayHtmlAttributes={dayHtmlAttributes}
                                    monthHtmlAttributes={monthHtmlAttributes}
                                    yearHtmlAttributes={yearHtmlAttributes}
                                    prevButtonProps={prevButtonProps}
                                    nextButtonProps={nextButtonProps}
                                    changeViewLinkProps={changeViewLinkProps}
                                />
                            </div>
                        </FocusTrap>
                    </Dropdown>
                </div>
            </KeyDownListener>
        );
    }

    private handleClickCalendarIcon = () => {
        const {opened} = this.state;
        this.setOpenedDropdown(!opened);
    };

    private handleEsc = () => {
        this.setOpenedDropdown(false);
    };

    private setOpenedDropdown = (opened: boolean) => {
        this.setState({
            opened,
        });
    };

    /**
     * Обработчик нажатия мыши.
     */
    private handleInputMouseDown = () => {
        this.setState({
            accessibilityMode: false,
        });
    };

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
        const {onChange, format, disabledDays, limitRange} = this.props;
        const {inputValue, lastValidValue} = this.state;

        if (inputValue === '' && inputValue !== lastValidValue) {
            onChange('');
        }

        const inputDate: Moment = moment(inputValue, inputDateFormat, true);

        const checkSuccess =
            inputDate.isValid() && !checkOutOfRange(inputDate, limitRange) && !checkDisabled(inputDate, disabledDays, format);
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
        const {accessibilityMode, opened} = this.state;
        const nextState = {focused: true, opened};

        if (!accessibilityMode) {
            nextState.opened = true;
        }

        this.setState(nextState);
    };

    /**
     * Обработчик потери фокуса поля ввода даты.
     */
    private handleInputBlur = (): void => {
        const {onBlur} = this.props;

        this.makeValueChangeFromInput();

        this.setState({
            accessibilityMode: true,
            focused: false,
        });

        onBlur?.();
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

    private toggleDropdown = (opened: boolean) => {
        this.setState({
            opened,
        });
    };

    /**
     * Обработчик изменения даты из календаря.
     * @param {Moment} date Новое значение поля.
     */
    private handleValueChangeFromCalendar = (date: Moment): void => {
        const {onChange, format} = this.props;

        onChange(getFormattedDate(date, format));

        this.toggleDropdown(false);
    };

    /** При клике вне компонента скрываем выпадающий список. */
    private handleClickOutside = (event: UIEvent) => {
        const {focused} = this.state;
        const {current: target} = this.targetRef;
        const {current: dropdown} = this.dropdownRef;

        if (focused) {
            if (!target?.contains(event.target as Node) && !dropdown?.contains(event.target as Node)) {
                this.toggleDropdown(false);
            }
        }
    };

    /** Заполнение валидного значения даты. */
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

        const isOutOfRangeValue = checkOutOfRange(date, limitRange);
        if (isOutOfRangeValue) {
            onChange(lastValidValue);
            return;
        }

        this.setState({lastValidValue: value});
    };
}
