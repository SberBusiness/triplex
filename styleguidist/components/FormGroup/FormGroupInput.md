```jsx
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
</FormGroup>
```

### Disabled state

```jsx
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
                onChange={(event) => setValue(event.target.value)}
                disabled
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
</FormGroup>
```

### Error state

```jsx
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
                onChange={(event) => setValue(event.target.value)}
                error
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
        <FormFieldDescription error>Description может быть длинным.</FormFieldDescription>
    </FormGroupLine>
</FormGroup>
```

### With success icon

```jsx
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
import {TickStsIcon16} from '@sberbusiness/icons/TickStsIcon16';

const [value, setValue] = React.useState('');

<FormGroup>
    <FormGroupLine flex>
        <FormField>
            <FormFieldInput
                value={value}
                placeholder="Введите значение"
                onChange={(event) => setValue(event.target.value)}
            />

            <FormFieldLabel>Label</FormFieldLabel>

            <FormFieldPrefix>
                <SearchSrvIcon16 />
            </FormFieldPrefix>

            <FormFieldPostfix>
                <FormFieldClear onClick={() => setValue('')} />
                <TickStsIcon16 />
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
</FormGroup>
```

### Without autocomplete

```jsx
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
</FormGroup>
```

### Render MaskedInput

```jsx
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
                    <MaskedInput
                        forwardRef={ref}
                        {...props}
                        mask={MaskedInput.presets.masks.phone}
                    />
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
</FormGroup>
```