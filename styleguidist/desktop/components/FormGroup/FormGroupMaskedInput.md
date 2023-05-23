```jsx
import {FormGroup, FormGroupLine} from '@sberbusiness/triplex/desktop/components/FormGroup/';
import {
    FormField,
    FormFieldDescription,
    FormFieldLabel,
    FormFieldInput,
    FormFieldSidebar,
    FormFieldPostfix,
    FormFieldPrefix,
    FormFieldClear,
} from '@sberbusiness/triplex/desktop/components/FormField/';
import {TickStsIcon16} from '@sberbusiness/icons/TickStsIcon16';
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';
import {MaskedInput} from '@sberbusiness/triplex/desktop/components/MaskedInput/MaskedInput';

const [disabled, setDisabled] = React.useState(false);
const [error, setError] = React.useState(false);
const [successIcon, setSuccessIcon] = React.useState(false);
const [value, setValue] = React.useState('');
const ref = React.useRef(null);

React.useEffect(() => {
    console.log('FormGroup MaskedInput ref - ', ref.current);
}, []);

const renderControlPanel = () => (
    <ExampleControlPanel>
        <input
            type="checkbox"
            checked={error}
            onChange={(event) => setError(event.target.checked)}
            data-label="Error"
        />
        <input
            type="checkbox"
            checked={disabled}
            onChange={(event) => setDisabled(event.target.checked)}
            data-label="Disabled"
        />
        <input
            type="checkbox"
            checked={successIcon}
            onChange={(event) => setSuccessIcon(event.target.checked)}
            data-label="Success icon"
        />
    </ExampleControlPanel>
);

<>
    {renderControlPanel()}

    <FormGroup>
        <FormGroupLine flex>
            <FormField>
                <FormFieldInput
                    ref={ref}
                    disabled={disabled}
                    error={error}
                    onChange={(event) => setValue(event.target.value)}
                    value={value}
                    render={(props, ref) => (
                        <MaskedInput
                            forwardRef={ref}
                            {...props}
                            mask={MaskedInput.presets.masks.phone}
                        />
                    )}
                />

                <FormFieldLabel>Телефон</FormFieldLabel>

                <FormFieldPostfix>
                    <FormFieldClear onClick={() => setValue('')}/>
                    {successIcon ? <TickStsIcon16/> : null}
                </FormFieldPostfix>
            </FormField>

            <FormFieldSidebar/>
        </FormGroupLine>

        <FormGroupLine>
            <FormFieldDescription error={error}>Description может быть длинным.</FormFieldDescription>
        </FormGroupLine>
    </FormGroup>
</>
```