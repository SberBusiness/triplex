```jsx noeditor
import React, {useState} from 'react';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';
import {CardAction} from '@sberbusiness/triplex/desktop/components/Card/CardAction';
import {ECardContentPaddingSize, ECardRoundingSize} from '@sberbusiness/triplex/desktop/components/Card/enums';

const [paddingSize, setPaddingSize] = useState(ECardContentPaddingSize.MD);
const [roundingSize, setRoundingSize] = useState(ECardRoundingSize.MD);
const [selected, setSelected] = useState(false);

const checkboxOptions = [
    {
        id: 'selected',
        label: 'Selected',
        checked: selected,
        onChange: setSelected,
    },
];

const inputOptions = [
    {
        id: 'paddingSize',
        hidden: true,
        value: paddingSize,
        onChange: setPaddingSize,
    },
    {
        id: 'roundingSize',
        hidden: true,
        value: roundingSize,
        onChange: setRoundingSize,
    },
];

<>
    <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions} />
    <ComponentPreview>
        <CardAction roundingSize={roundingSize} selected={selected} toggle={setSelected} style={{width: '127px'}}>
            <CardAction.Media style={{background: 'linear-gradient(to right, #2a5b4c, #339f78)', height: '71px'}} />
            <CardAction.Content paddingSize={paddingSize}>
                <CardAction.Content.Header>Header text</CardAction.Content.Header>
                <CardAction.Content.Body>Body text</CardAction.Content.Body>
                <CardAction.Content.Footer>Footer text</CardAction.Content.Footer>
            </CardAction.Content>
        </CardAction>
    </ComponentPreview>
</>
```
