```jsx
import React from 'react';
import {Chip} from '@sberbusiness/triplex/components/Chip';
import {ChipGroup} from '@sberbusiness/triplex/components/ChipGroup/ChipGroup';

<ChipGroup>
    <Chip>Chip name</Chip>
    <Chip>Chip name</Chip>
    <Chip selected>Chip selected</Chip>
    <Chip disabled>Chip disabled</Chip>
    <Chip>Chip name</Chip>
    <Chip>очень длинное название для Chip очень длинное название для Chip</Chip>
    <Chip>Chip name</Chip>
    <Chip>Chip name</Chip>
    <Chip>Chip name</Chip>
</ChipGroup>
```

### One line 

Элементы не переносятся на несколько строк.

```jsx
import React from 'react';
import {Chip} from '@sberbusiness/triplex/components/Chip';
import {ChipGroup} from '@sberbusiness/triplex/components/ChipGroup/ChipGroup';

<ChipGroup oneLine>
    <Chip>Chip name</Chip>
    <Chip>Chip name</Chip>
    <Chip selected>Chip selected</Chip>
    <Chip disabled>Chip disabled</Chip>
    <Chip>Chip name</Chip>
    <Chip>очень длинное название для Chip очень длинное название для Chip</Chip>
    <Chip>Chip name</Chip>
</ChipGroup>
```