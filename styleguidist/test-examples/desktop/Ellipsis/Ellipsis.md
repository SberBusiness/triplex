```jsx
import React, {useState} from 'react';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';
import {Ellipsis} from '@sberbusiness/triplex/desktop/components/Ellipsis/Ellipsis';

const [maxLine, setMaxLine] = useState('2');
const [text, setText] = useState(
    'Компонент сворачивания текста в троеточие. Все что не вместилось, в переданное через пропсу maxLine количество строк, сворачивается в троеточие. Необходимо так же учесть, что данному компоненту нельзя устанавливать паддинги, так как во всех браузерах кроме IE реализация через css свойство line-clamp, и если установить паддинги то в них будет видно часть спрятанного текста.'
);

const inputOptions = [
    {
        id: 'maxLine',
        label: 'Max line',
        onChange: setMaxLine,
        value: maxLine,
    },
    {
        id: 'text',
        label: 'Text',
        onChange: setText,
        value: text,
    },
];

<>
    <ComponentOptions inputOptions={inputOptions} />
    <ComponentPreview>
        <Ellipsis maxLine={maxLine}>{text}</Ellipsis>
    </ComponentPreview>
</>;
```
