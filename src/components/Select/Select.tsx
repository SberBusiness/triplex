import React from 'react';
import {EInputGroupPosition} from '@sberbusiness/triplex/components/InputGroup/InputGroup';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {ISelectBaseOption, ISelectBaseProps, SelectBase} from '@sberbusiness/triplex/components/SelectBase/SelectBase';

/** Свойства опции списка. */
export interface ISelectOption extends ISelectBaseOption {}

/** Свойства компонента Select.*/
export interface ISelectProps extends ISelectBaseProps {
    /** Позиция внутри компонента InputGroup. */
    groupPosition?: EInputGroupPosition;
}

const mapInputGroupPositionToCSSClass = {
    [EInputGroupPosition.LEFT]: 'cssClass[left]',
    [EInputGroupPosition.INTERMEDIATE]: 'cssClass[intermediate]',
    [EInputGroupPosition.RIGHT]: 'cssClass[right]',
};

/**
 * Компонент Select.
 * В качестве value и options принимает объекты типа ISelectOption.
 * Если требуется кастомизация options или другой формат value – создайте свой на основе SelectExtended.
 */
export const Select: React.FC<ISelectProps> = ({className, groupPosition, targetProps, ...selectBaseProps}) => {
    const targetClassName = classnames(
        'cssClass[selectTarget]',
        targetProps?.className,
        groupPosition && mapInputGroupPositionToCSSClass[groupPosition]
    );
    const selectClassName = classnames('cssClass[select]', {'cssClass[grouped]': !!groupPosition}, className);

    return (
        <SelectBase
            className={selectClassName}
            targetProps={{
                ...targetProps,
                className: targetClassName,
            }}
            dropdownListItemClassName="cssClass[selectDropdownListItem]"
            {...selectBaseProps}
        />
    );
};
