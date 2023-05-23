import React from 'react';
import {ThemeConsumer} from '@sberbusiness/triplex/desktop/components/Theme/ThemeConsumer';
import {ETriplexTheme} from '@sberbusiness/triplex/desktop/components/Theme/ThemeContext';
import './styles.less';

/** Переключатель темы на панели управления. */
const ThemeSwitcher: React.FC = (props) => (
    <ThemeConsumer>
        {({theme, setTheme}) => (
            <label className="theme-switcher">
                {theme === ETriplexTheme.LIGHT ? '☀️' : '🌙'}
                <input
                    {...props}
                    type="checkbox"
                    onChange={(event) => setTheme(event.target.checked ? ETriplexTheme.DARK : ETriplexTheme.LIGHT)}
                    hidden
                />
                <span className="switch" />
            </label>
        )}
    </ThemeConsumer>
);

export default ThemeSwitcher;
