import React from 'react';
import {EListItemStatus} from './listItemsData';
import {ChipGroup} from '@sberbusiness/triplex/components/ChipGroup/ChipGroup';
import {Chip} from '@sberbusiness/triplex/components/Chip';
import {optionsMultiselectStatus} from './MultiselectStatus';

interface IOptionsStatusProps {
    // Массив статусов.
    value: Array<EListItemStatus>;
    // Обработчик изменения статусов.
    onChange: (value: Array<EListItemStatus>) => void;
}

const OptionsStatus: React.FC<IOptionsStatusProps> = ({onChange, value}) => {
    const handleSelectChip = (status: EListItemStatus) => () => {
        if (value.includes(status)) {
            onChange([...value.filter((v) => v !== status)]);
        } else {
            onChange([...value, status]);
        }
    };

    return (
        <ChipGroup>
            {optionsMultiselectStatus.map((status) => (
                <Chip
                    key={status.id}
                    selected={value.includes(status.value as EListItemStatus)}
                    onClick={handleSelectChip(status.value as EListItemStatus)}
                >
                    {status.label}
                </Chip>
            ))}
        </ChipGroup>
    );
};

export default OptionsStatus;
