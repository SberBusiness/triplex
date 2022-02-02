import * as React from 'react';
import './styles.less';

export enum ExampleBackgroundColor {
    'graphite-01' = 'graphite-01',
    'asphalt-05' = 'asphalt-05',
}

interface IExampleBackgroundProps {
    background: ExampleBackgroundColor;
}

export const ExampleBackground: React.FC<IExampleBackgroundProps> = ({children, background}) => (
    <div className={`example-background ${background}`}>{children}</div>
);
