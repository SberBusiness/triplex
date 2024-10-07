import React, {useState, useRef} from 'react';
import {TabsExtended} from '@sberbusiness/triplex/components/TabsExtended/TabsExtended';
import {ButtonDropdownExtended} from '@sberbusiness/triplex/components/Button/ButtonDropdownExtended';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import './styles.less';

const [selectedTabId, setSelectedTabId] = useState('tabs-extended-tab-1-0');
const [opened, setOpened] = useState(false);
const buttonRef = useRef(null);
const dropdownRef = useRef(null);

const options = [
    {id: 'tabs-extended-tab-1-0', label: 'Tab Name'},
    {id: 'tabs-extended-tab-1-1', label: 'Tab Name', marked: true},
    {id: 'tabs-extended-tab-1-2', label: 'Tab Name'},
    {id: 'tabs-extended-tab-1-3', label: 'Tab Name'},
    {id: 'tabs-extended-tab-1-4', label: 'Tab Name'},
    {id: 'tabs-extended-tab-1-5', label: 'Tab Name'},
    {id: 'tabs-extended-tab-1-6', label: 'Tab Name'},
    {id: 'tabs-extended-tab-1-7', label: 'Tab Name'},
    {id: 'tabs-extended-tab-1-8', label: 'Tab Name', marked: true},
    {id: 'tabs-extended-tab-1-9', label: 'Tab Name'},
];

const renderButton = ({opened, setOpened}) => (
    <Button
        className={opened && 'active'}
        theme={EButtonTheme.DOTS}
        size={EButtonSize.SM}
        aria-expanded={opened}
        onClick={() => setOpened(!opened)}
        ref={buttonRef}
    />
);

const renderDropdown = ({dropdownItemsIds, onSelectTab}) => ({opened, setOpened, className}) =>
    opened ? (
        <ButtonDropdownExtended.Dropdown
            className={classnames('tabs-extended-dropdown', className)}
            opened={opened}
            setOpened={setOpened}
            targetRef={buttonRef}
            ref={dropdownRef}
        >
            <ButtonDropdownExtended.DropdownList dropdownOpened={opened}>
                {options
                    .filter((option) => dropdownItemsIds.includes(option.id))
                    .map(({id, label, marked}) => (
                        <ButtonDropdownExtended.DropdownList.Item
                            key={id}
                            id={id}
                            className={classnames('tabs-extended-dropdown-item', {marked})}
                            selected={id == selectedTabId}
                            onSelect={() => {
                                setOpened(false);
                                onSelectTab(id);
                            }}
                        >
                            {label}
                        </ButtonDropdownExtended.DropdownList.Item>
                    ))}
            </ButtonDropdownExtended.DropdownList>
        </ButtonDropdownExtended.Dropdown>
    ) : null;

<TabsExtended className="tabs-extended" selectedId={selectedTabId} onSelectTab={setSelectedTabId}>
    <TabsExtended.Content className="tabs-extended-content">
        <TabsExtended.Content.TabsWrapper>
            {options.map(({id, label, marked}) => (
                <TabsExtended.Content.Tab key={id} id={id}>
                    {({selected}) => (
                        <TabsExtended.Content.TabButton
                            className={classnames('tabs-extended-tab-button', {marked})}
                            selected={selected}
                        >
                            {label}
                        </TabsExtended.Content.TabButton>
                    )}
                </TabsExtended.Content.Tab>
            ))}
        </TabsExtended.Content.TabsWrapper>
        <TabsExtended.Content.DropdownWrapper>
            {({dropdownItemsIds, onSelectTab}) => (
                <ButtonDropdownExtended
                    className="tabs-extended-button-dropdown"
                    opened={opened}
                    setOpened={setOpened}
                    renderButton={renderButton}
                    renderDropdown={renderDropdown({dropdownItemsIds, onSelectTab})}
                    dropdownRef={dropdownRef}
                />
            )}
        </TabsExtended.Content.DropdownWrapper>
    </TabsExtended.Content>
</TabsExtended>