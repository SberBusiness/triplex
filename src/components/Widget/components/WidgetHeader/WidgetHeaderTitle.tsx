import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

export interface IWidgetHeaderTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export const WidgetHeaderTitle: React.FC<IWidgetHeaderTitleProps> = ({children, className, ...htmlDivAttributes}) => (
    <div {...htmlDivAttributes} className={classnames(className, 'cssClass[widgetHeaderTitle]')}>
        {children}
    </div>
);

WidgetHeaderTitle.displayName = 'WidgetHeaderTitle';
