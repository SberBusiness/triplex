```jsx
import React, {useState, useEffect} from 'react';
import {EButtonTheme, EButtonSize} from '@sbbol/web-library/desktop/components/Button/enums';

const [theme, setTheme] = useState(EButtonTheme.GENERAL);
const [size, setSize] = useState(EButtonSize.MD);
const [block, setBlock] = useState(false);
const [dropup, setDropup] = useState(false);
const [disabled, setDisabled] = useState(false);

const options = [
    {id: 'buttonDropdownOption1', label: 'Текст строки меню', onSelect: () => alert()},
    {id: 'buttonDropdownOption2', label: 'Текст строки меню', onSelect: () => alert()},
    {id: 'buttonDropdownOption3', label: 'Текст строки меню', onSelect: () => alert()},
    {id: 'buttonDropdownOption4', label: 'Текст строки меню', onSelect: () => alert()},
    {id: 'buttonDropdownOption5', label: 'Текст строки меню', onSelect: () => alert()},
];

useEffect(() => {
    if (theme === EButtonTheme.DOTS && block) {
        setBlock(false);
    }
}, [theme]);

const renderCheckbox = (label, checked, handler, disabled) => (
    <label style={{display: 'inline-flex'}}>
        <input
            type="checkbox"
            checked={checked}
            onChange={(event) => handler(event.target.checked)}
            disabled={!!disabled}
            style={{margin: 'auto 4px auto 0'}}
        />
        {label}
    </label>
);

const renderSelect = (label, value, handler, options) => (
    <label style={{display: 'inline-flex'}}>
        {label}
        <select value={value} onChange={(event) => handler(event.target.value)} style={{marginLeft: '4px'}}>
            {options.map((value, index) => (
                <option key={`buttonDropdownSelect${label}${index}`} value={value}>
                    {value}
                </option>
            ))}
        </select>
    </label>
);

const renderControls = () => (
    <div style={{display: 'flex', flexDirection: 'column', marginBottom: '16px'}}>
        {renderSelect('Theme', theme, setTheme, [EButtonTheme.GENERAL, EButtonTheme.SECONDARY, EButtonTheme.DOTS])}
        {renderSelect('Size', size, setSize, Object.values(EButtonSize))}
        {renderCheckbox('Block mode', block, setBlock, theme === EButtonTheme.DOTS)}
        {renderCheckbox('Dropup menu', dropup, setDropup)}
        {renderCheckbox('Disabled', disabled, setDisabled)}
    </div>
);

<>
    {renderControls()}
    <ButtonDropdown theme={theme} size={size} options={options} block={block} dropup={dropup} disabled={disabled}>
        Button Name
    </ButtonDropdown>
</>
```
