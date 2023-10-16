import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/**
 * Свойства компонента.
 */
export interface IHeaderTitleControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Блок с кнопками действий HeaderTitle.
 */
export const HeaderTitleControls: React.FC<IHeaderTitleControlsProps> = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames(className, 'cssClass[globalHeaderTitleControls]')} {...htmlDivAttributes}>
        {children}
    </div>
);

HeaderTitleControls.displayName = 'HeaderTitleControls';
