import React, {useEffect, useState} from 'react';
import {ICSSSettingsSectionProps} from '../../StyleguidistSettingsPanel/components/CSSSettingsSection';
import {EComponentType} from '../../../MapComponentToCSSBundle';

interface IRequireCSSBundlesProps extends ICSSSettingsSectionProps {}

/**
 * Подключает css бандл.
 */
const requireCSSBundle = (bundleTitle: string, componentType: EComponentType) => require(`@styles/${componentType === EComponentType.DESKTOP ? 'desktop' : 'mobile'}/components/${bundleTitle}.css`)
/**
 * Подключает common css бандл.
 */
const requireCommonCSSBundle = (bundleTitle: string, componentType: EComponentType) => require(`@styles/${componentType === EComponentType.DESKTOP ? 'desktop' : 'mobile'}/${bundleTitle}.css`)

/**
 * Компонент подключения CSS бандлов.
 */
const RequireCSSBundles: React.FC<IRequireCSSBundlesProps> = ({desktopBundles, desktopCommonBundles, mobileBundles, mobileCommonBundles}) => {
    const [selectedDesktopBundlesLength, setSelectedDesktopBundlesLength] = useState(0);
    const [selectedDesktopCommonBundlesLength, setSelectedDesktopCommonBundlesLength] = useState(0);
    const [selectedMobileBundlesLength, setSelectedMobileBundlesLength] = useState(0);
    const [selectedMobileCommonBundlesLength, setSelectedMobileCommonBundlesLength] = useState(0);

    useEffect(() => {
        const selectedBundles = Object.keys(desktopBundles.bundles).filter(title => desktopBundles.bundles[title]);
        selectedBundles.forEach(bundleTitle => requireCSSBundle(bundleTitle, EComponentType.DESKTOP))
        // В случае отключения css бандла перезагрузка.
        if (selectedDesktopBundlesLength > selectedBundles.length) {
            document.location.reload();
        }
        setSelectedDesktopBundlesLength(selectedBundles.length);
    }, [desktopBundles]);

    useEffect(() => {
        const selectedBundles = Object.keys(desktopCommonBundles.bundles).filter(title => desktopCommonBundles.bundles[title]);
        selectedBundles.forEach(bundleTitle => requireCommonCSSBundle(bundleTitle, EComponentType.DESKTOP))
        // В случае отключения css бандла перезагрузка.
        if (selectedDesktopCommonBundlesLength > selectedBundles.length) {
            document.location.reload();
        }
        setSelectedDesktopCommonBundlesLength(selectedBundles.length);
    }, [desktopCommonBundles]);

    useEffect(() => {
        const selectedBundles = Object.keys(mobileBundles.bundles).filter(title => mobileBundles.bundles[title]);
        selectedBundles.forEach(bundleTitle => requireCSSBundle(bundleTitle, EComponentType.MOBILE));
        // В случае отключения css бандла перезагрузка.
        if (selectedMobileBundlesLength > selectedBundles.length) {
            document.location.reload();
        }
        setSelectedMobileBundlesLength(selectedBundles.length);
    }, [mobileBundles]);

    useEffect(() => {
        const selectedBundles = Object.keys(mobileCommonBundles.bundles).filter(title => mobileCommonBundles.bundles[title]);
        selectedBundles.forEach(bundleTitle => requireCommonCSSBundle(bundleTitle, EComponentType.MOBILE));
        // В случае отключения css бандла перезагрузка.
        if (selectedMobileCommonBundlesLength > selectedBundles.length) {
            document.location.reload();
        }
        setSelectedMobileCommonBundlesLength(selectedBundles.length);
    }, [mobileCommonBundles]);

    return null;
};

export default RequireCSSBundles;
