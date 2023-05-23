import * as React from 'react';
import {ClosemediumNavIcon20} from '@sberbusiness/icons/ClosemediumNavIcon20';
import {ButtonIcon, IButtonIconProps} from '@sberbusiness/triplex/desktop/components/Button/ButtonIcon';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

export interface IConfirmCloseButtonProps extends Omit<IButtonIconProps, 'children'> {}

/**
 * Кнопка закрытия.
 */
export const ConfirmCloseButton: React.FC<IConfirmCloseButtonProps> = ({className, title = 'Закрыть', ...props}) => (
    <ButtonIcon className={classnames(className, 'cssClass[confirmCloseButton]')} title={title} {...props}>
        <ClosemediumNavIcon20 />
    </ButtonIcon>
);
