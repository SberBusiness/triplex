import React, {useState, useRef} from 'react';
import {ThemeProvider} from '@sberbusiness/triplex/desktop/components/Theme/ThemeProvider';
import {ETriplexTheme} from '@sberbusiness/triplex/desktop/components/Theme/ThemeContext';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import Wrapper from 'react-styleguidist/lib/client/rsg-components/Wrapper/Wrapper';
import './styles.less';

interface ICustomWrapperProps {
    onError: () => void;
}

const CustomWrapper: React.FC<ICustomWrapperProps> = (props) => {
    const [theme, setTheme] = useState<string>(ETriplexTheme.LIGHT);
    const themes = Object.values(ETriplexTheme);
    const ref = useRef(null);

    const isMobileComponent = document.location.hash.includes('Mobile');

    return (
        <ThemeProvider theme={theme} themes={themes} setTheme={setTheme} target={ref.current}>
            <div className={classnames('custom-wrapper', {'custom-mobile-wrapper': isMobileComponent})} ref={ref}>
                {isMobileComponent ? (
                    <div className="custom-mobile-wrapper-content">
                        <Wrapper {...props} />
                    </div>
                ) : (
                    <Wrapper {...props} />
                )}
            </div>
        </ThemeProvider>
    );
};

export default CustomWrapper;
