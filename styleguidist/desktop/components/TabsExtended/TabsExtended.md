### TabsExtended с ButtonDropdown.

```jsx
import React, {useState} from 'react';
import {ButtonDropdown} from '@sberbusiness/triplex/desktop/components/Button/ButtonDropdown';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {ExampleBackground, ExampleBackgroundColor} from '../common/ExampleBackground/ExampleBackground';

const [selectedTabId, setSelectedTabId] = useState('1');

const options = [
    {id: '1', label: 'Tab 1'},
    {id: '2', label: 'Tab 2'},
    {id: '3', label: 'Tab 3'},
    {id: '4', label: 'Tab 4'},
    {id: '5', label: 'Tab 5'},
    {id: '6', label: 'Tab 6'},
    {id: '7', label: 'Tab 7'},
    {id: '8', label: 'Tab 8'},
    {id: '9', label: 'Tab 9'},
    {id: '10', label: 'Tab 10'},
    {id: '11', label: 'Tab 11'},
    {id: '12', label: 'Tab 12'},
    {id: '13', label: 'Tab 13'},
    {id: '14', label: 'Tab 14'},
    {id: '15', label: 'Tab 15'},
    {id: '16', label: 'Tab 16'},
];

const getDropdownOptions = ({dropdownItemsIds, onSelectTab}) =>
    options.filter((option) => dropdownItemsIds.includes(option.id)).map((option) => ({...option, onSelect: () => onSelectTab(option.id)}));

<ExampleBackground background={ExampleBackgroundColor.LIGHT}>
    <TabsExtended selectedId={selectedTabId} onSelectTab={setSelectedTabId}>
        <TabsExtended.Content className="tabs-extended-content">
            <TabsExtended.Content.TabsWrapper>
                {options.map((item, index) => (
                    <TabsExtended.Content.Tab key={index} id={item.id}>
                        {({selected}) => <TabsExtended.Content.TabButton selected={selected}>{item.label}</TabsExtended.Content.TabButton>}
                    </TabsExtended.Content.Tab>
                ))}
            </TabsExtended.Content.TabsWrapper>
            <TabsExtended.Content.DropdownWrapper>
                {({dropdownItemsIds, onSelectTab}) => (
                    <ButtonDropdown
                        className="tabs-button-dropdown"
                        theme={EButtonTheme.DOTS}
                        size={EButtonSize.SM}
                        options={getDropdownOptions({dropdownItemsIds, onSelectTab})}
                        selected={options.filter((o) => o.id === selectedTabId)[0]}
                    />
                )}
            </TabsExtended.Content.DropdownWrapper>
        </TabsExtended.Content>
    </TabsExtended>
</ExampleBackground>
```


### TabsExtended с кастомным Dropdown и кастомной иконкой нотификации.

```jsx
import React, {useState} from 'react';
import {ExampleBackground, ExampleBackgroundColor} from '../common/ExampleBackground/ExampleBackground';
import {ButtonDropdownExtended} from '@sberbusiness/triplex/desktop/components/Button/ButtonDropdownExtended';
import {Button} from '@sberbusiness/triplex/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/desktop/components/Button/enums';
import './styles.less';

const [selectedTabId, setSelectedTabId] = useState('1');
const [opened, setOpened] = useState(false);

const options = [
    {id: '1', label: 'Tab 1', notification: true},
    {id: '2', label: 'Tab 2'},
    {id: '3', label: 'Tab 3'},
    {id: '4', label: 'Tab 4'},
    {id: '5', label: 'Tab 5'},
    {id: '6', label: 'Tab 6'},
    {id: '7', label: 'Tab 7'},
    {id: '8', label: 'Tab 8'},
    {id: '9', label: 'Tab 9'},
    {id: '10', label: 'Tab 10'},
    {id: '11', label: 'Tab 11'},
    {id: '12', label: 'Tab 12'},
    {id: '13', label: 'Tab 13'},
    {id: '14', label: 'Tab 14'},
    {id: '15', label: 'Tab 15'},
    {id: '16', label: 'Tab 16', notification: true},
];

const renderButton = ({opened, setOpened}) => (
    <Button className={opened && 'active'} theme={EButtonTheme.DOTS} size={EButtonSize.SM} onClick={() => setOpened(!opened)} />
);

const renderDropdown = ({dropdownItemsIds, onSelectTab}) => ({opened, className}) =>
    opened ? (
        <ButtonDropdownExtended.Dropdown opened={opened} className={className}>
            <ButtonDropdownExtended.Dropdown.List dropdownOpened={opened}>
                {options
                    .filter((option) => dropdownItemsIds.includes(option.id))
                    .map((option, index) => (
                        <ButtonDropdownExtended.Dropdown.List.Item
                            key={index}
                            id={option.id}
                            className={option.notification ? 'with-notification with-notification-dropdown' : ''}
                            onSelect={() => {
                                setOpened(false);
                                onSelectTab(option.id);
                            }}
                            selected={selectedTabId === option.id}
                        >
                            {option.label}
                        </ButtonDropdownExtended.Dropdown.List.Item>
                    ))}
            </ButtonDropdownExtended.Dropdown.List>
        </ButtonDropdownExtended.Dropdown>
    ) : null;

<ExampleBackground background={ExampleBackgroundColor.LIGHT}>
    <TabsExtended selectedId={selectedTabId} onSelectTab={setSelectedTabId}>
        <TabsExtended.Content className="tabs-extended-content">
            <TabsExtended.Content.TabsWrapper>
                {options.map((item, index) => (
                    <TabsExtended.Content.Tab key={index} id={item.id}>
                        {({selected}) => (
                            <TabsExtended.Content.TabButton className={item.notification ? 'with-notification' : ''} selected={selected}>
                                {item.label}
                            </TabsExtended.Content.TabButton>
                        )}
                    </TabsExtended.Content.Tab>
                ))}
            </TabsExtended.Content.TabsWrapper>
            <TabsExtended.Content.DropdownWrapper>
                {({dropdownItemsIds, onSelectTab}) => (
                    <ButtonDropdownExtended
                        className="tabs-button-dropdown"
                        opened={opened}
                        setOpened={setOpened}
                        renderButton={renderButton}
                        renderDropdown={renderDropdown({dropdownItemsIds, onSelectTab})}
                    />
                )}
            </TabsExtended.Content.DropdownWrapper>
        </TabsExtended.Content>
    </TabsExtended>
</ExampleBackground>
```

### TabsExtended с кастомной кнопкой без Dropdown.

```jsx
import React, {useState} from 'react';
import {ExampleBackground, ExampleBackgroundColor} from '../common/ExampleBackground/ExampleBackground';
import './styles.less';

const [selectedTabId, setSelectedTabId] = useState('');

const options = [
    {id: '1', label: 'Вчера'},
    {id: '2', label: 'Сегодня'},
];

const GhostTabIcon = () => (
    <span className="ghost-tab-icon">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="6" r="6" fill="#B2B8BF" />
            <path fillRule="evenodd" clipRule="evenodd" d="M9 6.6H3V5.4H9V6.6Z" fill="white" />
            <path fillRule="evenodd" clipRule="evenodd" d="M5.4 9V3H6.6V9H5.4Z" fill="white" />
        </svg>
    </span>
);

<ExampleBackground background={ExampleBackgroundColor.LIGHT}>
    <TabsExtended selectedId={selectedTabId} onSelectTab={setSelectedTabId}>
        <TabsExtended.Content className="tabs-extended-content">
            <TabsExtended.Content.TabsWrapper>
                {options.map((item, index) => (
                    <TabsExtended.Content.Tab key={index} id={item.id}>
                        {({selected}) => <TabsExtended.Content.TabButton selected={selected}>{item.label}</TabsExtended.Content.TabButton>}
                    </TabsExtended.Content.Tab>
                ))}
                <TabsExtended.Content.Tab key="ghost" id="ghost">
                    {() => (
                        <TabsExtended.Content.TabButton className="ghost-button">
                            <GhostTabIcon />В будущем
                        </TabsExtended.Content.TabButton>
                    )}
                </TabsExtended.Content.Tab>
            </TabsExtended.Content.TabsWrapper>
        </TabsExtended.Content>
    </TabsExtended>
</ExampleBackground>
```
