import React, {useEffect} from 'react';
import {ThemeContext, IThemeContext} from './ThemeContext';

export interface IThemeProviderProps extends IThemeContext {
    /** Элемент для хранения класса темы. */
    target?: HTMLElement | null;
}

export const ThemeProvider: React.FC<IThemeProviderProps> = ({children, theme, themes, setTheme, target}) => {
    useEffect(() => {
        const element = target ?? document.documentElement;

        themes.forEach((theme) => element.classList.remove(theme));
        element.classList.add(theme);
    }, [theme, themes, target]);

    return <ThemeContext.Provider value={{theme, themes, setTheme}}>{children}</ThemeContext.Provider>;
};

ThemeProvider.displayName = 'ThemeProvider';
