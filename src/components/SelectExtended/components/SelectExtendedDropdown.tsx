import React from 'react';
import {Dropdown, IDropdownProps} from '@sberbusiness/triplex/components/Dropdown/Dropdown';
import {DropdownList} from '@sberbusiness/triplex/components/Dropdown/desktop/DropdownList';

/** Свойства SelectExtendedDropdown. */
export interface ISelectExtendedDropdownProps extends Omit<IDropdownProps, 'forwardedRef'> {
    /** Ссылка на контейнер Dropdown. */
    forwardedRef: React.RefObject<HTMLDivElement>;
}

export interface ISelectExtendedDropdownFC extends React.FC<ISelectExtendedDropdownProps> {
    List: typeof DropdownList;
}

export const SelectExtendedDropdown: ISelectExtendedDropdownFC = ({forwardedRef, ...rest}) => <Dropdown {...rest} ref={forwardedRef} />;

SelectExtendedDropdown.List = DropdownList;
