import React, {useState} from 'react';
import Big from 'big.js';
import {MasterTable} from '@sberbusiness/triplex/components/Tables/MasterTable';
import {EHorizontalAlign, EVerticalAlign, ECellType} from '@sberbusiness/triplex/components/Tables/TableBasic/enums';
import {Checkbox} from '@sberbusiness/triplex/components/Checkbox/Checkbox';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {ETextSize, EFontType, ELineType} from '@sberbusiness/triplex/components/Typography/enums';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {Amount} from '@sberbusiness/triplex/components/Amount/Amount';
import {AmountConst} from '@sberbusiness/triplex/consts/AmountConst';
import {formatAmount} from '@sberbusiness/triplex/utils/amountUtils';
import {MarkerStatus} from '@sberbusiness/triplex/components/MarkerStatus/MarkerStatus';
import {EMarkerStatus} from '@sberbusiness/triplex/components/Marker/enums';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {DeleteSrvIcon20} from '@sberbusiness/icons/DeleteSrvIcon20';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {isKey} from '@sberbusiness/triplex/utils/keyboard';
import {decorate} from '@sberbusiness/triplex/utils/accountsUtils';
import './styles.less';

const [checkedRows, setCheckedRows] = useState([]);

const sums = ['5000', '1000', '500', '100', ''];

const handleRemove = (event) => {
    event.stopPropagation();
    alert('Remove handler called.');
};

const handleClickRow = (rowKey) => {
    alert(`Clicked row with following key: ${rowKey}`);
};

const handleKeyDown = (rowKey) => (event) => {
    const key = event.code || event.keyCode;

    if (isKey(key, 'ENTER') || isKey(key, 'SPACE')) {
        handleClickRow(rowKey);
    }

    // Предотвращения прокрутки страницы при нажатии на пробел.
    if (isKey(key, 'SPACE')) {
        event.preventDefault();
    }
};

const renderTabbableField = (rowKey) => (
    <div
        className="table-basic-tabbable-field"
        tabIndex={0}
        role="button"
        onKeyDown={handleKeyDown(rowKey)}
    >
        <Text tag="div" size={ETextSize.B1} type={EFontType.GENERAL} line={ELineType.EXTRA}>
            Платежное поручение ООО Ромашка
            <br />
            {decorate(`40702810205275000000`)}
        </Text>
        <Gap size={4} />
        <Text tag="div" size={ETextSize.B2} type={EFontType.SECONDARY}>
            В том числе НДС 20%
        </Text>
    </div>
);

const renderRowCheckbox = (rowKey) => {
    const checked = checkedRows.includes(rowKey);

    return (
        <Checkbox
            checked={checked}
            onChange={(event) => setCheckedRows(
                (rows) => {
                    if (event.target.checked)
                        rows.push(rowKey);
                    else
                        rows.splice(checkedRows.indexOf(rowKey), 1);
                    return [...rows];
                })
            }
            aria-label="Выбрать строку"
            labelAttributes={{onClick: (event) => event.stopPropagation()}}
        />
    );
};

const data = Array.from({length: 5}, (value, index) => ({
    rowKey: `table-basic-row-${index}`,
    rowData: {
        checkbox: renderRowCheckbox(`table-basic-row-${index}`),
        number: 1397450 + index,
        value: renderTabbableField(`table-basic-row-${index}`),
        sum: sums[index],
        status: (
            <MarkerStatus status={EMarkerStatus.SUCCESS} description="Пояснения к статусу">
                Исполнено
            </MarkerStatus>
        ),
        action: (
            <ButtonIcon onClick={handleRemove} aria-label="Удалить">
                <DeleteSrvIcon20 table />
            </ButtonIcon>
        ),
    },
    selected: checkedRows.includes(`table-basic-row-${index}`),
}));

const renderHeaderCheckbox = () => {
    const checked = Boolean(checkedRows.length);
    const bulk = checkedRows.length !== data.length;

    return (
        <Checkbox
            checked={checked}
            bulk={bulk}
            onChange={(event) => setCheckedRows(
                (rows) => {
                    if (event.target.checked || bulk)
                        rows = data.map(row => row.rowKey);
                    else
                        rows.length = 0;
                    return [...rows];
                }
            )}
            aria-label="Выбрать все"
        />
    );
};

const columns = [
    {
        fieldKey: 'checkbox',
        cellType: ECellType.CHECKBOX,
        label: renderHeaderCheckbox(),
        verticalAlign: EVerticalAlign.TOP,
    },
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
    {
        fieldKey: 'action',
        label: '',
        horizontalAlign: EHorizontalAlign.CENTER,
    },
];

function getCheckedSum() {
    const array = data
        .filter((row) => Boolean(checkedRows.includes(row.rowKey) && row.rowData.sum))
        .map((row) => {
            const str = formatAmount(row.rowData.sum, undefined, false).replace(
                AmountConst.DecimalComma,
                AmountConst.DecimalPoint
            );
            return Big(str);
        });
    return array.length === 0 ? String(0) : array.reduce((a, b) => a.plus(b)).toString();
}

const renderTableFooter = () => (
    <MasterTable.TableFooter data-test-id="TestTable__MasterTable.TableFooter">
        <MasterTable.TableFooter.Summary data-test-id="TestTable__MasterTable.TableFooter.Summary">
            {renderHeaderCheckbox()}
            <MasterTable.TableFooter.Summary.SelectedCount>
                {`Выбрано ${checkedRows.length}`}
            </MasterTable.TableFooter.Summary.SelectedCount>
            <MasterTable.TableFooter.Summary.Amount label="Сумма" sum={getCheckedSum()} currency="RUB" />
        </MasterTable.TableFooter.Summary>
        <MasterTable.TableFooter.Controls data-test-id="TestTable__MasterTable.TableFooter.Controls">
            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
                Button Name
            </Button>
            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.SM}>
                Button Name
            </Button>
        </MasterTable.TableFooter.Controls>
    </MasterTable.TableFooter>
);

<MasterTable>
    <MasterTable.TableBasic columns={columns} data={data} onClickRow={handleClickRow} />
    {checkedRows.length > 0 && renderTableFooter()}
</MasterTable>
