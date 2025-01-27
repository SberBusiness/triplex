import React from 'react';
import {OrderedListItem} from '@sberbusiness/triplex/components/OrderedList/OrderedListItem';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента OrderedList. */
export interface IOrderedListProps extends React.OlHTMLAttributes<HTMLOListElement> {}

/** Нумерованный список. */
export const OrderedList = Object.assign(
    React.forwardRef<HTMLOListElement, IOrderedListProps>(function OrderedList({className, ...rest}, ref) {
        return (
            <ol className={classnames('cssClass[orderedList]', className)} {...rest} data-tx={process.env.npm_package_version} ref={ref} />
        );
    }),
    {
        Item: OrderedListItem,
    }
);

OrderedList.displayName = 'OrderedList';
