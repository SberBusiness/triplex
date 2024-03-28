import React from 'react';
import cx from 'clsx';
import Version from 'react-styleguidist/lib/client/rsg-components/Version';
import Ribbon from 'react-styleguidist/lib/client/rsg-components/Ribbon';
import {StyleGuideFooter} from './components/StyleGuideFooter';
import {StyleGuideSidebar} from './components/StyleGuideSidebar';
import ThemeSwitcher from '../../../common/components/ThemeSwitcher/ThemeSwitcher';
import './styles.less';

interface StyleGuideRendererProps {
    children: React.ReactNode;
    title: string;
    version?: string;
    toc?: React.ReactNode;
    hasSidebar?: boolean;
}

const StyleGuideRenderer: React.FC<StyleGuideRendererProps> = ({children, title, version, toc, hasSidebar}) => (
    <div className={cx('styleguide', {'has-sidebar': hasSidebar})}>
        {version && <Version>{version}</Version>}
        {/* Переключатель темы light/dark. */}
        <ThemeSwitcher>
            <main className="styleguide-content">{children}</main>
        </ThemeSwitcher>
        {hasSidebar && <StyleGuideSidebar title={title} toc={toc} />}
        <StyleGuideFooter />
        <Ribbon />
    </div>
);

export default StyleGuideRenderer;
