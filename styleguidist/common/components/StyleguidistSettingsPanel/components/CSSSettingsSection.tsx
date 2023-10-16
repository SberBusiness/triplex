import React from 'react';
import SettingsSection from './SettingsSection';
import CSSSettingsSubSection from './CSSSettingsSubSection';
import {ECSSBundlesType} from '../../StyleguidistSettings/StyleguidistSettingsStore';

/**
 * CSS бандлы одного типа (desktop/desktopCommon/mobile/mobileCommon).
 * [название бандла]: подключен или нет
 */
export interface ICSSBundles {
    [title: string]: boolean;
}

/**
 * Свойства CSSSettingsSection;
 */
export interface ICSSSettingsSectionProps {
    bundles: {
        bundles: ICSSBundles;
        onChange: (bundles: ICSSBundles) => void;
    };
    commonBundles: {
        bundles: ICSSBundles;
        onChange: (bundles: ICSSBundles) => void;
    };
}

/**
 * Секция настроек подключения CSS бандлов.
 */
const CSSSettingsSection: React.FC<ICSSSettingsSectionProps> = ({commonBundles, bundles}) => {
    return (
        <SettingsSection title="CSS settings">
            <CSSSettingsSubSection title="Common desktop" bundleType={ECSSBundlesType.DESKTOP_COMMON} {...commonBundles} />
            <CSSSettingsSubSection title="Desktop" bundleType={ECSSBundlesType.DESKTOP} {...bundles} />
        </SettingsSection>
    );
};

export default CSSSettingsSection;
