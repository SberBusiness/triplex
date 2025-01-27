import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента PaginationNavigation. */
export interface IPaginationNavigationExtendedProps extends React.HTMLAttributes<HTMLUListElement> {}

/** Контейнер для компоновки кастомной навигации. */
export const PaginationNavigationExtended = React.forwardRef<HTMLUListElement, IPaginationNavigationExtendedProps>(
    ({children, className, ...rest}, ref) => {
        return (
            <ul className={classnames('cssClass[paginationNavigationExtended]', className)} {...rest} ref={ref}>
                {children}
            </ul>
        );
    }
);

PaginationNavigationExtended.displayName = 'PaginationNavigationExtended';
