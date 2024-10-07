import React, {useEffect} from 'react';
import Wrapper from 'react-styleguidist/lib/client/rsg-components/Wrapper/Wrapper';
import {ETriplexTheme} from '@sberbusiness/triplex/components/ThemeProvider/ETriplexTheme';
import {EIconsTheme, ThemeProvider as IconsThemeProvider} from '@sberbusiness/icons/ThemeProvider';
import {ThemeProvider} from '@sberbusiness/triplex/components/ThemeProvider/ThemeProvider';
import {ThemeObserver} from '../../../common/components/Observer/ThemeObserver';
import './styles.less';

interface ICustomWrapperProps {
    onError: () => void;
}

const CustomWrapper: React.FC<ICustomWrapperProps> = (props) => {
    const [iconsTheme, setIconsTheme] = React.useState(
        localStorage.getItem('triplex-theme') === ETriplexTheme.DARK ? EIconsTheme.DARK : EIconsTheme.LIGHT
    );
    const [theme, setTheme] = React.useState(
        localStorage.getItem('triplex-theme') === ETriplexTheme.DARK ? ETriplexTheme.DARK : ETriplexTheme.LIGHT
    );

    useEffect(() => {
        const unsubscribe = ThemeObserver.subscribe((nextTriplexTheme) => {
            setTheme(nextTriplexTheme);
            setIconsTheme(nextTriplexTheme === ETriplexTheme.LIGHT ? EIconsTheme.LIGHT : EIconsTheme.DARK);
        });

        return unsubscribe;
    }, []);

    return (
        <IconsThemeProvider theme={iconsTheme}>
            <ThemeProvider theme={theme} scopeClassName="styleguide-example-theme">
                <div className="custom-wrapper">
                    <Wrapper {...props} />
                </div>
            </ThemeProvider>
        </IconsThemeProvider>
    );
};

export default CustomWrapper;
