import React from 'react';

/** Свойства компонента TableFooterSummarySelectedCount. */
export interface ITableFooterSummarySelectedCountProps {
    children?: React.ReactNode;
}

/** Компонент в подвале таблицы, в котором информация о количестве выбранных позиций. */
export const TableFooterSummarySelectedCount: React.FC<ITableFooterSummarySelectedCountProps> = ({children}) => (
    <span className="cssClass[tableFooterSummarySelectedCount]">{children}</span>
);

TableFooterSummarySelectedCount.displayName = 'TableFooterSummarySelectedCount';
