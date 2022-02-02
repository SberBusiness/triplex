import * as React from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

/**
 * Свойства компонента.
 */
export interface IHeaderTitleContentControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Блок с кнопками действий HeaderTitle.
 */
export const HeaderTitleContentControls: React.FC<IHeaderTitleContentControlsProps> = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames(className, 'cssClass[headerTitleContentControls]')} {...htmlDivAttributes}>
        {children}
    </div>
);

HeaderTitleContentControls.displayName = 'HeaderTitleContentControls';
