//TableBasicExampleTypes.tsx
import {EDocFilter, EDocStatus} from './TableBasicExampleEnums';
import {EOrderDirection} from '@sbbol/web-library/desktop/components/Tables/TableBasic/enums';
import {ITableBasicRow} from '@sbbol/web-library/desktop/components/Tables/TableBasic/types';
import {ISelectOption} from '@sbbol/web-library/desktop/components/Select/Select';

export interface IFilterPanelData {
    sumMinFilter: string;
    sumMaxFilter: string;
    tableFilterId: EDocFilter;
    docStatusFilter: EDocStatus | null;
    docNumberFilter: number | null;
    docCounterpartyFilter: string;
    docCounterparty: ISelectOption;
}

export interface IBackendResponse {
    data: ITableBasicRow[];
    hasPrevPage: boolean;
    hasNextPage: boolean;
    currentPageNumber: number;
}

export interface IBackendRequest {
    currentPageNumber: number;
    rowNumber: number;
    sortingDocNumber: EOrderDirection;
    sortingSum: EOrderDirection;
    filter: IFilterPanelData;
}
