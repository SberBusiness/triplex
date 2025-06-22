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
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';

const columns = [
    {
        fieldKey: 'number',
        label: '№',
    },
    {
        fieldKey: 'document',
        label: 'Документ',
    },
    {
        fieldKey: 'recipient',
        label: 'Получатель',
        width: 150,
    },
    {
        fieldKey: 'account',
        label: 'Счет получателя',
        width: 150,
    },
    {
        fieldKey: 'purpose',
        label: 'Назначение',
        width: 150,
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
    {
        fieldKey: 'button',
    },
    {
        fieldKey: 'actions',
    },
];

const data = Array.from({length: 5}, (value, index) => ({
    rowKey: `table-basic-row-${index}`,
    rowData: {
        number: 1397450 + index,
        document: (
            <Text tag="div" size={ETextSize.B1} type={EFontType.GENERAL} line={ELineType.EXTRA}>
                Платежное поручение
            </Text>
        ),
        recipient: (
            <Text tag="div" size={ETextSize.B1} type={EFontType.GENERAL} line={ELineType.EXTRA}>
                ООО Ромашка
            </Text>
        ),
        account: (
            <Text tag="div" size={ETextSize.B1} type={EFontType.GENERAL} line={ELineType.EXTRA}>
                {decorate(`40702810205275000000`)}
            </Text>
        ),
        purpose: (
            <Text ag="div" size={ETextSize.B1} type={EFontType.GENERAL} line={ELineType.EXTRA}>
                В том числе НДС 20%
            </Text>
        ),
        sum: '1220000000',
        status: (
            <MarkerStatus status={EMarkerStatus.SUCCESS} description="Пояснения к статусу">
                Исполнено
            </MarkerStatus>
        ),
        button: (
            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
                Button Name
            </Button>
        ),
        actions: <Button theme={EButtonTheme.DOTS} size={EButtonSize.SM} />,
    },
}));

<MasterTable>
    <div style={{overflow: 'auto hidden'}}>
        <MasterTable.TableBasic columns={columns} data={data} />
    </div>
</MasterTable>