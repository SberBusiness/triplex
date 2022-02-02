```jsx
import {HelpBox} from '@sbbol/web-library/desktop/components/HelpBox/HelpBox';

<HelpBox>
    <div>HelpBox - element as child</div>
</HelpBox>
```

### HelpBox Controlled

```jsx
import {useState} from 'react';
import {HelpBox} from '@sbbol/web-library/desktop/components/HelpBox/HelpBox';

const [isOpen, setIsOpen] = useState(false);
const handleChange = (event) => setIsOpen(event.target.checked);

const renderCheckbox = (label, checked, handler) => (
    <label style={{display: 'inline-flex'}}>
        <input type="checkbox" checked={checked} onChange={(event) => handler(event.target.checked)} style={{margin: 'auto 4px auto 0'}} />
        {label}
    </label>
);

const renderControls = () => (
    <div>
        {renderCheckbox('isOpen', isOpen, setIsOpen)}
    </div>
);

<>
    <HelpBox isOpen={isOpen} toggle={setIsOpen}>
        Test Controlled HelpBox
    </HelpBox>
    {renderControls()}
</>
```
