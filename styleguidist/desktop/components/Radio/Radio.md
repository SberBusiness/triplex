```jsx
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';

const [disabled, setDisabled] = React.useState(false);

const renderControlPanel = () => (
    <ExampleControlPanel>
        <input type="checkbox" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} data-label="Disabled" />
    </ExampleControlPanel>
);

<>
    {renderControlPanel()}
    <Radio disabled={disabled}>Шаблонный текст</Radio>
</>
```
