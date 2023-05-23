import * as React from 'react';
import {EInputGroupPosition} from '@sberbusiness/triplex/desktop/components/InputGroup/InputGroup';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {TFormatCharacters} from '@sberbusiness/triplex/desktop/components/MaskedInputDeprecated/types';
import {EVENT_KEYS} from '@sberbusiness/triplex/desktop/utils/keyboard';
import {MaskedInputDeprecatedBehavior} from './MaskedInputDeprecatedBehavior';

/** Свойства компонента маскированного поля ввода. */
export interface IMaskedInputDeprecatedProps extends Omit<React.HTMLProps<HTMLInputElement>, 'onChange' | 'placeholder'> {
    /** Значение. */
    value: string;
    /** Маска ввода. */
    mask: string;
    /** Обработчик изменения значения. */
    onChange: (value: string, event?: React.SyntheticEvent<HTMLInputElement>) => void;
    /** Обработчик вставки значения из буфера обмена. */
    onPaste?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
    /** Функция-валидатор значения (при невалидном вводе значение поля и положение каретки не изменится). */
    validate?: (value: string) => boolean;
    /** Символ-заполнитель (по умолчанию "_"). */
    placeholderChar?: string;
    /** Маска заполнителя (например, строка вида "дд.мм.гггг"). */
    placeholderAsMask?: string;
    /** Конфигурация для работы с маской. */
    formatCharacters?: TFormatCharacters;
    /** Позиция внутри компонента InputGroup. */
    groupPosition?: EInputGroupPosition;
    /** Состояние фокуса. */
    focused?: boolean;
    /** Состояние ошибки. */
    error?: boolean;
    /** Режим замены символов при вводе. */
    overtype?: boolean;
    /** Установить ссылку на элемент. */
    setRef?: (ref: HTMLInputElement) => void;
}

/** Состояние компонента маскированного поля ввода. */
export interface IMaskedInputDeprecatedState {
    /** Признак того, что сейчас компонент в фокусе. */
    focused: boolean;
}

const mapInputGroupPositionToCSSClass = {
    [EInputGroupPosition.LEFT]: 'cssClass[left]',
    [EInputGroupPosition.INTERMEDIATE]: 'cssClass[intermediate]',
    [EInputGroupPosition.RIGHT]: 'cssClass[right]',
};

/** Компонент маскированного поля ввода. */
export class MaskedInputDeprecated extends React.PureComponent<IMaskedInputDeprecatedProps, IMaskedInputDeprecatedState> {
    public static displayName = 'MaskedInput';

    public state: IMaskedInputDeprecatedState = {
        focused: false,
    };

    /** Библиотека для работы с маской. */
    protected maskedInputBehavior: MaskedInputDeprecatedBehavior;
    /** Сохранённое по рефам поле ввода. */
    protected input?: HTMLInputElement;

    constructor(props: Readonly<IMaskedInputDeprecatedProps>) {
        super(props);
        const {mask, value, formatCharacters, placeholderChar, overtype, validate, placeholderAsMask} = props;

        this.maskedInputBehavior = new MaskedInputDeprecatedBehavior({
            formatCharacters,
            overtype: overtype,
            pattern: mask,
            placeholderChar,
            placeholderAsMask,
            validate,
            value,
        });
    }

    public componentDidMount(): void {
        const {value, focused} = this.props;

        if (focused) this.input?.focus();
        this.maskedInputBehavior.setValue(value);
    }

    public componentDidUpdate(prevProps: IMaskedInputDeprecatedProps): void {
        const {value: prevValue, mask: prevMask} = prevProps;
        const {value, mask} = this.props;

        // Обновляем значение маски, если значение изменилось.
        if (value !== prevValue) {
            this.maskedInputBehavior.setValue(value);
            this.forceUpdate();
        }

        // Обновляем шаблон, если маска изменилась.
        if (prevMask !== mask) {
            this.maskedInputBehavior.setPattern(mask, {
                placeholderAsMask: this.props.placeholderAsMask,
                value: value === prevValue ? this.maskedInputBehavior.getRawValue() : value,
            });

            this.forceUpdate();
        }
    }

    /**
     * Сохраняет Ref-ссылку на поле ввода.
     *
     * @param {HTMLInputElement} input Поле ввода.
     */
    public saveInputElement = (input: HTMLInputElement): void => {
        const {setRef} = this.props;

        this.input = input;
        setRef?.(input);
    };

    public render(): React.ReactNode {
        const {
            props: {
                className,
                value,
                mask: omittedMask,
                formatCharacters: omittedFormatCharacters,
                validate: omittedValidate,
                overtype: omittedOvertype,
                placeholderAsMask: omittedPlaceholderAsMask,
                onChange: omittedOnChange,
                readOnly,
                groupPosition,
                focused,
                disabled,
                error,
                setRef,
                ...props
            },
            maskedInputBehavior,
            handleChange,
            handleKeyDown,
            handleKeyPress,
            handlePaste,
            handleFocus,
            handleBlur,
            handleCut,
            saveInputElement,
        } = this;

        const classNames = classnames(
            'cssClass[input]',
            {'cssClass[empty]': !value},
            groupPosition && mapInputGroupPositionToCSSClass[groupPosition],
            {'cssClass[error]': !!error, 'cssClass[focus]': !!focused},
            className
        );

        return (
            <div className={classnames('cssClass[wrapper]', {'cssClass[grouped]': !!groupPosition})}>
                <input
                    tabIndex={-1}
                    className="cssClass[placeholder]"
                    value={maskedInputBehavior.getPlaceholderValue()}
                    disabled={disabled}
                    readOnly
                />
                <input
                    {...props}
                    className={classNames}
                    value={maskedInputBehavior.getValue()}
                    maxLength={maskedInputBehavior.pattern.length}
                    autoComplete="off"
                    onChange={handleChange}
                    onPaste={handlePaste}
                    onCut={handleCut}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    onKeyPress={handleKeyPress}
                    spellCheck={false}
                    disabled={disabled}
                    ref={saveInputElement}
                />
            </div>
        );
    }

    /**
     * Обработчик изменения значения поля ввода.
     */
    public handleChange = (): void => {
        // не вызывается, если не указать его в инпуте, то в консоли ошибка:
        // Failed prop type: You provided a `value` prop to a form field without an `onChange` handler.
        // This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`
        // но наш инпут является изменяемым, а defaultValue не обновляется при изменении пропсы
    };

    /**
     * Обработчик нажатия на клавишу.
     *
     * @param {React.KeyboardEvent<HTMLInputElement>} event Событие.
     */
    private handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const {currentTarget: input} = event;
        const {
            maskedInputBehavior,
            props: {onChange, onKeyDown, validate},
        } = this;
        const {key} = event.nativeEvent;

        let old: string;
        let value = '';
        let changed: boolean;

        if ((event.ctrlKey || event.metaKey) && (event.shiftKey ? EVENT_KEYS.Y : EVENT_KEYS.Z).indexOf(key) !== -1) {
            // Отмена
            event.preventDefault();
            if (maskedInputBehavior.undo()) {
                input.value = maskedInputBehavior.getValue();
                input.setSelectionRange(maskedInputBehavior.selection.start, maskedInputBehavior.selection.end);

                onChange?.(input.value === maskedInputBehavior.emptyValue ? '' : input.value, event);
            }
            return;
        } else if ((event.ctrlKey || event.metaKey) && (event.shiftKey ? EVENT_KEYS.Z : EVENT_KEYS.Y).indexOf(key) !== -1) {
            // Повтор
            event.preventDefault();
            if (maskedInputBehavior.redo()) {
                input.value = maskedInputBehavior.getValue();
                input.setSelectionRange(maskedInputBehavior.selection.start, maskedInputBehavior.selection.end);

                onChange?.(input.value === maskedInputBehavior.emptyValue ? '' : input.value, event);
            }
            return;
        } else if (EVENT_KEYS.BACKSPACE.indexOf(key) !== -1) {
            event.preventDefault();
            maskedInputBehavior.selection = {
                end: input.selectionEnd || 0,
                start: input.selectionStart || 0,
            };
            old = input.value;
            changed = false;
            let inputValue = old;
            while (maskedInputBehavior.backspace()) {
                changed = true;
                inputValue = maskedInputBehavior.getValue();
                value = inputValue === maskedInputBehavior.emptyValue ? '' : inputValue;
                if (value !== old) {
                    break;
                }
            }
            if (changed && (!validate || maskedInputBehavior.isIncomplete() || validate(value))) {
                input.value = inputValue;
                input.setSelectionRange(maskedInputBehavior.selection.start, maskedInputBehavior.selection.end);

                onChange?.(value, event);
            }
            return;
        } else if (EVENT_KEYS.DELETE.indexOf(key) !== -1) {
            event.preventDefault();
            maskedInputBehavior.selection = {
                end: input.selectionEnd || 0,
                start: input.selectionStart || 0,
            };
            old = input.value;
            maskedInputBehavior.del();
            const inputValue = maskedInputBehavior.getValue();
            value = inputValue === maskedInputBehavior.emptyValue ? '' : inputValue;
            if (inputValue !== old && (!validate || maskedInputBehavior.isIncomplete() || validate(value))) {
                input.value = inputValue;
                input.setSelectionRange(maskedInputBehavior.selection.start, maskedInputBehavior.selection.end);

                onChange?.(value, event);
            }
            return;
        } else if (EVENT_KEYS.ARROW_RIGHT.indexOf(key) !== -1) {
            const firstFreePosition = this.maskedInputBehavior.getFirstFreePosition();
            if ((input.selectionEnd || 0) === firstFreePosition && input.selectionDirection == 'forward') {
                event.preventDefault();
            }
        } else if (EVENT_KEYS.ARROW_LEFT.indexOf(key) !== -1) {
            const firstFreePosition = this.maskedInputBehavior.getFirstFreePosition();
            if ((input.selectionStart || 0) === firstFreePosition && input.selectionDirection == 'backward') {
                event.preventDefault();
            }
        } else if (event.metaKey && EVENT_KEYS.X.indexOf(key) !== -1) {
            //fix for Safari
            this.handleCut((event as unknown) as React.ClipboardEvent<HTMLInputElement>);
        }

        onKeyDown?.(event);
    };

    /**
     * Обработчик нажатия символьных клавиш, пробела и backspace.
     *
     * @param {React.KeyboardEvent<HTMLInputElement>} event Событие.
     */
    private handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const {currentTarget: input} = event;
        const {
            maskedInputBehavior,
            props: {onChange},
        } = this;

        maskedInputBehavior.selection = {
            end: input.selectionEnd || 0,
            start: input.selectionStart || 0,
        };

        maskedInputBehavior.setValue(input.value);

        if (maskedInputBehavior.input(event.key)) {
            const value = maskedInputBehavior.getValue();
            input.value = value;
            input.setSelectionRange(maskedInputBehavior.selection.start, maskedInputBehavior.selection.end);

            onChange?.(value, event);
        }
    };

    /**
     * Обработчик вставки текста из буфера обмена.
     *
     * @param {React.ClipboardEvent<HTMLInputElement>} event Событие.
     */
    private handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        if (event && event.clipboardData) {
            event.preventDefault();
            const text = event.clipboardData.getData('Text');
            const {currentTarget: input} = event;
            const {
                maskedInputBehavior,
                props: {onChange, onPaste},
            } = this;

            if (onPaste) {
                onPaste(event);
            } else {
                maskedInputBehavior.selection = {
                    end: input.selectionEnd || 0,
                    start: input.selectionStart || 0,
                };
                if (!maskedInputBehavior.paste(text)) {
                    return;
                }
                const value = maskedInputBehavior.getValue();

                input.value = value;
                input.setSelectionRange(maskedInputBehavior.selection.start, maskedInputBehavior.selection.end);

                onChange?.(value, event);
            }
        }
    };

    /**
     * Обработчик фокуса на поле ввода.
     *
     * @param {React.FocusEvent<HTMLInputElement>} event Событие.
     */
    private handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        const {currentTarget: input} = event;
        const {onFocus} = this.props;

        requestAnimationFrame(() => {
            const firstFreePosition = this.maskedInputBehavior.getFirstFreePosition();

            if (firstFreePosition > input.selectionStart! && input.selectionStart === input.selectionEnd) {
                input.setSelectionRange(firstFreePosition, firstFreePosition);
            }
        });

        this.setState({focused: true}, () => onFocus?.(event));
    };

    /**
     * Обработчик потери фокуса с поля ввода.
     *
     * @param {React.FocusEvent<HTMLInputElement>} event Событие.
     */
    private handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const {onBlur} = this.props;

        this.setState({focused: false}, () => onBlur?.(event));
    };

    /**
     * Обработчик события вырезания
     *
     * @param {React.ClipboardEvent<HTMLInputElement>} event Событие.
     */
    private handleCut = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        const {currentTarget: input} = event;
        //Если нет выделения текста
        if (!(input.selectionStart !== null && input.selectionEnd !== null && input.selectionStart !== input.selectionEnd)) {
            return;
        }

        document.execCommand('copy');
        const {
            maskedInputBehavior,
            props: {onChange, validate},
        } = this;
        maskedInputBehavior.selection = {
            end: input.selectionEnd || 0,
            start: input.selectionStart || 0,
        };

        const old = input.value;

        maskedInputBehavior.del();

        const inputValue = maskedInputBehavior.getValue();
        const value = inputValue === maskedInputBehavior.emptyValue ? '' : inputValue;

        if (inputValue !== old && ((!validate && maskedInputBehavior.isIncomplete()) || (validate && validate(value)))) {
            input.value = inputValue;
            input.setSelectionRange(maskedInputBehavior.selection.start, maskedInputBehavior.selection.end);

            onChange?.(value, event);
        }
        return;
    };
}
