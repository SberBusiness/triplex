import React from 'react';
import {mount} from 'enzyme';
import {ThemeProvider, IThemeProviderProps} from '@sberbusiness/triplex/components/ThemeProvider/ThemeProvider';
import {useToken} from '@sberbusiness/triplex/components/ThemeProvider/useToken';
import {TDesignTokens} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokensTypes';
import {ETriplexTheme} from '@sberbusiness/triplex/components/ThemeProvider/ETriplexTheme';

jest.mock('rc-util/es/Dom/canUseDom', () => jest.requireActual('rc-util/lib/Dom/canUseDom'));
jest.mock('rc-util/es/Dom/dynamicCSS', () => ({
    removeCSS: jest.fn(),
    updateCSS: jest.fn(),
}));

describe('UseToken', () => {
    const getHookTheme = (props?: Omit<IThemeProviderProps, 'children'>): ETriplexTheme | undefined => {
        let theme: ETriplexTheme | undefined;
        const Demo = () => {
            const {theme: hookTheme} = useToken();
            theme = hookTheme;
            return null;
        };
        mount(
            <ThemeProvider {...props}>
                <Demo />
            </ThemeProvider>
        );

        return theme;
    };

    const getHookTokens = (props?: Omit<IThemeProviderProps, 'children'>): TDesignTokens | undefined => {
        let tokens: TDesignTokens | undefined;
        const Demo = () => {
            const {tokens: hookTokens} = useToken();
            tokens = hookTokens;
            return null;
        };
        mount(
            <ThemeProvider {...props}>
                <Demo />
            </ThemeProvider>
        );

        return tokens;
    };

    beforeEach(() => {
        process.env.npm_package_version = '10';
        allure.feature('UseToken');
    });

    it('returns light theme with defaultProps', () => {
        const theme = getHookTheme();
        expect(theme).toBe(ETriplexTheme.LIGHT);
    });

    it('returns light theme with light theme props', () => {
        const theme = getHookTheme({theme: ETriplexTheme.LIGHT});
        expect(theme).toBe(ETriplexTheme.LIGHT);
    });

    it('returns dark theme with dark theme props', () => {
        const theme = getHookTheme({theme: ETriplexTheme.DARK});
        expect(theme).toBe(ETriplexTheme.DARK);
    });

    it('returns token value with defaultProps', () => {
        const tokens = getHookTokens();
        expect(tokens?.Primary['100'].value).toBe('#E5FCF7');
    });

    it('returns token value with dark theme props', () => {
        const tokens = getHookTokens({theme: ETriplexTheme.DARK});
        expect(tokens?.Primary['100'].value).toBe('#E5FCF7');
    });

    it('returns token value with token props', () => {
        const tokens = getHookTokens({tokens: {Primary: {100: {value: '#fff'}}}});
        expect(tokens?.Primary['100'].value).toBe('#fff');
    });

    it('returns token value with other token props', () => {
        const tokens = getHookTokens({tokens: {Primary: {300: {value: '#fff'}}}});
        expect(tokens?.Primary['100'].value).toBe('#E5FCF7');
    });

    it('returns token value with token props and theme dark', () => {
        const tokens = getHookTokens({theme: ETriplexTheme.DARK, tokens: {Primary: {100: {value: '#fff'}}}});
        expect(tokens?.Primary['100'].value).toBe('#fff');
    });
    // Закомментировано до окончания работ по темной теме.
    // it('returns tokens count', () => {
    //     const tokens = getHookTokens();
    //     let count = 0;
    //     if (tokens) {
    //         Object.keys(tokens).forEach((tokenGroup) => {
    //             // @ts-ignore
    //             // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    //             count += Object.keys(tokens[tokenGroup]).length;
    //         });
    //     }
    //     expect(count).toBe(46);
    // });
});
