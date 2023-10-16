```jsx
import {ESpinnerSize} from '@sberbusiness/triplex/components/Spinner/enum';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

const [size, setSize] = React.useState(ESpinnerSize.MD);
const [text, setText] = React.useState('');

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Select
            value={size}
            setValue={setSize}
            options={Object.values(ESpinnerSize)}
        >
            Spinner size
        </ComponentControlPanel.Select>
        <ComponentControlPanel.Text value={text} setValue={setText}>
            Spinner text
        </ComponentControlPanel.Text>
    </ComponentControlPanel>
);

<>
    {renderControlPanel()}
    <Spinner size={size}>{text}</Spinner>
</>;
```
