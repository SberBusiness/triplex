import * as React from 'react';
import {FooterDescription} from '@sberbusiness/triplex/desktop/components/Footer/components/FooterDescription';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

export interface IFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    sticky?: boolean;
}

interface IFooterFC extends React.FC<IFooterProps> {
    Description: typeof FooterDescription;
}

/** Подвал. */
export const Footer: IFooterFC = ({children, className, sticky, ...htmlDivAttributes}) => (
    <div
        className={classnames('cssClass[footer]', className, {
            'cssClass[sticky]': Boolean(sticky),
        })}
        {...htmlDivAttributes}
    >
        {children}
    </div>
);

Footer.Description = FooterDescription;
Footer.displayName = 'Footer';
