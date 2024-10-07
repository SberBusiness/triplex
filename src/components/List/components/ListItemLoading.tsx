import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {SpinnerWidget} from '@sberbusiness/triplex/components/SpinnerWidget/SpinnerWidget';
import {ESpinnerSize} from '@sberbusiness/triplex/components/Spinner/enum';

/** Свойства компонента ListItemLoading. */
export interface IListItemLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: never;
}

/**
 * Спиннер для элемента списка.
 * Используется, как последний элемент при подгрузке новых данных.
 * */
export const ListItemLoading = React.forwardRef<HTMLDivElement, IListItemLoadingProps>(({children, className, ...rest}, ref) => (
    <div className={classnames('cssClass[listItemLoading]', className)} {...rest} ref={ref}>
        <SpinnerWidget size={ESpinnerSize.SM} />
    </div>
));

ListItemLoading.displayName = 'ListItemLoading';
