import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {ELineType, ETextSize} from '@sberbusiness/triplex/components/Typography/enums';

export interface IDropdownMobileHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    closeButton?: () => JSX.Element;
}

export const DropdownMobileHeader = React.forwardRef<HTMLDivElement, IDropdownMobileHeaderProps>(
    ({children, className, closeButton, ...htmlAttributes}, ref) => (
        <div className={classnames('cssClass[dropdownMobileHeader]', className)} ref={ref} {...htmlAttributes}>
            <Text tag="div" size={ETextSize.B1} line={ELineType.EXTRA}>
                {children}
            </Text>
            {closeButton?.()}
        </div>
    )
);

DropdownMobileHeader.displayName = 'DropdownMobileHeader';
