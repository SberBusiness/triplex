import React from 'react';
import {FormGroup} from '@sberbusiness/triplex/desktop/components/FormGroup/FormGroup';
import {FormField} from '@sberbusiness/triplex/desktop/components/FormField/FormField';
import {FormFieldLabel} from '@sberbusiness/triplex/desktop/components/FormField/components/FormFieldLabel';
import {FormFieldPostfix} from '@sberbusiness/triplex/desktop/components/FormField/components/FormFieldPostfix';
import {HelpBox} from '@sberbusiness/triplex/desktop/components/HelpBox/HelpBox';
import {ETooltipSize} from '@sberbusiness/triplex/desktop/components/Tooltip/enums';
import {FormFieldClear} from '@sberbusiness/triplex/desktop/components/FormField/components/FormFieldClear';
import {FormGroupLine} from '@sberbusiness/triplex/desktop/components/FormGroup/components/FormGroupLine';
import {FormFieldDescription} from '@sberbusiness/triplex/desktop/components/FormField/components/FormFieldDescription';
import {FormFieldSidebar} from '@sberbusiness/triplex/desktop/components/FormField/components/FormFieldSidebar';
import {FormFieldTextarea} from '@sberbusiness/triplex/desktop/components/FormField/components/FormFieldTextarea';

interface IFormGroupTextAreaProps {
    disabled?: boolean;
    error?: boolean;
    onChange: (value: string) => void;
    value: string;
}

export const FormGroupTextArea: React.FC<IFormGroupTextAreaProps> = ({error, disabled, onChange, value}) => {
    return (
        <FormGroup>
            <FormGroupLine flex>
                <FormField>
                    <FormFieldTextarea
                        disabled={disabled}
                        error={error}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
                        placeholder="Введите значение"
                        value={value}
                    />

                    <FormFieldLabel>Label</FormFieldLabel>

                    <FormFieldPostfix>
                        <FormFieldClear onClick={() => onChange('')} />
                    </FormFieldPostfix>
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
