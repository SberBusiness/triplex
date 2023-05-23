```jsx
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';
import {HelpBox} from '@sberbusiness/triplex/desktop/components/HelpBox/HelpBox';
import {ETooltipSize} from '@sberbusiness/triplex/desktop/components/Tooltip/enums';
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
import {SearchSrvIcon16} from '@sberbusiness/icons/SearchSrvIcon16';
import {TickStsIcon16} from '@sberbusiness/icons/TickStsIcon16';

const [autocompleteDisable, setAutocompleteDisable] = React.useState(false);
const [disabled, setDisabled] = React.useState(false);
const [error, setError] = React.useState(false);
const [successIcon, setSuccessIcon] = React.useState(false);
const [value, setValue] = React.useState('');

const renderControlPanel = () => (
    <ExampleControlPanel>
        <input
            type="checkbox"
            checked={autocompleteDisable}
            onChange={(event) => setAutocompleteDisable(event.target.checked)}
            data-label="Autocomplete disable"
        />
        <input type="checkbox"
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
            data-label="SuccessIcon"
        />
    </ExampleControlPanel>
);

<>
    {renderControlPanel()}

    <FormGroup>
        <FormGroupLine flex>
            <FormField>
                <FormFieldInput
                    autoComplete={autocompleteDisable ? 'new-password' : undefined}
                    autoCorrect={autocompleteDisable ? 'off' : undefined}
                    disabled={disabled}
                    error={error}
                    onChange={(event) => setValue(event.target.value)}
                    placeholder="Введите значение"
                    value={value}
                />

                <FormFieldLabel>Label</FormFieldLabel>

                <FormFieldPrefix>
                    <SearchSrvIcon16 />
                </FormFieldPrefix>

                <FormFieldPostfix>
                    <FormFieldClear onClick={() => setValue('')}/>
                    {successIcon ? <TickStsIcon16/> : null}
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
</>
```
