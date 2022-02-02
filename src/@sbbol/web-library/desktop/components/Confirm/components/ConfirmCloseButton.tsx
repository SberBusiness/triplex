import * as React from 'react';
import {ClosemediumNavIcon20} from '@sberbusiness/icons/ClosemediumNavIcon20';
import {ButtonIcon, IButtonIconProps} from '@sbbol/web-library/desktop/components/Button/ButtonIcon/ButtonIcon';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

export interface IConfirmCloseButtonProps extends Omit<IButtonIconProps, 'children'> {}

/**
 * Кнопка закрытия.
 */
export const ConfirmCloseButton: React.FC<IConfirmCloseButtonProps> = ({className, ...props}) => (
    <ButtonIcon className={classnames(className, 'cssClass[confirmCloseButton]')} {...props}>
        <ClosemediumNavIcon20 />
    </ButtonIcon>
);
