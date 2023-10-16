import React from 'react';
import {TabsExtended} from '@sberbusiness/triplex/components/TabsExtended/TabsExtended';
import {ITabsExtendedDropdownWrapperProvideProps} from '@sberbusiness/triplex/components/TabsExtended/components/TabsExtendedDropdownWrapper';
import {ButtonDropdown} from '@sberbusiness/triplex/components/Button/ButtonDropdown';
import {EButtonSize, EButtonTheme} from '@sberbusiness/triplex/components/Button/enums';
import {ITabsExtendedTabProps} from '@sberbusiness/triplex/components/TabsExtended/components/TabsExtendedTab';

export interface ITabsItem extends Omit<ITabsExtendedTabProps, 'children' | 'onSelect'> {
    label: React.ReactNode;
}

export interface ITabsProps {
    children?: never;
    /** Обработчик выбора таба. */
    onSelectTab: (selectedId: string) => void;
    /** Идентификатор выбранного таба. */
    selectedTabId: string;
    /** Массив табов. */
    tabs: Array<ITabsItem>;
}

/** Компонент Tabs. */
export const Tabs: React.FC<ITabsProps> = ({onSelectTab, selectedTabId, tabs, ...props}) => {
    const getDropdownOptions = ({dropdownItemsIds, onSelectTab}: ITabsExtendedDropdownWrapperProvideProps) =>
        tabs.filter((tab) => dropdownItemsIds.includes(tab.id)).map((tab) => ({...tab, onSelect: () => onSelectTab(tab.id)}));

    return (
        <TabsExtended {...props} selectedId={selectedTabId} onSelectTab={onSelectTab}>
            <TabsExtended.Content className="cssClass[tabsContent]">
                <TabsExtended.Content.TabsWrapper>
                    {tabs.map((item, index) => (
                        <TabsExtended.Content.Tab key={index} {...item}>
                            {({selected}) => (
                                <TabsExtended.Content.TabButton selected={selected}>{item.label}</TabsExtended.Content.TabButton>
                            )}
                        </TabsExtended.Content.Tab>
                    ))}
                </TabsExtended.Content.TabsWrapper>

                <TabsExtended.Content.DropdownWrapper>
                    {({dropdownItemsIds, onSelectTab}) => (
                        <ButtonDropdown
                            className="cssClass[tabsButtonDropdown]"
                            theme={EButtonTheme.DOTS}
                            size={EButtonSize.SM}
                            options={getDropdownOptions({dropdownItemsIds, onSelectTab})}
                            selected={tabs.filter((tab) => tab.id === selectedTabId)[0]}
                        />
                    )}
                </TabsExtended.Content.DropdownWrapper>
            </TabsExtended.Content>
        </TabsExtended>
    );
};
