import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента PaginationExtended. */
export interface IPaginationExtendedProps extends React.HTMLAttributes<HTMLElement> {}

/** Контейнер для компоновки кастомной пагинации. */
export const PaginationExtended = React.forwardRef<HTMLElement, IPaginationExtendedProps>(({children, className, ...rest}, ref) => {
    return (
        <nav
            className={classnames('cssClass[paginationExtended]', className)}
            data-tx={process.env.npm_package_version}
            {...rest}
            ref={ref}
        >
            {children}
        </nav>
    );
});

PaginationExtended.displayName = 'PaginationExtended';
