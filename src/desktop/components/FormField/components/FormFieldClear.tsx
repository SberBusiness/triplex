import React, {useContext} from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {ClosenotificationSrvxIcon16} from '@sberbusiness/icons/ClosenotificationSrvxIcon16';
import {FormFieldContext} from '../FormFieldContext';

export interface IFormFieldClearProps extends React.HTMLAttributes<HTMLSpanElement> {}

/** Кнопка очищения введенного значения. */
export const FormFieldClear = React.forwardRef<HTMLSpanElement, IFormFieldClearProps>(
    ({children, className, onClick, ...htmlLabelAttributes}, ref) => {
        const {disabled, focused, hovered, id, valueExist} = useContext(FormFieldContext);

        const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
            // Установка фокуса в поле ввода при очищении значения.
            const input = document.querySelector<HTMLInputElement>(`#${id}`);
            if (input) {
                input.focus();
            }

            onClick?.(event);
        };

        const classNames = classnames(
            'cssClass[formFieldClear]',
            'hoverable',
            {
                'cssClass[shown]': valueExist && !disabled && (focused || hovered),
            },
            className
        );

        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <span className={classNames} ref={ref} onClick={handleClick} {...htmlLabelAttributes}>
                <ClosenotificationSrvxIcon16 />
            </span>
        );
    }
);

FormFieldClear.displayName = 'FormFieldClear';
