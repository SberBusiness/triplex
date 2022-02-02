import React, {RefObject} from 'react';

export interface ITabsExtendedContext {
    // Массив id табов, передаваемых в Dropdown.
    dropdownItemsIds: string[];
    // Определяет id табов, передаваемых в Dropdown.
    setDropdownItemsIds: (dropdownItemsIds: string[]) => void;
    // Id выбранного таба.
    selectedId: string;
    // Обработчик выбора таба.
    onSelectTab: (selectedId: string) => void;
    // Ref на TabsExtendedDropdownWrapper.
    dropdownRef: RefObject<HTMLDivElement>;
}

/* eslint-disable @typescript-eslint/no-empty-function */
const contextInitial: ITabsExtendedContext = {
    dropdownItemsIds: [],
    selectedId: '',
    onSelectTab: () => {},
    setDropdownItemsIds: () => {},
    dropdownRef: {current: null},
};

export const TabsExtendedContext = React.createContext<ITabsExtendedContext>(contextInitial);
