import React, {useContext} from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {isKey} from '@sberbusiness/triplex/utils/keyboard';
import {WidgetHeaderContext} from './WidgetHeaderContext';
import {getAriaHTMLAttributes} from '@sberbusiness/triplex/utils/HTML/AriaAttributes';

/** Свойства компонента WidhetHeaderTitle. */
export interface IWidgetHeaderTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export const WidgetHeaderTitle: React.FC<IWidgetHeaderTitleProps> = ({children, className, onKeyDown, ...htmlDivAttributes}) => {
    const {ariaAttributes, isStatic, toggle} = useContext(WidgetHeaderContext);

    /** Обработчик открытия/закрытия с клавиатуры. */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const key = event.nativeEvent.code || event.nativeEvent.keyCode;

        if (isKey(key, 'ENTER') || isKey(key, 'SPACE')) {
            toggle?.();
        }

        // Предотвращения прокрутки страницы при нажатии на пробел.
        if (isKey(key, 'SPACE')) {
            event.preventDefault();
        }

        onKeyDown?.(event);
    };

    return (
        <div
            {...htmlDivAttributes}
            className={classnames(className, 'cssClass[widgetHeaderTitle]')}
            tabIndex={isStatic ? -1 : 0}
            role={isStatic ? undefined : 'button'}
            onKeyDown={handleKeyDown}
            {...getAriaHTMLAttributes(ariaAttributes)}
        >
            {children}
        </div>
    );
};

WidgetHeaderTitle.displayName = 'WidgetHeaderTitle';
