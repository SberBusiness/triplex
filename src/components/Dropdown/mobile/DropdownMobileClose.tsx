import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {ButtonIcon, IButtonIconProps} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {ClosenotificationSrvxIcon16} from '@sberbusiness/icons/ClosenotificationSrvxIcon16';

/** Свойства компонента DropdownMobileClose. */
export interface IDropdownMobileCloseProps extends IButtonIconProps {
    children?: never;
}

/** Кнопка закрытия мобильной версии Dropdown. */
export const DropdownMobileClose = React.forwardRef<HTMLButtonElement, IDropdownMobileCloseProps>(
    ({className, ...buttonIconProps}, ref) => (
        <ButtonIcon className={classnames('cssClass[dropdownMobileClose]', className)} ref={ref} {...buttonIconProps}>
            <ClosenotificationSrvxIcon16 />
        </ButtonIcon>
    )
);

DropdownMobileClose.displayName = 'DropdownMobileClose';
