import {TIndentSize} from '@sbbol/web-library/desktop/common/consts/IndentConst';
import * as React from 'react';

/**
 * Свойства компонента Checkbox.
 * @prop {boolean} [bulk] Признак частичного типа выбора.
 * @prop {React.HTMLAttributes<HTMLLabelElement>} [labelAttributes] Объект label-атрибутов.
 */
export interface ICheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    bulk?: boolean;
    labelAttributes?: React.HTMLAttributes<HTMLLabelElement>;
}

/**
 * Свойства компонента CheckboxXGroup.
 */
export interface ICheckboxXGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    indent?: TIndentSize;
}

/**
 * Свойства компонента CheckboxYGroup.
 */
export interface ICheckboxYGroupProps extends React.HTMLAttributes<HTMLDivElement> {}
