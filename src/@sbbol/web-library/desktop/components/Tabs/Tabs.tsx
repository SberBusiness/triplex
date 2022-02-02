import React from 'react';
import {TabsExtended} from '@sbbol/web-library/desktop/components/TabsExtended/TabsExtended';
import {ITabsExtendedDropdownWrapperProvideProps} from '@sbbol/web-library/desktop/components/TabsExtended/components/TabsExtendedDropdownWrapper';
import {ButtonDropdown} from '@sbbol/web-library/desktop/components/Button/ButtonDropdown';
import {EButtonSize, EButtonTheme} from '@sbbol/web-library/desktop/components/Button/enums';

export interface ITabsItem {
    id: string;
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
                        <TabsExtended.Content.Tab key={index} id={item.id}>
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
