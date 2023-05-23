import {Spinner} from '@sberbusiness/triplex/desktop/components/Spinner/Spinner';
import {SpinnerWidget} from '@sberbusiness/triplex/desktop/components/SpinnerWidget/SpinnerWidget';
import {TableBasicBody} from '@sberbusiness/triplex/desktop/components/Tables/TableBasic/components/TableBasicBody';
import {TableBasicHeader} from '@sberbusiness/triplex/desktop/components/Tables/TableBasic/components/TableBasicHeader';
import {ISortOrder, ITableBasicColumn, ITableBasicRow} from '@sberbusiness/triplex/desktop/components/Tables/TableBasic/types';
import * as React from 'react';

interface ITableBasicProps extends React.HTMLAttributes<HTMLTableElement> {
    /** Структура заголовков таблицы. */
    columns: ITableBasicColumn[];
    /** Массив значений для вывода в таблице, если пустой - выводится сообщение. */
    data: ITableBasicRow[];
    /** Функция рендера при отсутствии данных в таблице. */
    renderNoData: () => JSX.Element;
    /** Состояние загрузки. */
    isLoading?: boolean;
    /** Подсветка строк при наведении мышки. */
    highlightRowOnHover?: boolean;
    /** Текст под спиннером. */
    loadingTitle?: string;
    /** Обработчик сортировки. */
    onOrderBy?: (order: ISortOrder) => void;
    /** Функция обработки клика по строке таблицы. */
    onClickRow?: (rowKey: string) => void;
    /** Скрытие шапки. */
    headless?: boolean;
}

/** Компонент обычной таблицы. */
export class TableBasic extends React.PureComponent<ITableBasicProps> {
    public static displayName = 'TableBasic';

    public render(): JSX.Element {
        const {data} = this.props;
        const isEmptyData = data.length === 0;

        return (
            <div className="cssClass[tableBasic]">
                {this.renderTable()}
                {this.renderFooter(isEmptyData)}
            </div>
        );
    }

    private renderTable = () => {
        const {
            columns,
            data,
            highlightRowOnHover,
            loadingTitle,
            onOrderBy,
            onClickRow,
            renderNoData,
            isLoading,
            headless,
            ...htmlTableAttributes
        } = this.props;

        return (
            <table key="table" {...htmlTableAttributes}>
                {headless || <TableBasicHeader columns={columns} onOrderBy={onOrderBy} />}
                <TableBasicBody columns={columns} data={data} onClickRow={onClickRow} highlightRowOnHover={highlightRowOnHover} />
            </table>
        );
    };

    private renderFooter = (isEmptyData: boolean) => {
        const {isLoading, loadingTitle, renderNoData} = this.props;

        if (isLoading && isEmptyData) {
            return this.renderFooterEmptyData(this.renderNoDataLoading());
        } else if (!isLoading && isEmptyData) {
            return this.renderFooterEmptyData(renderNoData());
        } else if (isLoading && !isEmptyData) {
            return this.renderSpinnerWrapper(<SpinnerWidget>{loadingTitle}</SpinnerWidget>);
        } else {
            return null;
        }
    };

    private renderSpinnerWrapper = (content: JSX.Element) => <div className="cssClass[spinnerWrapper]">{content}</div>;
    private renderFooterEmptyData = (content: JSX.Element | JSX.Element[]) => <div className="cssClass[footerEmptyData]">{content}</div>;
    private renderNoDataLoading = () => [
        <div className="cssClass[overlayCover]" key="overlay" />,
        <Spinner key="spinner">{this.props.loadingTitle}</Spinner>,
    ];
}
