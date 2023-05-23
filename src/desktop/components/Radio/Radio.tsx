import React, {useState, useRef} from 'react';
import {IRadioProps} from '@sberbusiness/triplex/desktop/components/Radio/types';
import {Text} from '@sberbusiness/triplex/desktop/components/Typography/Text';
import {ELineType, ETextSize} from '@sberbusiness/triplex/desktop/components/Typography/enums';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {EFocusSource} from '@sberbusiness/triplex/common/enums/EFocusSource';

/** Радио-кнопка с описанием. */
export const Radio = React.forwardRef<HTMLInputElement, IRadioProps>((props, ref) => {
    const {children, className, onFocus, onBlur, disabled, labelAttributes, ...inputAttributes} = props;
    const [focusVisible, setFocusVisible] = useState(false);
    const focusSource = useRef(EFocusSource.NONE);
    const classNames = classnames('cssClass[radio]', className);
    const labelClassNames = classnames(
        'cssClass[label]',
        {'cssClass[enabled]': !disabled, 'cssClass[nonempty]': !!children},
        labelAttributes?.className
    );
    const inputRef = useRef<HTMLInputElement | null>(null);

    /** Обработчик нажатия мыши. */
    const handleMouseDown = (event: React.MouseEvent<HTMLLabelElement>) => {
        if (!disabled) {
            if (focusSource.current === EFocusSource.NONE) {
                focusSource.current = EFocusSource.MOUSE;
            }
        }
        labelAttributes?.onMouseDown?.(event);
    };

    /** Обработчик клика. */
    const handleClick = (event: React.MouseEvent<HTMLLabelElement>) => {
        if (!disabled) {
            if (event.target === inputRef.current) {
                // Сбрасываем состояние, если событие пришло от радио-кнопки не в фокусе. (Safari)
                if (event.target !== document.activeElement) {
                    focusSource.current = EFocusSource.NONE;
                }
            } else if (focusSource.current === EFocusSource.NONE) {
                focusSource.current = EFocusSource.MOUSE;
            }
        }
        labelAttributes?.onClick?.(event);
    };

    /** Обработчик получения фокуса. */
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        if (focusSource.current !== EFocusSource.MOUSE) {
            focusSource.current = EFocusSource.KEYBOARD;
            setFocusVisible(true);
        } else if (focusVisible) {
            setFocusVisible(false);
        }
        onFocus?.(event);
    };

    /** Обработчик потери фокуса. */
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (focusSource.current !== EFocusSource.NONE) {
            // При переключении окон/вкладок состояние не сбрасываем.
            if (event.target !== document.activeElement) {
                focusSource.current = EFocusSource.NONE;
                setFocusVisible(false);
            }
        }
        onBlur?.(event);
    };

    /** Функция для хранения ссылки. */
    const setRef = (instance: HTMLInputElement | null) => {
        inputRef.current = instance;
        if (typeof ref === 'function') {
            ref(instance);
        } else if (ref) {
            ref.current = instance;
        }
    };

    return (
        <Text
            tag="label"
            size={ETextSize.B1}
            line={ELineType.EXTRA}
            {...labelAttributes}
            className={labelClassNames}
            onMouseDown={handleMouseDown}
            onClick={handleClick}
        >
            <input
                type="radio"
                className={classNames}
                onFocus={handleFocus}
                onBlur={handleBlur}
                disabled={disabled}
                data-focus-visible={focusVisible ? '' : undefined}
                ref={setRef}
                {...inputAttributes}
            />
            <span className="cssClass[radioIcon]" />
            {children}
        </Text>
    );
});

Radio.displayName = 'Radio';
