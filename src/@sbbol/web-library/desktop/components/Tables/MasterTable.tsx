import {FilterPanel} from '@sbbol/web-library/desktop/components/Tables/FilterPanel';
import {PaginationBasic} from '@sbbol/web-library/desktop/components/Tables/PaginationBasic';
import {TableFooter} from '@sbbol/web-library/desktop/components/Tables/TableFooter/TableFooter';
import {TableBasic} from '@sbbol/web-library/desktop/components/Tables/TableBasic/TableBasic';
import {TableFilter} from '@sbbol/web-library/desktop/components/Tables/TableFilter';
import {TableFilterPanel} from '@sbbol/web-library/desktop/components/Tables/TableFilterPanel';
import * as React from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

/**
 * @prop {boolean} [isLoading] Состояние загрузки.
 */
interface IMasterTableProps extends React.HTMLAttributes<HTMLDivElement> {
    isLoading?: boolean;
}

export class MasterTable extends React.PureComponent<IMasterTableProps> {
    public static displayName = 'MasterTable';

    public static FilterPanel = FilterPanel;
    public static TableFilter = TableFilter;
    public static TableFilterPanel = TableFilterPanel;
    public static TableBasic = TableBasic;
    public static TableFooter = TableFooter;
    public static Pagination = PaginationBasic;

    public render(): React.ReactNode {
        const {children, className, isLoading, ...htmlDivAttributes} = this.props;

        const newChildren = React.Children.map(children, (child) => child && React.cloneElement(child as React.ReactElement, {isLoading}));

        return (
            <div className={classnames(className, 'cssClass[masterTable]')} {...htmlDivAttributes}>
                {newChildren}
            </div>
        );
    }
}
