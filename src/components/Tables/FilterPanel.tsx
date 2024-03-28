import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента FilterPanel. */
export interface IFilterPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Состояние загрузки. */
    isLoading?: boolean;
}

/** Компонент панели под элементы фильтрации данных для таблицы. */
export const FilterPanel: React.FC<IFilterPanelProps> = ({children, className, isLoading, ...htmlDivAttributes}) => (
    <div className={classnames(className, 'cssClass[filterPanel]')} {...htmlDivAttributes}>
        {children}
    </div>
);

FilterPanel.displayName = 'FilterPanel';
