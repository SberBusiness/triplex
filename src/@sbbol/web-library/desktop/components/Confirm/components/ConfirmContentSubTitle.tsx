import * as React from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

export interface IConfirmContentSubTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ConfirmContentSubTitle: React.FC<IConfirmContentSubTitleProps> = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames('cssClass[confirmSubTitle]', className)} {...htmlDivAttributes}>
        {children}
    </div>
);

ConfirmContentSubTitle.displayName = 'ConfirmContentSubTitle';
