```jsx
import React, {useState} from 'react';
import {Text} from '@sberbusiness/triplex/desktop/components/Typography/Text';
import {ETextSize, EFontType, EFontWeight, ELineType} from '@sberbusiness/triplex/desktop/components/Typography/enums';

const [type, setType] = useState(EFontType.GENERAL);
const [weight, setWeight] = useState(EFontWeight.REGULAR);
const [line, setHeight] = useState(ELineType.NORMAL);
const [underline, setUnderline] = useState(false);
const [strikethrough, setStrikethrough] = useState(false);

const renderCheckbox = (label, value, handler) => {
    return (
        <>
            <input type="checkbox" id={`text${label}`} name="text" checked={value} onChange={(event) => handler(event.target.checked)} />
            <label htmlFor={`text${label}`} style={{margin: '0px 4px 0px 1px'}}>
                {label}
            </label>
        </>
    );
};

const renderSelect = (label, value, handler, options) => {
    return (
        <>
            <label htmlFor={`text${label}`}>{label}</label>
            <select
                key={`text${label}`}
                id={`text${label}`}
                name="text"
                value={value}
                onChange={(event) => handler(event.target.value)}
                style={{margin: '0px 8px 0px 4px'}}
            >
                {options.map((value, index) => (
                    <option key={index} value={value}>
                        {value}
                    </option>
                ))}
            </select>
        </>
    );
};

const renderControls = () => {
    return (
        <div style={{display: 'flex', marginBottom: '16px'}}>
            {[
                ['Type', type, setType, Object.values(EFontType)],
                ['Weight', weight, setWeight, Object.values(EFontWeight).slice(1, 3)],
                ['Line', line, setHeight, Object.values(ELineType)],
            ].map((value) => renderSelect(...value))}
            {[
                ['Underline', underline, setUnderline],
                ['Strikethrough', strikethrough, setStrikethrough],
            ].map((value) => renderCheckbox(...value))}
        </div>
    );
};

<>
    {renderControls()}
    <div style={{display: 'flex', flexDirection: 'column'}}>
        <Text size={ETextSize.B1} type={type} weight={weight} line={line} underline={underline} strikethrough={strikethrough}>
            B1 Шаблонный текст
        </Text>
        <Text size={ETextSize.B2} type={type} weight={weight} line={line} underline={underline} strikethrough={strikethrough}>
            B2 Шаблонный текст
        </Text>
        <Text size={ETextSize.B3} type={type} weight={weight} line={line} underline={underline} strikethrough={strikethrough}>
            B3 Шаблонный текст
        </Text>
    </div>
</>
```