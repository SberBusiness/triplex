import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {BodyPage} from '@sberbusiness/triplex/components/Page/components/BodyPage';
import {FooterPage} from '@sberbusiness/triplex/components/Page/components/FooterPage';
import {HeaderPage} from '@sberbusiness/triplex/components/Page/components/HeaderPage';

/** Свойства компонента Page. */
export interface IPageProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Страница. Может содержать только BodyPage, PageHeader и PageFooter. */
export const Page = Object.assign(
    React.forwardRef<HTMLDivElement, IPageProps>(function Page({children, className, ...rest}, ref) {
        return (
            <div className={classnames('cssClass[page]', className)} {...rest} ref={ref}>
                {children}
            </div>
        );
    }),
    {
        Body: BodyPage,
        Header: HeaderPage,
        Footer: FooterPage,
    }
);

Page.displayName = 'Page';
