import React from 'react';
import {MaskedInput, IMaskedInputProps, IIMaskedInputFC} from '@sberbusiness/triplex/components/MaskedInput/MaskedInput';
import {presets} from '@sberbusiness/triplex/components/MaskedInput/presets';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента DropdownMobileMaskedInput. */
export interface IDropdownMobileMaskedInputProps extends IMaskedInputProps {}

/** Сущность компонента DropdownMobileMaskedInput.  */
export interface IDropdownMobileMaskedInputFC extends IIMaskedInputFC {}

/** Маскированное поле ввода мобильной версии Dropdown. */
export const DropdownMobileMaskedInput: IDropdownMobileMaskedInputFC = ({className, ...rest}) => (
    <MaskedInput className={classnames('cssClass[dropdownMobileMaskedInput]', className)} {...rest} />
);

DropdownMobileMaskedInput.presets = presets;
