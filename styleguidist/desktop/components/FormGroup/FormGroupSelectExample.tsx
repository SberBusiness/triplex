import React from 'react';
import {FormGroup, FormGroupLine} from '@sberbusiness/triplex/desktop/components/FormGroup/';
import {
    FormField,
    FormFieldDescription,
    FormFieldLabel,
    FormFieldSelect,
    FormFieldSidebar,
    IFormFieldSelectProps,
} from '@sberbusiness/triplex/desktop/components/FormField/';
import {HelpBox} from '@sberbusiness/triplex/desktop/components/HelpBox/HelpBox';
import {ETooltipSize} from '@sberbusiness/triplex/desktop/components/Tooltip/enums';

export const FormGroupSelectExample: React.FC<IFormFieldSelectProps> = ({error, ...props}) => {
    return (
        <FormGroup>
            <FormGroupLine flex>
                <FormField>
                    <FormFieldSelect error={error} {...props} />

                    <FormFieldLabel>Label</FormFieldLabel>
                </FormField>

                <FormFieldSidebar>
                    <HelpBox tooltipSize={ETooltipSize.SM}>
                        <div>Текст подсказки.</div>
                    </HelpBox>
                </FormFieldSidebar>
            </FormGroupLine>

            <FormGroupLine>
                <FormFieldDescription error={error}>Description может быть длинным.</FormFieldDescription>
            </FormGroupLine>
        </FormGroup>
    );
};
