import {FormGroup} from '@sberbusiness/triplex/components/FormGroup/FormGroup';
import {FormField} from '@sberbusiness/triplex/components/FormField/FormField';
import {FormFieldLabel} from '@sberbusiness/triplex/components/FormField/components/FormFieldLabel';
import {FormFieldPostfix} from '@sberbusiness/triplex/components/FormField/components/FormFieldPostfix';
import {HelpBox} from '@sberbusiness/triplex/components/HelpBox/HelpBox';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {FormFieldClear} from '@sberbusiness/triplex/components/FormField/components/FormFieldClear';
import {FormGroupLine} from '@sberbusiness/triplex/components/FormGroup/components/FormGroupLine';
import {FormFieldDescription} from '@sberbusiness/triplex/components/FormField/components/FormFieldDescription';
import {FormFieldSidebar} from '@sberbusiness/triplex/components/FormField/components/FormFieldSidebar';
import {FormFieldTextarea} from '@sberbusiness/triplex/components/FormField/components/FormFieldTextarea';

const [value, setValue] = React.useState('');

<FormGroup>
    <FormGroupLine flex>
        <FormField>
            <FormFieldTextarea
                value={value}
                placeholder="Введите значение"
                onChange={(event) => setValue(event.target.value)}
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
        <FormFieldDescription>Description может быть длинным.</FormFieldDescription>
    </FormGroupLine>
</FormGroup>;
