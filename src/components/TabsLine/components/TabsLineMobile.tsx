import React from 'react';
import {ITabsLineItemProps, TabsLineItem} from '@sberbusiness/triplex/components/TabsLine/components/TabsLineItem';
import {ITabsLineBase} from '@sberbusiness/triplex/components/TabsLine/types';

/** Свойства компонента ITabsLineMobileProps. */
interface ITabsLineMobileProps extends ITabsLineBase {}

/** Компонент TabsLineMobile. */
export const TabsLineMobile: React.FC<ITabsLineMobileProps> = ({onChangeTab, selectedTabId, tabs}) => {
    if (!tabs.length) {
        return null;
    }

    const renderTab = ({selected, ...item}: ITabsLineItemProps) => {
        const handleClick = (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
            onChangeTab(item.id);
            item.onClick?.(event);
        };

        return <TabsLineItem key={item.id} selected={selectedTabId === item.id} {...item} onClick={handleClick} />;
    };

    return (
        <div className="cssClass[tabsLineMobileWrapper]">
            <div className="cssClass[tabsLineMobile]">{tabs.map(renderTab)}</div>
        </div>
    );
};
