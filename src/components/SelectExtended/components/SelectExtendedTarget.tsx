import React, {useRef} from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {CaretdownSrvxIcon16} from '@sberbusiness/icons/CaretdownSrvxIcon16';
import {SpinnersmallAniIcon20} from '@sberbusiness/icons/SpinnersmallAniIcon20';
import {EVENT_KEY_CODES} from '../../../utils/keyboard';
import {TestProps} from '@sberbusiness/triplex/types/CoreTypes';
import {TestIds} from '@sberbusiness/triplex/dataTestIds/dataTestIds';

/** Свойства SelectExtendedTarget. */
export interface ISelectExtendedTargetProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'placeholder'>, TestProps {
    /** Отключенное состояние. */
    disabled?: boolean;
    /** Состояние ошибки. */
    error?: boolean;
    /** Текст, или компонент отображающий выбранное значение. */
    label?: React.ReactNode;
    /** Состояние загрузки. */
    loading?: boolean;
    /** Состояние открытости выпадающего списка. */
    opened: boolean;
    /** Текст, или компонент отображающий выбранное placeholder. */
    placeholder?: React.ReactNode;
    /** Функция открытия/закрытия выпадающего списка. */
    setOpened: (opened: boolean) => void;
}

/**
 * Компонент SelectTarget.
 * Видимая часть Select, при нажатии на которую открывается выпадающий список.
 */
export const SelectExtendedTarget = React.forwardRef<HTMLDivElement, ISelectExtendedTargetProps>((props, ref) => {
    const {
        children,
        className,
        label,
        placeholder,
        onKeyDown,
        onClick,
        opened,
        setOpened,
        loading,
        error,
        disabled,
        tabIndex,
        'data-test-id': dataTestId,
        ...rest
    } = props;
    const targetRef = useRef<HTMLDivElement | null>(null);
    const classNames = classnames(
        'cssClass[selectExtendedTarget]',
        {
            'cssClass[placeholder]': !!placeholder && !label,
            'cssClass[selectOpened]': opened,
            'cssClass[loading]': !!loading,
            'cssClass[error]': !!error,
            'cssClass[disabled]': !!disabled,
        },
        className
    );

    const getTabIndex = (): number => {
        return disabled ? -1 : tabIndex || 0;
    };

    /** Обработчик клика. */
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setOpened(!opened);
        onClick?.(event);
    };

    /** Обработчик нажатия клавиши. */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!opened) {
            // При нажатии Enter, Space, ArrowUp или ArrowDown открывается выпадающий список.
            if (
                [EVENT_KEY_CODES.SPACE, EVENT_KEY_CODES.ENTER, EVENT_KEY_CODES.ARROW_DOWN, EVENT_KEY_CODES.ARROW_UP].includes(event.keyCode)
            ) {
                event.preventDefault();
                // Предотвращение срабатывания keydown при открытии Dropdown в document.addEventListener('keydown'...) в src/desktop/components/Dropdown/components/DropdownListItem.tsx.
                event.stopPropagation();
                setOpened(!opened);
            }
        }

        onKeyDown?.(event);
    };

    /** Функция для хранения ссылки. */
    const setRef = (instance: HTMLDivElement | null) => {
        targetRef.current = instance;
        if (typeof ref === 'function') {
            ref(instance);
        } else if (ref) {
            ref.current = instance;
        }
    };

    return (
        <div
            className={classNames}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={getTabIndex()}
            role="button"
            aria-expanded={opened}
            aria-haspopup="listbox"
            data-test-id={dataTestId}
            ref={setRef}
            {...rest}
        >
            <div
                className="cssClass[label]"
                data-test-id={
                    dataTestId && `${dataTestId}${label ? TestIds.SelectButton.selected_text : TestIds.SelectViewWrapper.placeholder}`
                }
            >
                {label || placeholder}
            </div>

            {loading ? (
                <SpinnersmallAniIcon20 className={classnames('cssClass[spinnerIcon]', 'cssClass[globalSpin]')} />
            ) : (
                <CaretdownSrvxIcon16 className="cssClass[caretIcon]" />
            )}
        </div>
    );
});

SelectExtendedTarget.displayName = 'SelectExtendedTarget';
