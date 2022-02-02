```jsx
import React, {useState} from 'react';
import {Checkbox} from '@sbbol/web-library/desktop/components/Checkbox/Checkbox';
import {Input} from '@sbbol/web-library/desktop/components/Input/Input';
import {Gap} from '@sbbol/web-library/desktop/components/Gap/Gap';
import {ESpinnerSize} from '@sbbol/web-library/desktop/components/Spinner/enum';

const [isSmall, setIsSmall] = useState(false);
const [text, setText] = useState('');

<>
   <Checkbox checked={isSmall} onChange={() => setIsSmall(!isSmall)}>
       Показать маленький спиннер
   </Checkbox>
   <Gap size={8} />
   <Input placeholder="Текст под спиннером" id="spinnerText" value={text} onChange={(event) => setText(event.target.value)} />
   <Gap size={8} />
    
    <div style={{'position': 'relative', 'height': '600px'}}>
        <SpinnerWidget size={isSmall ? ESpinnerSize.SM : ESpinnerSize.MD}>{text}</SpinnerWidget>
    </div>
</>;
```
