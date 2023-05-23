import * as React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

export interface IHeaderTitleContentSubheadProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Подзаголовок.
 */
export const HeaderTitleContentSubhead: React.FC<IHeaderTitleContentSubheadProps> = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames(className, 'cssClass[headerTitleContentSubhead]')} {...htmlDivAttributes}>
        {children}
    </div>
);

HeaderTitleContentSubhead.displayName = 'HeaderTitleContentSubhead';
