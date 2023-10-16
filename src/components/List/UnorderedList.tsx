import React from 'react';

/**
 * Интерфейс компонента несортированного списка.
 *
 * @param {React.ReactNode[]} values Пункты для несортированного списка.
 */
export interface IUnorderedListProps {
    values: React.ReactNode[];
}

/** Компонент несортированного списока. */
export const UnorderedList: React.FC<IUnorderedListProps> = ({values}: IUnorderedListProps) => (
    <ul className="cssClass[unorderedList]">
        {values.map((value, idx) => (
            <li key={idx}>{value}</li>
        ))}
    </ul>
);

UnorderedList.displayName = 'UnorderedList';
