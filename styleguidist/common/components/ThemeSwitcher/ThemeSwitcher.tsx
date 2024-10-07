/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import {DarkThemeIcon} from './components/DarkThemeIcon';
import {LightThemeIcon} from './components/LightThemeIcon';
import {ETriplexTheme} from '@sberbusiness/triplex/components/ThemeProvider/ETriplexTheme';
import './styles.less';

interface ThemeSwitcherProps {
    theme: ETriplexTheme;
    onChangeTheme: (newTheme: ETriplexTheme) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({theme, onChangeTheme}) => (
    <div className="themeIcon">
        {theme === ETriplexTheme.LIGHT ? (
            <LightThemeIcon onClick={() => onChangeTheme(ETriplexTheme.DARK)} />
        ) : (
            <DarkThemeIcon onClick={() => onChangeTheme(ETriplexTheme.LIGHT)} />
        )}
    </div>
);

export default ThemeSwitcher;
