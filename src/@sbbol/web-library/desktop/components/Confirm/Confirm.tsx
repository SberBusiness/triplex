import * as React from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {ConfirmClose} from '@sbbol/web-library/desktop/components/Confirm/components/ConfirmClose';
import {ConfirmContent} from '@sbbol/web-library/desktop/components/Confirm/components/ConfirmContent';
import {ConfirmControls} from '@sbbol/web-library/desktop/components/Confirm/components/ConfirmControls';

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
    <div className={classnames(className, 'cssClass[confirm]')} {...htmlDivAttributes}>
        {children}
    </div>
);

Confirm.displayName = 'Confirm';
Confirm.Close = ConfirmClose;
Confirm.Content = ConfirmContent;
Confirm.Controls = ConfirmControls;
