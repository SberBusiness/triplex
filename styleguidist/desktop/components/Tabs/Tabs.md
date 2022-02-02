```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency 
    componentTitle="Tabs"
    isMobileComponent={false} 
/>
```

```jsx
import {ExampleBackground, ExampleBackgroundColor} from '../common/ExampleBackground/ExampleBackground';
import {Tabs} from '@sbbol/web-library/desktop/components/Tabs/Tabs';

const [selectedTabId, setSelectedTabId] = React.useState('3');
const tabTitle = 'Tab Name';

const tabs = [
    {id: '1', label: tabTitle},
    {id: '2', label: tabTitle},
    {id: '3', label: tabTitle},
    {id: '4', label: tabTitle},
    {id: '5', label: tabTitle},
    {id: '6', label: tabTitle},
    {id: '7', label: tabTitle},
    {id: '8', label: tabTitle},
    {id: '9', label: tabTitle},
    {id: '10', label: tabTitle},
    {id: '11', label: tabTitle},
    {id: '12', label: tabTitle},
];

<>
    <ExampleBackground background={ExampleBackgroundColor['asphalt-05']}>
        <Tabs tabs={tabs} selectedTabId={selectedTabId} onSelectTab={(id) => {setSelectedTabId(id);}} />
    </ExampleBackground>
</>
```
