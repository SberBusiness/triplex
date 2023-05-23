import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import * as React from 'react';

/** Свойства компонента TableFilterPanelLinks. */
export interface ITableFilterPanelLinksProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Компонент TableFilterPanelLinks. */
export const TableFilterPanelLinks: React.FC<ITableFilterPanelLinksProps> = ({children, className, ...htmlDivAttributes}): JSX.Element => {
    return (
        <div className={classnames(className, 'cssClass[tableFilterPanelLinks]')} {...htmlDivAttributes}>
            {children}
        </div>
    );
};

TableFilterPanelLinks.displayName = 'TableFilterPanelLinks';
