import {createContext} from 'react';

/** Темы системы Триплекс. */
export enum ETriplexTheme {
    LIGHT = 'triplex-theme-light',
    DARK = 'triplex-theme-dark',
}

export interface IThemeContext {
    /** Текущая тема. */
    theme: string;
    /** Доступные темы. */
    themes: string[];
    /** Задать тему. */
    setTheme: (theme: string) => void;
}

const defaultValue = {
    theme: '',
    themes: [],
    setTheme: () => {},
};

export const ThemeContext = createContext<IThemeContext>(defaultValue);
