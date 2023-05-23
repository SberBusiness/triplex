```jsx
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';

const [value, setValue] = React.useState('');
const [disabled, setDisabled] = React.useState(false);
const [error, setError] = React.useState(false);

const maxLength = 19;
const fractionLength = 2;
const currency = 'RUB';

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
    <AmountInput
        value={value}
        onChange={setValue}
        disabled={disabled}
        error={error}
        maxLength={maxLength}
        fractionLength={fractionLength}
        currency={currency}
    />
</>
 ```