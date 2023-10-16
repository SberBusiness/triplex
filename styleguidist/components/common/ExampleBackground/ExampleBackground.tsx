import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import './styles.less';

/** Варианты цвета фона. */
export enum ExampleBackgroundColor {
    NONE = 'none',
    LIGHT = 'light',
    DARK = 'dark',
}

/** Свойства ExampleBackground. */
interface IExampleBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    background?: ExampleBackgroundColor;
}

/** Фон, использующийся в примерах Styleguidist. */
export const ExampleBackground: React.FC<IExampleBackgroundProps> = ({
    children,
    className,
    background = ExampleBackgroundColor.NONE,
    ...rest
}) => (
    <div className={classnames('example-background', background, className)} {...rest}>
        {children}
    </div>
);
