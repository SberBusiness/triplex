import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента UnorderedList. */
export interface IUnorderedListProps extends React.HTMLAttributes<HTMLUListElement> {
    children?: never;
    /** Пункты для несортированного списка. */
    values: React.ReactNode[];
}

/** Несортированный список. */
export const UnorderedList = React.forwardRef<HTMLUListElement, IUnorderedListProps>(({className, values, ...rest}, ref) => (
    <ul className={classnames('cssClass[unorderedList]', className)} {...rest} data-tx={process.env.npm_package_version} ref={ref}>
        {values.map((value, index) => (
            <li key={index} className="cssClass[unorderedListItem]">
                {value}
            </li>
        ))}
    </ul>
));

UnorderedList.displayName = 'UnorderedList';
