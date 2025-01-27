```jsx
import React from 'react';
import {OrderedList} from '@sberbusiness/triplex/components/OrderedList/OrderedList';

<OrderedList>
    <OrderedList.Item>Первый элемент списка;</OrderedList.Item>
    <OrderedList.Item>Второй элемент списка;</OrderedList.Item>
    <OrderedList.Item>Третий элемент списка.</OrderedList.Item>
</OrderedList>
```

### Nested UnorderedList

```jsx
import React from 'react';
import {OrderedList} from '@sberbusiness/triplex/components/OrderedList/OrderedList';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {UnorderedList} from '@sberbusiness/triplex/components/UnorderedList/UnorderedList';

<div style={{width: 243}}>
    <OrderedList>
        <OrderedList.Item>
            Первый элемент списка;
            <Gap size={8} />
            <UnorderedList
                values={[
                    'Первый элемент списка;',
                    'Второй длинный элемент списка;',
                    'Третий очень длинный элемент списка в несколько строк.',
                ]}
            />
        </OrderedList.Item>
        <OrderedList.Item>Второй элемент списка.</OrderedList.Item>
    </OrderedList>
</div>
```