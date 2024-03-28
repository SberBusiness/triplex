```jsx {"props": {"className": "light-background"}}
const [value, setValue] = React.useState();

const buttonLabel = 'Изменить';
const emptyNumberButtonLabel = 'Задать номер';
const emptyNumberLabel = 'Номер документа будет присвоен автоматически';
const numberLabel = 'Документ №';

const handleChange = (value) => setValue(value);

<DocumentNumberEdit
    value={value}
    buttonLabel={buttonLabel}
    emptyNumberButtonLabel={emptyNumberButtonLabel}
    emptyNumberLabel={emptyNumberLabel}
    numberLabel={numberLabel}
    onChange={handleChange} 
/>
```
