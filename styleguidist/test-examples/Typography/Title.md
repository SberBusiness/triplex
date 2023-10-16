```jsx
import React, {useState} from 'react';
import ComponentOptions from '../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../common/components/ComponentPreview/ComponentPreview';
import {Title} from '@sberbusiness/triplex/components/Typography/Title';
import {ETitleSize, EFontType, EFontWeight} from '@sberbusiness/triplex/components/Typography/enums';

const [type, setType] = useState(EFontType.GENERAL);
const [weight, setWeight] = useState(EFontWeight.REGULAR);
const [underline, setUnderline] = useState(false);
const [strikethrough, setStrikethrough] = useState(false);

const checkboxOptions = [
    {
        id: 'underline',
        label: 'Underline',
        checked: underline,
        onChange: setUnderline,
    },
    {
        id: 'strikethrough',
        label: 'Strikethrough',
        checked: strikethrough,
        onChange: setStrikethrough,
    },
];

const inputOptions = [
    {
        id: 'type',
        hidden: true,
        value: type,
        onChange: setType,
    },
    {
        id: 'weight',
        hidden: true,
        value: weight,
        onChange: setWeight,
    },
];

<>
    <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions}/>
    <ComponentPreview>
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
    </ComponentPreview>
</>
```
