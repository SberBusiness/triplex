```jsx
import React, {useState} from 'react';
import {ChipIcon} from '@sberbusiness/triplex/components/Chip';
import {ListsortingoffSrvxIcon24} from '@sberbusiness/icons/ListsortingoffSrvxIcon24';
import {ListsortingonSrvxIcon24} from '@sberbusiness/icons/ListsortingonSrvxIcon24';

const [selected, setSelected] = useState(false);

<ChipIcon selected={selected} onClick={() => setSelected(!selected)}>
    {selected ? <ListsortingonSrvxIcon24 /> : <ListsortingoffSrvxIcon24 />}
</ChipIcon>
```

### Disabled state


```jsx
import React from 'react';
import {ChipIcon} from '@sberbusiness/triplex/components/Chip';
import {ListsortingSrvxIcon24} from '@sberbusiness/icons/ListsortingSrvxIcon24';

<ChipIcon disabled>
    <ListsortingSrvxIcon24 />
</ChipIcon>
```