import {MasterTable} from '@sberbusiness/triplex/components/Tables/MasterTable';
import {Amount} from '@sberbusiness/triplex/components/Amount/Amount';
import {EHorizontalAlign, EVerticalAlign} from '@sberbusiness/triplex/components/Tables/TableBasic/enums';

const backendData = [
    {
        rowKey: '1',
        rowData: {
            number: '1',
            counterparty: 'ООО Ромашка',
            sum: '1337,00',
            status: 'Ячейки первой и второй строки объединены по вертикали.',
        },
        rowLayout: {
            status: {rowSpan: 2},
        },
    },
    {
        rowKey: '2',
        rowData: {
            number: '2',
            counterparty: 'ООО Росинка',
            sum: '420,00',
        },
    },
    {
        rowKey: '3',
        rowData: {
            number: '3',
            counterparty: 'Ячейки второго и третьего столбца объединены по горизонтали.',
            status: 'Исполнено',
        },
        rowLayout: {
            counterparty: {colSpan: 2},
        },
    },
];

const columns = [
    {
        fieldKey: 'number',
        label: '№',
        width: 65,
    },
    {
        fieldKey: 'counterparty',
        label: 'Контрагент',
    },
    {
        fieldKey: 'sum',
        label: 'Сумма',
        horizontalAlign: EHorizontalAlign.RIGHT,
        renderCell: (fieldValue) => fieldValue && <Amount value={fieldValue} currency={'RUB'} />,
    },
    {
        fieldKey: 'status',
        label: 'Статус',
        verticalAlign: EVerticalAlign.MIDDLE,
        width: 150,
    },
];

<MasterTable>
    <MasterTable.TableBasic columns={columns} data={backendData} />
</MasterTable>