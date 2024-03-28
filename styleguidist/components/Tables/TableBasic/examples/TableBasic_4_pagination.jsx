import React, {useState, useEffect} from 'react';
import {MasterTable} from '@sberbusiness/triplex/components/Tables/MasterTable';
import {EHorizontalAlign} from '@sberbusiness/triplex/components/Tables/TableBasic/enums';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {ETextSize, EFontType, ELineType} from '@sberbusiness/triplex/components/Typography/enums';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {Amount} from '@sberbusiness/triplex/components/Amount/Amount';
import {MarkerStatus} from '@sberbusiness/triplex/components/MarkerStatus/MarkerStatus';
import {EMarkerStatus} from '@sberbusiness/triplex/components/Marker/enums';
import {decorate} from '@sberbusiness/triplex/utils/accountsUtils';

const [rowNumber, setRowNumber] = useState(10);
const [currentPageNumber, setCurrentPageNumber] = useState(1);
const [hasPrevPage, setHasPrevPage] = useState((currentPageNumber - 1) * rowNumber > 0);
const [hasNextPage, setHasNextPage] = useState((currentPageNumber + 1) * rowNumber <= 100);

useEffect(() => {
    setHasPrevPage((currentPageNumber - 1) * rowNumber > 0);
    setHasNextPage((currentPageNumber + 1) * rowNumber <= 100);
}, [rowNumber, currentPageNumber]);

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

const data = Array.from({length: 100}, ((value, index) => (
    {
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
                <MarkerStatus status={EMarkerStatus.SUCCESS} description="Пояснения к статусу">
                    Исполнено
                </MarkerStatus>
            )
        }
    }
)));

const rowNumberOptions = [10, 30, 50, 100];

function handleSelectRowNumber(number) {
    setRowNumber(number);
    setCurrentPageNumber(1);
}

function handleClickNextPage() {
    setCurrentPageNumber(currentPageNumber + 1);
}

function handleClickPrevPage() {
    setCurrentPageNumber(currentPageNumber - 1);
}

function getPaginatedData() {
    return data.slice((currentPageNumber - 1) * rowNumber, currentPageNumber * rowNumber);
}

<MasterTable>
    <MasterTable.TableBasic columns={columns} data={getPaginatedData()} />
    <MasterTable.Pagination
        paginationLabel="Показать на странице"
        rowNumber={rowNumber}
        rowNumberOptions={rowNumberOptions}
        currentPageNumber={currentPageNumber}
        onSelectRowNumber={handleSelectRowNumber}
        onClickPrevPage={handleClickPrevPage}
        onClickNextPage={handleClickNextPage}
        hasPrevPage={hasPrevPage}
        hasNextPage={hasNextPage}
        dataAttributes={{'test-id': 'TestTable__MasterTable.Pagination'}}
        buttonPrevProps={{'aria-label': 'Предыдущая страница'}}
        buttonNextProps={{'aria-label': 'Следующая страница'}}
    />
</MasterTable>