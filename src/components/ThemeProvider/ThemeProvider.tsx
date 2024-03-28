import React, {useEffect, useState} from 'react';
import canUseDom from 'rc-util/es/Dom/canUseDom';
import {updateCSS} from 'rc-util/es/Dom/dynamicCSS';
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
    /** ID тега style, который будет обновлять css-переменные на основе токенов. Используется, когда может быть несколько ThemeProvider в одном приложении. */
    styleTagId?: string;
    /** Дизайн-тема Triplex. */
    theme?: ETriplexTheme;
    /** Переопределяемые токены. */
    tokens?: TDesignTokensPartial;
}

export const ThemeProvider: React.FC<IThemeProviderProps> = ({
    children,
    scopeClassName,
    scopeRef,
    styleTagId,
    theme = ETriplexTheme.LIGHT,
    tokens,
}) => {
    // ClassName, добавляемый к HTML элементу, для определения области видимости CSS-переменных.
    const [scopeCssClassName, setScopeCssClassName] = useState(scopeClassName || uniqueId('triplextheme'));

    useEffect(() => {
        setScopeCssClassName(scopeClassName || uniqueId('triplextheme'));
    }, [scopeClassName]);

    useEffect(() => {
        if (canUseDom()) {
            const style = `.${scopeCssClassName} {${DesignTokenUtils.getStyle(theme, tokens || {})}`;
            // Обновление мета тега со стилями темы. Обновляется тег с ключом triplex-dynamic-theme.
            updateCSS(style, `triplex-dynamic-tokens${styleTagId ? '-' + styleTagId : ''}`);
        } else {
            console.log('ThemeProvider', 'SSR do not support dynamic theme with css variables.');
        }
    }, [styleTagId, scopeCssClassName, theme, tokens]);

    return (
        <ThemeProviderView scopeClassName={scopeCssClassName} scopeRef={scopeRef} theme={theme} tokens={tokens}>
            {children}
        </ThemeProviderView>
    );
};
