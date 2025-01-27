import {HelpBox} from '@sberbusiness/triplex/components/HelpBox/HelpBox';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {FormGroup, FormGroupLine} from '@sberbusiness/triplex/components/FormGroup';
import {
    FormField,
    FormFieldDescription,
    FormFieldLabel,
    FormFieldInput,
    FormFieldSidebar,
    FormFieldPostfix,
    FormFieldPrefix,
    FormFieldClear,
} from '@sberbusiness/triplex/components/FormField/';
import {SearchSrvIcon16} from '@sberbusiness/icons/SearchSrvIcon16';

const [value, setValue] = React.useState('');

<FormGroup>
    <FormGroupLine flex>
        <FormField>
            <FormFieldInput
                value={value}
                placeholder="Введите значение"
                autoComplete="new-password"
                autoCorrect="off"
                onChange={(event) => setValue(event.target.value)}
            />

            <FormFieldLabel>Label</FormFieldLabel>

            <FormFieldPrefix>
                <SearchSrvIcon16 />
            </FormFieldPrefix>

            <FormFieldPostfix>
                <FormFieldClear onClick={() => setValue('')} />
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
