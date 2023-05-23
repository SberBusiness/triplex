import * as React from 'react';
import {ClosemediumNavIcon20} from '@sberbusiness/icons/ClosemediumNavIcon20';
import {ButtonIcon, IButtonIconProps} from '@sberbusiness/triplex/desktop/components/Button/ButtonIcon';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

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
