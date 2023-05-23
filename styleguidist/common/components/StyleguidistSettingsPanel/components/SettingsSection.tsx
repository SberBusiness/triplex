import React from 'react';

export interface ISettingsSectionProps {
    title: string;
}

/**
 * Секция панели настроек.
 */
const SettingsSection: React.FC<ISettingsSectionProps> = ({children, title}) => (
    <section className="settings-section">
        <header className="title">{title}</header>
        <div className="content">{children}</div>
    </section>
);

export default SettingsSection;
