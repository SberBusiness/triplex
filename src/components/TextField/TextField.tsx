import React from 'react';
import {
    FormField,
    FormFieldDescription,
    FormFieldLabel,
    FormFieldInput,
    FormFieldSidebar,
    FormFieldPostfix,
    FormFieldClear,
    IFormFieldInputProps,
    IFormFieldClearProps,
} from '@sberbusiness/triplex/components/FormField/';
import {FormGroup, FormGroupLine} from '@sberbusiness/triplex/components/FormGroup/';
import {TickStsIcon16} from '@sberbusiness/icons/TickStsIcon16';
import {HelpBox, IHelpBoxProps} from '@sberbusiness/triplex/components/HelpBox/HelpBox';

export interface ITextFieldProps extends Pick<IFormFieldInputProps, 'className' | 'disabled' | 'error' | 'onChange' | 'type' | 'value'> {
    /** Описание поля ввода. */
    description: React.ReactNode;
    /** Свойства кнопки очищения значения. Если свойства не переданы, кнопка не отображается т.к. нет обработчика действия. */
    clearButtonProps?: IFormFieldClearProps;
    /** Свойства HelpBox. */
    helpBoxProps?: IHelpBoxProps;
    /** Свойства поля ввода. */
    inputProps: IFormFieldInputProps;
    /** Лейбл поля ввода. */
    label?: React.ReactNode;
    /** Отображение зеленой галочки. */
    success?: boolean;
}

/** Компонент текстового ввода.
 *  Является более компактным вариантом отображения инпутов, чем FormGroup.
 * */
export const TextField: React.FC<ITextFieldProps> = ({clearButtonProps, description, inputProps, helpBoxProps, label, success}) => (
    <FormGroup>
        <FormGroupLine flex>
            <FormField>
                <FormFieldInput {...inputProps} />

                {label ? <FormFieldLabel>{label}</FormFieldLabel> : null}

                <FormFieldPostfix>
                    {clearButtonProps ? <FormFieldClear {...clearButtonProps} /> : null}
                    {success ? <TickStsIcon16 /> : null}
                </FormFieldPostfix>
            </FormField>

            <FormFieldSidebar>{helpBoxProps ? <HelpBox {...helpBoxProps} /> : null}</FormFieldSidebar>
        </FormGroupLine>

        {description ? (
            <FormGroupLine>
                <FormFieldDescription error={inputProps.error}>{description}</FormFieldDescription>
            </FormGroupLine>
        ) : null}
    </FormGroup>
);

TextField.displayName = 'TextField';
