```jsx
import {ButtonDropdown} from '@sberbusiness/triplex/desktop/components/Button/ButtonDropdown';
import {EButtonSize, EButtonTheme} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';

const [theme, setTheme] = React.useState(EButtonTheme.GENERAL);
const [size, setSize] = React.useState(EButtonSize.MD);
const [block, setBlock] = React.useState(false);
const [disabled, setDisabled] = React.useState(false);

const options = [
    {id: 'buttonDropdownOption1', label: 'Текст строки меню 1', onSelect: () => alert('Выбран пункт меню 1.')},
    {id: 'buttonDropdownOption2', label: 'Текст строки меню 2', onSelect: () => alert('Выбран пункт меню 2.')},
    {id: 'buttonDropdownOption3', label: 'Текст строки меню 3', onSelect: () => alert('Выбран пункт меню 3.')},
    {id: 'buttonDropdownOption4', label: 'Текст строки меню 4', onSelect: () => alert('Выбран пункт меню 4.')},
    {id: 'buttonDropdownOption5', label: 'Текст строки меню 5', onSelect: () => alert('Выбран пункт меню 5.')},
];

React.useEffect(() => {
    if (block && theme === EButtonTheme.DOTS) setBlock(false);
}, [theme]);

const renderControlPanel = () => (
    <ExampleControlPanel>
        <select value={theme} onChange={(event) => setTheme(event.target.value)} data-label="Theme">
            {[EButtonTheme.GENERAL, EButtonTheme.SECONDARY, EButtonTheme.DOTS].map((value, index) => (
                <option key={index}>{value}</option>
            ))}
        </select>
        <select value={size} onChange={(event) => setSize(event.target.value)} data-label="Size">
            {Object.values(EButtonSize).map((value, index) => (
                <option key={index}>{value}</option>
            ))}
        </select>
        <input
            type="checkbox"
            checked={block}
            onChange={(event) => setBlock(event.target.checked)}
            disabled={theme === EButtonTheme.DOTS}
            data-label="Block mode"
        />
        <input type="checkbox" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} data-label="Disabled" />
    </ExampleControlPanel>
);

<>
    {renderControlPanel()}
    <ButtonDropdown theme={theme} size={size} options={options} block={block} disabled={disabled}>
        Button Name
    </ButtonDropdown>
</>
```
