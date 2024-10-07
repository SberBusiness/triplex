```jsx
import React, {useState} from 'react';
import {TextField} from '@sberbusiness/triplex/components/TextField/TextField';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';

const [value, setValue] = useState('');

<TextField
    clearButtonProps={{onClick: () => setValue('')}}
    description="Description может быть длинным."
    helpBoxProps={{
        children: 'Текст подсказки',
        tooltipSize: ETooltipSize.SM,
    }}
    inputProps={{
        value,
        placeholder: 'Введите значение',
        onChange: (event) => setValue(event.target.value),
    }}
    label={<span data-test-id="text-field-label">Label</span>}
/>
```

### Without HelpBox

```jsx
import React, {useState} from 'react';
import {TextField} from '@sberbusiness/triplex/components/TextField/TextField';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';

const [value, setValue] = useState('');

<TextField
    clearButtonProps={{onClick: () => setValue('')}}
    description="Description может быть длинным."
    inputProps={{
      value,
      placeholder: 'Введите значение',
      onChange: (event) => setValue(event.target.value),
    }}
    label={<span data-test-id="text-field-label">Label</span>}
/>
```

### Without HelpBox shrink view

```jsx
import React, {useState} from 'react';
import {TextField} from '@sberbusiness/triplex/components/TextField/TextField';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';

const [value, setValue] = useState('');

<TextField
    clearButtonProps={{onClick: () => setValue('')}}
    description="Description может быть длинным."
    inputProps={{
      value,
      placeholder: 'Введите значение',
      onChange: (event) => setValue(event.target.value),
    }}
    label={<span data-test-id="text-field-label">Label</span>}
    shrink
/>
```

### Success status

```jsx
import React, {useState} from 'react';
import {TextField} from '@sberbusiness/triplex/components/TextField/TextField';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';

const [value, setValue] = useState('');

<TextField
    clearButtonProps={{onClick: () => setValue('')}}
    description="Description может быть длинным."
    helpBoxProps={{
        children: 'Текст подсказки',
        tooltipSize: ETooltipSize.SM,
    }}
    inputProps={{
        value,
        placeholder: 'Введите значение',
        onChange: (event) => setValue(event.target.value),
    }}
    label={<span data-test-id="text-field-label">Label</span>}
    success={true}
/>
```

### Disabled state

```jsx
import React, {useState} from 'react';
import {TextField} from '@sberbusiness/triplex/components/TextField/TextField';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';

const [value, setValue] = useState('');

<TextField
    clearButtonProps={{onClick: () => setValue('')}}
    description="Description может быть длинным."
    helpBoxProps={{
        children: 'Текст подсказки',
        tooltipSize: ETooltipSize.SM,
    }}
    inputProps={{
        value,
        placeholder: 'Введите значение',
        disabled: true,
        onChange: (event) => setValue(event.target.value),
    }}
    label={<span data-test-id="text-field-label">Label</span>}
/>
```

### Error state

```jsx
import React, {useState} from 'react';
import {TextField} from '@sberbusiness/triplex/components/TextField/TextField';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';

const [value, setValue] = useState('');

<TextField
    clearButtonProps={{onClick: () => setValue('')}}
    description="Description может быть длинным."
    helpBoxProps={{
        children: 'Текст подсказки',
        tooltipSize: ETooltipSize.SM,
    }}
    inputProps={{
        value,
        placeholder: 'Введите значение',
        error: true,
        onChange: (event) => setValue(event.target.value),
    }}
    label={<span data-test-id="text-field-label">Label</span>}
/>
```

### MaskedInput usage

```jsx
import React, {useState} from 'react';
import {TextField} from '@sberbusiness/triplex/components/TextField/TextField';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {MaskedInput} from '@sberbusiness/triplex/components/MaskedInput/MaskedInput';

const [value, setValue] = useState('');

<TextField
    clearButtonProps={{onClick: () => setValue('')}}
    description="Description может быть длинным."
    helpBoxProps={{
        children: 'Текст подсказки',
        tooltipSize: ETooltipSize.SM,
    }}
    inputProps={{
        render: (props, ref) => (
            <MaskedInput {...props} mask={MaskedInput.presets.masks.phone}/>
        ),
        value,
        onChange: (event) => setValue(event.target.value),
    }}
    label="Phone"
/>
```
