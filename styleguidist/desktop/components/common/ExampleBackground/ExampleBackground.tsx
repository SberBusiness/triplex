import * as React from 'react';
import './styles.less';

export enum ExampleBackgroundColor {
    LIGHT = 'light',
    DARK = 'dark',
}

interface IExampleBackgroundProps {
    background: ExampleBackgroundColor;
}

export const ExampleBackground: React.FC<IExampleBackgroundProps> = ({children, background}) => (
    <div className={`example-background ${background}`}>{children}</div>
);
