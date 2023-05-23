```jsx
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {MailbellPrdIcon32} from '@sberbusiness/icons/MailbellPrdIcon32';
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';

const [theme, setTheme] = React.useState(EButtonTheme.GENERAL);
const [size, setSize] = React.useState(EButtonSize.MD);
const [block, setBlock] = React.useState(false);
const [loading, setLoading] = React.useState(false);
const [disabled, setDisabled] = React.useState(false);
const [expanded, setExpanded] = React.useState(false);

React.useEffect(() => {
    if (theme === EButtonTheme.DOTS || theme === EButtonTheme.LINK) setBlock(false);
    if (theme === EButtonTheme.DOTS || theme === EButtonTheme.LINK) setLoading(false);
    if (theme === EButtonTheme.LINK) setDisabled(false);
    if (theme === EButtonTheme.DANGER || theme === EButtonTheme.LINK) setExpanded(false);
}, [theme]);

const renderControlPanel = () => (
    <ExampleControlPanel>
        <select value={theme} onChange={(event) => setTheme(event.target.value)} data-label="Theme">
            {Object.values(EButtonTheme).map((value, index) => (
                <option key={index}>{value}</option>
            ))}
        </select>
        <select value={size} onChange={(event) => setSize(event.target.value)} disabled={theme === EButtonTheme.TILE} data-label="Size">
            {Object.values(EButtonSize).map((value, index) => (
                <option key={index}>{value}</option>
            ))}
        </select>
        <input
            type="checkbox"
            checked={block}
            onChange={(event) => setBlock(event.target.checked)}
            disabled={theme === EButtonTheme.DOTS || theme === EButtonTheme.LINK}
            data-label="Block mode"
        />
        <input
            type="checkbox"
            checked={loading}
            onChange={(event) => setLoading(event.target.checked)}
            disabled={theme === EButtonTheme.DOTS || theme === EButtonTheme.LINK}
            data-label="Loading"
        />
        <input
            type="checkbox"
            checked={disabled}
            onChange={(event) => setDisabled(event.target.checked)}
            disabled={theme === EButtonTheme.LINK}
            data-label="Disabled"
        />
        <input
            type="checkbox"
            checked={expanded}
            onChange={(event) => setExpanded(event.target.checked)}
            disabled={theme === EButtonTheme.DANGER || theme === EButtonTheme.LINK}
            data-label="Expanded"
        />
    </ExampleControlPanel>
);

const className = expanded ? "hoverable active" : "hoverable";

<>
    {renderControlPanel()}
    <Button className={className} theme={theme} size={size} block={block} loading={loading} disabled={disabled} aria-expanded={expanded}>
        {theme !== EButtonTheme.TILE ? 'Button Name' : <MailbellPrdIcon32 />}
    </Button>
</>
```
