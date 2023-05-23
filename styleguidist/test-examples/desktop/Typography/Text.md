```jsx
import React, {useState} from 'react';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';
import {Text} from '@sberbusiness/triplex/desktop/components/Typography/Text';
import {ETextSize, EFontType, EFontWeight, ELineType} from '@sberbusiness/triplex/desktop/components/Typography/enums';

const [type, setType] = useState(EFontType.GENERAL);
const [weight, setWeight] = useState(EFontWeight.REGULAR);
const [line, setLine] = useState(ELineType.NORMAL);
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
    {
        id: 'line',
        hidden: true,
        value: type,
        onChange: setLine,
    },
];

<>
    <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions} />
    <ComponentPreview style={{display: 'flex', flexDirection: 'column'}}>
        <Text size={ETextSize.B1} type={type} weight={weight} line={line} underline={underline} strikethrough={strikethrough}>
            B1 Sample Text
        </Text>
        <Text size={ETextSize.B2} type={type} weight={weight} line={line} underline={underline} strikethrough={strikethrough}>
            B2 Sample Text
        </Text>
        <Text size={ETextSize.B3} type={type} weight={weight} line={line} underline={underline} strikethrough={strikethrough}>
            B3 Sample Text
        </Text>
    </ComponentPreview>
</>
```