import {FilterPanel} from '@sberbusiness/triplex/components/Tables/FilterPanel';
import {PaginationBasic} from '@sberbusiness/triplex/components/Tables/PaginationBasic';
import {TableFooter} from '@sberbusiness/triplex/components/Tables/TableFooter/TableFooter';
import {TableBasic} from '@sberbusiness/triplex/components/Tables/TableBasic/TableBasic';
import {TabsLine} from '@sberbusiness/triplex/components/TabsLine/TabsLine';
import {TabsLinePanel} from '@sberbusiness/triplex/components/Tables/TabsLinePanel';
import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {isComponentType, isReactElement} from '../../utils/reactChild';

/**
 * @prop {boolean} [isLoading] Состояние загрузки.
 */
interface IMasterTableProps extends React.HTMLAttributes<HTMLDivElement> {
    isLoading?: boolean;
}

export class MasterTable extends React.PureComponent<IMasterTableProps> {
    public static displayName = 'MasterTable';

    public static FilterPanel = FilterPanel;
    public static TabsLine = TabsLine;
    public static TabsLinePanel = TabsLinePanel;
    public static TableBasic = TableBasic;
    public static TableFooter = TableFooter;
    public static Pagination = PaginationBasic;

    public render(): React.ReactNode {
        const {children, className, isLoading, ...htmlDivAttributes} = this.props;

        const newChildren = React.Children.map(children, (child) => {
            if (child) {
                let nextLoading = isLoading;
                if (!isLoading && isReactElement(child) && isComponentType(child.type)) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
                    nextLoading = child.props.isLoading;
                }
                return React.cloneElement(child as React.ReactElement, {
                    isLoading: nextLoading,
                });
            }
        });

        return (
            <div
                className={classnames(className, 'cssClass[masterTable]')}
                {...htmlDivAttributes}
                data-tx={process.env.npm_package_version}
            >
                {newChildren}
            </div>
        );
    }
}
