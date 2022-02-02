import {TIndentSize} from '@sbbol/web-library/desktop/common/consts/IndentConst';
import * as React from 'react';

/**
 * Свойства компонента Radio.
 * @prop {React.HTMLAttributes<HTMLLabelElement>} [labelAttributes] Объект label-атрибутов.
 */
export interface IRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
    labelAttributes?: React.HTMLAttributes<HTMLLabelElement>;
}

/**
 * Свойства компонента RadioXGroup.
 * @prop {TIndentSize} [indent] Размер отступа в пикселях между элементами.
 */
export interface IRadioXGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    indent?: TIndentSize;
}

/**
 * Свойства компонента RadioYGroup.
 */
export interface IRadioYGroupProps extends React.HTMLAttributes<HTMLDivElement> {}
