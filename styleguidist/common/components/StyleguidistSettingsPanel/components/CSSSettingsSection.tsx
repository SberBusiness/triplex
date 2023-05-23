import React from 'react';
import SettingsSection from './SettingsSection';
import CSSSettingsSubSection from './CSSSettingsSubSection';
import {ECSSBundlesType} from '../../StyleguidistSettings/StyleguidistSettingsStore';

/**
 * CSS бандлы одного типа (desktop/desktopCommon/mobile/mobileCommon).
 * [название бандла]: подключен или нет
 */
export interface ICSSBundles {
    [title: string]: boolean
}

/**
 * Свойства CSSSettingsSection;
 */
export interface ICSSSettingsSectionProps {
    desktopBundles: {
        bundles: ICSSBundles,
        onChange: (bundles: ICSSBundles) => void;
    };
    desktopCommonBundles: {
        bundles: ICSSBundles,
        onChange: (bundles: ICSSBundles) => void;
    };
    mobileBundles: {
        bundles: ICSSBundles,
        onChange: (bundles: ICSSBundles) => void;
    };
    mobileCommonBundles: {
        bundles: ICSSBundles,
        onChange: (bundles: ICSSBundles) => void;
    };
}

/**
 * Секция настроек подключения CSS бандлов.
 */
const CSSSettingsSection: React.FC<ICSSSettingsSectionProps> = ({desktopCommonBundles, desktopBundles, mobileCommonBundles, mobileBundles}) => {
    return (
        <SettingsSection title="CSS settings">
           <CSSSettingsSubSection title="Common desktop" bundleType={ECSSBundlesType.DESKTOP_COMMON} {...desktopCommonBundles} />
           <CSSSettingsSubSection title="Desktop" bundleType={ECSSBundlesType.DESKTOP} {...desktopBundles} />
           <CSSSettingsSubSection title="Common mobile" bundleType={ECSSBundlesType.MOBILE_COMMON} {...mobileCommonBundles} />
           <CSSSettingsSubSection title="Mobile" bundleType={ECSSBundlesType.MOBILE} {...mobileBundles} />
        </SettingsSection>
    );
};

export default CSSSettingsSection;
