//TableBasicExampleTypes.tsx
import {EDocFilter, EDocStatus} from './TableBasicExampleEnums';
import {EOrderDirection} from '@sberbusiness/triplex/components/Tables/TableBasic/enums';
import {ITableBasicRow} from '@sberbusiness/triplex/components/Tables/TableBasic/types';
import {ISuggestOption} from '@sberbusiness/triplex/components/Suggest/types';

export interface IFilterPanelData {
    sumMinFilter: string;
    sumMaxFilter: string;
    tableFilterId: EDocFilter;
    docStatusFilter: EDocStatus | null;
    docNumberFilter: number | null;
    docCounterpartyFilter: string;
    docCounterparty: ISuggestOption;
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
