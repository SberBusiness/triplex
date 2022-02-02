import React, {useEffect, useState} from 'react';
import Wrapper from 'react-styleguidist/lib/client/rsg-components/Wrapper/Wrapper';
import './styles.less';

interface ICustomWrapperProps {
    onError: () => void;
}
const CustomWrapper: React.FC<ICustomWrapperProps> = (props) => {
    const [themeId, setThemeId] = useState('default');

    useEffect(() => {
        const handleChangeTheme = (e: Event) => {
            // @ts-ignore
            setThemeId(e.detail);
        };

        window.addEventListener('changeTheme', handleChangeTheme);

        return () => window.removeEventListener('changeTheme', handleChangeTheme);
    }, []);

    const isMobileComponent = document.location.hash.includes('Mobile');

    return (
        <div className={`theme__${themeId} custom-wrapper ${isMobileComponent && 'custom-mobile-wrapper'}`}>
            <div className={`${isMobileComponent && 'custom-mobile-wrapper-content'}`}>
                <Wrapper {...props} />
            </div>
        </div>
    );
};

export default CustomWrapper;
