import {ICSSBundles} from '../StyleguidistSettingsPanel/components/CSSSettingsSection';

/**
 * Тип CSS бандла.
 */
export enum ECSSBundlesType {
    DESKTOP,
    DESKTOP_COMMON,
    MOBILE,
    MOBILE_COMMON,
}

export const collapsedMenuKeyTitle = 'collapsedMenu';
export const fullScreenModeKeyTitle = 'fullScreenMode';
export const desktopBundlesKeyTitle = 'desktopBundles';
export const desktopCommonBundlesKeyTitle = 'desktopCommonBundles';
export const mobileBundlesKeyTitle = 'mobileBundles';
export const mobileCommonBundlesKeyTitle = 'mobileCommonBundles';

/**
 * Объект для хранения настроек. Настройки хранятся в sessionStorage.
 */
export const StyleguidistSettingsStore = {
    getCollapsedMenu: (): boolean =>  localStorage.getItem(collapsedMenuKeyTitle) === 'true',
    setCollapsedMenu: (enabled: boolean) => {
        localStorage.setItem(collapsedMenuKeyTitle, enabled.toString())
    },
    getFullScreenMode: (): boolean => localStorage.getItem(fullScreenModeKeyTitle) === 'true',
    setFullScreenMode: (enabled: boolean) => {
        localStorage.setItem(fullScreenModeKeyTitle, enabled.toString())
    },
    getCSSBundles: (type: ECSSBundlesType): ICSSBundles | null => {
        let key;
        switch (type) {
            case ECSSBundlesType.DESKTOP:
                key = desktopBundlesKeyTitle;
                break;

            case ECSSBundlesType.DESKTOP_COMMON:
                key = desktopCommonBundlesKeyTitle;
                break;

            case ECSSBundlesType.MOBILE:
                key = mobileBundlesKeyTitle;
                break;

            case ECSSBundlesType.MOBILE_COMMON:
                key = mobileCommonBundlesKeyTitle;
                break;
        }
        if (key) {
            const bundles = sessionStorage.getItem(key);
            if (bundles) {
                return JSON.parse(bundles);
            }
        }

        return null;
    },
    setCSSBundles: (bundles: ICSSBundles, type: ECSSBundlesType) => {
        let key;
        switch (type) {
            case ECSSBundlesType.DESKTOP:
                key = desktopBundlesKeyTitle;
                break;

            case ECSSBundlesType.DESKTOP_COMMON:
                key = desktopCommonBundlesKeyTitle;
                break;

            case ECSSBundlesType.MOBILE:
                key = mobileBundlesKeyTitle;
                break;

            case ECSSBundlesType.MOBILE_COMMON:
                key = mobileCommonBundlesKeyTitle;
                break;
        }
        if (key) {
            sessionStorage.setItem(key, JSON.stringify(bundles))
        }
    },
}