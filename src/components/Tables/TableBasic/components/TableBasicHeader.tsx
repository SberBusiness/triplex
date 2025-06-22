import React from 'react';
import {SortdecreaseSrvxIcon16} from '@sberbusiness/icons/SortdecreaseSrvxIcon16';
import {SortincreaseSrvxIcon16} from '@sberbusiness/icons/SortincreaseSrvxIcon16';
import {SortSrvxIcon16} from '@sberbusiness/icons/SortSrvxIcon16';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {ECellType, EHorizontalAlign, EOrderDirection} from '@sberbusiness/triplex/components/Tables/TableBasic/enums';
import {ISortOrder, ITableBasicColumn} from '@sberbusiness/triplex/components/Tables/TableBasic/types';
import {mapHorizontalAlignToClassName} from '@sberbusiness/triplex/components/Tables/utils';
import {getAriaHTMLAttributes} from '@sberbusiness/triplex/utils/HTML/AriaAttributes';
import {getDataHTMLAttributes} from '@sberbusiness/triplex/utils/HTML/DataAttributes';
import {isNullOrUndefined} from '@sberbusiness/triplex/utils/isNullOrUndefined';
import {MasterTableContext} from '@sberbusiness/triplex/components/Tables/MasterTableContext';

interface ITableBasicHeaderProps {
    /** Структура заголовков таблицы. */
    columns: ITableBasicColumn[];
    /** Обработчик сортировки. */
    onOrderBy?: (order: ISortOrder) => void;
}

/** Компонент заголовка таблицы. */
export class TableBasicHeader extends React.PureComponent<ITableBasicHeaderProps> {
    public static displayName = 'TableBasicHeader';

    static contextType = MasterTableContext;
    declare context: React.ContextType<typeof MasterTableContext>;

    public render(): JSX.Element {
        const {columns, onOrderBy} = this.props;
        const hasOrderFunc = !isNullOrUndefined(onOrderBy);

        const thList = columns.map((c) => this.renderTh(c, hasOrderFunc));

        return (
            <thead>
                <tr>{thList}</tr>
            </thead>
        );
    }

    private renderOrderIcon = (c: ITableBasicColumn) => {
        let icon;
        switch (c.orderDirection) {
            case EOrderDirection.NONE: {
                icon = <SortSrvxIcon16 />;
                break;
            }
            case EOrderDirection.ASC: {
                icon = <SortincreaseSrvxIcon16 />;
                break;
            }
            case EOrderDirection.DESC: {
                icon = <SortdecreaseSrvxIcon16 />;
                break;
            }
        }

        const orderButtonClassName = classnames('cssClass[orderButton]', {
            'cssClass[alignLeft]': c.horizontalAlign === EHorizontalAlign.RIGHT,
            'cssClass[alignRight]': c.horizontalAlign !== EHorizontalAlign.RIGHT,
            'cssClass[sorted]': c.orderDirection !== EOrderDirection.NONE,
        });

        return <span className={orderButtonClassName}>{icon}</span>;
    };

    /** Рендер заголовка таблицы. */
    private renderTh = (c: ITableBasicColumn, hasOrderFunc: boolean) => {
        // Столбец скрыт.
        if (c.hidden) {
            return null;
        }

        const styleTh = c.width ? {maxWidth: c.width, minWidth: c.width, width: c.width} : undefined;
        const orderEnabled = hasOrderFunc && !isNullOrUndefined(c.orderDirection);
        const handleClickOrder = orderEnabled ? () => this.handleClickOrder(c.fieldKey, c.orderDirection!) : undefined;
        const orderIcon = orderEnabled && this.renderOrderIcon(c);
        const classNameTh = mapHorizontalAlignToClassName(c.horizontalAlign);
        const classNameThBlock = classnames('cssClass[thBlock]', 'hoverable', {
            'cssClass[checkboxType]': c.cellType === ECellType.CHECKBOX,
            'cssClass[order]': orderEnabled,
        });

        const content =
            c.horizontalAlign === EHorizontalAlign.RIGHT ? (
                <>
                    {orderIcon}
                    {c.label}
                </>
            ) : (
                <>
                    {c.label}
                    {orderIcon}
                </>
            );

        return (
            <th className={classNameTh} title={c.title} key={c.fieldKey} style={styleTh}>
                <span
                    className={classNameThBlock}
                    onClick={handleClickOrder}
                    {...(Boolean(c.ariaAttributes) && getAriaHTMLAttributes(c.ariaAttributes!))}
                    {...(Boolean(c.dataAttributes) && getDataHTMLAttributes(c.dataAttributes!))}
                >
                    {content}
                </span>
            </th>
        );
    };

    /** Обработчик клика сортировки столбца. */
    private handleClickOrder = (fieldKey: string, currentDirection: EOrderDirection) => {
        const {onOrderBy} = this.props;

        let nextDirection;
        switch (currentDirection) {
            case EOrderDirection.NONE: {
                nextDirection = EOrderDirection.ASC;
                break;
            }
            case EOrderDirection.ASC: {
                nextDirection = EOrderDirection.DESC;
                break;
            }
            case EOrderDirection.DESC: {
                nextDirection = EOrderDirection.NONE;
                break;
            }
        }

        if (onOrderBy) {
            const OrderObj: ISortOrder = {direction: nextDirection, fieldKey};
            onOrderBy(OrderObj);
        }
    };
}
