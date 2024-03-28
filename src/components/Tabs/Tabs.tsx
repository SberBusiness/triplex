import React, {useRef, useState} from 'react';
import {TabsExtended} from '@sberbusiness/triplex/components/TabsExtended/TabsExtended';
import {ITabsExtendedDropdownWrapperProvideProps} from '@sberbusiness/triplex/components/TabsExtended/components/TabsExtendedDropdownWrapper';
import {ButtonDropdown} from '@sberbusiness/triplex/components/Button/ButtonDropdown';
import {EButtonSize, EButtonTheme} from '@sberbusiness/triplex/components/Button/enums';
import {ITabsExtendedTabProps} from '@sberbusiness/triplex/components/TabsExtended/components/TabsExtendedTab';
import {isKey} from '@sberbusiness/triplex/utils/keyboard';

export interface ITabsItem extends Omit<ITabsExtendedTabProps, 'children' | 'onSelect'> {
    label: React.ReactNode;
}

export interface ITabsProps {
    /** HTML-атрибуты dropdown-кнопки. */
    buttonDropdownAttributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    children?: never;
    /** Обработчик выбора таба. */
    onSelectTab: (selectedId: string) => void;
    /** Идентификатор выбранного таба. */
    selectedTabId: string;
    /** Массив табов. */
    tabs: Array<ITabsItem>;
}

/** Компонент Tabs. */
export const Tabs: React.FC<ITabsProps> = ({buttonDropdownAttributes, onSelectTab, selectedTabId, tabs, ...props}) => {
    // Id таба с tabIndex = 0;
    const [availableToFocusTabId, setAvailableToFocusTabId] = useState(selectedTabId || tabs[0].id);
    // Id таба, предшествующий табу с tabIndex = 0;
    const [prevAvailableToFocusTabId, setPrevAvailableToFocusTabId] = useState('');
    // Id таба, следующего за табом с tabIndex = 0;
    const [nextAvailableToFocusTabId, setNextAvailableToFocusTabId] = useState('');
    // Ref таба, предшествующий табу с tabIndex = 0;
    const prevTabRef = useRef<HTMLButtonElement>(null);
    // Ref таба, следующего за табом с tabIndex = 0;
    const nextTabRef = useRef<HTMLButtonElement>(null);

    const getDropdownOptions = ({dropdownItemsIds, onSelectTab}: ITabsExtendedDropdownWrapperProvideProps) =>
        tabs.filter((tab) => dropdownItemsIds.includes(tab.id)).map((tab) => ({...tab, onSelect: () => onSelectTab(tab.id)}));

    const renderTab = (item: ITabsItem, index: number) => {
        return (
            <TabsExtended.Content.Tab key={index} {...item}>
                {({selected, isFirstInlineTab, isLastInlineTab}) => {
                    const tabIndex = availableToFocusTabId === item.id ? 0 : -1;

                    const getRef = () => {
                        let ref = undefined;

                        if (prevAvailableToFocusTabId === item.id) {
                            ref = prevTabRef;
                        } else if (nextAvailableToFocusTabId === item.id) {
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
                            onKeyDown={(event: React.KeyboardEvent<HTMLButtonElement>) => {
                                const {key} = event;

                                if (isKey(key, 'ARROW_LEFT')) {
                                    // Не первый таб.
                                    if (!isFirstInlineTab) {
                                        setAvailableToFocusTabId(tabs[index - 1].id);
                                        prevTabRef.current?.focus();
                                    }

                                    // Предотвращение скролла.
                                    event.preventDefault();
                                } else if (isKey(key, 'ARROW_RIGHT')) {
                                    // Не последний таб в строке.
                                    if (!isLastInlineTab) {
                                        setAvailableToFocusTabId(tabs[index + 1].id);
                                        nextTabRef.current?.focus();
                                    }

                                    // Предотвращение скролла.
                                    event.preventDefault();
                                }
                            }}
                        >
                            {item.label}
                        </TabsExtended.Content.TabButton>
                    );
                }}
            </TabsExtended.Content.Tab>
        );
    };

    return (
        <TabsExtended {...props} selectedId={selectedTabId} onSelectTab={onSelectTab}>
            <TabsExtended.Content className="cssClass[tabsContent]">
                <TabsExtended.Content.TabsWrapper>{tabs.map(renderTab)}</TabsExtended.Content.TabsWrapper>

                <TabsExtended.Content.DropdownWrapper>
                    {({dropdownItemsIds, onSelectTab}) => (
                        <ButtonDropdown
                            className="cssClass[tabsButtonDropdown]"
                            theme={EButtonTheme.DOTS}
                            size={EButtonSize.SM}
                            options={getDropdownOptions({dropdownItemsIds, onSelectTab})}
                            selected={tabs.filter((tab) => tab.id === selectedTabId)[0]}
                            buttonAttributes={buttonDropdownAttributes}
                        />
                    )}
                </TabsExtended.Content.DropdownWrapper>
            </TabsExtended.Content>
        </TabsExtended>
    );
};
