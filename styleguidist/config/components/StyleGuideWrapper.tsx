import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import StyleGuide from 'react-styleguidist/lib/client/rsg-components/StyleGuide/StyleGuide';
import {isIE} from './utils';
import moment from 'moment';
import StyleguidistSettings, {StyleguidistSettingsContext} from '../../common/components/StyleguidistSettings/StyleguidistSettings';
import StyleguidistSettingsPanel from '../../common/components/StyleguidistSettingsPanel/StyleguidistSettingsPanel';
import FullScreenModeHandler from '../../common/components/StyleguidistSettings/components/FullScreenModeHandler';
import RequireCSSBundles from '../../common/components/StyleguidistSettings/components/RequireCSSBundles';
import StyleguidistOverlay from '../../common/components/StyleguidistOverlay/StyleguidistOverlay';
import {SettingsSrvIcon20} from '@sberbusiness/icons/SettingsSrvIcon20';

// Имя класса, добавляемого к body, когда styleguidist открыт в режиме просмотра из styleGuide.
const styleguidistLiveClassName = 'styleguidist-live';

// Устанавливаем российскую локаль.
moment.locale('ru');

const StyleGuideWrapper: React.FC<any> = (props) => {
    useEffect(() => {
        const {hash} = document.location;

        if (hash.includes('styleguideLive=true')) {
            document.body.classList.add(styleguidistLiveClassName);
        }
        if (!isIE && hash.includes('axe=true')) {
            // подключение библиотеки тестирования Accessibility
            const axe = require('react-axe');
            axe(React, ReactDOM, 1000);
        }

        // Переменная передает окружение в GTM.
        // @ts-ignore
        window.GTM_ENV_TYPE = process.env.NODE_ENV;

        return () => {
            document.body.classList.remove(styleguidistLiveClassName);
        };
    }, []);

    // Стайлгайдист без панели настроек. Для сборок прод режима и скриншот тестов.
    if (process.env.STYLEGUIDIST_SETTINGS_MODE !== 'true') {
        // Подгружаем заранее собранные стили.
        require('@sberbusiness/triplex/styles/desktop/styles.css');
        require('@sberbusiness/triplex/styles/mobile/styles.css');

        return <StyleGuide {...props} />;
    }

    return (
        <StyleguidistSettings>
            <StyleguidistSettingsContext.Consumer>
                {(styleguidistSettingsContextValue) => (
                    <>
                        <RequireCSSBundles {...styleguidistSettingsContextValue.cssBundles} />

                        <StyleGuide {...props} />

                        <FullScreenModeHandler enabled={styleguidistSettingsContextValue.fullScreenMode.enabled} />

                        <StyleguidistSettingsPanel value={styleguidistSettingsContextValue} />

                        <span className="settings-panel-icon" onClick={() => styleguidistSettingsContextValue.settingsPanel.setOpened(true)}>
                            <SettingsSrvIcon20 />
                        </span>

                        <StyleguidistOverlay
                            opened={styleguidistSettingsContextValue.settingsPanel.opened}
                            onClick={() => styleguidistSettingsContextValue.settingsPanel.setOpened(false)}
                        />
                    </>
                )}
            </StyleguidistSettingsContext.Consumer>
        </StyleguidistSettings>
    );
};

export default StyleGuideWrapper;
