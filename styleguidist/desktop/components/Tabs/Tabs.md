```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency 
    componentTitle="Tabs"
    isMobileComponent={false} 
/>
```

```jsx
import {ExampleBackground, ExampleBackgroundColor} from '../common/ExampleBackground/ExampleBackground';
import {Tabs} from '@sberbusiness/triplex/desktop/components/Tabs/Tabs';

const [selectedTabId, setSelectedTabId] = React.useState('3');
const tabTitle = 'Tab Name';

const tabs = Array(12).fill().map((item, index) => ({id: String(index), label: `${tabTitle} ${index + 1}`}));

<ExampleBackground background={ExampleBackgroundColor.LIGHT}>
    <Tabs tabs={tabs} selectedTabId={selectedTabId} onSelectTab={(id) => {setSelectedTabId(id);}} />
</ExampleBackground>
```
