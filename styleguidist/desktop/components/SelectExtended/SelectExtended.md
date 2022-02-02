```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency 
    componentTitle="Select"
    isMobileComponent={false} 
/>
```

```jsx
import React, {useState} from 'react';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import {SelectExtendedExample} from './SelectExtendedExample';

const [topOrientation, setTopOrientation] = useState(false);
const [disabled, setDisabled] = useState(false);
const [error, setError] = useState(false);
const [loading, setLoading] = useState(false);

const checkboxOptions = [
    {
        id: 'open_to_top',
        label: 'Dropdown to top',
        checked: topOrientation,
        onChange: setTopOrientation,
    }, {
        id: 'disabled',
        label: 'Disabled',
        checked: disabled,
        onChange: setDisabled,
    }, {
        id: 'error',
        label: 'Error',
        checked: error,
        onChange: setError,
    }, {
        id: 'loading',
        label: 'Loading',
        checked: loading,
        onChange: setLoading,
    }
];

<>
    <ComponentOptions checkboxOptions={checkboxOptions}/>
    <ComponentPreview>
        <SelectExtendedExample
            error={error}
            disabled={disabled}
            loading={loading}
            topOrientation={topOrientation}
        />
    </ComponentPreview>
</>
````

### collapsed

```html { "file": "./SelectExtendedExample.tsx" }
```