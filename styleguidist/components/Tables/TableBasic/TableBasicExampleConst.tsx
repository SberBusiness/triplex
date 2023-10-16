//TableBasicExampleConst.tsx
import React from 'react';
import {DeleteSrvIcon20} from '@sberbusiness/icons/DeleteSrvIcon20';
import {EMarkerStatus} from '@sberbusiness/triplex/components/Marker/enums';
import {MarkerStatus} from '@sberbusiness/triplex/components/MarkerStatus/MarkerStatus';
import {EDocStatus, EDocFilter} from './TableBasicExampleEnums';
import {EOrderDirection} from '@sberbusiness/triplex/components/Tables/TableBasic/enums';
import {handleButtonClick, handlePrevent} from './TableBasicExampleHandlers';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {ButtonDropdown} from '@sberbusiness/triplex/components/Button/ButtonDropdown';
import {EButtonSize, EButtonTheme} from '@sberbusiness/triplex/components/Button/enums';
import {IFilterPanelData} from './TableBasicExampleTypes';

export const currency = 'RUB';
export const rowNumberOptions = [10, 30, 50, 100];
export const pageNumberInitial = 1;
export const docNumberFilterName = 'docNumberFilter';
export const docCounterpartyName = 'docCounterparty';
export const counterparties = ['ООО Ромашка', 'ООО ТранссельмашМобил', 'ООО Заботливая Ромашка', 'ООО Деловая', 'ООО Драйв Системс'];

export const statusMarkers = {
    [EDocStatus.SUCCESS]: <MarkerStatus status={EMarkerStatus.SUCCESS}>{EDocStatus.SUCCESS}</MarkerStatus>,
    [EDocStatus.ERROR]: <MarkerStatus status={EMarkerStatus.ERROR}>{EDocStatus.ERROR}</MarkerStatus>,
    [EDocStatus.WARNING]: <MarkerStatus status={EMarkerStatus.WARNING}>{EDocStatus.WARNING}</MarkerStatus>,
    [EDocStatus.WAITING]: <MarkerStatus status={EMarkerStatus.WAITING}>{EDocStatus.WAITING}</MarkerStatus>,
};

export const filterConfig = {
    [EDocFilter.ALL]: {
        statusCodes: [EDocStatus.SUCCESS, EDocStatus.ERROR, EDocStatus.WARNING, EDocStatus.WAITING],
    },
    [EDocFilter.EXECUTED]: {
        statusCodes: [EDocStatus.SUCCESS],
    },
    [EDocFilter.REJECTED]: {
        statusCodes: [EDocStatus.ERROR],
    },
    [EDocFilter.CREATED]: {
        statusCodes: [EDocStatus.WAITING],
    },
    [EDocFilter.NOT_REJECTED]: {
        statusCodes: [EDocStatus.SUCCESS, EDocStatus.WARNING, EDocStatus.WAITING],
    },
};

export const tableFilters = [
    {
        id: EDocFilter.ALL,
        label: EDocFilter.ALL,
        'data-test-id': 'TestTable__MasterTable.TableFilter__All',
        'aria-label': 'Filter all documents',
    },
    {
        id: EDocFilter.CREATED,
        label: EDocFilter.CREATED,
        showNotificationIcon: true,
        'data-test-id': 'TestTable__MasterTable.TableFilter__Created',
        'aria-label': 'Filter only created documents',
    },
    {
        id: EDocFilter.REJECTED,
        label: EDocFilter.REJECTED,
        'data-test-id': 'TestTable__MasterTable.TableFilter__Rejected',
        'aria-label': 'Filter only rejected documents',
    },
    {
        id: EDocFilter.EXECUTED,
        label: EDocFilter.EXECUTED,
        'data-test-id': 'TestTable__MasterTable.TableFilter__Executed',
        'aria-label': 'Filter only executed documents',
    },
    {
        id: EDocFilter.NOT_REJECTED,
        label: EDocFilter.NOT_REJECTED,
        showNotificationIcon: true,
        'data-test-id': 'TestTable__MasterTable.TableFilter__NotRejected',
        'aria-label': 'Filter not rejected documents',
    },
];

export const selectedTableFilterIdInitialState: EDocFilter = tableFilters[0].id;
export const docCounterpartyInitialState = {label: 'Все', value: null};

export const paginationInitialState = {
    currentPageNumber: pageNumberInitial,
    rowNumber: rowNumberOptions[0],
};

export const controlPanelInitialState = {
    isLoading: false,
    hasData: true,
    hasQuickFilterPanel: false,
    hasTableFilter: true,
};

export const checkedInitialState: string[] = [];

export const commonInitialState = {
    sortingDocNumber: EOrderDirection.NONE,
    sortingSum: EOrderDirection.NONE,
    showFilterPanel: false,
};

export const filterInitialState: IFilterPanelData = {
    sumMinFilter: '',
    sumMaxFilter: '',
    tableFilterId: selectedTableFilterIdInitialState,
    docStatusFilter: null,
    docNumberFilter: null,
    docCounterpartyFilter: 'Все',
    docCounterparty: docCounterpartyInitialState,
};

export const renderActions1 = (disabled: boolean): React.ReactNode => (
    <ButtonIcon onClick={handleButtonClick} disabled={disabled}>
        <DeleteSrvIcon20 table />
    </ButtonIcon>
);

const options = [
    {id: 'tableBasicOption1', label: 'действие 1', onSelect: () => alert('действие 1')},
    {id: 'tableBasicOption2', label: 'действие 2', onSelect: () => alert('действие 2')},
    {id: 'tableBasicOption3', label: 'действие 3', onSelect: () => alert('действие 3')},
];

export const renderActions2 = (disabled: boolean): React.ReactNode => (
    <ButtonDropdown
        onClick={handlePrevent}
        disabled={disabled}
        aria-label="Button with dropdown options"
        theme={EButtonTheme.DOTS}
        size={EButtonSize.SM}
        options={options}
    />
);
