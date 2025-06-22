import {useContext} from 'react';
import {TDesignTokens} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokensTypes';
// Импорт не должен быть относительным.
import {ThemeProviderContext} from '@sberbusiness/triplex/components/ThemeProvider/ThemeProviderContext';
import {ETriplexTheme} from '@sberbusiness/triplex/components/ThemeProvider/ETriplexTheme';

/**
 * Хук, возвращающий текущую тему и токены.
 */
export const useToken = (): {scopeClassName: string; theme: ETriplexTheme; tokens: TDesignTokens} => {
    const {scopeClassName, theme, tokens} = useContext(ThemeProviderContext);

    return {scopeClassName, theme, tokens};
};
