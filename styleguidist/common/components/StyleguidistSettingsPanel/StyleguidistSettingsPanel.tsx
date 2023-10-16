import React from 'react';
import {IStyleguidistSettingsContext} from '../StyleguidistSettings/StyleguidistSettings';
import CSSSettingsSection from './components/CSSSettingsSection';
import {ClearSrvIcon16} from '@sberbusiness/icons/ClearSrvIcon16';
import CollapsedMenuSettingsSection from './components/CollapsedMenuSettingsSection';
import '@styles/components/Checkbox.css';
import './styles.less';

export interface IStyleguidistSettingsPanelProps {
    value: IStyleguidistSettingsContext;
}

/**
 * Панель настроек Styleguidist.
 */
const StyleguidistSettingsPanel: React.FC<IStyleguidistSettingsPanelProps> = ({value}) => {
    const {collapsedMenu, cssBundles, settingsPanel} = value;

    return (
        <article className={`styleguidist-settings-panel ${settingsPanel.opened ? 'opened' : ''}`}>
            <header className="title">Settings</header>
            <CollapsedMenuSettingsSection checked={collapsedMenu.enabled} onChange={collapsedMenu.setEnabled} />
            <CSSSettingsSection {...cssBundles} />
            <div className="overlay" onClick={() => settingsPanel.setOpened(true)} />
            <span className="close-button" onClick={() => settingsPanel.setOpened(false)}>
                <ClearSrvIcon16 />
            </span>
        </article>
    );
};

export default StyleguidistSettingsPanel;
