import * as React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {ConfirmClose} from '@sberbusiness/triplex/desktop/components/Confirm/components/ConfirmClose';
import {ConfirmContent} from '@sberbusiness/triplex/desktop/components/Confirm/components/ConfirmContent';
import {ConfirmControls} from '@sberbusiness/triplex/desktop/components/Confirm/components/ConfirmControls';

export interface IConfirmProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface IConfirmFC extends React.FC<IConfirmProps> {
    Close: typeof ConfirmClose;
    Content: typeof ConfirmContent;
    Controls: typeof ConfirmControls;
}

/**
 * Компонент предупреждения, о закрытии лайтбокса / боковой панели лайтбокса.
 */
export const Confirm: IConfirmFC = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames(className, 'cssClass[confirm]')} role="dialog" aria-modal="true" {...htmlDivAttributes}>
        {children}
    </div>
);

Confirm.displayName = 'Confirm';
Confirm.Close = ConfirmClose;
Confirm.Content = ConfirmContent;
Confirm.Controls = ConfirmControls;
