import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {TableFilterPanelLinks} from '@sberbusiness/triplex/components/Tables/TableFilterPanel/components/TableFilterPanelLinks';

/** Свойства компонента TableFilterPanel. */
export interface ITableFilterPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Состояние загрузки. */
    isLoading?: boolean;
}

/** Внутренние составляющие панели табличных фильтров. */
export interface ITableFilterPanelComposition {
    Links: typeof TableFilterPanelLinks;
}

/** Компонент TableFilterPanel. */
export const TableFilterPanel: React.FC<ITableFilterPanelProps> & ITableFilterPanelComposition = ({
    children,
    className,
    isLoading,
    ...htmlDivAttributes
}): JSX.Element => {
    return (
        <div className={classnames(className, 'cssClass[tableFilterPanel]')} {...htmlDivAttributes}>
            {children}
        </div>
    );
};

TableFilterPanel.Links = TableFilterPanelLinks;
TableFilterPanel.displayName = 'TableFilterPanel';
