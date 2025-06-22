import React, {useState} from 'react';
import {FilterPanel} from '@sberbusiness/triplex/components/Tables/FilterPanel';
import {PaginationBasic} from '@sberbusiness/triplex/components/Tables/PaginationBasic';
import {TableFooter} from '@sberbusiness/triplex/components/Tables/TableFooter/TableFooter';
import {TableBasic} from '@sberbusiness/triplex/components/Tables/TableBasic/TableBasic';
import {TabsLine} from '@sberbusiness/triplex/components/TabsLine/TabsLine';
import {TabsLinePanel} from '@sberbusiness/triplex/components/Tables/TabsLinePanel';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {ITableBasicColumn} from '@sberbusiness/triplex/components/Tables/TableBasic/types';
// Импорт должен быть абсолютный.
import {MasterTableContext} from '@sberbusiness/triplex/components/Tables/MasterTableContext';
import {NoColumns} from '@sberbusiness/triplex/components/Tables/NoColumns';
import {TableBasicSettings} from '@sberbusiness/triplex/components/Tables/TableBasicSettings/TableBasicSettings';

interface IMasterTableProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Состояние загрузки. */
    isLoading?: boolean;
}

interface IMasterTableFC extends React.FC<IMasterTableProps> {
    NoColumns: typeof NoColumns;
    FilterPanel: typeof FilterPanel;
    TabsLine: typeof TabsLine;
    TabsLinePanel: typeof TabsLinePanel;
    TableBasic: typeof TableBasic;
    TableBasicSettings: typeof TableBasicSettings;
    TableFooter: typeof TableFooter;
    Pagination: typeof PaginationBasic;
}

export const MasterTable: IMasterTableFC = ({children, className, isLoading = false, ...htmlDivAttributes}) => {
    const [columns, setColumns] = useState<ITableBasicColumn[]>([]);

    return (
        <MasterTableContext.Provider
            value={{
                columns,
                isLoading,
                setColumns,
            }}
        >
            <div
                className={classnames('cssClass[masterTable]', className)}
                {...htmlDivAttributes}
                data-tx={process.env.npm_package_version}
            >
                {children}
            </div>
        </MasterTableContext.Provider>
    );
};

MasterTable.displayName = 'MasterTable';
MasterTable.NoColumns = NoColumns;
MasterTable.FilterPanel = FilterPanel;
MasterTable.TabsLine = TabsLine;
MasterTable.TabsLinePanel = TabsLinePanel;
MasterTable.TableBasic = TableBasic;
MasterTable.TableBasicSettings = TableBasicSettings;
MasterTable.TableFooter = TableFooter;
MasterTable.Pagination = PaginationBasic;
