/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {ECellType} from '@sbbol/web-library/desktop/components/Tables/TableBasic/enums';
import {ITableBasicColumn, ITableBasicRow} from '@sbbol/web-library/desktop/components/Tables/TableBasic/types';
import {
    mapCellTypeToClassName,
    mapHideScreenSizesToClassName,
    mapHorizontalAlignToClassName,
    mapVerticalAlignToClassName,
} from '@sbbol/web-library/desktop/components/Tables/utils';
import {getAriaHTMLAttributes} from '@sbbol/web-library/desktop/utils/HTML/AriaAttributes';
import {getDataHTMLAttributes} from '@sbbol/web-library/desktop/utils/HTML/DataAttributes';
import * as React from 'react';
import {TestIds} from '@sbbol/web-library/common/dataTestIds/dataTestIds';

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
        const {rowKey, rowData, ariaAttributes, dataAttributes, selected = false} = data;

        const classNameTr = classnames({'cssClass[selected]': selected});
        const onClick = onClickRow ? () => onClickRow(rowKey) : undefined;
        const dataTestId = dataAttributes ? dataAttributes['test-id'] : undefined;

        const tdList = columns.map((column, columnIndex) => {
            const keys = Object.keys(rowData);
            const fieldName = keys[columnIndex];
            const fieldValue = rowData[fieldName];
            return this.renderTd(column, fieldValue, dataTestId);
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

    private renderTd = (column: ITableBasicColumn, fieldValue: React.ReactNode, dataTestId: string | undefined) => {
        const cellNode: React.ReactNode = column.renderCell ? column.renderCell(fieldValue) : fieldValue;
        const styleTd = column.width ? {width: column.width} : undefined;
        const classNameTd = classnames(
            mapCellTypeToClassName(column.cellType),
            mapHorizontalAlignToClassName(column.horizontalAlign),
            mapVerticalAlignToClassName(column.verticalAlign),
            mapHideScreenSizesToClassName(column.hideScreenSizes)
        );

        let content;

        if (cellNode) {
            content = cellNode;
        } else if (column.cellType === ECellType.COMPONENTS) {
            content = null;
        } else {
            content = '---';
        }

        return (
            <td
                className={classNameTd}
                key={column.fieldKey}
                data-test-id={dataTestId && `${dataTestId}__${column.fieldKey}${TestIds.Tables.TableBasic.td}`}
                style={styleTd}
            >
                {content}
            </td>
        );
    };
}
