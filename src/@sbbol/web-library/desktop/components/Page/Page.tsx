import * as React from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {BodyPage} from '@sbbol/web-library/desktop/components/Page/components/BodyPage';
import {FooterPage} from '@sbbol/web-library/desktop/components/Page/components/FooterPage';
import {HeaderPage} from '@sbbol/web-library/desktop/components/Page/components/HeaderPage';

interface IPageProps extends React.HTMLAttributes<HTMLDivElement> {}

interface IPageFC extends React.FC<IPageProps> {
    Header: typeof HeaderPage;
    Body: typeof BodyPage;
    Footer: typeof FooterPage;
}

/**
 * Компонент страница. Может содержать только PageHeader, BodyPage, PageFooter.
 */
export const Page: IPageFC = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames('cssClass[page]', className)} {...htmlDivAttributes}>
        {children}
    </div>
);

Page.Header = HeaderPage;
Page.Body = BodyPage;
Page.Footer = FooterPage;
