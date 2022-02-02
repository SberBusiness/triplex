```jsx
import React, {useState, useEffect} from 'react';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import {ExampleBackground, ExampleBackgroundColor} from '../../../desktop/components/common/ExampleBackground/ExampleBackground';
import {Tabs} from '@sbbol/web-library/desktop/components/Tabs/Tabs';

const [tabs, setTabs] = useState([]);
const [count, setCount] = useState(3);
const [selectedTabId, setSelectedTabId] = useState('1');

useEffect(() => {
    setTabs(
        Array(+count)
            .fill()
            .map((value, index) => ({id: `${index}`, label: `Tab Name`}))
    );
}, [count]);

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
    <ComponentOptions hidden inputOptions={inputOptions} />
    <ExampleBackground background={ExampleBackgroundColor['asphalt-05']}>
        <ComponentPreview>
            <Tabs tabs={tabs} selectedTabId={selectedTabId} onSelectTab={(id) => setSelectedTabId(id)} />
        </ComponentPreview>
    </ExampleBackground>
</>
```
