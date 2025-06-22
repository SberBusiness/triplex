import React from 'react';
import {ITableBasicColumn} from '@sberbusiness/triplex/components/Tables/TableBasic/types';

/** Свойства контекста MasterTableContext. */
export interface IMasterTableContextContext {
    /** Структура заголовков таблицы. */
    columns: ITableBasicColumn[];
    /** Состояние загрузки. */
    isLoading: boolean;
    setColumns: (columns: ITableBasicColumn[]) => void;
}

/** Контекст компонента MasterTableContext. */
export const MasterTableContext = React.createContext<IMasterTableContextContext>({
    columns: [],
    isLoading: false,
    setColumns: () => {},
});
