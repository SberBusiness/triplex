import React, {useState} from 'react';
import {TabsExtended} from '@sberbusiness/triplex/components/TabsExtended/TabsExtended';
import {ButtonDropdown} from '@sberbusiness/triplex/components/Button/ButtonDropdown';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';

const [selectedTabId, setSelectedTabId] = useState('tabs-extended-tab-0-0');

const options = [
    {id: 'tabs-extended-tab-0-0', label: 'Tab Name'},
    {id: 'tabs-extended-tab-0-1', label: 'Tab Name'},
    {id: 'tabs-extended-tab-0-2', label: 'Tab Name'},
    {id: 'tabs-extended-tab-0-3', label: 'Tab Name'},
    {id: 'tabs-extended-tab-0-4', label: 'Tab Name'},
    {id: 'tabs-extended-tab-0-5', label: 'Tab Name'},
    {id: 'tabs-extended-tab-0-6', label: 'Tab Name'},
    {id: 'tabs-extended-tab-0-7', label: 'Tab Name'},
    {id: 'tabs-extended-tab-0-8', label: 'Tab Name'},
    {id: 'tabs-extended-tab-0-9', label: 'Tab Name'},
];

const getDropdownOptions = ({dropdownItemsIds, onSelectTab}) =>
    options.filter((option) => dropdownItemsIds
        .includes(option.id))
        .map((option) => ({...option, onSelect: () => onSelectTab(option.id)}));

<TabsExtended className="tabs-extended" selectedId={selectedTabId} onSelectTab={setSelectedTabId}>
    <TabsExtended.Content className="tabs-extended-content">
        <TabsExtended.Content.TabsWrapper>
            {options.map(({id, label}) => (
                <TabsExtended.Content.Tab key={id} id={id}>
                    {({selected}) => (
                        <TabsExtended.Content.TabButton selected={selected}>
                            {label}
                        </TabsExtended.Content.TabButton>
                    )}
                </TabsExtended.Content.Tab>
            ))}
        </TabsExtended.Content.TabsWrapper>
        <TabsExtended.Content.DropdownWrapper>
            {({dropdownItemsIds, onSelectTab}) => (
                <ButtonDropdown
                    className="tabs-extended-button-dropdown"
                    theme={EButtonTheme.DOTS}
                    size={EButtonSize.SM}
                    options={getDropdownOptions({dropdownItemsIds, onSelectTab})}
                    selected={options.filter((option) => option.id == selectedTabId)[0]}
                />
            )}
        </TabsExtended.Content.DropdownWrapper>
    </TabsExtended.Content>
</TabsExtended>