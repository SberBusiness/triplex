import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {ChipGroup, IChipGroupProps} from '@sberbusiness/triplex/components/ChipGroup/ChipGroup';

/** Обертка над Chips, добавляющая горизонтальные отступы контейнеру. */
export const ListMasterChipGroup = React.forwardRef<HTMLDivElement, IChipGroupProps>(({children, className, ...rest}, ref) => (
    <ChipGroup className={classnames('cssClass[listMasterChipGroup]', className)} oneLine {...rest} ref={ref}>
        {children}
    </ChipGroup>
));

ListMasterChipGroup.displayName = 'ListMasterChips';
