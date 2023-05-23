import React, { useEffect, useState }  from 'react';
import {Checkbox} from '@sberbusiness/triplex/desktop/components/Checkbox/Checkbox';
import {ICSSBundles} from './CSSSettingsSection';
import {URLUtils} from '../../ComponentOptions/URLUtils';
import {mapCSSBundleDesktopComponents, mapCSSBundleMobileComponents} from '../../../MapComponentToCSSBundle';
import {ECSSBundlesType} from '../../StyleguidistSettings/StyleguidistSettingsStore';

export interface ICSSSettingsSubSectionProps {
    bundleType: ECSSBundlesType;
    bundles: ICSSBundles;
    onChange: (bundles: ICSSBundles) => void;
    title: string;
}

/**
 * Секция настроек common/desktop/mobile CSS бандлов.
 */
const CSSSettingsSubSection: React.FC<ICSSSettingsSubSectionProps> = ({bundles, bundleType, onChange, title}) => {
    // requiredBundles - бандлы, необходимые для текущего компонента, в случае fullScreenMode.
    const [requiredBundles, setRequiredBundles] = useState<string[]>([]);

    useEffect(() => {
        // Проверка на fullScreenMode и соответствие компонента и типу бандла.
        if (!URLUtils.isComponentPage()
            || URLUtils.isMobileComponentPage() && bundleType === ECSSBundlesType.DESKTOP
            || !URLUtils.isMobileComponentPage() && bundleType === ECSSBundlesType.MOBILE
        ) {
            requiredBundles.length && setRequiredBundles([]);
            return;
        }
        // Название компонента.
        const componentTitle = URLUtils.getComponentTitle();
        // Не common бандлы и есть название компонента.
        if (componentTitle && bundleType !== ECSSBundlesType.DESKTOP_COMMON && bundleType !== ECSSBundlesType.MOBILE_COMMON) {
            // Карта соответствия имени бандла и компонента.
            const map = bundleType === ECSSBundlesType.DESKTOP ? mapCSSBundleDesktopComponents : mapCSSBundleMobileComponents;

            const nextRequiredBundles = Object.keys(map)
                .map(bundleTitle => {
                    if (map[bundleTitle].includes(componentTitle)) {
                        return bundleTitle;
                    }
                    return undefined;
                })
                .filter(v => v)

            if (nextRequiredBundles.join() !== requiredBundles.join()) {
                setRequiredBundles(nextRequiredBundles as string[])
            }
        }
    });

    const handleChange = (bundleTitle: string, checked: boolean) => {
        const nextBundles = {...bundles, [bundleTitle]: checked};
        onChange(nextBundles)
    }

    return (
        <div className="settings-sub-section">
            <div className="title">{title}</div>
            <div className="content">
                {Object.keys(bundles).map((bundleTitle) => (
                        <div key={bundleTitle} className="checkbox-line">
                            <Checkbox
                                checked={bundles[bundleTitle]}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(bundleTitle, event.target.checked)}
                            >
                                {bundleTitle}
                                {requiredBundles.includes(bundleTitle) ? <span className="required" /> : null}
                            </Checkbox>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default CSSSettingsSubSection;
