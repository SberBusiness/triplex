//TableBasicExampleBackendFixture.ts
import {EDocStatus} from './TableBasicExampleEnums';
import {getRandomStatus, getRandom} from './TableBasicExampleUtils';
import {ITableBasicRow} from '@sberbusiness/triplex/components/Tables/TableBasic/types';
import {counterparties} from './TableBasicExampleConst';

const createFixtureData = () => {
    const fixedData: ITableBasicRow[] = [
        {
            rowKey: '1',
            dataAttributes: {'test-id': 'TestTable__TableRow1'},
            rowData: {
                checkbox: undefined,
                number: 1,
                counterparty: counterparties[0],
                sum: '400.00',
                status: EDocStatus.SUCCESS,
                action1: undefined,
                action2: undefined,
            },
        },
        {
            rowKey: '2',
            dataAttributes: {'test-id': 'TestTable__TableRow2'},
            rowData: {
                checkbox: undefined,
                number: 2,
                counterparty: counterparties[1],
                sum: '170.00',
                status: EDocStatus.ERROR,
                action1: undefined,
                action2: undefined,
            },
        },
        {
            rowKey: '3',
            dataAttributes: {'test-id': 'TestTable__TableRow3'},
            rowData: {
                checkbox: undefined,
                number: 3,
                counterparty: counterparties[2],
                sum: '560.00',
                status: EDocStatus.WAITING,
                action1: undefined,
                action2: undefined,
            },
        },
        {
            rowKey: '4',
            dataAttributes: {'test-id': 'TestTable__TableRow4'},
            rowData: {
                checkbox: undefined,
                number: 4,
                counterparty: counterparties[3],
                sum: '1.90',
                status: EDocStatus.WARNING,
                action1: undefined,
                action2: undefined,
            },
        },
        {
            rowKey: '5',
            dataAttributes: {'test-id': 'TestTable__TableRow5'},
            rowData: {
                checkbox: undefined,
                number: 5,
                counterparty: counterparties[4],
                sum: undefined,
                status: EDocStatus.ERROR,
                action1: undefined,
                action2: undefined,
            },
        },
    ];

    const data = Array.from(fixedData);

    for (let i = fixedData.length + 1; i <= 100; i++) {
        data.push({
            rowKey: String(i),
            dataAttributes: {'test-id': `TestTable__TableRow${i}`},
            rowData: {
                checkbox: undefined,
                number: i,
                counterparty: counterparties[Math.floor(Math.random() * counterparties.length)],
                sum: getRandom(0, 1000000),
                status: getRandomStatus(EDocStatus),
                action1: undefined,
                action2: undefined,
            },
        });
    }

    return data;
};

export const allDataFixture = createFixtureData();
