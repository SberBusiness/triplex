//TableBasicExample.tsx
import React, {useState} from 'react';
import {EScreenSize} from '@sbbol/web-library/common/enums/EScreenSize';
import {Button} from '@sbbol/web-library/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sbbol/web-library/desktop/components/Button/enums';
import {Checkbox} from '@sbbol/web-library/desktop/components/Checkbox/Checkbox';
import {CheckboxYGroup} from '@sbbol/web-library/desktop/components/Checkbox/CheckboxYGroup';
import {Col} from '@sbbol/web-library/desktop/components/Col/Col';
import {Amount} from '@sbbol/web-library/desktop/components/Amount/Amount';
import {Row} from '@sbbol/web-library/desktop/components/Row/Row';
import {MasterTable} from '@sbbol/web-library/desktop/components/Tables/MasterTable';
import {ECellType, EHorizontalAlign, EVerticalAlign} from '@sbbol/web-library/desktop/components/Tables/TableBasic/enums';
import './TableBasicExample.less';
import {ISortOrder} from '@sbbol/web-library/desktop/components/Tables/TableBasic/types';
import {
    checkedInitialState,
    commonInitialState,
    controlPanelInitialState,
    counterparties,
    currency,
    docCounterpartyInitialState,
    docCounterpartyName,
    docNumberFilterName,
    filterInitialState,
    pageNumberInitial,
    paginationInitialState,
    renderActions1,
    renderActions2,
    rowNumberOptions,
    tableFilters,
} from './TableBasicExampleConst';
import {EDocStatus, EDocFilter} from './TableBasicExampleEnums';
import {handleClickRow} from './TableBasicExampleHandlers';
import {ITableBasicRow} from '@sbbol/web-library/desktop/components/Tables/TableBasic/types';
import {ELinkSize, ELinkType, Link} from '@sbbol/web-library/desktop/components/Link/Link';
import {renderFilterRow} from './TableBasicExampleFilterPanel';
import {AmountInput} from '@sbbol/web-library/desktop/components/AmountInput/AmountInput';
import {ISelectOption, Select} from '@sbbol/web-library/desktop/components/Select/Select';
import {NumberInput} from '@sbbol/web-library/desktop/components/NumberInput/NumberInput';
import {getDataFromBackendEmulator} from './TableBasicExampleBackendEmulator';
import {
    getSum,
    hasChangedDocCounterpartyFilter,
    hasChangedDocNumberFilter,
    checkHasQuickFilter,
    setRowChecked,
    setRowCounterparty,
    checkHasCommonFilter,
} from './TableBasicExampleUtils';
import {Suggest} from '@sbbol/web-library/desktop/components/Suggest/Suggest';
import {ETagSize} from '@sbbol/web-library/desktop/components/Tag/enums';
import {Tag} from '@sbbol/web-library/desktop/components/Tag/Tag';
import {TagGroup} from '@sbbol/web-library/desktop/components/Tag/TagGroup';
import {IFilterPanelData} from './TableBasicExampleTypes';
import {EmptytableSrvIcon64} from '@sberbusiness/icons/EmptytableSrvIcon64';
import {Gap} from '@sbbol/web-library/desktop/components/Gap/Gap';
import {formatAmount} from '@sbbol/web-library/desktop/utils/amountUtils';
import {EOrderDirection} from '@sbbol/web-library/desktop/components/Tables/TableBasic/enums';
import {ISuggestOption} from '@sbbol/web-library/desktop/components/Suggest/types';

const initialOptions: ISelectOption[] = [
    {label: 'Все', value: ''},
    ...counterparties.map((c) => {
        return {label: c, value: c};
    }),
];

export const TableBasicExample = (): JSX.Element => {
    const [state, setState] = useState(commonInitialState);
    const [controlPanelState, setControlPanelState] = useState(controlPanelInitialState);
    const [paginationState, setPaginationState] = useState(paginationInitialState);
    const [checkedState, setCheckedState] = useState(checkedInitialState);
    const [filterState, setFilterState] = useState(filterInitialState);
    const [options, setOptions] = useState(initialOptions);

    const handleTableFilterChange = (newTableFilterIdString: string) => {
        const newTableFilterId = newTableFilterIdString as EDocFilter;
        if (newTableFilterId === filterState.tableFilterId) {
            return;
        }

        setFilterState({...filterState, tableFilterId: newTableFilterId});
        setCheckedState([]);
    };

    const handleClearClick = () => {
        setFilterState(filterInitialState);
    };

    const handleHideFilterPanelClick = () => {
        setState({...state, showFilterPanel: false});
    };

    const handleShowFilterPanelClick = () => {
        setState({...state, showFilterPanel: true});
    };

    const handleOrderBy = (order: ISortOrder) => {
        if (order.fieldKey === 'number') {
            setState({...state, sortingDocNumber: order.direction, sortingSum: EOrderDirection.NONE});
        } else if (order.fieldKey === 'sum') {
            setState({...state, sortingDocNumber: EOrderDirection.NONE, sortingSum: order.direction});
        }

        setCheckedState([]);
    };

    const handleSelectRowNumber = (newRowNumber: number) => {
        setPaginationState({...paginationState, rowNumber: newRowNumber, currentPageNumber: pageNumberInitial});
        setCheckedState([]);
    };

    const handleClickPrevPage = () => {
        const newPageNumber = paginationState.currentPageNumber - 1;

        setPaginationState({...paginationState, currentPageNumber: newPageNumber});
        setCheckedState([]);
    };

    const handleClickNextPage = () => {
        const newPageNumber = paginationState.currentPageNumber + 1;

        setPaginationState({...paginationState, currentPageNumber: newPageNumber});
        setCheckedState([]);
    };

    const handleClickSelectPageChecked = (bulk: boolean, rowKeys: string[], e: React.ChangeEvent<HTMLInputElement>) => {
        const checkedRows = e.target.checked || bulk ? rowKeys : [];
        setCheckedState(checkedRows);
    };

    const handleCheckboxChange = (rowKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const checkedRows = checkedState.slice(0);

        if (e.target.checked) {
            checkedRows.push(rowKey);
        } else {
            const index = checkedRows.indexOf(rowKey);
            if (index > -1) {
                checkedRows.splice(index, 1);
            }
        }

        setCheckedState(checkedRows);
    };

    const handleChangeSumMin = (newMinValue: string) => {
        if (newMinValue === filterState.sumMinFilter) {
            return;
        }

        setFilterState({...filterState, sumMinFilter: newMinValue});
        setCheckedState([]);
    };

    const handleChangeSumMax = (newMaxValue: string) => {
        if (newMaxValue === filterState.sumMaxFilter) {
            return;
        }

        setFilterState({...filterState, sumMaxFilter: newMaxValue});
        setCheckedState([]);
    };

    const handleSelectDocStatus = (item: ISelectOption) => {
        const newDocStatus = item.value as EDocStatus;
        setFilterState({...filterState, docStatusFilter: newDocStatus});
    };

    const handleChangeDocNumber = (newDocNumberFilter: string) => {
        setFilterState({...filterState, docNumberFilter: parseInt(newDocNumberFilter)});
    };

    const handleCounterpartyFilter = (filterString: string) => {
        setFilterState({...filterState, docCounterpartyFilter: filterString});
        setOptions(
            options.filter(
                (option: ISelectOption) => option.value === '' || option.value.toLowerCase().indexOf(filterString.toLowerCase()) !== -1
            )
        );
    };

    const handleCounterpartySelect = (item: any) => {
        setFilterState({...filterState, docCounterpartyFilter: item.label as string, docCounterparty: item});
    };

    const handleFocusCounterpartyFilter = () => {
        if (options !== initialOptions) {
            setOptions(initialOptions);
        }
    };

    const handleRemoveTag = (id: string) => {
        const newState: IFilterPanelData = filterState;

        switch (id) {
            case docNumberFilterName: {
                newState.docNumberFilter = null;
                break;
            }
            case docCounterpartyName: {
                newState.docCounterparty = docCounterpartyInitialState;
                newState.docCounterpartyFilter = docCounterpartyInitialState.label;
                break;
            }
        }

        setFilterState({...newState});
    };

    const renderCheckboxSelectPage = (bulk: boolean, checked: boolean, rowKeys: string[]) => (
        <Checkbox bulk={bulk} checked={checked} onChange={handleClickSelectPageChecked.bind(null, bulk, rowKeys)} />
    );

    const createColumns = (bulk: boolean, checked: boolean) => {
        return [
            {
                fieldKey: 'checkbox',
                cellType: ECellType.CHECKBOX,
                width: 40,
                label: renderCheckboxSelectPage(bulk, checked, rowKeys),
                verticalAlign: EVerticalAlign.TOP,
            },
            {fieldKey: 'number', label: '№', orderDirection: state.sortingDocNumber, width: 65, verticalAlign: EVerticalAlign.TOP},
            {
                fieldKey: 'counterparty',
                label: 'Контрагент',
                width: 425,
                hideScreenSizes: [EScreenSize.XS, EScreenSize.SM, EScreenSize.MD, EScreenSize.LG],
                verticalAlign: EVerticalAlign.TOP,
            },
            {
                fieldKey: 'sum',
                label: 'Сумма',
                orderDirection: state.sortingSum,
                horizontalAlign: EHorizontalAlign.RIGHT,
                width: 155,
                verticalAlign: EVerticalAlign.TOP,
                renderCell: (fieldValue: number | undefined) =>
                    fieldValue ? <Amount value={formatAmount(String(fieldValue), 2)} currency={currency} /> : null,
            },
            {fieldKey: 'status', label: 'Статус', verticalAlign: EVerticalAlign.TOP},
            {
                fieldKey: 'action1',
                renderCell: (fieldValue: React.ReactNode) => (fieldValue !== undefined ? fieldValue : renderActions1),
                horizontalAlign: EHorizontalAlign.CENTER,
                verticalAlign: EVerticalAlign.TOP,
                hideScreenSizes: [EScreenSize.XS, EScreenSize.SM, EScreenSize.MD],
                dataAttributes: {'test-id': 'TestTable__action1'},
            },
            {
                fieldKey: 'action2',
                renderCell: (fieldValue: React.ReactNode) => (fieldValue !== undefined ? fieldValue : renderActions2),
                cellType: ECellType.COMPONENTS,
                horizontalAlign: EHorizontalAlign.CENTER,
                verticalAlign: EVerticalAlign.TOP,
                hideScreenSizes: [EScreenSize.XS, EScreenSize.SM, EScreenSize.MD],
                dataAttributes: {'test-id': 'TestTable__action2'},
            },
        ];
    };

    const checkboxOptions = [
        {
            checked: controlPanelState.isLoading,
            label: 'Состояние загрузки',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setControlPanelState({...controlPanelState, isLoading: e.target.checked});
                setCheckedState([]);
            },
        },
        {
            checked: controlPanelState.hasData,
            label: 'С примером данных',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                const hasData = e.target.checked;
                setControlPanelState({...controlPanelState, hasData: hasData});
                setCheckedState([]);
            },
        },
        {
            checked: controlPanelState.hasTableFilter,
            label: 'С панелью табличных фильтров',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setControlPanelState({...controlPanelState, hasTableFilter: e.target.checked});
                setCheckedState([]);
            },
        },
        {
            checked: controlPanelState.hasQuickFilterPanel,
            label: 'С панелью быстрых фильтров',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setControlPanelState({...controlPanelState, hasQuickFilterPanel: e.target.checked});
                setCheckedState([]);
            },
        },
    ];

    const response = getDataFromBackendEmulator({
        currentPageNumber: paginationState.currentPageNumber,
        rowNumber: paginationState.rowNumber,
        sortingDocNumber: state.sortingDocNumber,
        sortingSum: state.sortingSum,
        filter: filterState,
    });

    const dataLength = response.data.length;
    let pageData: ITableBasicRow[] = [];
    if (controlPanelState.hasData) {
        pageData = setRowChecked(response.data, checkedState, handleCheckboxChange);
        pageData = setRowCounterparty(pageData);
    }

    const sum = getSum(pageData, checkedState);
    const rowKeys = pageData.map((r: ITableBasicRow) => r.rowKey);
    const hasPagination = dataLength > 0 && controlPanelState.hasData;
    const selectedCount = checkedState.length;
    const bulk = selectedCount !== dataLength;
    const checked = Boolean(selectedCount);
    const hasQuickFilter = checkHasQuickFilter(filterState);
    const hasCommonFilter = checkHasCommonFilter(filterState);

    const docStatusOptions: ISelectOption[] = [
        {label: 'Все', value: ''},
        ...Object.keys(EDocStatus).map((s) => {
            return {
                label: EDocStatus[s as keyof typeof EDocStatus],
                value: s,
            };
        }),
    ];

    const docStatusValue: ISelectOption = {
        label: filterState.docStatusFilter ? (EDocStatus as any)[filterState.docStatusFilter] : 'Все',
        value: String(filterState.docStatusFilter),
    };

    const renderCommonFilterPanel = () => [
        renderFilterRow(
            'Номер документа',
            <NumberInput
                value={String(filterState.docNumberFilter)}
                onChange={handleChangeDocNumber}
                disabled={controlPanelState.isLoading}
            />,
            'Контрагент',
            <Suggest
                placeholder="Наименование или ФИО"
                tooltipHint="Совпадений не найдено"
                isTooltipOpened={false}
                disabled={controlPanelState.isLoading}
                loading={controlPanelState.isLoading}
                value={(filterState as any).docCounterparty}
                onFilter={handleCounterpartyFilter}
                onFocus={handleFocusCounterpartyFilter}
                // @ts-ignore
                options={options as ISuggestOption}
                onSelect={handleCounterpartySelect}
                error={false}
            />
        ),
        <Gap size={8} />,
        <div className="actionFilterPanel">
            <div className="clean">
                <Button
                    theme={EButtonTheme.SECONDARY}
                    size={EButtonSize.SM}
                    onClick={handleClearClick}
                    disabled={controlPanelState.isLoading}
                >
                    Сбросить
                </Button>
            </div>
            <div>
                <Button
                    theme={EButtonTheme.GENERAL}
                    size={EButtonSize.SM}
                    onClick={handleHideFilterPanelClick}
                    disabled={controlPanelState.isLoading}
                >
                    Применить
                </Button>
            </div>
        </div>,
    ];

    const renderTagFilterPanel = () => {
        const tags = [];

        if (hasChangedDocNumberFilter(filterState.docNumberFilter)) {
            const tagText = `Номер документа: ${String(filterState.docNumberFilter)}`;

            tags.push(
                <Tag id={docNumberFilterName} size={ETagSize.MD} onRemove={handleRemoveTag} key={docNumberFilterName}>
                    {tagText}
                </Tag>
            );
        }
        if (hasChangedDocCounterpartyFilter(filterState.docCounterparty)) {
            const tagText = `Контрагент: ${String(filterState.docCounterparty.label)}`;

            tags.push(
                <Tag id={docCounterpartyName} size={ETagSize.MD} onRemove={handleRemoveTag} key={docCounterpartyName}>
                    {tagText}
                </Tag>
            );
        }
        return <TagGroup size={ETagSize.MD}>{tags}</TagGroup>;
    };

    const renderQuickFilterPanel = () =>
        renderFilterRow(
            'Статус документа',
            <Select
                disabled={controlPanelState.isLoading}
                placeholder="Выберите статус"
                value={docStatusValue}
                options={docStatusOptions}
                onChange={handleSelectDocStatus}
            />,
            'Диапазон сумм',
            <div className="amountRange">
                <AmountInput
                    value={filterState.sumMinFilter}
                    onChange={handleChangeSumMin}
                    currency={currency}
                    disabled={controlPanelState.isLoading}
                />
                <span className="dash">—</span>
                <AmountInput
                    value={filterState.sumMaxFilter}
                    onChange={handleChangeSumMax}
                    currency={currency}
                    disabled={controlPanelState.isLoading}
                />
            </div>
        );

    const renderFilterLinks = (showFilterPanel: boolean, hasQuickFilter: boolean, hasCommonFilter: boolean): JSX.Element => (
        <MasterTable.TableFilterPanel.Links>
            {!showFilterPanel &&
            hasCommonFilter && ( // Только когда теги.
                    <Link linkType={ELinkType.TEXT} size={ELinkSize.LG} onClick={handleClearClick}>
                        Сбросить всё
                    </Link>
                )}
            {showFilterPanel ? (
                <>
                    <Link linkType={ELinkType.TEXT} size={ELinkSize.LG} onClick={handleHideFilterPanelClick}>
                        Скрыть фильтры
                    </Link>
                </>
            ) : (
                <Link linkType={ELinkType.TEXT} size={ELinkSize.LG} onClick={handleShowFilterPanelClick}>
                    {hasCommonFilter ? 'Изменить фильтры' : 'Фильтры'}
                </Link>
            )}
        </MasterTable.TableFilterPanel.Links>
    );

    const renderNoData = () => (
        <>
            <EmptytableSrvIcon64 />
            <div className="footerText">Нет данных, но можно предложить какие-то действия для заполнения таблицы</div>
            <Gap size={24} />
            <div className="footerButtonGroup">
                <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
                    Secondary
                </Button>
                <Button theme={EButtonTheme.GENERAL} size={EButtonSize.SM}>
                    General
                </Button>
            </div>
        </>
    );

    return (
        <>
            <Row>
                <Col size={6}>
                    <CheckboxYGroup>
                        {checkboxOptions.map((item, index) => (
                            <Checkbox key={index} checked={item.checked} onChange={item.onChange}>
                                {item.label}
                            </Checkbox>
                        ))}
                    </CheckboxYGroup>
                </Col>
            </Row>

            <MasterTable isLoading={controlPanelState.isLoading} data-test-id="TestTable__MasterTable">
                <MasterTable.TableFilterPanel>
                    {controlPanelState.hasTableFilter && (
                        <MasterTable.TableFilter
                            dropdownTargetHtmlAttributes={{
                                'data-test-id': 'TestTable__MasterTable.TableFilter__DropdownTarget',
                                'aria-label': 'Table filter dropdown target',
                            }}
                            filters={tableFilters}
                            selectedFilterId={filterState.tableFilterId}
                            onFilterChange={handleTableFilterChange}
                            maxVisible={4}
                            data-test-id="TestTable__MasterTable.TableFilter"
                        />
                    )}
                    {renderFilterLinks(state.showFilterPanel, hasQuickFilter, hasCommonFilter)}
                </MasterTable.TableFilterPanel>
                {(controlPanelState.hasQuickFilterPanel || state.showFilterPanel || hasCommonFilter) && (
                    <MasterTable.FilterPanel data-test-id="TestTable__MasterTable.FilterPanel">
                        {controlPanelState.hasQuickFilterPanel && renderQuickFilterPanel()}
                        {state.showFilterPanel ? renderCommonFilterPanel() : hasCommonFilter && renderTagFilterPanel()}
                    </MasterTable.FilterPanel>
                )}
                <MasterTable.TableBasic
                    columns={createColumns(bulk, checked)}
                    data={pageData}
                    onOrderBy={handleOrderBy}
                    onClickRow={handleClickRow}
                    renderNoData={renderNoData}
                    highlightRowOnHover
                    data-test-id="TestTable__MasterTable.TableBasic"
                />
                {checked && (
                    <MasterTable.TableFooter data-test-id="TestTable__MasterTable.TableFooter">
                        <MasterTable.TableFooter.Summary data-test-id="TestTable__MasterTable.TableFooter.Summary">
                            {renderCheckboxSelectPage(bulk, checked, rowKeys)}
                            <MasterTable.TableFooter.Summary.SelectedCount>{`Выбрано ${selectedCount}`}</MasterTable.TableFooter.Summary.SelectedCount>
                            <MasterTable.TableFooter.Summary.Amount label="Сумма" sum={sum} currency={currency} />
                        </MasterTable.TableFooter.Summary>
                        <MasterTable.TableFooter.Controls data-test-id="TestTable__MasterTable.TableFooter.Controls">
                            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
                                Secondary
                            </Button>
                            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.SM}>
                                General
                            </Button>
                        </MasterTable.TableFooter.Controls>
                    </MasterTable.TableFooter>
                )}

                {hasPagination && (
                    <MasterTable.Pagination
                        rowNumberOptions={rowNumberOptions}
                        rowNumber={paginationState.rowNumber}
                        onSelectRowNumber={handleSelectRowNumber}
                        currentPageNumber={response.currentPageNumber}
                        paginationLabel="Показать на странице"
                        hasPrevPage={response.hasPrevPage}
                        hasNextPage={response.hasNextPage}
                        onClickPrevPage={handleClickPrevPage}
                        onClickNextPage={handleClickNextPage}
                        dataAttributes={{'test-id': 'TestTable__MasterTable.Pagination'}}
                    />
                )}
            </MasterTable>
        </>
    );
};
