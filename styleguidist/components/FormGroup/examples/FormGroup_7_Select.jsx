import {FormGroup, FormGroupLine} from '@sberbusiness/triplex/components/FormGroup/';
import {
    FormField,
    FormFieldDescription,
    FormFieldLabel,
    FormFieldSelect,
    FormFieldSidebar,
    IFormFieldSelectProps,
} from '@sberbusiness/triplex/components/FormField/';
import {HelpBox} from '@sberbusiness/triplex/components/HelpBox/HelpBox';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';

const [value, setValue] = React.useState();

const options = [
    {value: 'i1', id: 'form-group-option-0-0', label: 'Первый'},
    {value: 'i2', id: 'form-group-option-0-1', label: 'Второй'},
    {value: 'i3', id: 'form-group-option-0-2', label: 'Третий'},
    {value: 'i4', id: 'form-group-option-0-3', label: 'Четвертый'},
    {value: 'i5', id: 'form-group-option-0-4', label: 'Пятый'},
    {value: 'i6', id: 'form-group-option-0-5', label: 'Шестой'},
    {value: 'i7', id: 'form-group-option-0-6', label: 'Седьмой'},
    {value: 'i8', id: 'form-group-option-0-7', label: 'Восьмой'},
    {value: 'i9', id: 'form-group-option-0-8', label: 'Девятый'},
    {value: 'i10', id: 'form-group-option-0-9', label: 'Десятый'},
];

const placeholder = 'Выберите значение';

<FormGroup>
    <FormGroupLine flex>
        <FormField>
            <FormFieldSelect
                value={value}
                options={options}
                mobileTitle="Выберите число"
                onChange={setValue}
            />

            <FormFieldLabel>Label</FormFieldLabel>
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
