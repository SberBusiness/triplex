```jsx noeditor
import React, {useState} from 'react';
import ComponentOptions from '../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../common/components/ComponentPreview/ComponentPreview';
import {CardStatic} from '@sberbusiness/triplex/components/Card/CardStatic';
import {ECardContentPaddingSize, ECardRoundingSize} from '@sberbusiness/triplex/components/Card/enums';

const [paddingSize, setPaddingSize] = useState(ECardContentPaddingSize.MD);
const [roundingSize, setRoundingSize] = useState(ECardRoundingSize.MD);

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
    <ComponentOptions inputOptions={inputOptions}/>
    <ComponentPreview>
        <CardStatic roundingSize={roundingSize} style={{width: '127px'}}>
            <CardStatic.Media style={{background: 'linear-gradient(to right, #2a5b4c, #339f78)', height: '71px'}}/>
            <CardStatic.Content paddingSize={paddingSize}>
                <CardStatic.Content.Header>Header text</CardStatic.Content.Header>
                <CardStatic.Content.Body>Body text</CardStatic.Content.Body>
                <CardStatic.Content.Footer>Footer text</CardStatic.Content.Footer>
            </CardStatic.Content>
        </CardStatic>
    </ComponentPreview>
</>
```
