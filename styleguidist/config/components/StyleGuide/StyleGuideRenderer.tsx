import React, {useState} from 'react';
import cx from 'clsx';
import Logo from 'react-styleguidist/lib/client/rsg-components/Logo';
import Version from 'react-styleguidist/lib/client/rsg-components/Version';
import Ribbon from 'react-styleguidist/lib/client/rsg-components/Ribbon';
import {MediaMaxWidth} from '@sberbusiness/triplex/components/MediaWidth/MediaMaxWidth';
import {EScreenWidth} from '@sberbusiness/triplex/enums/EScreenWidth';
import './styles.less';

interface StyleGuideRendererProps {
    title: string;
    version?: string;
    toc?: React.ReactNode;
    hasSidebar?: boolean;
}

interface StyleGuideSidebarProps {
    title: string;
    toc?: React.ReactNode;
}

const StyleGuideSidebar: React.FC<StyleGuideSidebarProps> = ({title, toc}) => {
    const [open, setOpen] = useState(false);

    const renderSidebar = (adaptive: boolean): React.ReactElement => (
        <div className={cx('styleguide-sidebar', {collapsed: adaptive && !open})}>
            <header className="styleguide-sidebar-logo">
                <Logo>{title}</Logo>
            </header>
            {toc}
        </div>
    );

    return (
        <MediaMaxWidth maxWidth={EScreenWidth.MD_MAX} fallback={renderSidebar(false)}>
            <>
                {renderSidebar(true)}
                <button className={cx('styleguide-sidebar-burger', {expanded: open})} onClick={() => setOpen(!open)} aria-expanded={open}>
                    <div className="styleguide-sidebar-burger-slice" />
                    <div className="styleguide-sidebar-burger-slice" />
                    <div className="styleguide-sidebar-burger-slice" />
                </button>
            </>
        </MediaMaxWidth>
    );
};

const StyleGuideRenderer: React.FC<StyleGuideRendererProps> = ({children, title, version, toc, hasSidebar}) => {
    const renderLink = (text: string, href: string) => (
        <a className="styleguide-footer-link" href={href} target="_blank" rel="noreferrer">
            {text}
        </a>
    );

    const renderLogo = () => (
        <svg
            className="styleguide-footer-logo"
            xmlns="http://www.w3.org/2000/svg"
            width="89"
            height="24"
            viewBox="0 0 89 24"
            fill="none"
            focusable="false"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M39.2519 16.7725C40.2122 16.7725 41.143 16.5388 41.942 16.0976L42.633 15.72L44.6496 17.2074C43.3201 18.6343 41.3583 19.4182 39.1113 19.4182C36.9637 19.4182 35.005 18.659 33.596 17.2805C32.1918 15.9068 31.4182 14.0029 31.4182 11.9201C31.4182 9.84682 32.1942 7.97071 33.604 6.63756C35.0051 5.31156 36.9684 4.58179 39.1312 4.58179C41.1248 4.58179 42.8689 5.18834 44.1739 6.33627L44.3216 6.46584L42.0866 8.1146C41.2677 7.52553 40.3146 7.22662 39.2519 7.22662C36.4426 7.22662 34.403 9.2339 34.403 11.9996C34.403 14.7652 36.4418 16.7725 39.2519 16.7725ZM54.2013 10.4061H50.4088V7.1778H56.4633L59.7261 4.77066H47.2921V19.227H53.7994C57.449 19.227 59.5427 17.5719 59.5427 14.6854C59.5427 11.9261 57.6452 10.4061 54.2013 10.4061ZM53.6588 16.8199H50.4088V12.8125H53.6588C55.6373 12.8125 56.5586 13.4826 56.5586 14.8158C56.5579 16.1784 55.5825 16.8199 53.6588 16.8199ZM73.3651 4.77066L70.1023 7.1778H65.5607V10.7122H72.2174V13.1193H65.5607V16.8199H73.3651V19.227H62.4441V4.77066H73.3651ZM76.2664 4.77066H82.2122C86.0071 4.77066 88.3637 6.75329 88.3637 9.94427C88.3637 13.1352 86.0063 15.1322 82.2122 15.1322H79.3831V19.227H76.2664V4.77066ZM79.3831 12.725H82.1455C84.143 12.725 85.2423 11.7401 85.2423 9.95142C85.2423 8.16276 84.1422 7.1778 82.1455 7.1778H79.3831V12.725Z"
                fill="#7D838A"
            />
            <g clipPath="url(#clip0_71901_10419)">
                <path
                    d="M2.77149 12C2.77149 11.8451 2.77546 11.6918 2.7834 11.5386L0.0150885 11.4004C0.00555906 11.5989 0 11.799 0 12C0 15.3138 1.34286 18.314 3.51479 20.4852L5.47786 18.5221C3.80623 16.8513 2.77149 14.5443 2.77149 12Z"
                    fill="#7D838A"
                />
                <path
                    d="M11.9992 2.77229C12.1541 2.77229 12.3074 2.77784 12.4606 2.78499L12.5988 0.0150885C12.4003 0.00555906 12.2002 0 11.9992 0C8.68537 0 5.68517 1.34286 3.51404 3.51479L5.47711 5.47786C7.14795 3.80703 9.45567 2.77229 11.9992 2.77229Z"
                    fill="#7D838A"
                />
                <path
                    d="M11.9992 21.2286C11.8444 21.2286 11.6911 21.2246 11.5378 21.2167L11.3997 23.985C11.5982 23.9945 11.7983 24.0001 11.9992 24.0001C15.3131 24.0001 18.3133 22.6572 20.4844 20.4853L18.5214 18.5222C16.8505 20.1931 14.5436 21.2286 11.9992 21.2286Z"
                    fill="#7D838A"
                />
                <path
                    d="M17.2014 4.38277L19.5354 2.6627C17.4754 0.998213 14.854 0 11.9991 0V2.77229C13.9281 2.77229 15.7196 3.36708 17.2014 4.38277Z"
                    fill="#7D838A"
                />
                <path
                    d="M23.9992 12C23.9992 11.2663 23.9333 10.5476 23.807 9.85034L21.2237 11.7539C21.2261 11.8356 21.2269 11.9174 21.2269 12C21.2269 14.7096 20.0532 17.1499 18.187 18.8398L20.0492 20.8982C22.4753 18.7032 23.9992 15.5299 23.9992 12Z"
                    fill="#7D838A"
                />
                <path
                    d="M11.9992 21.2285C9.28968 21.2285 6.84934 20.0548 5.15944 18.1886L3.10107 20.0508C5.29683 22.4761 8.47014 24 11.9992 24V21.2285Z"
                    fill="#7D838A"
                />
                <path
                    d="M5.8114 5.16017L3.94918 3.10181C1.52392 5.29756 0 8.47088 0 12H2.77229C2.77149 9.29041 3.94521 6.85007 5.8114 5.16017Z"
                    fill="#7D838A"
                />
                <path
                    d="M21.4953 4.66394C22.0623 5.39612 22.5467 6.19581 22.9335 7.04949L11.9992 15.1075L7.4314 12.2439V8.79894L11.9992 11.6626L21.4953 4.66394Z"
                    fill="#7D838A"
                />
            </g>
            <defs>
                <clipPath id="clip0_71901_10419">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );

    const renderFooter = () => (
        <footer className="styleguide-footer">
            {renderLogo()}
            <span>
                {'© 1997—2023 ПАО Сбербанк  | '}
                {renderLink('BitBucket', 'https://stash.sigma.sbrf.ru/projects/CIBUFS/repos/sbbol-web-library')}
                {' | '}
                {renderLink('Confluence', 'https://sbtatlas.sigma.sbrf.ru/wiki/pages/viewpage.action?pageId=1569564009')}
                {' | '}
                {renderLink('Figma Community', 'https://www.figma.com/@triplex')}
            </span>
            <span>Написать нам | {renderLink('DCBHAMSTERS@sberbank.ru', 'mailto:https://www.figma.com/@triplex')}</span>
        </footer>
    );

    return (
        <div className={cx('styleguide', {'has-sidebar': hasSidebar})}>
            {version && <Version>{version}</Version>}
            <main className="styleguide-content">{children}</main>
            {hasSidebar && <StyleGuideSidebar title={title} toc={toc} />}
            {renderFooter()}
            <Ribbon />
        </div>
    );
};

export default StyleGuideRenderer;