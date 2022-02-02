```jsx noeditor
import React, {useState} from 'react';
import {MultiselectExample} from './MultiselectExample';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';

const [topOrientation, setTopOrientation] = useState(false);
const [disabled, setDisabled] = useState(false);
const [error, setError] = useState(false);
const [loading, setLoading] = useState(false);
const [hasSearchInput, setHasSearchInput] = useState(true);

const checkboxOptions = [
    {
        id: 'Multiselect-openToTop',
        label: 'Dropup',
        checked: topOrientation,
        onChange: setTopOrientation,
    }, {
        id: 'Multiselect-disabled',
        label: 'Disabled',
        checked: disabled,
        onChange: setDisabled,
    }, {
        id: 'Multiselect-error',
        label: 'Error',
        checked: error,
        onChange: setError,
    }, {
        id: 'Multiselect-loading',
        label: 'Loading',
        checked: loading,
        onChange: setLoading,
    }, {
        id: 'Multiselect-hasSearchInput',
        label: 'С полем поиска',
        checked: hasSearchInput,
        onChange: setHasSearchInput,
    }
];

<>
    <ComponentOptions checkboxOptions={checkboxOptions}/>
    <ComponentPreview>
        <MultiselectExample
            error={error}
            disabled={disabled}
            loading={loading}
            topOrientation={topOrientation}
            hasSearchInput={hasSearchInput}
        />
    </ComponentPreview>
</>
```
### collapsed
```html { "file": "./MultiselectExample.tsx" }
```
