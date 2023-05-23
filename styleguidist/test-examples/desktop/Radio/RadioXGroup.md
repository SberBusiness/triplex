```jsx noeditor
import React from 'react';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';
import {RadioXGroup} from '@sberbusiness/triplex/desktop/components/Radio/RadioXGroup';
import {Radio} from '@sberbusiness/triplex/desktop/components/Radio/Radio';

<ComponentPreview>
    <RadioXGroup indent={12}>
        {[1, 2, 3].map((value, index) => (
            <Radio key={index} value={value}>
                Sample Text
            </Radio>
        ))}
    </RadioXGroup>
</ComponentPreview>
```
