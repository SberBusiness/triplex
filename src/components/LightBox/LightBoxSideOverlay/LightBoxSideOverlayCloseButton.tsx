import React from 'react';
import {ClosemediumNavIcon20} from '@sberbusiness/icons/ClosemediumNavIcon20';
import {ButtonIcon, IButtonIconProps} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

export interface ILightBoxSideOverlayCloseButtonProps extends Omit<IButtonIconProps, 'children'> {}

/**
 * Кнопка закрытия SideOverlay.
 */
export const LightBoxSideOverlayCloseButton: React.FC<ILightBoxSideOverlayCloseButtonProps> = ({
    className,
    title = 'Закрыть',
    ...props
}) => (
    <ButtonIcon className={classnames(className, 'cssClass[lightBoxSideOverlayCloseButton]')} title={title} {...props}>
        <ClosemediumNavIcon20 />
    </ButtonIcon>
);
