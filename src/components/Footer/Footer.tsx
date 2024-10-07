import React from 'react';
import {FooterDescription} from '@sberbusiness/triplex/components/Footer/components/FooterDescription';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента Footer. */
export interface IFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Footer прилипает к нижней границе экрана при скролле.
     * Свойство работает на экранах высотой более 800px и шириной более 1024px.
     * */
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
        data-tx={process.env.npm_package_version}
    >
        {children}
    </div>
);

Footer.Description = FooterDescription;
Footer.displayName = 'Footer';
