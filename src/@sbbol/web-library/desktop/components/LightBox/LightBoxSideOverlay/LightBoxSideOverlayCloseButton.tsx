import * as React from 'react';
import {ClosemediumNavIcon20} from '@sberbusiness/icons/ClosemediumNavIcon20';
import {ButtonIcon, IButtonIconProps} from '@sbbol/web-library/desktop/components/Button/ButtonIcon/ButtonIcon';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

export interface ILightBoxSideOverlayCloseButtonProps extends Omit<IButtonIconProps, 'children'> {}

/**
 * Кнопка закрытия SideOverlay.
 */
export const LightBoxSideOverlayCloseButton: React.FC<ILightBoxSideOverlayCloseButtonProps> = ({className, ...props}) => (
    <ButtonIcon className={classnames(className, 'cssClass[lightBoxSideOverlayCloseButton]')} {...props}>
        <ClosemediumNavIcon20 />
    </ButtonIcon>
);
