import React, {useState} from 'react';
import transform from 'lodash.transform';
import {ICSSBundles, ICSSSettingsSectionProps} from '../StyleguidistSettingsPanel/components/CSSSettingsSection';
import {mapCSSBundleCommonComponents, mapCSSBundleComponents} from '../../MapComponentToCSSBundle';
import {StyleguidistSettingsStore, ECSSBundlesType} from './StyleguidistSettingsStore';

/** Интерфейс контекста настроек Styleguidist. */
export interface IStyleguidistSettingsContext {
    collapsedMenu: {
        enabled: boolean;
        setEnabled: (enabled: boolean) => void;
    };
    cssBundles: ICSSSettingsSectionProps;
    settingsPanel: {
        opened: boolean;
        setOpened: (opened: boolean) => void;
    };
}

export const StyleguidistSettingsContext = React.createContext<IStyleguidistSettingsContext>({
    collapsedMenu: {
        enabled: false,
        setEnabled: () => {},
    },
    cssBundles: {
        commonBundles: {
            bundles: {},
            onChange: () => {},
        },
        bundles: {
            bundles: {},
            onChange: () => {},
        },
    },
    settingsPanel: {
        opened: false,
        setOpened: () => {},
    },
});

// Начальное состояние CSS бандлов, ни один не подключен.
const initialBundles = transform<Record<string, string[]>, Record<string, boolean>>(
    mapCSSBundleComponents,
    (result, value, key) => {
        result[key] = false;
    },
    {}
);
// Начальное состояние common CSS бандлов. Он единственный, подключен по-умолчанию.
const initialCommonBundles = transform<Record<string, string[]>, Record<string, boolean>>(
    mapCSSBundleCommonComponents,
    (result, value, key) => {
        result[key] = true;
    },
    {}
);

/** Компонент настроек Styleguidist. Создает контекст с настройками. */
const StyleguidistSettings: React.FC = ({children}) => {
    const [settingsPanelOpened, setSettingsPanelOpened] = useState(false);
    const [collapsedMenu, setCollapsedMenu] = useState(StyleguidistSettingsStore.getCollapsedMenu());
    const [fullScreenMode, setFullScreenMode] = useState(StyleguidistSettingsStore.getFullScreenMode());
    const [desktopBundles, setDesktopBundles] = useState<ICSSBundles>(
        StyleguidistSettingsStore.getCSSBundles(ECSSBundlesType.DESKTOP) || initialBundles
    );
    const [desktopCommonBundles, setDesktopCommonBundles] = useState<ICSSBundles>(
        StyleguidistSettingsStore.getCSSBundles(ECSSBundlesType.DESKTOP_COMMON) || initialCommonBundles
    );

    const handleChangeCollapsedMenu = (enabled: boolean) => {
        setCollapsedMenu(enabled);
        StyleguidistSettingsStore.setCollapsedMenu(enabled);
    };

    const handleChangeFullScreenMode = (enabled: boolean) => {
        setFullScreenMode(enabled);
        StyleguidistSettingsStore.setFullScreenMode(enabled);
    };

    const handleChangeDesktopBundles = (bundles: ICSSBundles) => {
        setDesktopBundles(bundles);
        StyleguidistSettingsStore.setCSSBundles(bundles, ECSSBundlesType.DESKTOP);
    };

    const handleChangeDesktopCommonBundles = (bundles: ICSSBundles) => {
        setDesktopCommonBundles(bundles);
        StyleguidistSettingsStore.setCSSBundles(bundles, ECSSBundlesType.DESKTOP_COMMON);
    };

    return (
        <StyleguidistSettingsContext.Provider
            value={{
                collapsedMenu: {
                    enabled: collapsedMenu,
                    setEnabled: handleChangeCollapsedMenu,
                },
                cssBundles: {
                    bundles: {
                        bundles: desktopBundles,
                        onChange: handleChangeDesktopBundles,
                    },
                    commonBundles: {
                        bundles: desktopCommonBundles,
                        onChange: handleChangeDesktopCommonBundles,
                    },
                },
                settingsPanel: {
                    opened: settingsPanelOpened,
                    setOpened: setSettingsPanelOpened,
                },
            }}
        >
            {children}
        </StyleguidistSettingsContext.Provider>
    );
};

export default StyleguidistSettings;
