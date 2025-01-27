import {FormGroup, FormGroupLine} from '@sberbusiness/triplex/components/FormGroup/';
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
import {MaskedInput} from '@sberbusiness/triplex/components/MaskedInput/MaskedInput';

const [value, setValue] = React.useState('');
const ref = React.useRef(null);

<FormGroup>
    <FormGroupLine flex>
        <FormField>
            <FormFieldInput
                value={value}
                render={(props, ref) => (
                    <MaskedInput forwardedRef={ref} {...props} mask={MaskedInput.presets.masks.phone} />
                )}
                onChange={(event) => setValue(event.target.value)}
                ref={ref}
            />

            <FormFieldLabel>Телефон</FormFieldLabel>

            <FormFieldPostfix>
                <FormFieldClear onClick={() => setValue('')} />
            </FormFieldPostfix>
        </FormField>

        <FormFieldSidebar />
    </FormGroupLine>

    <FormGroupLine>
        <FormFieldDescription>Description может быть длинным.</FormFieldDescription>
    </FormGroupLine>
</FormGroup>;
