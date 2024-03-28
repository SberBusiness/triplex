import React, {useState, useRef} from 'react';
import {TabsExtendedContext} from './TabsExtendedContext';
import {TabsExtendedContent} from './components/TabsExtendedContent';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

export type TTabsExtendedOnSelectTab = (id: string) => void;

/** Свойства компонента TabsExtended. */
export interface ITabsExtendedProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Уникальный идентификатор выбранного таба. */
    selectedId: string;
    /** Обработчик выбора таба. */
    onSelectTab: TTabsExtendedOnSelectTab;
}

/** Внутренние составляющие компонента TabsExtended. */
interface ITabsExtendedComposition {
    Content: typeof TabsExtendedContent;
}

/** Базовый компонент табов. На его основе можно рендерить табы любого дизайна. */
export const TabsExtended: React.FC<ITabsExtendedProps> & ITabsExtendedComposition = ({
    children,
    className,
    selectedId,
    onSelectTab,
    ...htmlDivAttributes
}) => {
    const [inlineItemsIds, setInlineItemsIds] = useState<string[]>([]);
    const [dropdownItemsIds, setDropdownItemsIds] = useState<string[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSelectTab = (id: string) => {
        if (selectedId !== id) {
            onSelectTab(id);
        }
    };

    return (
        <TabsExtendedContext.Provider
            value={{
                inlineItemsIds,
                dropdownItemsIds,
                dropdownRef,
                onSelectTab: handleSelectTab,
                selectedId,
                setInlineItemsIds,
                setDropdownItemsIds,
            }}
        >
            <div className={classnames('cssClass[tabsExtended]', className)} role="tablist" {...htmlDivAttributes}>
                {children}
            </div>
        </TabsExtendedContext.Provider>
    );
};

TabsExtended.Content = TabsExtendedContent;
