```jsx
import React, {useState} from 'react';
import {ChipOptions} from '@sberbusiness/triplex/components/Chip';

const [selectedFiltersCount, setSelectedFiltersCount] = useState(0);

<ChipOptions
    selected={selectedFiltersCount !== 0}
    onClick={() => setSelectedFiltersCount(selectedFiltersCount + 1)}
    clearSelected={() => setSelectedFiltersCount(0)}
>
    {selectedFiltersCount === 0 ? undefined : selectedFiltersCount}
</ChipOptions>
```
