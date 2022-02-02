import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {TableBasicRow} from '@sbbol/web-library/desktop/components/Tables/TableBasic/components/TableBasicRow';
import {ITableBasicColumn, ITableBasicRow} from '@sbbol/web-library/desktop/components/Tables/TableBasic/types';
import * as React from 'react';

/**
 * @prop {ITableBasicColumn} columns Структура заголовков таблицы.
 * @prop {ITableBasicRow[]} data Массив значений для вывода в теле таблицы.
 * @prop {boolean} [highlightRowOnHover] Подсветка строк при наведении мышки.
 * @prop {Function} [onClickRow] Функция обработки клика по строке таблицы.
 */
interface ITableBasicBodyProps {
    columns: ITableBasicColumn[];
    data: ITableBasicRow[];
    highlightRowOnHover?: boolean;
    onClickRow?: (rowKey: string) => void;
}

/** Компонент тела таблицы. */
export class TableBasicBody extends React.PureComponent<ITableBasicBodyProps> {
    public static displayName = 'TableBasicBody';

    public render(): JSX.Element | null {
        const {columns, data, highlightRowOnHover, onClickRow} = this.props;
        if (data.length === 0) {
            return null;
        }

        const clickEnabled = Boolean(onClickRow);
        const hoverable = clickEnabled || Boolean(highlightRowOnHover);
        const className = classnames({
            'cssClass[clickable]': clickEnabled,
            'cssClass[hoverable]': hoverable,
        });

        const rows = data.map((rowData) => <TableBasicRow columns={columns} data={rowData} onClickRow={onClickRow} key={rowData.rowKey} />);
        return <tbody className={className}>{rows}</tbody>;
    }
}
