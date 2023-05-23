import React from 'react';
import {EInputGroupPosition} from '@sberbusiness/triplex/desktop/components/InputGroup/InputGroup';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {ISelectBaseOption, ISelectBaseProps, SelectBase} from '@sberbusiness/triplex/desktop/components/SelectBase/SelectBase';

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
 * Если требуется кастомизация options или другой формат value - создайте CustomSelect на основе SelectExtended.
 */
export const Select: React.FC<ISelectProps> = ({className, groupPosition, ...selectBaseProps}) => {
    const targetClassName = classnames('cssClass[selectTarget]', groupPosition && mapInputGroupPositionToCSSClass[groupPosition]);
    const selectClassName = classnames('cssClass[select]', {'cssClass[grouped]': !!groupPosition}, className);

    return (
        <SelectBase
            className={selectClassName}
            targetClassName={targetClassName}
            dropdownListItemClassName="cssClass[selectDropdownListItem]"
            {...selectBaseProps}
        />
    );
};
