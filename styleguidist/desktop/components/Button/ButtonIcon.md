```jsx
import {EButtonIconShape} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {BillPrdIcon32} from '@sberbusiness/icons/BillPrdIcon32';
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';

const [shape, setShape] = React.useState(EButtonIconShape.SQUIRCLE);
const [active, setActive] = React.useState(false);

const renderControlPanel = () => (
    <ExampleControlPanel>
        <select value={shape} onChange={(event) => setShape(event.target.value)} data-label="Border shape">
            {Object.values(EButtonIconShape).map((value, index) => (
                <option key={index}>{value}</option>
            ))}
        </select>
        <input
            type="checkbox"
            checked={active}
            onChange={(event) => setActive(event.target.checked)}
            data-label="Active"
        />
    </ExampleControlPanel>
);

<>
    {renderControlPanel()}
    <ButtonIcon shape={shape} active={active} title="Название кнопки">
        <BillPrdIcon32 />
    </ButtonIcon>
</>
```