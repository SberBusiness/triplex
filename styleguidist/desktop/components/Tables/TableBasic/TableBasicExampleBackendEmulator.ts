//TableBasicExampleBackendEmulator.ts
import {IBackendRequest, IBackendResponse, IFilterPanelData} from './TableBasicExampleTypes';
import {ITableBasicRow} from '@sberbusiness/triplex/desktop/components/Tables/TableBasic/types';
import {filterConfig, statusMarkers} from './TableBasicExampleConst';
import {EDocStatus} from './TableBasicExampleEnums';
import {amountComparator, formatAmount} from '@sberbusiness/triplex/desktop/utils/amountUtils';
import {EOrderDirection} from '@sberbusiness/triplex/desktop/components/Tables/TableBasic/enums';
import {allDataFixture} from './TableBasicExampleBackendFixture';

const filterData = (data: ITableBasicRow[], filter: IFilterPanelData, sortingDocNumber: EOrderDirection, sortingSum: EOrderDirection): ITableBasicRow[] => {
    const filteredData = panelFilterData(data, filter);
    return sortData(filteredData, sortingDocNumber, sortingSum);
};

const panelFilterData = (data: ITableBasicRow[], filter: IFilterPanelData) => {
    return data.filter((x: ITableBasicRow) => {
        const sumCalcFormatted = formatAmount(x.rowData.sum, 2, false, false) || '0';
        const isSumMinInclude = !filter.sumMinFilter || amountComparator(sumCalcFormatted, filter.sumMinFilter) === 1;
        const isSumMaxInclude = !filter.sumMaxFilter || amountComparator(filter.sumMaxFilter, sumCalcFormatted) === 1;
        const isTableFilterDocStatusInclude = filterConfig[filter.tableFilterId].statusCodes.includes(x.rowData.status);
        const isPanelFilterDocStatusInclude = !filter.docStatusFilter || (EDocStatus as any)[filter.docStatusFilter] === x.rowData.status;
        const isDocNumberInclude = !filter.docNumberFilter || String(filter.docNumberFilter) === x.rowData.number;
        const counterparty = x.rowData.counterparty;
        const isCounterpartyInclude =
            !filter.docCounterparty.value || !counterparty || counterparty.indexOf(filter.docCounterparty.value) !== -1;

        return (
            isSumMinInclude &&
            isSumMaxInclude &&
            isTableFilterDocStatusInclude &&
            isPanelFilterDocStatusInclude &&
            isDocNumberInclude &&
            isCounterpartyInclude
        );
    });
};

const sortData = (data: ITableBasicRow[], sortingDocNumber: EOrderDirection, sortingSum: EOrderDirection) => {
    if(sortingDocNumber !== EOrderDirection.NONE){
        return data.sort((a: ITableBasicRow, b: ITableBasicRow) => {
              const aNumber = a.rowData.number;
              const bNumber = b.rowData.number;

              return sortingDocNumber === EOrderDirection.DESC
                ? bNumber - aNumber
                : aNumber - bNumber;
          }
        );
    }

    if(sortingSum !== EOrderDirection.NONE){
        return data.sort((a: ITableBasicRow, b: ITableBasicRow) => {
              const aSum = a.rowData.sum ?? 0;
              const bSum = b.rowData.sum ?? 0;

              return sortingSum === EOrderDirection.DESC
                ? bSum - aSum
                : aSum - bSum;
          }
        );
    }

    return data;
};

const transformStatuses = (data: ITableBasicRow[]) => {
    return data.map((row: ITableBasicRow) => ({
        ...row,
        rowData: {
            ...row.rowData,
            status: statusMarkers[row.rowData.status as EDocStatus],
        },
    }));
};

const paginationFilter = (data: ITableBasicRow[], rowNumber: number, currentPageNumber: number) => {
    const maxPageNumber = Math.max(Math.ceil(data.length / rowNumber), 1);
    const calcedCurrentPageNumber = Math.min(currentPageNumber, maxPageNumber);

    const from = (calcedCurrentPageNumber - 1) * rowNumber;
    const to = calcedCurrentPageNumber * rowNumber;

    return {
        paginatedData: data.slice(from, to),
        newPageNumber: currentPageNumber !== calcedCurrentPageNumber ? calcedCurrentPageNumber : currentPageNumber,
    };
};

export function getDataFromBackendEmulator(request: IBackendRequest): IBackendResponse {
    const newData = filterData(allDataFixture, request.filter, request.sortingDocNumber, request.sortingSum);
    const hasPrevPage = request.currentPageNumber > 1;
    const hasNextPage = newData.length - request.currentPageNumber * request.rowNumber > 0;

    const {paginatedData, newPageNumber} = paginationFilter(newData, request.rowNumber, request.currentPageNumber);
    const transformedStatusesData = transformStatuses(paginatedData);

    return {data: transformedStatusesData, hasPrevPage: hasPrevPage, hasNextPage: hasNextPage, currentPageNumber: newPageNumber};
}
