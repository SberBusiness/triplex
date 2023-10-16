import {HeaderTitleContent} from '@sberbusiness/triplex/components/Header/components/HeaderTitle/HeaderTitleContent';
import {HeaderTitleControls} from '@sberbusiness/triplex/components/Header/components/HeaderTitle/HeaderTitleControls';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import React from 'react';

interface IHeaderTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

interface IHeaderTitleFC extends React.FC<IHeaderTitleProps> {
    Content: typeof HeaderTitleContent;
    Controls: typeof HeaderTitleControls;
}

/**
 * Первый уровень Header. Содержит заголовок, подзаголовок и кнопки действий.
 */
export const HeaderTitle: IHeaderTitleFC = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames(className, 'cssClass[globalHeaderTitle]')} {...htmlDivAttributes}>
        {children}
    </div>
);

HeaderTitle.Content = HeaderTitleContent;
HeaderTitle.Controls = HeaderTitleControls;
HeaderTitle.displayName = 'HeaderTitle';
