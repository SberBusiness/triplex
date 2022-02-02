import React, {useState} from 'react';
import transform from 'lodash.transform';
import {ICSSBundles, ICSSSettingsSectionProps} from '../StyleguidistSettingsPanel/components/CSSSettingsSection';
import {mapCSSBundleDesktopCommonComponents, mapCSSBundleDesktopComponents, mapCSSBundleMobileCommonComponents, mapCSSBundleMobileComponents} from '../../MapComponentToCSSBundle';
import {StyleguidistSettingsStore, ECSSBundlesType} from './StyleguidistSettingsStore';

/**
 * Интерфейс контекста настроек Styleguidist.
 */
export interface IStyleguidistSettingsContext {
    collapsedMenu: {
        enabled: boolean;
        setEnabled: (enabled: boolean) => void;
    },
    cssBundles: ICSSSettingsSectionProps
    fullScreenMode: {
        enabled: boolean;
        setEnabled: (enabled: boolean) => void;
    },
    settingsPanel: {
        opened: boolean;
        setOpened: (opened: boolean) => void;
    },
}

export const StyleguidistSettingsContext = React.createContext<IStyleguidistSettingsContext>({
    collapsedMenu: {
        enabled: false,
        setEnabled: () => {},
    },
    fullScreenMode: {
        enabled: false,
        setEnabled: () => {},
    },
    cssBundles: {
        desktopCommonBundles: {
            bundles: {},
            onChange: () => {},
        },
        mobileCommonBundles: {
            bundles: {},
            onChange: () => {},
        },
        desktopBundles: {
            bundles: {},
            onChange: () => {},
        },
        mobileBundles: {
            bundles: {},
            onChange: () => {},
        },
    },
    settingsPanel: {
        opened: false,
        setOpened: () => {},
    },
});

// Начальное состояние desktop CSS бандлов, ни один не подключен.
const initialDesktopBundles = transform<Record<string, any>, Record<string, boolean>>(mapCSSBundleDesktopComponents, (result, value, key) => {result[key] = false} , {})
// Начальное состояние desktop common CSS бандлов. Он единственный, подключен по-умолчанию.
const initialDesktopCommonBundles = transform<Record<string, any>, Record<string, boolean>>(mapCSSBundleDesktopCommonComponents, (result, value, key) => {result[key] = true} , {})
// Начальное состояние mobile CSS бандлов, ни один не подключен.
const initialMobileBundles = transform<Record<string, any>, Record<string, boolean>>(mapCSSBundleMobileComponents, (result, value, key) => {result[key] = false} , {})
// Начальное состояние mobile common CSS бандлов. Он единственный, подключен по-умолчанию.
const initialMobileCommonBundles = transform<Record<string, any>, Record<string, boolean>>(mapCSSBundleMobileCommonComponents, (result, value, key) => {result[key] = true} , {})

/**
 * Компонент настроек Styleguidist. Создает контекст с настройками.
 */
const StyleguidistSettings: React.FC<{}> = ({children}) => {
    const [settingsPanelOpened, setSettingsPanelOpened] = useState(false)
    const [collapsedMenu, setCollapsedMenu] = useState(StyleguidistSettingsStore.getCollapsedMenu())
    const [fullScreenMode, setFullScreenMode] = useState(StyleguidistSettingsStore.getFullScreenMode())
    const [desktopBundles, setDesktopBundles] = useState<ICSSBundles>(StyleguidistSettingsStore.getCSSBundles(ECSSBundlesType.DESKTOP) || initialDesktopBundles)
    const [desktopCommonBundles, setDesktopCommonBundles] = useState<ICSSBundles>(StyleguidistSettingsStore.getCSSBundles(ECSSBundlesType.DESKTOP_COMMON) || initialDesktopCommonBundles)
    const [mobileBundles, setMobileBundles] = useState<ICSSBundles>(StyleguidistSettingsStore.getCSSBundles(ECSSBundlesType.MOBILE) || initialMobileBundles)
    const [mobileCommonBundles, setMobileCommonBundles] = useState<ICSSBundles>(StyleguidistSettingsStore.getCSSBundles(ECSSBundlesType.MOBILE_COMMON) || initialMobileCommonBundles)

    const handleChangeCollapsedMenu = (enabled: boolean) => {
        setCollapsedMenu(enabled);
        StyleguidistSettingsStore.setCollapsedMenu(enabled)
    }

    const handleChangeFullScreenMode = (enabled: boolean) => {
        setFullScreenMode(enabled);
        StyleguidistSettingsStore.setFullScreenMode(enabled)
    }

    const handleChangeDesktopBundles = (bundles: ICSSBundles) => {
        setDesktopBundles(bundles);
        StyleguidistSettingsStore.setCSSBundles(bundles, ECSSBundlesType.DESKTOP)
    }

    const handleChangeDesktopCommonBundles = (bundles: ICSSBundles) => {
        setDesktopCommonBundles(bundles);
        StyleguidistSettingsStore.setCSSBundles(bundles, ECSSBundlesType.DESKTOP_COMMON)
    }

    const handleChangeMobileBundles = (bundles: ICSSBundles) => {
        setMobileBundles(bundles);
        StyleguidistSettingsStore.setCSSBundles(bundles, ECSSBundlesType.MOBILE)
    }

    const handleChangeMobileCommonBundles = (bundles: ICSSBundles) => {
        setMobileCommonBundles(bundles);
        StyleguidistSettingsStore.setCSSBundles(bundles, ECSSBundlesType.MOBILE_COMMON)
    }

    return (
        <StyleguidistSettingsContext.Provider value={{
            collapsedMenu: {
                enabled: collapsedMenu,
                setEnabled: handleChangeCollapsedMenu,
            },
            fullScreenMode: {
                enabled: fullScreenMode,
                setEnabled: handleChangeFullScreenMode,
            },
            cssBundles: {
                desktopBundles: {
                    bundles: desktopBundles,
                    onChange: handleChangeDesktopBundles,
                },
                desktopCommonBundles: {
                    bundles: desktopCommonBundles,
                    onChange: handleChangeDesktopCommonBundles,
                },
                mobileBundles: {
                    bundles: mobileBundles,
                    onChange: handleChangeMobileBundles,
                },
                mobileCommonBundles: {
                    bundles: mobileCommonBundles,
                    onChange: handleChangeMobileCommonBundles,
                },
            },
            settingsPanel: {
                opened: settingsPanelOpened,
                setOpened: setSettingsPanelOpened,
            }
        }}>
            {children}
        </StyleguidistSettingsContext.Provider>
    );
};

export default StyleguidistSettings;
