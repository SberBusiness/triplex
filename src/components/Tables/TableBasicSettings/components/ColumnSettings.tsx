import React, {useContext} from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
// Импорт должен быть абсолютный.
import {MasterTableContext} from '@sberbusiness/triplex/components/Tables/MasterTableContext';
import {ITableBasicColumn} from '@sberbusiness/triplex/components/Tables/TableBasic/types';

export interface IColumnSettingsProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode | (({columns}: {columns: ITableBasicColumn[]}) => React.ReactNode);
}

/** Компонент, для настройки видимости колонок. */
export const ColumnSettings: React.FC<IColumnSettingsProps> = ({children, className, ...htmlDivAttributes}) => {
    const {columns} = useContext(MasterTableContext);

    return (
        <div className={classnames('cssClass[columnSettings]', className)} {...htmlDivAttributes}>
            {typeof children === 'function' ? children({columns}) : children}
        </div>
    );
};

ColumnSettings.displayName = 'ColumnSettings';
