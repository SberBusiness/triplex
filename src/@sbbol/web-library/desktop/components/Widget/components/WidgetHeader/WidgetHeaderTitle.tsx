import * as React from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

export interface IWidgetHeaderTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export const WidgetHeaderTitle: React.FC<IWidgetHeaderTitleProps> = ({children, className, ...htmlDivAttributes}) => (
    <div {...htmlDivAttributes} className={classnames(className, 'cssClass[widgetHeaderTitle]')}>
        {children}
    </div>
);

WidgetHeaderTitle.displayName = 'WidgetHeaderTitle';
