import React, {useState, useEffect, useCallback, useRef} from 'react';
import MaskedInputTextMask, {conformToMask, MaskedInputProps, PipeConfig} from 'react-text-mask';
import {Input} from '@sberbusiness/triplex/components/Input/Input';
import {EInputGroupPosition} from '@sberbusiness/triplex/components/InputGroup/InputGroup';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {presets, TMaskedInputPresets} from '@sberbusiness/triplex/components/MaskedInput/presets';

/** Маска. Каждый элемент массива должен быть либо строкой, либо регулярным выражением. Каждая строка — это фиксированный символ в маске, а каждое регулярное выражение — это заполнитель, который принимает пользовательский ввод.
 * Подробнее можно ознакомиться https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#mask.
 * */
export type TMaskedInputMask = Array<string | RegExp>;

export interface IMaskedInputProps extends Omit<MaskedInputProps, 'guide' | 'mask' | 'render'> {
    value: string;
    /** Состояние ошибки. */
    error?: boolean;
    /** Позиция внутри компонента InputGroup. */
    groupPosition?: EInputGroupPosition;
    /** Ссылка на поле ввода. */
    forwardedRef?: React.Ref<HTMLInputElement>;
    /** Маска. Каждый элемент массива должен быть либо строкой, либо регулярным выражением. Каждая строка — это фиксированный символ в маске, а каждое регулярное выражение — это заполнитель, который принимает пользовательский ввод.
     * Подробнее можно ознакомиться https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#mask.
     * */
    mask: TMaskedInputMask;
    /** Плейсхолдер, отображаемый при вводе. Например: дд.мм.гггг, при вводе будет отображаться как 22.1м.гггг. */
    placeholderMask?: string;
}

export interface IIMaskedInputFC extends React.FC<IMaskedInputProps> {
    presets: TMaskedInputPresets;
}

const mapInputGroupPositionToCSSClass = {
    [EInputGroupPosition.LEFT]: 'cssClass[left]',
    [EInputGroupPosition.INTERMEDIATE]: 'cssClass[intermediate]',
    [EInputGroupPosition.RIGHT]: 'cssClass[right]',
};

/**
 * Компонент маскированного ввода.
 * Основан на https://github.com/text-mask/text-mask.
 */
export const MaskedInput: IIMaskedInputFC = ({
    className,
    forwardedRef,
    disabled,
    groupPosition,
    mask,
    onChange,
    placeholder,
    placeholderChar = '0',
    placeholderMask,
    value,
    style,
    ...inputProps
}) => {
    // Значение инпута, отображающего часть введенного значения и оставшуюся маску.
    const [placeholderValue, setPlaceholderValue] = useState('');
    const pasted = useRef(false);

    useEffect(() => {
        /**
         * Возвращает значение placeholderValue.
         */
        const calculatePlaceholderValue = (): string => {
            // Массив символов placeholderValue.
            let nextPlaceholderValue: string[] = [];

            // Значение инпута остутствует.
            if (!value) {
                // Передан props placeholderMask, например дд.мм.гггг
                if (placeholderMask) {
                    // При наличии маски плейсхолдера, placeholderValue равен маски плейсхолдера.
                    nextPlaceholderValue = placeholderMask.split('');
                } else {
                    // Маска с символами заполнения, например 00.00.00
                    const {conformedValue} = conformToMask('', mask, {guide: true, placeholderChar});
                    nextPlaceholderValue = conformedValue.split('');
                }
            } else {
                // Инпут имеет value.

                // Value с маской, например: 22.00.00
                const {conformedValue} = conformToMask(value.toString(), mask, {guide: true, placeholderChar});

                // Символы placeholderValue собираются из введенного пользователем значения и оставшейся части из placeholderMask или placeholderChar.
                for (let i = 0; i < mask.length; i++) {
                    // Не редактируемый символ маски.
                    if (typeof mask[i] === 'string') {
                        // Символ из маски.
                        nextPlaceholderValue[i] = conformedValue[i];
                    } else {
                        // Не введенный пользователем символ заполняется символом placeholderMask или placeholderChar.
                        if (conformedValue[i] === placeholderChar && !value.toString()[i]) {
                            nextPlaceholderValue[i] = placeholderMask?.[i] || placeholderChar;
                        } else {
                            nextPlaceholderValue[i] = conformedValue[i];
                        }
                    }
                }
            }

            return nextPlaceholderValue.join('');
        };

        setPlaceholderValue(calculatePlaceholderValue());
    }, [value, mask, placeholderChar, placeholderMask]);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const {value: nextValue} = event.target;

            pasted.current = false;

            if (value !== nextValue) {
                onChange?.(event);
            }
        },
        [value, onChange]
    );

    const handlePaste = () => {
        pasted.current = true;
    };

    // Постобработчик введенных значений. Выполняется после внутреннего форматирования и до onChange.
    const pipe = (conformedValue: string, config: PipeConfig) => {
        // Для маски с номером телефона отдельный обработчик.
        if (mask === MaskedInput.presets.masks.phone) {
            // Пустое значение не обрабатывается, чтобы значение в инпуте можно было стереть полностью.
            if (!conformedValue.length) {
                return conformedValue;
            }

            return phonePipe(config.rawValue);
        }

        return conformedValue;
    };

    // Постобработчик введенных значений, если маска является номером телефона.
    const phonePipe = (text: string) => {
        let indexesOfPipedChars: number[] = [];

        if (pasted.current) {
            // Выражение для поиска чисел из 1 цифры и более, начинающихся с 7 или 8
            let regEx = /^[78]((\D*\d)*)/;

            text = text.replace(regEx, '+7 ($1');

            // Выражение для поиска чисел вида {любая цифра}7, например 87, 971 и т.д.
            regEx = /^\d7/;

            // Если вторая цифра номера 7, добавляется +7 перед этим, иначе conformToMask вместо 9701234567 вернет +7901234567.
            text = text.replace(regEx, (match) => {
                indexesOfPipedChars = Array.from('+7 (').map((_, i) => i);
                return `+7 (${match}`;
            });
        } else if (text === '7' || text === '8') {
            // Если первая введенная цифра 7 или 8, заменяем её на +7 (
            text = '+7 (';
        }

        return {indexesOfPipedChars, value: conformToMask(text, mask, {guide: false, placeholderChar}).conformedValue};
    };

    // Возвращает value, для передачи в компоненты рендера. Для некоторых типов масок, value приходится модифицировать из-за багов.
    const getValue = (): string => {
        if (mask === MaskedInput.presets.masks.phone) {
            value = phonePipe(value).value;
            return value;
        }

        return conformToMask(value, mask, {guide: false, placeholderChar}).conformedValue;
    };

    /** Функция для хранения ссылки. */
    const setRef = (ref: (inputElement: HTMLElement) => void) => (instance: HTMLInputElement | null) => {
        instance && ref(instance);
        if (typeof forwardedRef === 'function') {
            forwardedRef(instance);
        } else if (forwardedRef) {
            (forwardedRef as React.MutableRefObject<HTMLInputElement | null>).current = instance;
        }
    };

    return (
        <div className={classnames('cssClass[maskedInputWrapper]', {'cssClass[grouped]': !!groupPosition})}>
            {/* Input, отображающий маску. */}
            <Input
                className={classnames(
                    'cssClass[maskedInputPlaceholder]',
                    groupPosition && mapInputGroupPositionToCSSClass[groupPosition],
                    className
                )}
                disabled={disabled}
                onChange={() => {}}
                placeholder={!value && placeholder ? '' : placeholderValue}
                readOnly
                aria-hidden="true"
                tabIndex={-1}
                style={style}
            />

            {/* Input, отображающий введенное значение. */}
            <MaskedInputTextMask
                className={classnames(
                    'cssClass[maskedInput]',
                    groupPosition && mapInputGroupPositionToCSSClass[groupPosition],
                    {'cssClass[error]': Boolean(inputProps.error)},
                    className
                )}
                // https://github.com/text-mask/text-mask/pull/993
                defaultValue=""
                disabled={disabled}
                /* Input отображает только введенное значение без маски, маска рисуется в inputPlaceholder. */
                guide={false}
                render={(ref, props) => <Input {...props} placeholder={placeholder || ''} ref={setRef(ref)} />}
                mask={mask}
                onChange={handleChange}
                onPaste={handlePaste}
                placeholderChar={placeholderChar}
                // value={value} не используется т.к. возникает баг при передаче снаружи изначально пустого value, а затем не пустого.
                value={getValue()}
                pipe={pipe}
                style={style}
                {...inputProps}
            />
        </div>
    );
};

MaskedInput.presets = presets;
