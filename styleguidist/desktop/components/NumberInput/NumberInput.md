```jsx
import {useState} from 'react';
import {Gap} from '@sbbol/web-library/desktop/components/Gap/Gap';

const [value1, setValue1] = useState('145000,00');
const [value2, setValue2] = useState();
const [value3, setValue3] = useState();
const [value4, setValue4] = useState();
const [value5, setValue5] = useState();
const [value6, setValue6] = useState();
const [value7, setValue7] = useState();

<>
    <NumberInput value={value1} onChange={setValue1} unit="$" />
    <Gap size={12}/>
    <NumberInput value={value2} onChange={setValue2} placeholder="Введите значение" />
    <Gap size={12}/>
    <NumberInput value={value3} onChange={setValue3} placeholderFractionLength={0} valueFractionLength={0}/>
    <Gap size={12}/>
    <NumberInput value={value4} onChange={setValue4} max={'12,5'} min={0} placeholderFractionLength={3} valueFractionLength={3}/>
    <Gap size={12}/>
    <NumberInput value={value5} onChange={setValue5} unit={"шт."}/>
    <Gap size={12}/>
    <NumberInput value={value6} onChange={setValue6} unit={"шт."} disabled/>
    <Gap size={12}/>
    <NumberInput value={value7} onChange={setValue7} unit={"шт."} error/>
</>
```