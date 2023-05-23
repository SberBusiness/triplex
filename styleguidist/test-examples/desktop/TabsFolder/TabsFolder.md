```jsx noeditor
import React, {useState, useEffect} from 'react';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import {TabsFolder} from '@sberbusiness/triplex/desktop/components/TabsFolder/TabsFolder';

const [tabs, setTabs] = useState([]);
const [count, setCount] = useState(3);
const [selectedTabId, setSelectedTabId] = useState('1');
const [disabled, setDisabled] = useState(false);

useEffect(() => {
    setTabs(
        Array(+count)
            .fill()
            .map((value, index) => ({id: `${index}`, label: `Tab Name`, disabled: disabled}))
    );
}, [count, disabled]);

const checkboxOptions = [
    {
        id: 'disabled',
        label: 'Disabled',
        checked: disabled,
        onChange: setDisabled,
    },
];

const inputOptions = [
    {
        id: 'count',
        hidden: true,
        onChange: setCount,
        value: count,
    },
    {
        id: 'selectedTabId',
        hidden: true,
        onChange: setSelectedTabId,
        value: selectedTabId,
    },
];

<>
    <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions} />
    <ComponentPreview>
        <TabsFolder tabs={tabs} selectedTabId={selectedTabId} onSelectTab={(id) => setSelectedTabId(id)} />
    </ComponentPreview>
</>
```
