```jsx
import React, {useState} from 'react';
import {Button} from '@sbbol/web-library/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sbbol/web-library/desktop/components/Button/enums';
import {DropdownwhiteSrvxIcon16} from '@sberbusiness/icons/DropdownwhiteSrvxIcon16';
import './style.less';

const [opened, setOpened] = useState(false);

const options = [
    {id: 'buttonDropdownExtendedOption1', label: 'Текст строки меню', onSelect: () => alert()},
    {id: 'buttonDropdownExtendedOption2', label: 'Текст строки меню', onSelect: () => alert()},
    {id: 'buttonDropdownExtendedOption3', label: 'Текст строки меню', onSelect: () => alert()},
    {id: 'buttonDropdownExtendedOption4', label: 'Текст строки меню', onSelect: () => alert()},
    {id: 'buttonDropdownExtendedOption5', label: 'Текст строки меню', onSelect: () => alert()},
];

const renderButton = ({opened, setOpened}) => (
    <Button className={opened && 'active'} theme={EButtonTheme.GENERAL} size={EButtonSize.MD} onClick={() => setOpened(!opened)}>
        Button Name
        <DropdownwhiteSrvxIcon16 className="caretIcon" />
    </Button>
);

const renderDropdown = ({opened, className}) =>
    opened ? (
        <ButtonDropdownExtended.Dropdown opened={opened} className={className}>
            <ButtonDropdownExtended.Dropdown.List dropdownOpened={opened}>
                {options.map((option, index) => (
                    <ButtonDropdownExtended.Dropdown.List.Item
                        key={index}
                        id={option.id}
                        onSelect={() => {
                            setOpened(false);
                            option.onSelect();
                        }}
                    >
                        {option.label}
                    </ButtonDropdownExtended.Dropdown.List.Item>
                ))}
            </ButtonDropdownExtended.Dropdown.List>
        </ButtonDropdownExtended.Dropdown>
    ) : null;

const renderControls = () => (
    <div style={{display: 'flex', flexDirection: 'column', marginBottom: '16px'}}>
        <label style={{display: 'inline-flex'}}>
            <input type="checkbox" checked={opened} onChange={setOpened} style={{margin: 'auto 4px auto 0'}} />
            Opened
        </label>
    </div>
);

<>
    {renderControls()}
    <ButtonDropdownExtended
        className="button-dropdown-extended"
        opened={opened}
        setOpened={setOpened}
        renderButton={renderButton}
        renderDropdown={renderDropdown}
    />
</>
```
