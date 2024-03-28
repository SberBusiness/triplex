import React from 'react';

/** Свойства компонента UnorderedList. */
export interface IUnorderedListProps {
    /** Пункты для несортированного списка. */
    values: React.ReactNode[];
}

/** Несортированный список. */
export const UnorderedList: React.FC<IUnorderedListProps> = ({values}: IUnorderedListProps) => (
    <ul className="cssClass[unorderedList]">
        {values.map((value, index) => (
            <li key={index} className="cssClass[unorderedListItem]">
                {value}
            </li>
        ))}
    </ul>
);

UnorderedList.displayName = 'UnorderedList';
