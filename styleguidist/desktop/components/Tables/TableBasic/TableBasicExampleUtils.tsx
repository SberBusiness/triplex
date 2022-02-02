//TableBasicExampleUtils.tsx
import React from 'react';
import Big from 'big.js';
import {formatAmount} from '@sbbol/web-library/desktop/utils/amountUtils';
import {ITableBasicRow} from '@sbbol/web-library/desktop/components/Tables/TableBasic/types';
import {AmountConst} from '@sbbol/web-library/desktop/common/consts/AmountConst';
import {handlePrevent} from './TableBasicExampleHandlers';
import {Checkbox} from '@sbbol/web-library/desktop/components/Checkbox/Checkbox';
import {IFilterPanelData} from './TableBasicExampleTypes';
import {selectedTableFilterIdInitialState} from './TableBasicExampleConst';
import {EDocStatus} from './TableBasicExampleEnums';
import {ISelectOption} from '@sbbol/web-library/desktop/components/Select/Select';

type HandleCheckboxChangeType = (rowKey: string, e: React.ChangeEvent<HTMLInputElement>) => void;

export const getRandom = (min: number, max: number): number => Math.random() * (max - min) + min;

export const getRandomStatus = (statuses: typeof EDocStatus): EDocStatus => {
    const keys = Object.keys(statuses);
    const number = (keys.length * Math.random()) << 0;
    const key = keys[number];
    return statuses[key as keyof typeof EDocStatus];
};

export const getSum = (data: ITableBasicRow[], checkedRows: string[]): string => {
    const array = data
        .filter((row: ITableBasicRow) => Boolean(checkedRows.includes(row.rowKey) && row.rowData.sum))
        .map((row: ITableBasicRow) => {
            const stringValue = formatAmount(row.rowData.sum, undefined, false).replace(
                AmountConst.DecimalSeparator,
                AmountConst.DecimalSeparatorCalc
            );
            return Big(stringValue);
        });
    return array.length === 0 ? String(0) : array.reduce((a: Big, b: Big) => a.plus(b)).toString();
};

export const setRowChecked = (
    data: ITableBasicRow[],
    checkedRows: string[],
    handleCheckboxChange: HandleCheckboxChangeType
): ITableBasicRow[] => {
    return data.map((row) => {
        const checked = Boolean(checkedRows.includes(row.rowKey));
        row.selected = checked;
        row.rowData.checkbox = (
            <Checkbox checked={checked} onChange={handleCheckboxChange.bind(null, row.rowKey)} labelAttributes={{onClick: handlePrevent}} />
        );
        return row;
    });
};

export const setRowCounterparty = (data: ITableBasicRow[]): ITableBasicRow[] => {
    return data.map((row) => {
        row.rowData.counterparty = (
            <div>
                <div>Платежное поручение {row.rowData.counterparty}</div>
                <div>40702 810 2 0527 5000000</div>
                <div className="tdSubText">В том числе НДС 20% </div>
            </div>
        );
        return row;
    });
};

export const hasChangedDocNumberFilter = (docNumberFilter: number | null): boolean => docNumberFilter !== null;
export const hasChangedDocCounterpartyFilter = (docCounterparty: ISelectOption): boolean => docCounterparty.value !== null;

export const checkHasQuickFilter = (filter: IFilterPanelData): boolean => {
    return (
        filter.docStatusFilter !== null ||
        filter.sumMinFilter !== '' ||
        filter.sumMaxFilter !== '' ||
        filter.tableFilterId !== selectedTableFilterIdInitialState
    );
};

export const checkHasCommonFilter = (filter: IFilterPanelData): boolean => {
    return hasChangedDocNumberFilter(filter.docNumberFilter) || hasChangedDocCounterpartyFilter(filter.docCounterparty);
};
