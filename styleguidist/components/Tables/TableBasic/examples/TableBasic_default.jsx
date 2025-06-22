import React from 'react';
import {MasterTable} from '@sberbusiness/triplex/components/Tables/MasterTable';
import {EHorizontalAlign} from '@sberbusiness/triplex/components/Tables/TableBasic/enums';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {ETextSize, EFontType, ELineType} from '@sberbusiness/triplex/components/Typography/enums';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {Amount} from '@sberbusiness/triplex/components/Amount/Amount';
import {MarkerStatus} from '@sberbusiness/triplex/components/MarkerStatus/MarkerStatus';
import {EMarkerStatus} from '@sberbusiness/triplex/components/Marker/enums';
import {decorate} from '@sberbusiness/triplex/utils/accountsUtils';

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

const data = Array.from({length: 5}, (value, index) => ({
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
        ),
    },
}));

<MasterTable>
    <MasterTable.TableBasic columns={columns} data={data} />
</MasterTable>