import React from 'react';
import {TDesignTokens, TDesignTokensGroupAbstract} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokensTypes';
import {
    DesignTokensCore,
    DesignTokensCoreThemeDark,
    DesignTokensComponents,
    DesignTokensComponentsThemeDark,
} from '@sberbusiness/triplex/components/DesignTokens';
import {DesignTokenUtils} from '@sberbusiness/triplex/components/DesignTokens/DesignTokenUtils';
import './styles.less';

export const DesignTokensExample: React.FC = () => {
    const renderTokens = (tokensThemeDefault: TDesignTokensGroupAbstract, tokensThemeDark: TDesignTokensGroupAbstract) => {
        return Object.keys(tokensThemeDefault).map((tokenGroup) => {
            return Object.keys(tokensThemeDefault[tokenGroup]).map((tokenTitle) => {
                const token = tokensThemeDefault[tokenGroup][tokenTitle];
                const tokenDark = tokensThemeDark[tokenGroup][tokenTitle];
                const tokenValue = DesignTokenUtils.getTokenValue(token, DesignTokensCore as TDesignTokens);
                const tokenDarkValue = DesignTokenUtils.getTokenValue(tokenDark, DesignTokensCoreThemeDark as TDesignTokens);
                return (
                    <tr key={tokenTitle}>
                        <td key={tokenTitle} className="design-token-cell">
                            {tokenGroup}.{tokenTitle}
                        </td>
                        <td key={tokenValue + 'light-preview'} className="design-token-cell design-token-cell-preview">
                            <span className="design-token-image" style={{background: tokenValue}} />
                        </td>
                        <td key={tokenValue + 'light-value'} className="design-token-cell">
                            {token.value || token.ref}
                        </td>
                        <td key={tokenDarkValue + 'dark-preview'} className="design-token-cell design-token-cell-preview">
                            <span className="design-token-image" style={{background: tokenDarkValue}} />
                        </td>
                        <td key={tokenDarkValue + 'dark-value'} className="design-token-cell">
                            {tokenDark.value || tokenDark.ref}
                        </td>
                    </tr>
                );
            });
        });
    };
    return (
        <>
            <table className="design-token-table">
                <thead>
                    <tr>
                        <th className="design-token-th">Core токены</th>
                        <th colSpan={2} className="design-token-th">
                            Тема по-умолчанию
                        </th>
                        <th colSpan={2} className="design-token-th">
                            Темная тема
                        </th>
                    </tr>
                </thead>
                <tbody>{renderTokens(DesignTokensCore, DesignTokensCoreThemeDark)}</tbody>
            </table>

            <table className="design-token-table">
                <thead>
                    <tr>
                        <th className="design-token-th">Локальные токены</th>
                        <th colSpan={2} className="design-token-th">
                            Тема по-умолчанию
                        </th>
                        <th colSpan={2} className="design-token-th">
                            Темная тема
                        </th>
                    </tr>
                </thead>
                <tbody>{renderTokens(DesignTokensComponents, DesignTokensComponentsThemeDark)}</tbody>
            </table>
        </>
    );
};
