import React, {useContext} from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {TabsExtendedContext} from '../TabsExtendedContext';

export interface ITabsExtendedItemProvideProps {
    /** Выбранное состояние. */
    selected: boolean;
}

export interface ITabsExtendedTabProps extends React.HTMLAttributes<HTMLSpanElement> {
    id: string;
    children: (props: ITabsExtendedItemProvideProps) => React.ReactNode;
}

/**
 * Контейнер содержимого таба.
 * Обрабатывает выбор таба.
 */
export const TabsExtendedTab = React.forwardRef<HTMLSpanElement, ITabsExtendedTabProps>(
    ({children, id, className, onClick, ...htmlSpanAttributes}, ref) => {
        const {dropdownItemsIds, selectedId, onSelectTab} = useContext(TabsExtendedContext);

        const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
            onSelectTab(id);
            onClick?.(event);
        };

        return (
            <span
                id={id}
                className={classnames('cssClass[tabsExtendedTab]', {'cssClass[hidden]': dropdownItemsIds.includes(id)}, className)}
                onClick={handleClick}
                {...htmlSpanAttributes}
                role="presentation"
                // Нужен для идентификации таба компонентом TabsWrapper.
                data-tab-item-id={id}
                ref={ref}
            >
                {children({selected: selectedId === id})}
            </span>
        );
    }
);

TabsExtendedTab.displayName = 'TabsExtendedTab';
