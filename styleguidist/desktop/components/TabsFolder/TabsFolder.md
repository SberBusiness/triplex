```jsx
const [selectedTabId, setSelectedTabId] = React.useState('tabs-folder-tab-0');

const tabs = [
    {
        id: 'tabs-folder-tab-0',
        label: 'Tab Name',
    },
    {
        id: 'tabs-folder-tab-1',
        label: 'Tab Name',
        disabled: true,
    },
    {
        id: 'tabs-folder-tab-2',
        label: 'Tab Name',
    },
];

<TabsFolder tabs={tabs} selectedTabId={selectedTabId} onSelectTab={setSelectedTabId} />
```

### With many tabs (overflow)

```jsx
const [selectedTabId, setSelectedTabId] = React.useState('tabs-folder-tab-overflow-0');

const tabs = Array(12).fill().map((value, index) => ({id: `tabs-folder-tab-overflow-${index}`, label: `Tab Name`}));

<TabsFolder tabs={tabs} selectedTabId={selectedTabId} onSelectTab={setSelectedTabId} />
```