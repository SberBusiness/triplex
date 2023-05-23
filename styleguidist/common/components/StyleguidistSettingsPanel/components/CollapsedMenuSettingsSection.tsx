import React from 'react';
import SettingsSection from './SettingsSection';
import {Checkbox} from '@sberbusiness/triplex/desktop/components/Checkbox/Checkbox';

export interface ICollapsedMenuSettingsSectionSectionProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

/**
 * Панель настроек CollapsedMenu.
 */
const CollapsedMenuSettingsSection: React.FC<ICollapsedMenuSettingsSectionSectionProps> = ({checked, onChange}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    }

    return (
        <SettingsSection title="Main menu">
           <div>
               <Checkbox checked={checked} onChange={handleChange}>Collapsed mode</Checkbox>
           </div>
        </SettingsSection>
    );
};

export default CollapsedMenuSettingsSection;
