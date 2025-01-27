import React from 'react';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {ETextSize, ELineType} from '@sberbusiness/triplex/components/Typography/enums';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента OrderedListItem. */
export interface IOrderedListItem extends React.LiHTMLAttributes<HTMLLIElement> {}

/** Элемент нумерованного списка. */
export const OrderedListItem = React.forwardRef<HTMLLIElement, IOrderedListItem>(({className, ...rest}, ref) => (
    <Text
        className={classnames('cssClass[orderedListItem]', className)}
        size={ETextSize.B1}
        line={ELineType.EXTRA}
        tag="li"
        {...rest}
        data-tx={process.env.npm_package_version}
        ref={ref}
    />
));

OrderedListItem.displayName = 'OrderedListItem';
