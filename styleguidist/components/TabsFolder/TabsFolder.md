```jsx
const [selectedTabId, setSelectedTabId] = React.useState('tabs-folder-tab-1');

const tabs = [
    {id: 'tabs-folder-tab-0', label: 'Tab Name'},
    {id: 'tabs-folder-tab-1', label: 'Tab Name'},
    {id: 'tabs-folder-tab-2', label: 'Tab Name'},
];

<TabsFolder tabs={tabs} selectedTabId={selectedTabId} onSelectTab={setSelectedTabId} />
```

### Disabled tab

```jsx
const [selectedTabId, setSelectedTabId] = React.useState('tabs-folder-tab-1');

const tabs = [
    {id: 'tabs-folder-tab-0', label: 'Tab Name', disabled: true},
    {id: 'tabs-folder-tab-1', label: 'Tab Name'},
    {id: 'tabs-folder-tab-2', label: 'Tab Name'},
];

<TabsFolder tabs={tabs} selectedTabId={selectedTabId} onSelectTab={setSelectedTabId} />
```

### Tabs overflow

```jsx
const [selectedTabId, setSelectedTabId] = React.useState('tabs-folder-overflow-tab-0');

const tabs = [
    {id: 'tabs-folder-overflow-tab-0', label: 'Tab Name'},
    {id: 'tabs-folder-overflow-tab-1', label: 'Tab Name'},
    {id: 'tabs-folder-overflow-tab-2', label: 'Tab Name'},
    {id: 'tabs-folder-overflow-tab-3', label: 'Tab Name'},
    {id: 'tabs-folder-overflow-tab-4', label: 'Tab Name'},
    {id: 'tabs-folder-overflow-tab-5', label: 'Tab Name'},
    {id: 'tabs-folder-overflow-tab-6', label: 'Tab Name'},
    {id: 'tabs-folder-overflow-tab-7', label: 'Tab Name'},
    {id: 'tabs-folder-overflow-tab-8', label: 'Tab Name'},
    {id: 'tabs-folder-overflow-tab-9', label: 'Tab Name'},
];

<TabsFolder tabs={tabs} selectedTabId={selectedTabId} onSelectTab={setSelectedTabId} />
```