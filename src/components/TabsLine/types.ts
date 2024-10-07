import {ITabsLineItemProps} from '@sberbusiness/triplex/components/TabsLine/components/TabsLineItem';

/** Общие свойства TabsLineDesktop и TabsLine Mobile. */
export interface ITabsLineBase {
    children?: never;
    /** Коллекция табов. */
    tabs: ITabsLineItemProps[];
    /** Коллбек смены таба. */
    onChangeTab: (tabId: string) => void;
    /** Идентификатор выбранного таба. */
    selectedTabId: string;
}
