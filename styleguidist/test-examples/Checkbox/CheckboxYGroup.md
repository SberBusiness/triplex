```jsx noeditor
import React from 'react';
import ComponentPreview from '../../common/components/ComponentPreview/ComponentPreview';
import {CheckboxYGroup} from '@sberbusiness/triplex/components/Checkbox/CheckboxYGroup';
import {Checkbox} from '@sberbusiness/triplex/components/Checkbox/Checkbox';

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
