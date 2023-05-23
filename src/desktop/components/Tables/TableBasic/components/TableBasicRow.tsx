/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {ECellType} from '@sberbusiness/triplex/desktop/components/Tables/TableBasic/enums';
import {ITableBasicColumn, ITableBasicRow, ITableRowCellSpanProps} from '@sberbusiness/triplex/desktop/components/Tables/TableBasic/types';
import {
    mapCellTypeToClassName,
    mapScreenSizeToClassName,
    mapHorizontalAlignToClassName,
    mapVerticalAlignToClassName,
} from '@sberbusiness/triplex/desktop/components/Tables/utils';
import {getAriaHTMLAttributes} from '@sberbusiness/triplex/desktop/utils/HTML/AriaAttributes';
import {getDataHTMLAttributes} from '@sberbusiness/triplex/desktop/utils/HTML/DataAttributes';
import {TestIds} from '@sberbusiness/triplex/common/dataTestIds/dataTestIds';

/** Свойства TableBasicRow. */
interface ITableBasicRowProps {
    /** Структура заголовков таблицы. */
    columns: ITableBasicColumn[];
    /** Значение для вывода в строке. */
    data: ITableBasicRow;
    /** Функция обработки клика по строке таблицы. */
    onClickRow?: (rowKey: string) => void;
}

/** Компонент строки в теле таблицы. */
export class TableBasicRow extends React.PureComponent<ITableBasicRowProps> {
    public static displayName = 'TableBasicRow';

    public render(): JSX.Element {
        const {columns, data, onClickRow} = this.props;
        const {rowKey, rowData, rowLayout, ariaAttributes, dataAttributes, selected = false} = data;

        const classNameTr = classnames({'cssClass[selected]': selected});
        const onClick = onClickRow ? () => onClickRow(rowKey) : undefined;
        const dataTestId = dataAttributes ? dataAttributes['test-id'] : undefined;

        const tdList = columns.map((column) => {
            const {fieldKey} = column;

            if (Object.keys(rowData).indexOf(fieldKey) !== -1) {
                return this.renderTd(column, rowData[fieldKey], rowLayout?.[fieldKey], dataTestId);
            }
        });

        return (
            <tr
                className={classNameTr}
                onClick={onClick}
                {...(Boolean(ariaAttributes) && getAriaHTMLAttributes(ariaAttributes!))}
                {...(Boolean(dataAttributes) && getDataHTMLAttributes(dataAttributes!))}
            >
                {tdList}
            </tr>
        );
    }

    private renderTd = (column: ITableBasicColumn, value: React.ReactNode, spanProps?: ITableRowCellSpanProps, dataTestId?: string) => {
        const cellNode: React.ReactNode = column.renderCell ? column.renderCell(value) : value;
        const classNames = classnames(
            mapCellTypeToClassName(column.cellType),
            mapHorizontalAlignToClassName(column.horizontalAlign),
            mapVerticalAlignToClassName(column.verticalAlign),
            mapScreenSizeToClassName(column.hideScreenWidth)
        );
        const style = column.width ? {width: column.width} : undefined;

        const renderContent = () => {
            if (cellNode) return cellNode;
            if (column.cellType !== ECellType.COMPONENTS) return '---';
        };

        return (
            <td
                key={column.fieldKey}
                className={classNames}
                {...spanProps}
                data-test-id={dataTestId && `${dataTestId}__${column.fieldKey}${TestIds.Tables.TableBasic.td}`}
                style={style}
            >
                {renderContent()}
            </td>
        );
    };
}
