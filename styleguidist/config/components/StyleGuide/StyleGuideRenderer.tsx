import React, {useEffect, useState} from 'react';
import cx from 'clsx';
import Ribbon from 'react-styleguidist/lib/client/rsg-components/Ribbon';
import {StyleGuideFooter} from './components/StyleGuideFooter';
import {StyleGuideSidebar} from './components/StyleGuideSidebar';
import StyleGuideHeader from './components/StyleGuideHeader';
import {ETriplexTheme} from '@sberbusiness/triplex/components/ThemeProvider/ETriplexTheme';
import {ThemeObserver} from '../../../common/components/Observer/ThemeObserver';
import {ThemeProvider} from '@sberbusiness/triplex/components/ThemeProvider/ThemeProvider';
import './styles.less';

interface StyleGuideRendererProps {
    children: React.ReactNode;
    title: string;
    version?: string;
    toc?: React.ReactNode;
    hasSidebar?: boolean;
}

export const TRIPLEX_THEME_STORAGE_KEY = 'triplex-theme';

const StyleGuideRenderer: React.FC<StyleGuideRendererProps> = ({children, title, toc, version, hasSidebar}) => {
    const [theme, setTheme] = useState(
        localStorage.getItem(TRIPLEX_THEME_STORAGE_KEY) === ETriplexTheme.DARK ? ETriplexTheme.DARK : ETriplexTheme.LIGHT
    );

    useEffect(() => {
        ThemeObserver.publish(theme);
        localStorage.setItem(TRIPLEX_THEME_STORAGE_KEY, theme);
    }, [theme]);

    return (
        <div className={cx('styleguide', {'has-sidebar': hasSidebar})}>
            <StyleGuideHeader theme={theme} onChangeTheme={setTheme} version={version} />

            <ThemeProvider
                theme={theme}
                scopeClassName={theme === ETriplexTheme.LIGHT ? 'styleguidist-light-theme' : 'styleguidist-dark-theme'}
            >
                <main className="styleguide-content">{children}</main>
            </ThemeProvider>

            {hasSidebar && <StyleGuideSidebar title={title} toc={toc} />}
            <StyleGuideFooter />
            <Ribbon />
        </div>
    );
};

export default StyleGuideRenderer;
