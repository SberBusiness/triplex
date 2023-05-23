import React from 'react';
import {Dropdown, IDropdownProps} from '@sberbusiness/triplex/desktop/components/Dropdown/Dropdown';
import {DropdownList} from '@sberbusiness/triplex/desktop/components/Dropdown/components/DropdownList';

/** Свойства SelectExtendedDropdown. */
export interface ISelectExtendedDropdownProps extends Omit<IDropdownProps, 'forwardedRef'> {
    /** Ссылка на контейнер Dropdown. */
    forwardedRef: React.RefObject<HTMLDivElement>;
}

export interface ISelectExtendedDropdownFC extends React.FC<ISelectExtendedDropdownProps> {
    List: typeof DropdownList;
}

export const SelectExtendedDropdown: ISelectExtendedDropdownFC = (props) => <Dropdown {...props} />;

SelectExtendedDropdown.List = DropdownList;
