import React from 'react';
import {TDesignTokens} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokensTypes';
import {ETriplexTheme} from '@sberbusiness/triplex/components/ThemeProvider/ETriplexTheme';
import {DesignTokensCore, DesignTokensComponents} from '@sberbusiness/triplex/components/DesignTokens';

export interface IThemeProviderContext {
    theme: ETriplexTheme;
    tokens: TDesignTokens;
}

const contextInitial: IThemeProviderContext = {
    theme: ETriplexTheme.LIGHT,
    tokens: {...DesignTokensCore, ...DesignTokensComponents},
};

export const ThemeProviderContext = React.createContext<IThemeProviderContext>(contextInitial);
