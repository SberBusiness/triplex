import React, {useContext} from 'react';
import {DropdownMobileHeader, IDropdownMobileHeaderProps} from '@sberbusiness/triplex/components/Dropdown/mobile/DropdownMobileHeader';
import {TooltipContext} from '@sberbusiness/triplex/components/Tooltip/TootlipContext';
import {TooltipMobileCloseButton} from '@sberbusiness/triplex/components/Tooltip/components/mobile/components/TooltipMobileCloseButton';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {EFontType, ETextSize} from '@sberbusiness/triplex/components/Typography/enums';

/** Свойства компонента TooltipMobileHeader. */
export interface ITooltipMobileHeaderProps extends Omit<IDropdownMobileHeaderProps, 'closeButton'> {}

/** Заголовок компонента TooltipMobile. */
export const TooltipMobileHeader: React.FC = ({children, ...rest}) => {
    const {elements} = useContext(TooltipContext);

    /** Рендер кнопки закрытия DropdownMobile. */
    const renderCloseButton = () => <TooltipMobileCloseButton {...elements.closeButton?.props} />;

    return (
        <DropdownMobileHeader closeButton={renderCloseButton} {...rest}>
            <Text size={ETextSize.B1} type={EFontType.GENERAL} tag="div">
                {children}
            </Text>
        </DropdownMobileHeader>
    );
};
