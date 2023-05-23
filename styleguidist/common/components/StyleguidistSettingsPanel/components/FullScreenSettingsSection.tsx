import React from 'react';
import SettingsSection from './SettingsSection';
import {Checkbox} from '@sberbusiness/triplex/desktop/components/Checkbox/Checkbox';

export interface IFullScreenSettingsSectionProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

/**
 * Панель настроек FullScreen режима.
 */
const FullScreenSettingsSection: React.FC<IFullScreenSettingsSectionProps> = ({checked, onChange}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    }

    return (
        <SettingsSection title="FullScreen mode">
           <div>
               <Checkbox checked={checked} onChange={handleChange}>Show fullscreen icon</Checkbox>
           </div>
        </SettingsSection>
    );
};

export default FullScreenSettingsSection;
