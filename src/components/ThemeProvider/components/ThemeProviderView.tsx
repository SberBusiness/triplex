import React, {useEffect, useRef} from 'react';
import defaultsDeep from 'lodash.defaultsdeep';
import {TDesignTokens, TDesignTokensPartial} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokensTypes';
// Импорт не должен быть относительным.
import {ThemeProviderContext} from '@sberbusiness/triplex/components/ThemeProvider/ThemeProviderContext';
import {ETriplexTheme} from '@sberbusiness/triplex/components/ThemeProvider/ETriplexTheme';
import {
    DesignTokensCore,
    DesignTokensCoreThemeDark,
    DesignTokensComponents,
    DesignTokensComponentsThemeDark,
} from '@sberbusiness/triplex/components/DesignTokens';

interface IThemeProviderViewProps {
    // Дизайн-тема Triplex.
    theme: ETriplexTheme;
    // Дизайн-токены Triplex.
    tokens?: TDesignTokensPartial;
    // Classname, который добавлен к элементу из scopeRef для создания области видимости css-переменных.
    scopeClassName: string;
    // Ref на HTML элемент, внутри которого будет действовать текущий конфиг. По-умолчанию - html.
    scopeRef?: React.RefObject<HTMLElement>;
}

/**
 *  Создает провайдер темы и создает область видимости для css-переменных.
 */
export const ThemeProviderView: React.FC<IThemeProviderViewProps> = ({
    children,
    scopeClassName,
    scopeRef = {current: document.documentElement},
    theme,
    tokens: tokensProps,
}) => {
    const prevScopeClassName = useRef('');

    useEffect(() => {
        if (scopeClassName) {
            scopeRef.current?.classList.add(scopeClassName);
        }
        prevScopeClassName.current = scopeClassName;

        return () => {
            if (prevScopeClassName.current) {
                scopeRef.current?.classList.remove(prevScopeClassName.current);
            }
        };
    }, [scopeClassName]);

    // Не менять порядок, иначе токены темы будут переопределять пользовательские значения.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const tokens: TDesignTokens = defaultsDeep(
        {},
        tokensProps,
        theme === ETriplexTheme.LIGHT ? DesignTokensCore : DesignTokensCoreThemeDark,
        theme === ETriplexTheme.LIGHT ? DesignTokensComponents : DesignTokensComponentsThemeDark
    );

    return <ThemeProviderContext.Provider value={{theme, tokens}}>{children}</ThemeProviderContext.Provider>;
};
