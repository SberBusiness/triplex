import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {ETextSize, ELineType} from '@sberbusiness/triplex/components/Typography/enums';

/** Свойства компонента UnorderedList. */
export interface IUnorderedListProps extends React.HTMLAttributes<HTMLUListElement> {
    children?: never;
    /** Пункты для несортированного списка. */
    values: React.ReactNode[];
}

/** Маркированный список. */
export const UnorderedList = React.forwardRef<HTMLUListElement, IUnorderedListProps>(({className, values, ...rest}, ref) => (
    <ul className={classnames('cssClass[unorderedList]', className)} {...rest} data-tx={process.env.npm_package_version} ref={ref}>
        {values.map((value, index) => (
            <Text key={index} className="cssClass[unorderedListItem]" size={ETextSize.B1} line={ELineType.EXTRA} tag="li">
                {value}
            </Text>
        ))}
    </ul>
));

UnorderedList.displayName = 'UnorderedList';
