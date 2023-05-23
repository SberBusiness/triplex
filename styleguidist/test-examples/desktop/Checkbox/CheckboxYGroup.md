```jsx noeditor
import React from 'react';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';
import {CheckboxYGroup} from '@sberbusiness/triplex/desktop/components/Checkbox/CheckboxYGroup';
import {Checkbox} from '@sberbusiness/triplex/desktop/components/Checkbox/Checkbox';

<ComponentPreview>
    <CheckboxYGroup>
        {[1, 2, 3].map((value, index) => (
            <Checkbox key={index} value={value}>
                Sample Text
            </Checkbox>
        ))}
    </CheckboxYGroup>
</ComponentPreview>
```
