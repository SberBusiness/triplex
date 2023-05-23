```jsx
import React, {useState} from 'react';
import {Title} from '@sberbusiness/triplex/desktop/components/Typography/Title';
import {ETitleSize, EFontType, EFontWeight} from '@sberbusiness/triplex/desktop/components/Typography/enums';

const [type, setType] = useState(EFontType.GENERAL);
const [weight, setWeight] = useState(EFontWeight.SEMIBOLD);
const [underline, setUnderline] = useState(false);
const [strikethrough, setStrikethrough] = useState(false);

const renderCheckbox = (label, value, handler) => {
    return (
        <>
            <input type="checkbox" id={`title${label}`} name="title" checked={value} onChange={(event) => handler(event.target.checked)} />
            <label htmlFor={`title${label}`} style={{margin: '0px 4px 0px 1px'}}>
                {label}
            </label>
        </>
    );
};

const renderSelect = (label, value, handler, options) => {
    return (
        <>
            <label htmlFor={`title${label}`}>{label}</label>
            <select
                id={`title${label}`}
                name="title"
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
    <Title size={ETitleSize.H1} type={type} weight={weight} underline={underline} strikethrough={strikethrough}>
        H1 Sample Text
    </Title>
    <Title size={ETitleSize.H2} type={type} weight={weight} underline={underline} strikethrough={strikethrough}>
        H2 Sample Text
    </Title>
    <Title size={ETitleSize.H3} type={type} weight={weight} underline={underline} strikethrough={strikethrough}>
        H3 Sample Text
    </Title>
    <Title size={ETitleSize.H4} type={type} weight={weight} underline={underline} strikethrough={strikethrough}>
        H4 Sample Text
    </Title>
</>
```