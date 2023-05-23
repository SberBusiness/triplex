```jsx noeditor
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';
import {MultiselectExample} from './MultiselectExample';

const [hasSearchInput, setHasSearchInput] = React.useState(true);
const [loading, setLoading] = React.useState(false);
const [error, setError] = React.useState(false);
const [disabled, setDisabled] = React.useState(false);

const renderControlPanel = () => (
    <ExampleControlPanel>
        <input type="checkbox" checked={hasSearchInput} onChange={(event) => setHasSearchInput(event.target.checked)} data-label="With search input" />
        <input type="checkbox" checked={loading} onChange={(event) => setLoading(event.target.checked)} data-label="Loading" />
        <input type="checkbox" checked={error} onChange={(event) => setError(event.target.checked)} data-label="Error" />
        <input type="checkbox" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} data-label="Disabled" />
    </ExampleControlPanel>
);

<>
    {renderControlPanel()}
    <MultiselectExample hasSearchInput={hasSearchInput} loading={loading} error={error} disabled={disabled} />
</>

```
### collapsed
```html { "file": "./MultiselectExample.tsx" }
```
