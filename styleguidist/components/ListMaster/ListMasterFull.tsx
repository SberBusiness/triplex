import React, {useCallback, useEffect, useState} from 'react';
import {random} from 'lodash';
import {ListMaster} from '@sberbusiness/triplex/components/ListMaster';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonSize, EButtonTheme} from '@sberbusiness/triplex/components/Button/enums';
import {ButtonDropdown} from '@sberbusiness/triplex/components/Button/ButtonDropdown';
import {List} from '@sberbusiness/triplex/components/List';
import {ChipOptions, ChipSort} from '@sberbusiness/triplex/components/Chip';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {TabsLine} from '@sberbusiness/triplex/components/TabsLine/TabsLine';
import {EMarkerStatus} from '@sberbusiness/triplex/components/Marker/enums';
import MultiselectStatus from './MultiselectStatus';
import SuggestAccount from './SuggestAccount';
import SuggestCounterparty from './SuggestCounterparty';
import listItemsData, {EListItemStatus} from './listItemsData';
import LightBoxOptions from './LightBoxOptions';
import {ISelectBaseOption} from '@sberbusiness/triplex/components/SelectBase/SelectBase';
import {ISuggestOption} from '@sberbusiness/triplex/components/Suggest/types';
import DatePickerFrom from './DatePickerFrom';
import DatePickerTo from './DatePickerTo';
import ListItemElement from './ListItemElement';
import OptionDefaultValues from './OptionDefaultValues';
import {EFontWeight, ELineType, ETextSize} from '@sberbusiness/triplex/components/Typography/enums';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {ListEmptyState} from '@sberbusiness/triplex/components/List';
import './ListMasterFull.less';

// Список табов в верхней части ListMaster.
const tabsLine = [
    {id: 'ListMaster-tabs-line-all', label: 'Все'},
    {id: 'ListMaster-tabs-line-draft', label: 'Черновики', showNotificationIcon: true},
    {id: 'ListMaster-tabs-line-sign', label: 'На подпись и отправку'},
    {id: 'ListMaster-tabs-line-executed', label: 'Исполненные'},
    {id: 'ListMaster-tabs-line-rejected', label: 'Отклоненные'},
];

// Список опций ButtonDropdown в футере ListMaster.
const listMasterFooterButtonDropdownOptions = [
    {id: 'selectionFooterOptions1', label: 'Действие 1', onSelect: () => alert('действие 1')},
    {id: 'selectionFooterOptions2', label: 'Действие 2', onSelect: () => alert('действие 2')},
    {id: 'selectionFooterOptions3', label: 'Действие 3', onSelect: () => alert('действие 3')},
];

// Варианты сортировки.
const chipSortOptions: ISelectBaseOption[] = [
    {id: 'list-master-chip-sort-1', label: 'По возрастанию суммы', value: 'asc'},
    {id: 'list-master-chip-sort-2', label: 'По убыванию суммы', value: 'desc'},
];

// Свойства исходных данных для списка.
export interface IListItemData {
    amount: number;
    description: string;
    id: string;
    numberAndDate: string;
    status: EListItemStatus;
    statusMarker: EMarkerStatus;
    statusText: string;
    title: string;
}

export const ListMasterFullExample: React.FC = () => {
    // Отфильтрованные элементы списка.
    const [filteredListElements, setFilteredListElements] = useState<IListItemData[]>([
        ...listItemsData,
    ]);
    // Id выбранных элементов списка.
    const [selectedListItemIds, setSelectedListItemIds] = useState<string[]>([]);
    // Выбранный tab в TabsLine.
    const [selectedTabLineId, setSelectedTabLineId] = useState('ListMaster-tabs-line-all');
    // Флаг, открыт LightBox с фильтрами.
    const [openLightBoxOptions, setOpenLightBoxOptions] = React.useState(false);
    // Значение сортировки.
    const [chipSortValue, setChipSortValue] = React.useState(chipSortOptions[0]);

    // Список измененных фильтров.
    const [changedFilters, setChangedFilters] = useState(() => new Set<string>());

    // Дата от.
    const [dateFrom, setDateFrom] = useState(OptionDefaultValues.dateFrom);
    // Дата по.
    const [dateTo, setDateTo] = useState(OptionDefaultValues.dateTo);

    // Значение саджеста "Выбор счета".
    const [accountSuggestValue, setAccountSuggestValue] = useState<ISuggestOption | undefined>(
        OptionDefaultValues.accountSuggestValue
    );

    // Значение саджеста "Выбор контрагента".
    const [counterpartySuggestValue, setCounterpartySuggestValue] = useState<ISuggestOption | undefined>(
        OptionDefaultValues.counterpartySuggestValue
    );

    // Значения мультиселекта статус.
    const [multiselectStatusValues, setMultiselectStatusValues] = useState<Array<EListItemStatus>>(
        OptionDefaultValues.multiselectStatusValues
    );

    // Код таможни.
    const [customsCodeValue, setCustomsCodeValue] = useState(OptionDefaultValues.customsCodeValue);

    // Назначение платежа.
    const [purposeValue, setPurposeValue] = useState(OptionDefaultValues.purposeValue);

    // Номер документа.
    const [documentNumberValue, setDocumentNumberValue] = useState(
        OptionDefaultValues.documentNumberValue
    );
    // Номер документа от.
    const [documentNumberFromValue, setDocumentNumberFromValue] = useState(
        OptionDefaultValues.documentNumberFromValue
    );
    // Номер документа до.
    const [documentNumberToValue, setDocumentNumberToValue] = useState(
        OptionDefaultValues.documentNumberToValue
    );

    // Сумма от.
    const [amountFromValue, setAmountFromValue] = useState(OptionDefaultValues.amountFromValue);
    // Сумма до.
    const [amountToValue, setAmountToValue] = useState(OptionDefaultValues.amountToValue);

    // Добавляет измененный фильтр в changedFilters.
    const addChangedFilter = useCallback(
        (filterTitle: string) => {
            setChangedFilters((prev) => new Set<string>(prev).add(filterTitle));
        },
        [setChangedFilters]
    );

    // Удаляет измененный фильтр из changedFilters.
    const removeChangedFilter = useCallback(
        (filterTitle: string) => {
            setChangedFilters((prev) => {
                const next = new Set<string>(prev);
                next.delete(filterTitle);
                return next;
            });
        },
        [setChangedFilters]
    );

    // Сбрасывает значения всех фильтров.
    const clearFilters = () => {
        setAccountSuggestValue(OptionDefaultValues.accountSuggestValue);
        setAmountFromValue(OptionDefaultValues.amountFromValue);
        setAmountToValue(OptionDefaultValues.amountToValue);
        setCounterpartySuggestValue(OptionDefaultValues.counterpartySuggestValue);
        setCustomsCodeValue(OptionDefaultValues.customsCodeValue);
        setDateFrom(OptionDefaultValues.dateFrom);
        setDateTo(OptionDefaultValues.dateTo);
        setDocumentNumberFromValue(OptionDefaultValues.documentNumberFromValue);
        setDocumentNumberToValue(OptionDefaultValues.documentNumberToValue);
        setDocumentNumberValue(OptionDefaultValues.documentNumberValue);
        setMultiselectStatusValues(OptionDefaultValues.multiselectStatusValues);
        setPurposeValue(OptionDefaultValues.purposeValue);
    };

    /**
     * Обновляет список в соответствии с фильтрами.
     * Логика соответствия фильтров и выдачи отсутствует, чтобы не усложнять пример.
     */
    const reloadList = useCallback(() => {
        // Сброс выбранных карточек.
        clearSelectAllListItems();

        // Если выбран фильтра "Дата по", показывается состояние "ничего не найдено".
        if (dateTo) {
            setFilteredListElements([]);
            return;
        }

        /**
         * Рандомное количество элементов списка.
         * Тут должна быть логика сортировки.
         */
        const itemsCount = random(1, listItemsData.length);
        const nextItems = [...listItemsData];
        nextItems.splice(0, listItemsData.length - itemsCount);
        setFilteredListElements(nextItems);
    }, [dateTo, setFilteredListElements]);

    useEffect(() => {
        if (accountSuggestValue === OptionDefaultValues.accountSuggestValue) {
            removeChangedFilter('accountSuggestValue');
        } else {
            addChangedFilter('accountSuggestValue');
        }
    }, [accountSuggestValue, addChangedFilter, removeChangedFilter]);

    useEffect(() => {
        if (counterpartySuggestValue === OptionDefaultValues.counterpartySuggestValue) {
            removeChangedFilter('counterpartySuggestValue');
        } else {
            addChangedFilter('counterpartySuggestValue');
        }
    }, [addChangedFilter, counterpartySuggestValue, removeChangedFilter]);

    useEffect(() => {
        if (multiselectStatusValues.length === OptionDefaultValues.multiselectStatusValues.length) {
            removeChangedFilter('multiselectStatusValues');
        } else {
            addChangedFilter('multiselectStatusValues');
        }
    }, [addChangedFilter, multiselectStatusValues, removeChangedFilter]);

    useEffect(() => {
        if (dateFrom === OptionDefaultValues.dateFrom) {
            removeChangedFilter('dateFrom');
        } else {
            addChangedFilter('dateFrom');
        }
    }, [addChangedFilter, dateFrom, removeChangedFilter]);

    useEffect(() => {
        if (dateTo === OptionDefaultValues.dateTo) {
            removeChangedFilter('dateTo');
        } else {
            addChangedFilter('dateTo');
        }
    }, [addChangedFilter, dateTo, removeChangedFilter]);

    useEffect(() => {
        if (customsCodeValue === OptionDefaultValues.customsCodeValue) {
            removeChangedFilter('customsCodeValue');
        } else {
            addChangedFilter('customsCodeValue');
        }
    }, [customsCodeValue, addChangedFilter, removeChangedFilter]);

    useEffect(() => {
        if (purposeValue === OptionDefaultValues.purposeValue) {
            removeChangedFilter('purposeValue');
        } else {
            addChangedFilter('purposeValue');
        }
    }, [purposeValue, addChangedFilter, removeChangedFilter]);

    useEffect(() => {
        if (documentNumberValue === OptionDefaultValues.documentNumberValue) {
            removeChangedFilter('documentNumberValue');
        } else {
            addChangedFilter('documentNumberValue');
        }
    }, [documentNumberValue, addChangedFilter, removeChangedFilter]);

    useEffect(() => {
        if (documentNumberFromValue === OptionDefaultValues.documentNumberFromValue) {
            removeChangedFilter('documentNumberFromValue');
        } else {
            addChangedFilter('documentNumberFromValue');
        }
    }, [documentNumberFromValue, addChangedFilter, removeChangedFilter]);

    useEffect(() => {
        if (documentNumberToValue === OptionDefaultValues.documentNumberToValue) {
            removeChangedFilter('documentNumberToValue');
        } else {
            addChangedFilter('documentNumberToValue');
        }
    }, [documentNumberToValue, addChangedFilter, removeChangedFilter]);

    useEffect(() => {
        if (amountFromValue === OptionDefaultValues.amountFromValue) {
            removeChangedFilter('amountFromValue');
        } else {
            addChangedFilter('amountFromValue');
        }
    }, [amountFromValue, addChangedFilter, removeChangedFilter]);

    useEffect(() => {
        if (amountToValue === OptionDefaultValues.amountToValue) {
            removeChangedFilter('amountToValue');
        } else {
            addChangedFilter('amountToValue');
        }
    }, [amountToValue, addChangedFilter, removeChangedFilter]);

    // Обновление списка.
    useEffect(() => {
        reloadList();
    }, [
        accountSuggestValue,
        counterpartySuggestValue,
        multiselectStatusValues,
        dateTo,
        dateFrom,
        reloadList,
        selectedTabLineId,
    ]);

    // Обработик выбора элемента списка.
    const handleSelectListItem = (id: string, selected: boolean) => {
        if (selected) {
            setSelectedListItemIds((prevSelectedListItemIds) => [...prevSelectedListItemIds, id]);
        } else {
            setSelectedListItemIds((prevSelectedListItemIds) => [
                ...prevSelectedListItemIds.filter((itemId) => itemId !== id),
            ]);
        }
    };

    // Выбирает все карточки списка.
    const selectAllListItems = () => {
        setSelectedListItemIds(filteredListElements.map((item) => item.id));
    };

    // Отменяет выбор всех карточек списка.
    const clearSelectAllListItems = () => setSelectedListItemIds([]);

    // Сортирует элементы списка по возрастанию/убыванию списка.
    const getSortedItems = (items: IListItemData[]): IListItemData[] => {
        let sortFn = (a: IListItemData, b: IListItemData) => a.amount - b.amount;
        if (chipSortValue.value === 'desc') {
            sortFn = (a: IListItemData, b: IListItemData) => b.amount - a.amount;
        }

        return items.sort(sortFn);
    };

    // Возвращает сумму выбранных элементов списка.
    const getSummSelectedItems = (): number => {
        return listItemsData
            .filter((item) => selectedListItemIds.includes(item.id))
            .reduce((summ, item) => summ + item.amount, 0);
    };

    return (
        <>
            <ListMaster>
                {/* Есть выбранные карточки. */}
                {selectedListItemIds.length ? (
                    <ListMaster.Header>
                        <ListMaster.SelectionControls>
                            <Button
                                theme={EButtonTheme.LINK}
                                size={EButtonSize.MD}
                                onClick={selectAllListItems}
                            >
                                Выбрать все
                            </Button>

                            <Text
                                size={ETextSize.B1}
                                weight={EFontWeight.SEMIBOLD}
                                line={ELineType.EXTRA}
                            >
                                Выбрано: {selectedListItemIds.length}
                            </Text>

                            <Button
                                theme={EButtonTheme.LINK}
                                size={EButtonSize.MD}
                                onClick={clearSelectAllListItems}
                            >
                                Сбросить все
                            </Button>
                        </ListMaster.SelectionControls>
                    </ListMaster.Header>
                ) : null}

                <ListMaster.Body>
                    <Gap size={16} />

                    <TabsLine
                        tabs={tabsLine}
                        selectedTabId={selectedTabLineId}
                        onChangeTab={setSelectedTabLineId}
                        paddingX={16}
                        withSeparator
                    />

                    <Gap size={24} />

                    <ListMaster.ChipGroup>
                        <ChipSort
                            label="Сортировка"
                            defaultValue={chipSortOptions[0]}
                            value={chipSortValue}
                            options={chipSortOptions}
                            onChange={setChipSortValue}
                        />

                        <ChipOptions
                            selected={changedFilters.size > 0}
                            clearSelected={clearFilters}
                            onClick={() => setOpenLightBoxOptions(true)}
                        >
                            {changedFilters.size > 0 ? changedFilters.size : undefined}
                        </ChipOptions>

                        <SuggestAccount value={accountSuggestValue} onChange={setAccountSuggestValue} />

                        <SuggestCounterparty
                            value={counterpartySuggestValue}
                            onChange={setCounterpartySuggestValue}
                        />

                        <MultiselectStatus
                            value={multiselectStatusValues}
                            onChange={setMultiselectStatusValues}
                        />

                        <DatePickerFrom value={dateFrom} onChange={setDateFrom} />

                        <DatePickerTo value={dateTo} onChange={setDateTo} />
                    </ListMaster.ChipGroup>

                    <Gap size={8} />

                    {filteredListElements.length ? (
                        <List>
                            {getSortedItems(filteredListElements).map((props) => (
                                <ListItemElement
                                    key={props.id}
                                    onSelect={handleSelectListItem}
                                    selected={selectedListItemIds.includes(props.id)}
                                    {...props}
                                />
                            ))}
                        </List>
                    ) : (
                        <ListEmptyState>
                            <Text size={ETextSize.B1} line={ELineType.EXTRA}>
                                Ничего не найдено.
                                <br />
                                Попробуйте выбрать другие фильтры.
                            </Text>

                            <Gap size={24} />

                            <Button
                                theme={EButtonTheme.GENERAL}
                                size={EButtonSize.SM}
                                onClick={clearFilters}
                            >
                                Сбросить фильтры
                            </Button>
                        </ListEmptyState>
                    )}
                </ListMaster.Body>

                {/* Есть выбранные карточки. */}
                {selectedListItemIds.length ? (
                    <ListMaster.Footer>
                        <ListMaster.FooterDescription>
                            <Text
                                size={ETextSize.B1}
                                weight={EFontWeight.SEMIBOLD}
                                line={ELineType.EXTRA}
                            >
                                Сумма:
                                <br />
                                {getSummSelectedItems()} RUB
                            </Text>
                        </ListMaster.FooterDescription>
                        <ListMaster.FooterControls>
                            <ButtonDropdown
                                theme={EButtonTheme.DOTS}
                                size={EButtonSize.MD}
                                options={listMasterFooterButtonDropdownOptions}
                            />

                            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                                Действие
                            </Button>
                        </ListMaster.FooterControls>
                    </ListMaster.Footer>
                ) : null}
            </ListMaster>

            {openLightBoxOptions ? (
                <LightBoxOptions
                    accountSuggestValue={accountSuggestValue}
                    amountFromValue={amountFromValue}
                    amountToValue={amountToValue}
                    changedFilters={changedFilters}
                    clearFilters={clearFilters}
                    closeLightBox={() => setOpenLightBoxOptions(false)}
                    counterpartySuggestValue={counterpartySuggestValue}
                    customsCodeValue={customsCodeValue}
                    dateFrom={dateFrom}
                    dateTo={dateTo}
                    documentNumberFromValue={documentNumberFromValue}
                    documentNumberToValue={documentNumberToValue}
                    documentNumberValue={documentNumberValue}
                    multiselectStatusValues={multiselectStatusValues}
                    onChangeAccountSuggestValue={setAccountSuggestValue}
                    onChangeAmountFromValue={setAmountFromValue}
                    onChangeAmountToValue={setAmountToValue}
                    onChangeCounterpartySuggestValue={setCounterpartySuggestValue}
                    onChangeCustomsCodeValue={setCustomsCodeValue}
                    onChangeDateFrom={setDateFrom}
                    onChangeDateTo={setDateTo}
                    onChangeDocumentNumberValue={setDocumentNumberValue}
                    onChangeDocumentNumberFromValue={setDocumentNumberFromValue}
                    onChangeDocumentNumberToValue={setDocumentNumberToValue}
                    onChangeMultiselectStatusValues={setMultiselectStatusValues}
                    onChangePurposeValue={setPurposeValue}
                    purposeValue={purposeValue}
                />
            ) : null}
        </>
    );
};
