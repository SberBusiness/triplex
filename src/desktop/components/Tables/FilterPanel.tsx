import * as React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

/**
 * @prop {boolean} [isLoading] Состояние загрузки.
 */
export interface IFilterPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    isLoading?: boolean;
}

/** Компонент панели под элементы фильтрации данных для таблицы. */
export const FilterPanel: React.FC<IFilterPanelProps> = ({children, className, isLoading, ...htmlDivAttributes}) => (
    <div className={classnames(className, 'cssClass[filterPanel]')} {...htmlDivAttributes}>
        {children}
    </div>
);

FilterPanel.displayName = 'FilterPanel';
