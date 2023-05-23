```jsx
import React, {useState} from 'react';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';
import {Spoiler} from '@sberbusiness/triplex/desktop/components/Spoiler/Spoiler';

const [expanded, setExpanded] = useState(false);

const checkboxOptions = [
    {
        id: 'expanded',
        label: 'Expanded',
        checked: expanded,
        onChange: setExpanded,
    },
];

<>
    <ComponentOptions checkboxOptions={checkboxOptions} />
    <ComponentPreview>
        <Spoiler labelExpand="Развернуть" labelCollapse="Свернуть" expanded={expanded} toggle={setExpanded}>
            Шаблонный текст
        </Spoiler>
    </ComponentPreview>
</>
```