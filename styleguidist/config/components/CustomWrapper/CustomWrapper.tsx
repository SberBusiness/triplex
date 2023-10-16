import React, {useState, useRef} from 'react';
import {ThemeProvider} from '@sberbusiness/triplex/components/Theme/ThemeProvider';
import {ETriplexTheme} from '@sberbusiness/triplex/components/Theme/ThemeContext';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import Wrapper from 'react-styleguidist/lib/client/rsg-components/Wrapper/Wrapper';
import './styles.less';

interface ICustomWrapperProps {
    onError: () => void;
}

const CustomWrapper: React.FC<ICustomWrapperProps> = (props) => {
    const [theme, setTheme] = useState<string>(ETriplexTheme.LIGHT);
    const themes = Object.values(ETriplexTheme);
    const ref = useRef(null);

    return (
        <ThemeProvider theme={theme} themes={themes} setTheme={setTheme} target={ref.current}>
            <div className={classnames('custom-wrapper')} ref={ref}>
                <Wrapper {...props} />
            </div>
        </ThemeProvider>
    );
};

export default CustomWrapper;
