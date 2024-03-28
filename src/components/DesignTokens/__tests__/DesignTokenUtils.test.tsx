import {DesignTokenUtils} from '@sberbusiness/triplex/components/DesignTokens/DesignTokenUtils';
import {TDesignTokens} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokensTypes';

jest.mock('@sberbusiness/triplex/components/DesignTokens/DesignTokensCore', () => ({
    DesignTokensCore: {
        Primary: {
            900: {value: '#fff'},
        },
    },
}));

jest.mock('@sberbusiness/triplex/components/DesignTokens/DesignTokensComponents', () => ({
    DesignTokensComponents: {
        input: {
            borderColorDefault: {value: '#fff'},
            borderColorDisabled: {value: '#fff'},
            borderColorActive: {ref: 'Primary.900'},
        },
    },
}));

describe('DesignTokenUtils', () => {
    beforeEach(() => {
        process.env.npm_package_version = '10';
        allure.feature('DesignTokenUtils');
    });

    it('getComponentTokens returns component tokens', () => {
        const tokens = DesignTokenUtils.getComponentTokens('input');

        expect(tokens.core).toEqual([]);
        expect(tokens.components).toEqual(['input.borderColorDefault', 'input.borderColorDisabled', 'input.borderColorActive']);
    });

    it('getCSSVariableByTokenGroup returns css variables', () => {
        const cssVariables = DesignTokenUtils.getCSSVariableByTokenGroup(
            {Primary: {900: {value: '#fff'}, 700: {value: '#ccc'}}},
            {} as TDesignTokens
        );

        expect(cssVariables).toBe('--triplex-Primary-700-10: #ccc;\n--triplex-Primary-900-10: #fff;');
    });

    it('getTokenValue returns value by token value', () => {
        // @ts-ignore
        const tokenValue = DesignTokenUtils.getTokenValue({value: '#fff'}, {} as TDesignTokens);

        expect(tokenValue).toBe('#fff');
    });

    it('getTokenValue returns value by ref token', () => {
        // @ts-ignore
        const tokenValue = DesignTokenUtils.getTokenValue({ref: 'Primary.900'}, {
            Primary: {900: {value: '#fff'}},
        } as TDesignTokens);

        expect(tokenValue).toBe('#fff');
    });

    it('getTokenValue returns value by ref token circular', () => {
        // @ts-ignore
        const tokenValue = DesignTokenUtils.getTokenValue({ref: 'Primary.900'}, {
            Primary: {700: {value: '#fff'}, 900: {ref: 'Primary.700'}},
        } as TDesignTokens);

        expect(tokenValue).toBe('#fff');
    });
});
