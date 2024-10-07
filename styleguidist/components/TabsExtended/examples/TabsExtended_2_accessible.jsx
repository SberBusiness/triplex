import React, {useState, useRef} from 'react';
import {TabsExtended} from '@sberbusiness/triplex/components/TabsExtended/TabsExtended';
import {ButtonDropdown} from '@sberbusiness/triplex/components/Button/ButtonDropdown';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {isKey} from '@sberbusiness/triplex/utils/keyboard';
import './styles.less';

const [selectedTabId, setSelectedTabId] = useState('tabs-extended-tab-3-0');
// Id таба с tabIndex = 0;
const [availableToFocusTabId, setAvailableToFocusTabId] = useState(selectedTabId);
// Id таба, предшествующий табу с tabIndex = 0;
const [prevAvailableToFocusTabId, setPrevAvailableToFocusTabId] = useState('');
// Id таба, следующего за табом с tabIndex = 0;
const [nextAvailableToFocusTabId, setNextAvailableToFocusTabId] = useState('');
// Ref таба, предшествующий табу с tabIndex = 0;
const prevTabRef = useRef(null);
// Ref таба, следующего за табом с tabIndex = 0;
const nextTabRef = useRef(null);

const tabs = [
    {id: 'tabs-extended-tab-2-0', label: 'Tab Name'},
    {id: 'tabs-extended-tab-2-1', label: 'Tab Name'},
    {id: 'tabs-extended-tab-2-2', label: 'Tab Name'},
    {id: 'tabs-extended-tab-2-3', label: 'Tab Name'},
    {id: 'tabs-extended-tab-2-4', label: 'Tab Name'},
    {id: 'tabs-extended-tab-2-5', label: 'Tab Name'},
    {id: 'tabs-extended-tab-2-6', label: 'Tab Name'},
    {id: 'tabs-extended-tab-2-7', label: 'Tab Name'},
    {id: 'tabs-extended-tab-2-8', label: 'Tab Name'},
    {id: 'tabs-extended-tab-2-9', label: 'Tab Name'},
];

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
    <TabsExtended.Content className="tabs-extended-content">
        <TabsExtended.Content.TabsWrapper>
            {tabs.map(renderTab)}
        </TabsExtended.Content.TabsWrapper>
        <TabsExtended.Content.DropdownWrapper>
            {({dropdownItemsIds, onSelectTab}) => (
                <ButtonDropdown
                    className="tabs-extended-button-dropdown"
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