import * as React from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

export interface IConfirmContentTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ConfirmContentTitle: React.FC<IConfirmContentTitleProps> = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames('cssClass[confirmTitle]', className)} {...htmlDivAttributes}>
        {children}
    </div>
);

ConfirmContentTitle.displayName = 'ConfirmContentTitle';
