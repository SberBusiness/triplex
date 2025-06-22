import React from 'react';
import {HeaderTitleContent} from '@sberbusiness/triplex/components/Header/components/HeaderTitle/HeaderTitleContent';
import {HeaderTitleControls} from '@sberbusiness/triplex/components/Header/components/HeaderTitle/HeaderTitleControls';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента HeaderTitle. */
export interface IHeaderTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Первый уровень Header. Содержит заголовок, подзаголовок и кнопки действий. */
export const HeaderTitle = Object.assign(
    React.forwardRef<HTMLDivElement, IHeaderTitleProps>(function HeaderTitle({children, className, ...rest}, ref) {
        return (
            <div className={classnames('cssClass[globalHeaderTitle]', className)} {...rest} ref={ref}>
                {children}
            </div>
        );
    }),
    {
        Content: HeaderTitleContent,
        Controls: HeaderTitleControls,
    }
);

HeaderTitle.displayName = 'HeaderTitle';
