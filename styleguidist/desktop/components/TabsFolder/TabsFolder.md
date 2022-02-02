```jsx
import React, {useState} from 'react';

const [selectedTabId, setSelectedTabId] = useState('0');

const tabs = Array(16).fill().map((value, index) => ({id: `${index++}`, label: `Tab Name`, disabled: !(index % 4)}));

<TabsFolder tabs={tabs} selectedTabId={selectedTabId} onSelectTab={setSelectedTabId} />
```

### С кастомной иконкой нотификации.

```jsx
import React, {useState} from 'react';
import './style.less';

const [selectedTabId, setSelectedTabId] = useState('0');

const tabCustom = <span className="with-notification">Tab Name</span>;

const tabs = Array(16).fill().map((value, index) => ({id: `${index++}`, label: index % 4 ? `Tab Name` : tabCustom}));

<TabsFolder className="tabs-folder" tabs={tabs} selectedTabId={selectedTabId} onSelectTab={setSelectedTabId} />
```
