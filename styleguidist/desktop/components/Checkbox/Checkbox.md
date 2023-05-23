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
    <Checkbox disabled={disabled} id="checkbox-base">Шаблонный текст</Checkbox>
</>
```
