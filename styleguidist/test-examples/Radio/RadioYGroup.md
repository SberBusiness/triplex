```jsx noeditor
import React from 'react';
import ComponentPreview from '../../common/components/ComponentPreview/ComponentPreview';
import {RadioYGroup} from '@sberbusiness/triplex/components/Radio/RadioYGroup';
import {Radio} from '@sberbusiness/triplex/components/Radio/Radio';

<ComponentPreview>
    <RadioYGroup>
        {[1, 2, 3].map((value, index) => (
            <Radio key={index} value={value}>
                Sample Text
            </Radio>
        ))}
    </RadioYGroup>
</ComponentPreview>
```
