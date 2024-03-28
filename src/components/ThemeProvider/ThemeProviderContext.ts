import React from 'react';
import {TDesignTokens} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokensTypes';
import {ETriplexTheme} from '@sberbusiness/triplex/components/ThemeProvider/ETriplexTheme';
import {DesignTokensCore, DesignTokensComponents} from '@sberbusiness/triplex/components/DesignTokens';

export interface IThemeProviderContext {
    tokens: TDesignTokens;
    theme: ETriplexTheme;
}

const contextInitial: IThemeProviderContext = {
    tokens: {...DesignTokensCore, ...DesignTokensComponents},
    theme: ETriplexTheme.LIGHT,
};

export const ThemeProviderContext = React.createContext<IThemeProviderContext>(contextInitial);
