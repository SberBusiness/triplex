```jsx
import React from 'react';
import {List, ListItem} from '@sberbusiness/triplex/components/List';

<List>
    <ListItem>Элемент списка</ListItem>
    <ListItem>Элемент списка</ListItem>
    <ListItem>Элемент списка</ListItem>
</List>
```

### Loading state

Используется при обновлении текущего списка новыми данными, например, после применения фильтра.

```jsx
import React from 'react';
import {List, ListItem} from '@sberbusiness/triplex/components/List';

<List loading>
    <ListItem>Элемент списка</ListItem>
    <ListItem>Элемент списка</ListItem>
    <ListItem>Элемент списка</ListItem>
</List>
```


### Empty state

Используется при применении фильтров, когда не найден ни один элемент.

```jsx
import React from 'react';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {ListEmptyState} from '@sberbusiness/triplex/components/List';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {ETextSize, ELineType} from '@sberbusiness/triplex/components/Typography/enums';

<ListEmptyState>
    <Text size={ETextSize.B1} line={ELineType.EXTRA}>
        Ничего не найдено.<br />
        Попробуйте выбрать другие фильтры.
    </Text>
    
    <Gap size={24} />
    
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>Button Name</Button>
    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.SM}>Button Name</Button>
</ListEmptyState>
```

### Virtualized

```jsx
import React, {useMemo} from 'react';
import {FixedSizeList} from 'react-window';
import {List, ListItem} from '@sberbusiness/triplex/components/List';

const itemData = useMemo(() => Array.from({length: 100}).map((_, index) => `List item ${index}`), []);

<FixedSizeList
    itemData={itemData}
    itemCount={100}
    itemSize={20}
    width="100%"
    height={200}
    innerElementType={List}
>
    {({data, index, style}) => <ListItem style={style}>{data[index]}</ListItem>}
</FixedSizeList>
```