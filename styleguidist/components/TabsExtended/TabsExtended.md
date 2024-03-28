### TabsExtended с ButtonDropdown.

```jsx {"props": {"className": "light-background"}}
import {ButtonDropdown} from '@sberbusiness/triplex/components/Button/ButtonDropdown';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';

const [selectedTabId, setSelectedTabId] = React.useState('tabs-extended-tab-0');

const options = [
    {id: 'tabs-extended-tab-0', label: 'Tab Name'},
    {id: 'tabs-extended-tab-1', label: 'Tab Name'},
    {id: 'tabs-extended-tab-2', label: 'Tab Name'},
    {id: 'tabs-extended-tab-3', label: 'Tab Name'},
    {id: 'tabs-extended-tab-4', label: 'Tab Name'},
    {id: 'tabs-extended-tab-5', label: 'Tab Name'},
    {id: 'tabs-extended-tab-6', label: 'Tab Name'},
    {id: 'tabs-extended-tab-7', label: 'Tab Name'},
    {id: 'tabs-extended-tab-8', label: 'Tab Name'},
    {id: 'tabs-extended-tab-9', label: 'Tab Name'},
];

const getDropdownOptions = ({dropdownItemsIds, onSelectTab}) =>
    options.filter((option) => dropdownItemsIds
        .includes(option.id))
        .map((option) => ({...option, onSelect: () => onSelectTab(option.id)}));

<TabsExtended className="tabs-extended" selectedId={selectedTabId} onSelectTab={setSelectedTabId}>
    <TabsExtended.Content className="content">
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
                    className="button-dropdown"
                    theme={EButtonTheme.DOTS}
                    size={EButtonSize.SM}
                    options={getDropdownOptions({dropdownItemsIds, onSelectTab})}
                    selected={options.filter((option) => option.id === selectedTabId)[0]}
                />
            )}
        </TabsExtended.Content.DropdownWrapper>
    </TabsExtended.Content>
</TabsExtended>
```


### TabsExtended с кастомным Dropdown и кастомной иконкой нотификации.

```jsx {"props": {"className": "light-background"}}
import {ButtonDropdownExtended} from '@sberbusiness/triplex/components/Button/ButtonDropdownExtended';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import './styles.less';

const [selectedTabId, setSelectedTabId] = React.useState('tabs-extended-custom-tab-0');
const [opened, setOpened] = React.useState(false);
const buttonRef = React.useRef(null);
const dropdownRef = React.useRef(null);

const options = [
    {id: 'tabs-extended-custom-tab-0', label: 'Tab Name', notification: true},
    {id: 'tabs-extended-custom-tab-1', label: 'Tab Name'},
    {id: 'tabs-extended-custom-tab-2', label: 'Tab Name'},
    {id: 'tabs-extended-custom-tab-3', label: 'Tab Name'},
    {id: 'tabs-extended-custom-tab-4', label: 'Tab Name'},
    {id: 'tabs-extended-custom-tab-5', label: 'Tab Name'},
    {id: 'tabs-extended-custom-tab-6', label: 'Tab Name'},
    {id: 'tabs-extended-custom-tab-7', label: 'Tab Name'},
    {id: 'tabs-extended-custom-tab-8', label: 'Tab Name'},
    {id: 'tabs-extended-custom-tab-9', label: 'Tab Name', notification: true},
];

const renderButton = ({opened, setOpened}) => (
    <Button
        className={opened && 'active'} 
        theme={EButtonTheme.DOTS}
        size={EButtonSize.SM}
        onClick={() => setOpened(!opened)}
        ref={buttonRef}
    />
);

const renderDropdown = ({dropdownItemsIds, onSelectTab}) => ({opened, setOpened, className}) =>
    opened ? (
        <ButtonDropdownExtended.Dropdown
            className={classnames(className, 'tabs-extended-dropdown')}
            opened={opened}
            setOpened={setOpened}
            targetRef={buttonRef}
            ref={dropdownRef}
        >
            <ButtonDropdownExtended.DropdownList dropdownOpened={opened}>
                {options
                    .filter((option) => dropdownItemsIds.includes(option.id))
                    .map(({id, label, notification}) => (
                        <ButtonDropdownExtended.DropdownList.Item
                            key={id}
                            id={id}
                            className={classnames({notification})}
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
    <TabsExtended.Content className="content">
        <TabsExtended.Content.TabsWrapper>
            {options.map(({id, label, notification}) => (
                <TabsExtended.Content.Tab key={id} id={id}>
                    {({selected}) => (
                        <TabsExtended.Content.TabButton
                            className={classnames({notification})}
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
                    className="button-dropdown"
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
```

### TabsExtended с кастомной кнопкой без Dropdown.

```jsx {"props": {"className": "light-background"}}
import './styles.less';

const [selectedTabId, setSelectedTabId] = React.useState('tabs-extended-tab-today');

const options = [
    {id: 'tabs-extended-tab-yesterday', label: 'Вчера'},
    {id: 'tabs-extended-tab-today', label: 'Сегодня'},
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

<TabsExtended className="tabs-extended" selectedId={selectedTabId} onSelectTab={setSelectedTabId}>
    <TabsExtended.Content className="content">
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
            <TabsExtended.Content.Tab id="tabs-extended-tab-tomorrow">
                {() => (
                    <TabsExtended.Content.TabButton className="ghost-tab-button">
                        <GhostTabIcon />Завтра
                    </TabsExtended.Content.TabButton>
                )}
            </TabsExtended.Content.Tab>
        </TabsExtended.Content.TabsWrapper>
    </TabsExtended.Content>
</TabsExtended>
```

### TabsExtended с поддержкой Accessibility.

```jsx {"props": {"className": "light-background"}}
import {ButtonDropdown} from '@sberbusiness/triplex/components/Button/ButtonDropdown';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {isKey} from '@sberbusiness/triplex/utils/keyboard';
import './styles.less';

const tabs = [
    {id: 'tabs-extended-accessible-0', label: 'Tab Name'},
    {id: 'tabs-extended-accessible-1', label: 'Tab Name'},
    {id: 'tabs-extended-accessible-2', label: 'Tab Name'},
    {id: 'tabs-extended-accessible-3', label: 'Tab Name'},
    {id: 'tabs-extended-accessible-4', label: 'Tab Name'},
    {id: 'tabs-extended-accessible-5', label: 'Tab Name'},
    {id: 'tabs-extended-accessible-6', label: 'Tab Name'},
    {id: 'tabs-extended-accessible-7', label: 'Tab Name'},
    {id: 'tabs-extended-accessible-8', label: 'Tab Name'},
    {id: 'tabs-extended-accessible-9', label: 'Tab Name'},
];

const [selectedTabId, setSelectedTabId] = React.useState(tabs[0].id);
const [opened, setOpened] = React.useState(false);
// Id таба с tabIndex = 0;
const [availableToFocusTabId, setAvailableToFocusTabId] = React.useState(tabs[0].id);
// Id таба, предшествующий табу с tabIndex = 0;
const [prevAvailableToFocusTabId, setPrevAvailableToFocusTabId] = React.useState('');
// Id таба, следующего за табом с tabIndex = 0;
const [nextAvailableToFocusTabId, setNextAvailableToFocusTabId] = React.useState('');
// Ref таба, предшествующий табу с tabIndex = 0;
const prevTabRef = React.useRef(null);
// Ref таба, следующего за табом с tabIndex = 0;
const nextTabRef = React.useRef(null);

const getDropdownOptions = ({dropdownItemsIds, onSelectTab}) =>
    tabs.filter((tab) => dropdownItemsIds.includes(tab.id))
        .map((tab) => ({...tab, onSelect: () => onSelectTab(tab.id)}));

const renderTab = ({id, label}, index) => (
    <TabsExtended.Content.Tab key={id} id={id}>
        {({selected, isFirstInlineTab, isLastInlineTab}) => {
            const tabIndex = availableToFocusTabId === id ? 0 : -1;

            const getRef = () => {
                let ref = undefined;

                if (prevAvailableToFocusTabId === id) {
                    ref = prevTabRef;
                } else if (nextAvailableToFocusTabId === id) {
                    ref = nextTabRef;
                }

                return ref;
            };

            return (
                <TabsExtended.Content.TabButton
                    selected={selected}
                    tabIndex={tabIndex}
                    /* Установка ref для предыдущего или следующего за фокусируемым табом элемента, */
                    ref={getRef()}
                    onFocus={() => {
                        setPrevAvailableToFocusTabId(tabs[index - 1] ? tabs[index - 1].id : '');
                        setNextAvailableToFocusTabId(tabs[index + 1] ? tabs[index + 1].id : '');
                    }}
                    onKeyDown={(event) => {
                        const {key} = event;

                        if (isKey(key, 'ARROW_LEFT')) {
                            // Не первый таб.
                            if (!isFirstInlineTab) {
                                setAvailableToFocusTabId(tabs[index - 1].id);
                                prevTabRef.current && prevTabRef.current.focus();
                            }

                            // Предотвращение скролла.
                            event.preventDefault();
                        } else if (isKey(key, 'ARROW_RIGHT')) {
                            // Не последний таб в строке.
                            if (!isLastInlineTab) {
                                setAvailableToFocusTabId(tabs[index + 1].id);
                                nextTabRef.current && nextTabRef.current.focus();
                            }

                            // Предотвращение скролла.
                            event.preventDefault();
                        }
                    }}
                >
                    {label}
                </TabsExtended.Content.TabButton>
            )
        }}
    </TabsExtended.Content.Tab>
);

<TabsExtended className="tabs-extended" selectedId={selectedTabId} onSelectTab={setSelectedTabId}>
    <TabsExtended.Content className="content">
        <TabsExtended.Content.TabsWrapper>
            {tabs.map(renderTab)}
        </TabsExtended.Content.TabsWrapper>
        <TabsExtended.Content.DropdownWrapper>
            {({dropdownItemsIds, onSelectTab}) => (
                <ButtonDropdown
                    className="tabs-button-dropdown"
                    theme={EButtonTheme.DOTS}
                    size={EButtonSize.SM}
                    options={getDropdownOptions({dropdownItemsIds, onSelectTab})}
                    selected={tabs.filter((tab) => tab.id === selectedTabId)[0]}
                    buttonAttributes={{'aria-label':'Другие вкладки'}}
                />
            )}
        </TabsExtended.Content.DropdownWrapper>
    </TabsExtended.Content>
</TabsExtended>
```