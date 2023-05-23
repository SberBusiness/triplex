import * as React from 'react';
import {Title} from '@sberbusiness/triplex/desktop/components/Typography/Title';
import {ETitleSize} from '@sberbusiness/triplex/desktop/components/Typography/enums';
import {EScreenWidth} from '@sberbusiness/triplex/common/enums/EScreenWidth';

export interface IConfirmContentTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const ConfirmContentTitle: React.FC<IConfirmContentTitleProps> = ({children, ...htmlAttributes}) => (
    <Title size={window.matchMedia(`(max-width: ${EScreenWidth.SM_MAX})`).matches ? ETitleSize.H4 : ETitleSize.H2} {...htmlAttributes}>
        {children}
    </Title>
);

ConfirmContentTitle.displayName = 'ConfirmContentTitle';
