import * as React from 'react';
import {Text} from '@sberbusiness/triplex/desktop/components/Typography/Text';
import {ETextSize, ELineType} from '@sberbusiness/triplex/desktop/components/Typography/enums';

export interface IConfirmContentSubTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ConfirmContentSubTitle: React.FC<IConfirmContentSubTitleProps> = ({children, ...htmlDivAttributes}) => (
    <Text size={ETextSize.B1} line={ELineType.EXTRA} tag="div" {...htmlDivAttributes}>
        {children}
    </Text>
);

ConfirmContentSubTitle.displayName = 'ConfirmContentSubTitle';
