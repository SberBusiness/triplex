import React from 'react';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {KebabSrvxIcon20} from '@sberbusiness/icons/KebabSrvxIcon20';
import {DownloadSrvIcon20} from '@sberbusiness/icons/DownloadSrvIcon20';
import {
    EFontType,
    ELineType,
    ETextSize,
    ETitleSize,
} from '@sberbusiness/triplex/components/Typography/enums';
import {IListItemData} from './ListMasterFull';
import {
    ListItemControlsButton,
    ListItemControlsButtonDropdown,
    ListItemTable,
} from '@sberbusiness/triplex/components/List';
import {Title} from '@sberbusiness/triplex/components/Typography/Title';
import {MarkerStatus} from '@sberbusiness/triplex/components/MarkerStatus/MarkerStatus';
import {IButtonDropdownOption} from '@sberbusiness/triplex/components/Button/ButtonDropdown';

// Список опций для ListItemControlsButtonDropdown, которая открывается при свайпе.
const listItemControlsButtonDropdownOptions: IButtonDropdownOption[] = [
    {
        id: 'list-item-controls-button-dropdown-option-1',
        label: 'Удалить',
        onSelect: () => alert('Выбран пункт Удалить.'),
    },
    {
        id: 'list-item-controls-button-dropdown-option-2',
        label: 'Изменить',
        onSelect: () => alert('Выбран пункт Изменить.'),
    },
    {
        id: 'list-item-controls-button-dropdown-option-3',
        label: 'Скопировать',
        onSelect: () => alert('Выбран пункт Скопировать.'),
    },
];

export interface IListItemElementProps extends IListItemData {
    selected: boolean;
    onSelect: (id: string, selected: boolean) => void;
}

const ListItemElement: React.FC<IListItemElementProps> = ({
    amount,
    description,
    id,
    numberAndDate,
    onSelect,
    selected,
    statusMarker,
    statusText,
    title,
}) => {
    const handleSelect = (selected: boolean) => {
        onSelect(id, selected);
    };

    return (
        <ListItemTable
            selected={selected}
            onSelect={handleSelect}
            onClickItem={() => console.log('Клик по карточке.')}
            controlButtons={
                <>
                    <ListItemControlsButton icon={<DownloadSrvIcon20 />}>Скачать</ListItemControlsButton>
                    <ListItemControlsButtonDropdown
                        icon={<KebabSrvxIcon20 />}
                        options={listItemControlsButtonDropdownOptions}
                    >
                        Еще
                    </ListItemControlsButtonDropdown>
                </>
            }
        >
            <Title size={ETitleSize.H4}>{amount} RUB</Title>
            <Text size={ETextSize.B1} line={ELineType.EXTRA} tag="div">
                {title}
            </Text>
            <Text size={ETextSize.B1} line={ELineType.EXTRA} type={EFontType.SECONDARY} tag="div">
                {description}
            </Text>
            <Text size={ETextSize.B1} line={ELineType.EXTRA} type={EFontType.SECONDARY} tag="div">
                {numberAndDate}
            </Text>

            <MarkerStatus status={statusMarker}>{statusText}</MarkerStatus>
        </ListItemTable>
    );
};

export default ListItemElement;
