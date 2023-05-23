import {Amount} from '@sberbusiness/triplex/desktop/components/Amount/Amount';
import * as React from 'react';

export interface ITableFooterSummaryAmountProps {
    /** Текст лейбла.*/
    label: string;
    /** Сумма подытога.*/
    sum: string;
    /** Валюта подытога.*/
    currency: string;
}

/** Компонент подытога денежной суммы в подвале таблицы. */
export const TableFooterSummaryAmount: React.FC<ITableFooterSummaryAmountProps> = ({label, sum, currency}) => {
    return (
        <span>
            <span className="cssClass[tableFooterSummaryDivider]">|</span>
            <span className="cssClass[tableFooterSummaryAmount]">
                {label} <Amount value={sum} currency={currency} />
            </span>
        </span>
    );
};

TableFooterSummaryAmount.displayName = 'TableFooterSummaryAmount';
