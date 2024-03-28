import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {BodyPage} from '@sberbusiness/triplex/components/Page/components/BodyPage';
import {FooterPage} from '@sberbusiness/triplex/components/Page/components/FooterPage';
import {HeaderPage} from '@sberbusiness/triplex/components/Page/components/HeaderPage';

/** Свойства компонента Page. */
interface IPageProps extends React.HTMLAttributes<HTMLDivElement> {}

interface IPageFC extends React.FC<IPageProps> {
    Header: typeof HeaderPage;
    Body: typeof BodyPage;
    Footer: typeof FooterPage;
}

/** Страница. Может содержать только PageHeader, BodyPage, PageFooter. */
export const Page: IPageFC = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames('cssClass[page]', className)} {...htmlDivAttributes}>
        {children}
    </div>
);

Page.Header = HeaderPage;
Page.Body = BodyPage;
Page.Footer = FooterPage;
