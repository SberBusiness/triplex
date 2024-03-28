import React, {useContext} from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {TTabsExtendedOnSelectTab} from '../TabsExtended';
import {TabsExtendedContext} from '../TabsExtendedContext';

export interface ITabsExtendedDropdownWrapperProvideProps {
    dropdownItemsIds: string[];
    onSelectTab: TTabsExtendedOnSelectTab;
}

/** Свойства компонента TabsExtendedDropdownWrapper. */
export interface ITabsExtendedDropdownWrapperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    children: (props: ITabsExtendedDropdownWrapperProvideProps) => React.ReactNode;
}

/** Контейнер для Dropdown компонента табов. */
export const TabsExtendedDropdownWrapper: React.FC<ITabsExtendedDropdownWrapperProps> = ({children, className, ...htmlDivAttributes}) => {
    const {dropdownItemsIds, onSelectTab, dropdownRef} = useContext(TabsExtendedContext);

    return (
        <div
            className={classnames('cssClass[tabsExtendedDropdown]', className)}
            {...htmlDivAttributes}
            hidden={!dropdownItemsIds.length}
            ref={dropdownRef}
        >
            {children({dropdownItemsIds, onSelectTab})}
        </div>
    );
};
