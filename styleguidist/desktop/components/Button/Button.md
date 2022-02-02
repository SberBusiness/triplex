```jsx
import React, {useState, useEffect} from 'react';
import {EButtonTheme, EButtonSize} from '@sbbol/web-library/desktop/components/Button/enums';

const [theme, setTheme] = useState(EButtonTheme.GENERAL);
const [size, setSize] = useState(EButtonSize.MD);
const [block, setBlock] = useState(false);
const [loading, setLoading] = useState(false);
const [disabled, setDisabled] = useState(false);

useEffect(() => {
    if (theme === EButtonTheme.DANGER) {
        setSize(EButtonSize.MD);
    } else if (theme === EButtonTheme.LINK) {
        setBlock(false);
        setLoading(false);
        setDisabled(false);
    }
}, [theme]);

const renderCheckbox = (label, checked, handler, disabled) => (
    <label style={{display: 'inline-flex'}}>
        <input
            type="checkbox"
            checked={checked}
            onChange={(event) => handler(event.target.checked)}
            disabled={disabled}
            style={{margin: 'auto 4px auto 0'}}
        />
        {label}
    </label>
);

const renderSelect = (label, value, handler, options, disabled) => (
    <label style={{display: 'inline-flex'}}>
        {label}
        <select value={value} onChange={(event) => handler(event.target.value)} disabled={disabled} style={{marginLeft: '4px'}}>
            {options.map((value, index) => (
                <option key={index} value={value}>
                    {value}
                </option>
            ))}
        </select>
    </label>
);

const renderControls = () => (
    <div style={{display: 'flex', flexDirection: 'column', marginBottom: '16px'}}>
        {renderSelect('Theme', theme, setTheme, [EButtonTheme.GENERAL, EButtonTheme.SECONDARY, EButtonTheme.DANGER, EButtonTheme.LINK])}
        {renderSelect('Size', size, setSize, Object.values(EButtonSize), theme === EButtonTheme.DANGER)}
        {renderCheckbox('Block mode', block, setBlock, theme === EButtonTheme.LINK)}
        {renderCheckbox('Loading', loading, setLoading, theme === EButtonTheme.LINK)}
        {renderCheckbox('Disabled', disabled, setDisabled, theme === EButtonTheme.LINK)}
    </div>
);

<>
    {renderControls()}
    <Button theme={theme} size={size} block={block} loading={loading} disabled={disabled}>
        Button Name
    </Button>
</>
```
