import * as React from 'react';
import {ConfirmContentSubTitle} from '@sbbol/web-library/desktop/components/Confirm/components/ConfirmContentSubTitle';
import {ConfirmContentTitle} from '@sbbol/web-library/desktop/components/Confirm/components/ConfirmContentTitle';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

export interface IConfirmContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface IConfirmContentFC extends React.FC<IConfirmContentProps> {
    Title: typeof ConfirmContentTitle;
    SubTitle: typeof ConfirmContentSubTitle;
}

export const ConfirmContent: IConfirmContentFC = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames('cssClass[confirmContent]', className)} {...htmlDivAttributes}>
        {children}
    </div>
);

ConfirmContent.displayName = 'ConfirmContent';
ConfirmContent.Title = ConfirmContentTitle;
ConfirmContent.SubTitle = ConfirmContentSubTitle;
