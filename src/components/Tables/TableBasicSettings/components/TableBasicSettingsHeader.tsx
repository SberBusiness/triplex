import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {EFontWeight, ETextSize} from '@sberbusiness/triplex/components/Typography/enums';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';

export interface ITableBasicSettingsHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

export const TableBasicSettingsHeader: React.FC<ITableBasicSettingsHeaderProps> = ({children, className, ...rest}) => (
    <Text
        className={classnames('cssClass[tableBasicSettingsHeader]', className)}
        size={ETextSize.B1}
        weight={EFontWeight.SEMIBOLD}
        tag="div"
        {...rest}
    >
        {children}
    </Text>
);

TableBasicSettingsHeader.displayName = 'TableBasicSettingsHeader';
