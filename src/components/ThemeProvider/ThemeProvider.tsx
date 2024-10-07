import React, {useEffect, useState} from 'react';
import canUseDom from 'rc-util/es/Dom/canUseDom';
import {removeCSS, updateCSS} from 'rc-util/es/Dom/dynamicCSS';
import {TDesignTokensPartial} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokensTypes';
import {DesignTokenUtils} from '@sberbusiness/triplex/components/DesignTokens/DesignTokenUtils';
import {ThemeProviderView} from '@sberbusiness/triplex/components/ThemeProvider/components/ThemeProviderView';
import {uniqueId} from '@sberbusiness/triplex/utils/uniqueId';
import {ETriplexTheme} from '@sberbusiness/triplex/components/ThemeProvider/ETriplexTheme';

export interface IThemeProviderProps {
    children: React.ReactNode;
    /** Classname, который добавлен к элементу из scopeRef для создания области видимости css-переменных. */
    scopeClassName?: string;
    /** Ref на HTML элемент, внутри которого будет действовать текущий конфиг. По-умолчанию - html. */
    scopeRef?: React.RefObject<HTMLElement>;
    /** Дизайн-тема Triplex. */
    theme?: ETriplexTheme;
    /** Переопределяемые токены. */
    tokens?: TDesignTokensPartial;
}

export const ThemeProvider: React.FC<IThemeProviderProps> = ({children, scopeClassName, scopeRef, theme = ETriplexTheme.LIGHT, tokens}) => {
    // ClassName, добавляемый к HTML элементу, для определения области видимости CSS-переменных.
    const [scopeCssClassName, setScopeCssClassName] = useState(scopeClassName || uniqueId('triplex-theme-'));

    useEffect(() => {
        setScopeCssClassName(scopeClassName || uniqueId('triplex-theme-'));
    }, [scopeClassName]);

    useEffect(() => {
        if (canUseDom()) {
            const style = `.${scopeCssClassName} {${DesignTokenUtils.getStyle(theme, tokens || {})}`;
            // Обновление мета тега со стилями темы. Обновляется тег с ключом triplex-dynamic-theme.
            updateCSS(style, `triplex-dynamic-tokens-${scopeCssClassName}`);
        } else {
            console.log('ThemeProvider', 'SSR do not support dynamic theme with css variables.');
        }
    }, [scopeCssClassName, theme, tokens]);

    // Удаляет стили при размонтировании компонента.
    useEffect(() => () => removeCSS(`triplex-dynamic-tokens-${scopeCssClassName}`), [scopeCssClassName]);

    return (
        <ThemeProviderView scopeClassName={scopeCssClassName} scopeRef={scopeRef} theme={theme} tokens={tokens}>
            {children}
        </ThemeProviderView>
    );
};
