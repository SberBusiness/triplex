import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента TableFilterPanelLinks. */
export interface ITableFilterPanelLinksProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

/** Компонент TableFilterPanelLinks. */
export const TableFilterPanelLinks: React.FC<ITableFilterPanelLinksProps> = ({children, className, ...htmlDivAttributes}): JSX.Element => {
    return (
        <div className={classnames(className, 'cssClass[tableFilterPanelLinks]')} {...htmlDivAttributes}>
            {children}
        </div>
    );
};

TableFilterPanelLinks.displayName = 'TableFilterPanelLinks';
