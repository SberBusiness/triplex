import React, {useState} from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {ListItemContext} from '@sberbusiness/triplex/components/List/components/ListItemContext';

/** Свойства компонента ListItem. */
export interface IListItemProps extends React.HTMLAttributes<HTMLLIElement> {}

/** Элемент списка. */
export const ListItem = React.forwardRef<HTMLLIElement, IListItemProps>(({children, className, ...rest}, ref) => {
    const [selected, setSelected] = useState(false);

    return (
        <ListItemContext.Provider value={{selected, setSelected}}>
            <li className={classnames('cssClass[listItem]', className)} {...rest} data-tx={process.env.npm_package_version} ref={ref}>
                {children}
            </li>
        </ListItemContext.Provider>
    );
});

ListItem.displayName = 'ListItem';
