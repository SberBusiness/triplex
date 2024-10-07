import React from 'react';
import {NotfoundSrvIcon64} from '@sberbusiness/icons/NotfoundSrvIcon64';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента ListItemEmpty. */
export interface IListItemEmptyProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Элемент, отображающий пустой список.
 * Используется при применении фильтров, когда не найден ни один элемент.
 * */
export const ListEmptyState = React.forwardRef<HTMLDivElement, IListItemEmptyProps>(({children, className, ...rest}, ref) => (
    <div className={classnames('cssClass[listEmptyState]', className)} {...rest} ref={ref}>
        <div>
            <NotfoundSrvIcon64 />
        </div>
        {children}
    </div>
));

ListEmptyState.displayName = 'ListItemEmpty';