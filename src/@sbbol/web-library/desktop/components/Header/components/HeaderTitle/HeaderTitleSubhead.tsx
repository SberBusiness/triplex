import * as React from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

/**
 * Свойства компонента.
 */
export interface IHeaderTitleSubheadProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Подзаголовок.
 */
export const HeaderTitleSubhead: React.FC<IHeaderTitleSubheadProps> = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames(className, 'cssClass[headerTitleSubhead]')} {...htmlDivAttributes}>
        {children}
    </div>
);

HeaderTitleSubhead.displayName = 'HeaderTitleSubhead';
