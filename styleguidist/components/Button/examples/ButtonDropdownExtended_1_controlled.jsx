import React from 'react';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {ELineType, ETextSize} from '@sberbusiness/triplex/components/Typography/enums';
import {DropdownListContext} from '@sberbusiness/triplex/components/Dropdown/DropdownListContext';
import {DropdownwhiteSrvxIcon16} from '@sberbusiness/icons/DropdownwhiteSrvxIcon16';
import {DropdownMobileHeader} from '@sberbusiness/triplex/components/Dropdown/mobile/DropdownMobileHeader';
import {DropdownMobileBody} from '@sberbusiness/triplex/components/Dropdown/mobile/DropdownMobileBody';
import {DropdownMobileList} from '@sberbusiness/triplex/components/Dropdown/mobile/DropdownMobileList';
import {DropdownMobileListItem} from '@sberbusiness/triplex/components/Dropdown/mobile/DropdownMobileListItem';
import {DropdownMobileClose} from '@sberbusiness/triplex/components/Dropdown/mobile/DropdownMobileClose';
import {ButtonDropdownExtended} from "@sberbusiness/triplex/components/Button/ButtonDropdownExtended";
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';
import './style.less';

const [opened, setOpened] = React.useState(false);
const [activeDescendant, setActiveDescendant] = React.useState();

const targetRef = React.useRef();
const dropdownRef = React.useRef();

const options = [
    {
        id: 'button-dropdown-extended-option-1',
        label: 'Dropdown option 1',
        onSelect: () => alert('Selected dropdown option 1.'),
    },
    {
        id: 'button-dropdown-extended-option-2',
        label: 'Dropdown option 2',
        onSelect: () => alert('Selected dropdown option 2.'),
    },
    {
        id: 'button-dropdown-extended-option-3',
        label: 'Dropdown option 3',
        onSelect: () => alert('Selected dropdown option 3.'),
    },
];

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Checkbox checked={opened} setChecked={setOpened}>
            Open
        </ComponentControlPanel.Checkbox>
    </ComponentControlPanel>
);

const renderButton = () => (
    <Button
        theme={EButtonTheme.GENERAL}
        size={EButtonSize.MD}
        aria-haspopup="listbox"
        aria-controls="button-dropdown-extended-list"
        aria-expanded={opened}
        aria-activedescendant={activeDescendant}
        onClick={() => setOpened(!opened)}
        ref={targetRef}
    >
        Button Name
        <DropdownwhiteSrvxIcon16 className={`caret-icon ${opened ? 'opened' : ''}`} />
    </Button>
);

const renderDropdown = () => (
    <ButtonDropdownExtended.Dropdown
        opened={opened}
        targetRef={targetRef}
        ref={dropdownRef}
        mobileViewProps={{
            children: (
                <>
                    <DropdownMobileHeader>
                        <Text size={ETextSize.B1} line={ELineType.EXTRA}>
                            Button Name
                        </Text>
                        <DropdownMobileClose onClick={() => setOpened(false)} />
                    </DropdownMobileHeader>
                    <DropdownMobileBody>
                        <DropdownMobileList>
                            {options.map((option) => (
                                <DropdownMobileListItem
                                    {...option}
                                    key={option.id}
                                    onSelect={() => {
                                        option.onSelect();
                                        setOpened(false);
                                    }}
                                >
                                    {option.label}
                                </DropdownMobileListItem>
                            ))}
                        </DropdownMobileList>
                    </DropdownMobileBody>
                </>
            ),
        }}
    >
        <DropdownListContext.Provider value={{activeDescendant, setActiveDescendant}}>
            <ButtonDropdownExtended.DropdownList
                id="button-dropdown-extended-list"
                dropdownOpened={opened}
            >
                {options.map((option, index) => (
                    <ButtonDropdownExtended.DropdownList.Item
                        key={index}
                        id={option.id}
                        onSelect={() => {
                            setOpened(false);
                            option.onSelect();
                        }}
                    >
                        {option.label}
                    </ButtonDropdownExtended.DropdownList.Item>
                ))}
            </ButtonDropdownExtended.DropdownList>
        </DropdownListContext.Provider>
    </ButtonDropdownExtended.Dropdown>
);

<>
    {renderControlPanel()}
    <ButtonDropdownExtended
        renderButton={renderButton}
        renderDropdown={renderDropdown}
        opened={opened}
        setOpened={setOpened}
        dropdownRef={dropdownRef}
    />
</>