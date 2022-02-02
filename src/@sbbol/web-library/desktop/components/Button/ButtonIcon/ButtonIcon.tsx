import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import * as React from 'react';

/**
 * Свойства компонента кнопки обёртки для иконок (для правильной поддержки a11y).
 *
 * @prop {React.ReactNode} children Children.
 */
export interface IButtonIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const ButtonIcon: React.FC<IButtonIconProps> = ({children, className, ...buttonHTMLAttributes}) => (
    <button type="button" {...buttonHTMLAttributes} className={classnames('hoverable', 'cssClass[buttonIcon]', className)}>
        <span className="cssClass[buttonIconInner]">{children}</span>
    </button>
);

ButtonIcon.displayName = 'ButtonIcon';
