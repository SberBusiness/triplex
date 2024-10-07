```jsx
import React, {useState} from 'react';
import {Chip} from '@sberbusiness/triplex/components/Chip';

const [selected, setSelected] = useState(false);

<Chip selected={selected} onClick={() => setSelected(!selected)}>Chip name</Chip>
```

### Disabled state

```jsx
import React from 'react';
import {Chip} from '@sberbusiness/triplex/components/Chip';

<Chip disabled>Chip name</Chip>
```

### With long title

```jsx
import React, {useState} from 'react';
import {Chip} from '@sberbusiness/triplex/components/Chip';

const [selected, setSelected] = useState(false);

<Chip selected={selected} onClick={() => setSelected(!selected)}>очень длинное название для Chip очень длинное название для Chip</Chip>
```

### With prefix icon

```jsx
import React, {useState} from 'react';
import {Chip} from '@sberbusiness/triplex/components/Chip';
import {ListsortingoffSrvxIcon24} from '@sberbusiness/icons/ListsortingoffSrvxIcon24';
import {ListsortingonSrvxIcon24} from '@sberbusiness/icons/ListsortingonSrvxIcon24';

const [selected, setSelected] = useState(false);

<Chip prefix={selected ? <ListsortingonSrvxIcon24 /> : <ListsortingoffSrvxIcon24 />} selected={selected} onClick={() => setSelected(!selected)}>Chip name</Chip>
```

### With postfix icon

```jsx
import React, {useState} from 'react';
import {Chip} from '@sberbusiness/triplex/components/Chip';
import {ListsortingoffSrvxIcon24} from '@sberbusiness/icons/ListsortingoffSrvxIcon24';
import {ListsortingonSrvxIcon24} from '@sberbusiness/icons/ListsortingonSrvxIcon24';

const [selected, setSelected] = useState(false);

<Chip postfix={selected ? <ListsortingonSrvxIcon24 /> : <ListsortingoffSrvxIcon24 />} selected={selected} onClick={() => setSelected(!selected)}>Chip name</Chip>
```
