import React, {useState} from 'react';
import {EmptytableSrvIcon64} from '@sberbusiness/icons/EmptytableSrvIcon64';
import {MasterTable} from '@sberbusiness/triplex/components/Tables/MasterTable';
import {EHorizontalAlign} from '@sberbusiness/triplex/components/Tables/TableBasic/enums';
import {Amount} from '@sberbusiness/triplex/components/Amount/Amount';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {ETextSize, EFontType, ELineType} from '@sberbusiness/triplex/components/Typography/enums';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {MarkerStatus} from '@sberbusiness/triplex/components/MarkerStatus/MarkerStatus';
import {EMarkerStatus} from '@sberbusiness/triplex/components/Marker/enums';
import {decorate} from '@sberbusiness/triplex/utils/accountsUtils';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonSize, EButtonTheme} from '@sberbusiness/triplex/components/Button/enums';

const [selectedFilterId, setSelectedFilterId] = useState('table-filter-all');

const columns = [
    {
        fieldKey: 'number',
        label: '№',
    },
    {
        fieldKey: 'value',
        label: 'Значение',
    },
    {
        fieldKey: 'sum',
        label: 'Сумма',
        horizontalAlign: EHorizontalAlign.RIGHT,
        renderCell: (fieldValue) => fieldValue && <Amount value={fieldValue} currency="RUB" />,
    },
    {
        fieldKey: 'status',
        label: 'Статус',
    },
];

const statuses = ['Исполнено', 'Ошибка', 'Создан', 'Ожидание'];

const data = Array.from({length: 8}, (value, index) => ({
    rowKey: `table-basic-row-${index}`,
    rowData: {
        number: 1397450 + index,
        value: (
            <>
                <Text tag="div" size={ETextSize.B1} type={EFontType.GENERAL} line={ELineType.EXTRA}>
                    Платежное поручение ООО Ромашка
                    <br />
                    {decorate(`40702810205275000000`)}
                </Text>
                <Gap size={4} />
                <Text tag="div" size={ETextSize.B2} type={EFontType.SECONDARY}>
                    В том числе НДС 20%
                </Text>
            </>
        ),
        sum: '1220000000',
        status: (
            <MarkerStatus status={index % 4} description="Пояснения к статусу">
                {statuses[index % 4]}
            </MarkerStatus>
        ),
    },
}));

const filters = [
    {
        id: 'table-filter-all',
        label: 'Все',
        'aria-label': 'Все',
        'data-test-id': 'TestTable__MasterTable.TabsLine__All',
    },
    {
        id: 'table-filter-draft',
        label: 'Черновики',
        'aria-label': 'Черновик',
        'data-test-id': 'TestTable__MasterTable.TabsLine__Draft',
        showNotificationIcon: true,
    },
    {
        id: 'table-filter-sign',
        label: 'На подпись и отправку',
        'aria-label': 'На подпись и отправку',
        'data-test-id': 'TestTable__MasterTable.TabsLine__Sign',
    },
    {
        id: 'table-filter-executed',
        label: 'Исполненные',
        'aria-label': 'Исполненные',
        'data-test-id': 'TestTable__MasterTable.TabsLine__Executed',
    },
    {
        id: 'table-filter-rejected',
        label: 'Отклоненные',
        'aria-label': 'Отклоненные',
        'data-test-id': 'TestTable__MasterTable.TabsLine__Rejected',
    },
];

function handleFilterChange(id) {
    setSelectedFilterId(id);
}

function getFilteredData() {
    if (selectedFilterId === 'table-filter-all')
        return data;
    if (selectedFilterId === 'table-filter-draft')
        return data.filter((value) => value.rowData.status.props.status === EMarkerStatus.WARNING);
    if (selectedFilterId === 'table-filter-executed')
        return data.filter((value) => value.rowData.status.props.status === EMarkerStatus.SUCCESS);
    if (selectedFilterId === 'table-filter-rejected')
        return data.filter((value) => value.rowData.status.props.status === EMarkerStatus.ERROR);
    return [];
}

const renderNoData = () => (
    <>
        <EmptytableSrvIcon64 />
        <Text tag="div" size={ETextSize.B1} type={EFontType.GENERAL} line={ELineType.EXTRA}>
            Нет данных, но можно предложить какие-то действия для заполнения таблицы
        </Text>
        <Gap size={24} />
        <div>
            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
                Button Name
            </Button>
            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.SM}>
                Button Name
            </Button>
        </div>
    </>
);

<MasterTable>
    <MasterTable.TabsLinePanel>
        <MasterTable.TabsLine
            tabs={filters}
            selectedTabId={selectedFilterId}
            maxVisible={4}
            onChangeTab={handleFilterChange}
            data-test-id="TestTable__MasterTable.TabsLine"
            dropdownTargetHtmlAttributes={{
                'data-test-id': 'MasterTable.TabsLine__DropdownTarget',
                'aria-label': 'Дополнительные фильтры',
            }}
        />
    </MasterTable.TabsLinePanel>
    <MasterTable.TableBasic columns={columns} data={getFilteredData()} renderNoData={renderNoData} />
</MasterTable>