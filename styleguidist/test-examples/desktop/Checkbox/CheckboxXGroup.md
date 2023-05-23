```jsx noeditor
import React from 'react';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';
import {CheckboxXGroup} from '@sberbusiness/triplex/desktop/components/Checkbox/CheckboxXGroup';
import {Checkbox} from '@sberbusiness/triplex/desktop/components/Checkbox/Checkbox';

<ComponentPreview>
    <CheckboxXGroup indent={12}>
        {[1, 2, 3].map((value, index) => (
            <Checkbox key={index} value={value}>
                Sample Text
            </Checkbox>
        ))}
    </CheckboxXGroup>
</ComponentPreview>
```
