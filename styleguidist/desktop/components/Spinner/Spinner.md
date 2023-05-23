```jsx
import React, {useState} from 'react';
import {Checkbox} from '@sberbusiness/triplex/desktop/components/Checkbox/Checkbox';
import {Input} from '@sberbusiness/triplex/desktop/components/Input/Input';
import {Gap} from '@sberbusiness/triplex/desktop/components/Gap/Gap';
import {ESpinnerSize} from '@sberbusiness/triplex/desktop/components/Spinner/enum';

const [isSmall, setIsSmall] = useState(false);
const [text, setText] = useState('');

<>  
    <Checkbox checked={isSmall} onChange={() => setIsSmall(!isSmall)}>
        Показать маленький спиннер
    </Checkbox>
    <Gap size={8} />
    <Input placeholder="Текст под спиннером" id="spinnerText" value={text} onChange={(event) => setText(event.target.value)} />
    <Gap size={8} />

    <Spinner size={isSmall ? ESpinnerSize.SM : ESpinnerSize.MD}>{text}</Spinner>
</>;
```
