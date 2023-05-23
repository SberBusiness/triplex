import React from 'react';

/** Свойства компонента Radio. */
export interface IRadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    /** Объект label-атрибутов. */
    labelAttributes?: React.LabelHTMLAttributes<HTMLLabelElement>;
}
