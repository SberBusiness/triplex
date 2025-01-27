```jsx
import React, {useState, useEffect} from 'react';
import {Tabs} from '@sberbusiness/triplex/components/Tabs/Tabs';
import ComponentPreview from '../../common/components/ComponentPreview/ComponentPreview';
import ComponentOptions from '../../common/components/ComponentOptions/ComponentOptions';
import {
    ExampleBackground,
    ExampleBackgroundColor
} from '../../common/components/ExampleBackground/ExampleBackground';

const [tabs, setTabs] = useState([]);
const [count, setCount] = useState(3);
const [selectedTabId, setSelectedTabId] = useState('tabs-button-screenshot-1');
const [focused, setFocused] = useState(false);

useEffect(() => {
    setTabs(
        Array(+count)
            .fill()
            .map((value, index) => ({id: `tabs-button-screenshot-${index}`, label: `Tab Name`}))
    );
}, [count]);

useEffect(() => {
    if (focused) {
        document.querySelector("#tabs-button-screenshot-1 button").focus()
    }
}, [focused]);

const checkboxOptions = [
    {
        id: 'focused',
        label: 'Focused',
        checked: focused,
        onChange: setFocused,
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
    <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions} hidden/>
    <ExampleBackground background={ExampleBackgroundColor.LIGHT}>
        <ComponentPreview>
            <Tabs tabs={tabs} selectedTabId={selectedTabId} onSelectTab={(id) => setSelectedTabId(id)}/>
        </ComponentPreview>
    </ExampleBackground>
</>
```
