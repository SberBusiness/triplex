/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {useEffect, useState} from 'react';
import {ThemeProvider} from '@sberbusiness/triplex/components/ThemeProvider/ThemeProvider';
import LightIcon from './components/LightIcon';
import DarkIcon from './components/DarkIcon';
import cx from 'clsx';
import {ETriplexTheme} from '@sberbusiness/triplex/components/ThemeProvider/ETriplexTheme';
import './styles.less';

const ThemeSwitcher: React.FC = ({children}) => {
    const [theme, setTheme] = useState(ETriplexTheme.LIGHT);

    useEffect(() => {
        //  Для переопределения стилей стенда.
        if (theme === ETriplexTheme.DARK) {
            document.documentElement.classList.add('styleguidist-dark-theme');
        }

        return () => {
            document.documentElement.classList.remove('styleguidist-dark-theme');
        };
    }, [theme]);

    return (
        <>
            <div className="theme-switcher">
                <span
                    className={cx('theme-switcher-button', {active: theme === ETriplexTheme.DARK})}
                    onClick={() => {
                        setTheme(ETriplexTheme.DARK);
                    }}
                >
                    <DarkIcon />
                </span>
                <span
                    className={cx('theme-switcher-button', {active: theme === ETriplexTheme.LIGHT})}
                    onClick={() => {
                        setTheme(ETriplexTheme.LIGHT);
                    }}
                >
                    <LightIcon />
                </span>
            </div>

            <ThemeProvider
                theme={theme}
                scopeClassName={theme === ETriplexTheme.DARK ? 'styleguidist-dark-theme' : undefined}
                styleTagId="styleguide"
            >
                {children}
            </ThemeProvider>
        </>
    );
};

export default ThemeSwitcher;
