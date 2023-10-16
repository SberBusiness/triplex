import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {ButtonIcon, IButtonIconProps} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {ClosetooltipSrvxIcon16} from '@sberbusiness/icons/ClosetooltipSrvxIcon16';

export interface IDropdownMobileCloseProps extends IButtonIconProps {
    children?: never;
}

/**
 * Элемент закрытия мобильного Dropdown.
 */
export const DropdownMobileClose = React.forwardRef<HTMLButtonElement, IDropdownMobileCloseProps>(
    ({className, ...buttonIconProps}, ref) => (
        <ButtonIcon className={classnames('cssClass[dropdownMobileClose]', className)} ref={ref} {...buttonIconProps}>
            <ClosetooltipSrvxIcon16 />
        </ButtonIcon>
    )
);

DropdownMobileClose.displayName = 'DropdownMobileClose';
