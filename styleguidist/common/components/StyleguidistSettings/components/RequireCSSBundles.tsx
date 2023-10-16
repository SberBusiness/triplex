import React, {useEffect, useState} from 'react';
import {ICSSSettingsSectionProps} from '../../StyleguidistSettingsPanel/components/CSSSettingsSection';

interface IRequireCSSBundlesProps extends ICSSSettingsSectionProps {}

/**
 * Подключает css бандл.
 */
const requireCSSBundle = (bundleTitle: string) => require(`@styles/components/${bundleTitle}.css`);
/**
 * Подключает common css бандл.
 */
const requireCommonCSSBundle = (bundleTitle: string) => require(`@styles/${bundleTitle}.css`);

/**
 * Компонент подключения CSS бандлов.
 */
const RequireCSSBundles: React.FC<IRequireCSSBundlesProps> = ({bundles, commonBundles}) => {
    const [selectedDesktopBundlesLength, setSelectedDesktopBundlesLength] = useState(0);
    const [selectedDesktopCommonBundlesLength, setSelectedDesktopCommonBundlesLength] = useState(0);

    useEffect(() => {
        const selectedBundles = Object.keys(bundles.bundles).filter((title) => bundles.bundles[title]);
        selectedBundles.forEach((bundleTitle) => requireCSSBundle(bundleTitle));
        // В случае отключения css бандла перезагрузка.
        if (selectedDesktopBundlesLength > selectedBundles.length) {
            document.location.reload();
        }
        setSelectedDesktopBundlesLength(selectedBundles.length);
    }, [bundles]);

    useEffect(() => {
        const selectedBundles = Object.keys(commonBundles.bundles).filter((title) => commonBundles.bundles[title]);
        selectedBundles.forEach((bundleTitle) => requireCommonCSSBundle(bundleTitle));
        // В случае отключения css бандла перезагрузка.
        if (selectedDesktopCommonBundlesLength > selectedBundles.length) {
            document.location.reload();
        }
        setSelectedDesktopCommonBundlesLength(selectedBundles.length);
    }, [commonBundles]);

    return null;
};

export default RequireCSSBundles;
