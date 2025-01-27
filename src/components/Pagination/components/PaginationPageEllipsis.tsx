import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента PaginationPageEllipsis. */
interface IPaginationPageEllipsis extends React.HTMLAttributes<HTMLSpanElement> {}

/** Объединение массива последовательных страниц для удобства производится в элемент многоточие.  */
export const PaginationPageEllipsis = React.forwardRef<HTMLSpanElement, IPaginationPageEllipsis>(({children, className, ...rest}, ref) => {
    return (
        <span className={classnames('cssClass[pageEllipsis]', className)} {...rest} ref={ref}>
            {children}
        </span>
    );
});

PaginationPageEllipsis.displayName = 'PaginationPageEllipsis';
