import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';
import {ETriplexTheme} from '@sberbusiness/triplex/components/ThemeProvider/ETriplexTheme';

/**
 * Возвращает токен со значением текущей темы.
 */
export const GetTokensValueByTheme = <TokensWithValue extends {[key: string]: TDesignTokenValue}>(
    theme: ETriplexTheme,
    tokens: Record<keyof TokensWithValue, TDesignTokenValues>
): TokensWithValue => {
    const tokensWithValue = {} as Record<keyof TokensWithValue, TDesignTokenValue>;

    Object.keys(tokens).forEach((key: keyof TokensWithValue) => {
        tokensWithValue[key] = theme === ETriplexTheme.LIGHT ? tokens[key][0] : tokens[key][1];
    });

    return tokensWithValue as TokensWithValue;
};
