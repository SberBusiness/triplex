import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {ETextSize} from '@sberbusiness/triplex/components/Typography/enums';
import {ButtonBase} from '../../protected/ButtonBase/ButtonBase';

export interface ITabsExtendedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Выбранное состояние. */
    selected?: boolean;
    children: React.ReactNode;
}

/**
 * Кнопка таба.
 * Если используется кастомный компонент кнопки, желательно, чтобы он рендерил html-элемент button, иначе выбор с клавиатуры может работать не корректно.
 */
export const TabsExtendedTabButton = React.forwardRef<HTMLButtonElement, ITabsExtendedButtonProps>(
    ({children, className, selected, ...rest}, ref) => {
        const classNames = classnames('cssClass[tabsExtendedTabButton]', {'cssClass[selected]': !!selected}, className);

        return (
            <ButtonBase className={classNames} role="tab" aria-selected={selected} ref={ref} {...rest}>
                <Text className="cssClass[tabsExtendedTabButtonInner]" size={ETextSize.B1}>
                    {children}
                </Text>
            </ButtonBase>
        );
    }
);

TabsExtendedTabButton.displayName = 'TabsExtendedTabButton';
