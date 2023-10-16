import React, {useEffect} from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {EVENT_KEY_CODES} from '@sberbusiness/triplex/utils/keyboard';

/**
 * Свойства DropdownListItem.
 *
 * @prop {boolean} [active] Флаг активного элемента при навигации с клавиатуры. Свойство передается из DropdownList.
 * @prop {string} id Идентификатор элемента.
 * @prop {Function} [onSelect] Обработчик выбора текущего элемента. Выбор осуществляется по клику либо при нажатии на пробел.
 * @prop {boolean} [selected] Флаг - текущий элемент выбран.
 * @prop {number[]} [keyCodesForSelection] Коды клавиш для выбора элемента с помощью клавиатуры.
 */
export interface IDropdownListItemProps extends React.HTMLAttributes<HTMLDivElement> {
    active?: boolean;
    id: string;
    onSelect?: () => void;
    selected?: boolean;
    keyCodesForSelection?: number[];
}

const KEY_CODES_FOR_SELECTION_DEFAULT = [EVENT_KEY_CODES.SPACE, EVENT_KEY_CODES.ENTER];

/**
 * Компонент DropdownList.
 * Элемент выпадающего списка.
 */
export const DropdownListItem = React.forwardRef<HTMLDivElement, IDropdownListItemProps>(
    (
        {
            active,
            keyCodesForSelection = KEY_CODES_FOR_SELECTION_DEFAULT,
            children,
            className,
            onClick,
            onSelect,
            selected,
            ...htmlDivAttributes
        },
        ref
    ) => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const {keyCode} = event;

            // При нажатии Enter или Space выбирается текущий пункт.
            if (keyCodesForSelection.includes(keyCode)) {
                event.preventDefault();
                onSelect?.();
            }
        };

        const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
            onSelect?.();
            onClick?.(event);
        };

        useEffect(() => {
            if (active) {
                // Подписка на ввод клавиатуры для выбора активного пункта.
                document.addEventListener('keydown', handleKeyDown);
            } else {
                document.removeEventListener('keydown', handleKeyDown);
            }

            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            };
        }, [active]);

        return (
            // eslint-disable-next-line jsx-a11y/interactive-supports-focus
            <div
                className={classnames(
                    'cssClass[dropdownListItem]',
                    {'cssClass[active]': !!active, 'cssClass[selected]': !!selected},
                    className
                )}
                title={typeof children === 'string' ? children : undefined}
                role="option"
                aria-selected={!!selected}
                {...htmlDivAttributes}
                onClick={handleClick}
                ref={ref}
            >
                {children}
            </div>
        );
    }
);

DropdownListItem.displayName = 'DropdownListItem';
