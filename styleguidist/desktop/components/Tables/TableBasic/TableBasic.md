```jsx noeditor
import ComponentStylesDependency from '../../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency 
    componentTitle="Tables"
    isMobileComponent={false} 
/>
```

### Простая таблица

```jsx
import React from 'react';
import {MasterTable} from '@sberbusiness/triplex/desktop/components/Tables/MasterTable';
import {Amount} from '@sberbusiness/triplex/desktop/components/Amount/Amount';
import {EHorizontalAlign} from '@sberbusiness/triplex/desktop/components/Tables/TableBasic/enums';
import {EScreenWidth} from '@sberbusiness/triplex/common/enums/EScreenWidth';
import {EmptytableSrvIcon64} from '@sberbusiness/icons/EmptytableSrvIcon64';
import './TableBasicExample.less';

const EDocStatus = {
    SUCCESS: 'Исполнено',
    ERROR: 'Ошибка',
    WARNING: 'Важное',
    WAITING: 'Ожидание',
};

const backendData = [
    {
        rowKey: '1',
        rowData: {
            number: '1',
            counterparty: 'ООО Ромашка',
            sum: '400,00',
            status: EDocStatus.SUCCESS,
        },
    },
    {
        rowKey: '2',
        rowData: {
            number: '2',
            counterparty: 'ООО ТранссельмашМобил',
            sum: '170,00',
            status: EDocStatus.WAITING,
        },
    },
    {
        rowKey: '3',
        rowData: {
            number: '3',
            counterparty: 'ООО Драйв Системс',
            sum: undefined,
            status: EDocStatus.ERROR,
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
        hideScreenWidth: EScreenWidth.LG_MAX,
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
    },
];

const renderNoData = () => [<EmptytableSrvIcon64 key="icon" />, <div key="text">Нет данных</div>];

const TableBasicExample = () => (
    <MasterTable>
        <MasterTable.TableBasic columns={columns} data={backendData} renderNoData={renderNoData} />
    </MasterTable>
);

<TableBasicExample />
```

### Обычная таблица

```jsx
import React, {useState} from 'react';
import {ButtonDropdown} from '@sberbusiness/triplex/desktop/components/Button/ButtonDropdown';
import Big from 'big.js';
import {MasterTable} from '@sberbusiness/triplex/desktop/components/Tables/MasterTable';
import {ECellType, EHorizontalAlign, EVerticalAlign} from '@sberbusiness/triplex/desktop/components/Tables/TableBasic/enums';
import {ButtonIcon} from '@sberbusiness/triplex/desktop/components/Button/ButtonIcon';
import {DeleteSrvIcon20} from '@sberbusiness/icons/DeleteSrvIcon20';
import {EScreenWidth} from '@sberbusiness/triplex/common/enums/EScreenWidth';
import {Amount} from '@sberbusiness/triplex/desktop/components/Amount/Amount';
import {formatAmount} from '@sberbusiness/triplex/desktop/utils/amountUtils';
import {AmountConst} from '@sberbusiness/triplex/desktop/common/consts/AmountConst';
import {Button} from '@sberbusiness/triplex/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {Checkbox} from '@sberbusiness/triplex/desktop/components/Checkbox/Checkbox';
import {EmptytableSrvIcon64} from '@sberbusiness/icons/EmptytableSrvIcon64';
import {Gap} from '@sberbusiness/triplex/desktop/components/Gap/Gap';
import './TableBasicExample.less';

const EDocStatus = {
    SUCCESS: 'Исполнено',
    ERROR: 'Ошибка',
    WARNING: 'Важное',
    WAITING: 'Ожидание',
};

const renderActions1 = (
    <ButtonIcon onClick={(e) => {e.stopPropagation(); alert('Успешный клик')}}>
        <DeleteSrvIcon20 table />
    </ButtonIcon>
);

const actions = [
    {id: 1, label: 'действие 1', onSelect: () => alert('действие 1')},
    {id: 2, label: 'действие 2', onSelect: () => alert('действие 2')},
    {id: 3, label: 'действие 3', onSelect: () => alert('действие 3')},
];

const handlePrevent = (e) => {
    e.stopPropagation();
};

const renderActions2 = <ButtonDropdown theme={EButtonTheme.DOTS} onClick={handlePrevent} size={EButtonSize.SM} options={actions} />;

const backendData = [
    {
        rowKey: '1',
        dataAttributes: {'test-id': 'TestTable__TableRow1'},
        rowData: {
            checkbox: undefined,
            number: '1',
            counterparty: 'ООО Ромашка',
            sum: '400,00',
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
            number: '2',
            counterparty: 'ООО ТранссельмашМобил',
            sum: '170,00',
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
            number: '3',
            counterparty: 'ООО Заботливая Ромашка',
            sum: '560,00',
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
            number: '4',
            counterparty: 'ООО Деловая',
            sum: '1,90',
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
            number: '5',
            counterparty: 'ООО Драйв Системс',
            sum: undefined,
            status: EDocStatus.ERROR,
            action1: undefined,
            action2: undefined,
        },
    },
];

const TableBasicExample = () => {
    const [checkedState, setCheckedState] = useState([]);

    const handleClickSelectPageChecked = (bulk, rowKeys, e) => {
        const checkedRows = e.target.checked || bulk ? rowKeys : [];
        setCheckedState(checkedRows);
    };

    const handleRowClick = (key) => {
        alert(backendData.find(({rowKey}) => key === rowKey).rowData.counterparty);
    };

    const handleCheckboxChange = (rowKey, e) => {
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

    const setRowChecked = (data, checkedRows, handleCheckboxChange) => {
        return data.map((row) => {
            const checked = Boolean(checkedRows.includes(row.rowKey));
            row.selected = checked;
            row.rowData.checkbox = (
                <Checkbox
                    checked={checked}
                    onChange={handleCheckboxChange.bind(null, row.rowKey)}
                    labelAttributes={{onClick: (event) => event.stopPropagation()}}
                />
            );
            return row;
        });
    };

    const renderCheckboxSelectPage = (bulk, checked, rowKeys) => (
        <Checkbox bulk={bulk} checked={checked} onChange={handleClickSelectPageChecked.bind(null, bulk, rowKeys)} />
    );

    const getSum = (data, checkedRows) => {
        const array = data
            .filter((row) => Boolean(checkedRows.includes(row.rowKey) && row.rowData.sum))
            .map((row) => {
                const stringValue = formatAmount(row.rowData.sum, undefined, false).replace(
                    AmountConst.DecimalSeparator,
                    AmountConst.DecimalSeparatorCalc
                );
                return Big(stringValue);
            });
        return array.length === 0 ? String(0) : array.reduce((a, b) => a.plus(b)).toString();
    };

    let data = backendData;
    data = setRowChecked(data, checkedState, handleCheckboxChange);
    const rowKeys = data.map((r) => r.rowKey);
    const selectedCount = checkedState.length;
    const bulk = selectedCount !== data.length;
    const checked = Boolean(selectedCount);
    const sum = getSum(data, checkedState);

    const createColumns = (bulk, checked) => [
        {
            fieldKey: 'checkbox',
            cellType: ECellType.CHECKBOX,
            width: 40,
            label: renderCheckboxSelectPage(bulk, checked, rowKeys),
            verticalAlign: EVerticalAlign.TOP,
        },
        {fieldKey: 'number', label: '№', width: 65, verticalAlign: EVerticalAlign.TOP},
        {
            fieldKey: 'counterparty',
            label: 'Контрагент',
            hideScreenWidth: EScreenWidth.LG_MAX,
            verticalAlign: EVerticalAlign.TOP,
        },
        {
            fieldKey: 'sum',
            label: 'Сумма',
            horizontalAlign: EHorizontalAlign.RIGHT,
            verticalAlign: EVerticalAlign.TOP,
            renderCell: (fieldValue) => fieldValue && <Amount value={fieldValue} currency={'RUB'} />,
        },
        {fieldKey: 'status', label: 'Статус', verticalAlign: EVerticalAlign.TOP},
        {
            fieldKey: 'action1',
            renderCell: (fieldValue) => (fieldValue !== undefined ? fieldValue : renderActions1),
            horizontalAlign: EHorizontalAlign.CENTER,
            verticalAlign: EVerticalAlign.TOP,
            hideScreenWidth: EScreenWidth.MD_MAX,
            dataAttributes: {'test-id': 'TestTable__action1'},
        },
        {
            fieldKey: 'action2',
            renderCell: (fieldValue) => (fieldValue !== undefined ? fieldValue : renderActions2),
            cellType: ECellType.COMPONENTS,
            horizontalAlign: EHorizontalAlign.CENTER,
            verticalAlign: EVerticalAlign.TOP,
            hideScreenWidth: EScreenWidth.MD_MAX,
            dataAttributes: {'test-id': 'TestTable__action2'},
        },
    ];

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
        <MasterTable>
            <MasterTable.TableBasic
                columns={createColumns(bulk, checked)}
                data={data}
                onClickRow={handleRowClick}
                renderNoData={renderNoData}
            />
            {checked && (
                <MasterTable.TableFooter data-test-id="TestTable__MasterTable.TableFooter">
                    <MasterTable.TableFooter.Summary data-test-id="TestTable__MasterTable.TableFooter.Summary">
                        {renderCheckboxSelectPage(bulk, checked, rowKeys)}
                      <MasterTable.TableFooter.Summary.SelectedCount>{`Выбрано ${selectedCount}`}</MasterTable.TableFooter.Summary.SelectedCount>
                        <MasterTable.TableFooter.Summary.Amount label="Сумма" sum={sum} currency={'RUB'} />
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
        </MasterTable>
    );
};

<TableBasicExample />
```

### Таблица с объединенными ячейками

```jsx
import React from 'react';
import {MasterTable} from '@sberbusiness/triplex/desktop/components/Tables/MasterTable';
import {Amount} from '@sberbusiness/triplex/desktop/components/Amount/Amount';
import {EHorizontalAlign, EVerticalAlign} from '@sberbusiness/triplex/desktop/components/Tables/TableBasic/enums';

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

const renderNoData = () => <></>;

<MasterTable>
    <MasterTable.TableBasic columns={columns} data={backendData} renderNoData={renderNoData}/>
</MasterTable>
```


### Таблица с фильтрами и пагинацией

```jsx noeditor
import React from 'react';
import {TableBasicExample} from './TableBasicExample';

<TableBasicExample />
```

### collapsed

```html { "file": "./TableBasicExample.tsx" }
```
```html { "file": "./TableBasicExampleFilterPanel.tsx" }
```
```html { "file": "./TableBasicExampleBackendEmulator.ts" }
```
```html { "file": "./TableBasicExampleHandlers.ts" }
```
```html { "file": "./TableBasicExampleUtils.tsx" }
```
```html { "file": "./TableBasicExampleBackendFixture.ts" }
```
```html { "file": "./TableBasicExampleTypes.tsx" }
```
```html { "file": "./TableBasicExampleConst.tsx" }
```
```html { "file": "./TableBasicExampleEnums.ts" }
```
