import * as React from 'react';

/** Компонент в подвале таблицы, в котором информация о количестве выбранных позиций. */
export const TableFooterSummarySelectedCount: React.FC = ({children}) => (
    <span className="cssClass[tableFooterSummarySelectedCount]">{children}</span>
);

TableFooterSummarySelectedCount.displayName = 'TableFooterSummarySelectedCount';
