```jsx
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';

const [value, setValue] = React.useState('');
const [disabled, setDisabled] = React.useState(false);
const [error, setError] = React.useState(false);

const renderControlPanel = () => (
    <ExampleControlPanel>
        <input
            type="checkbox"
            checked={disabled}
            onChange={(event) => setDisabled(event.target.checked)}
            data-label="Disabled"
        />
        <input
            type="checkbox"
            checked={error}
            onChange={(event) => setError(event.target.checked)}
            data-label="Error"
        />
    </ExampleControlPanel>
);

<>
    {renderControlPanel()}  
    <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Введите значение"
        disabled={disabled}
        error={error}
    />
</>
```