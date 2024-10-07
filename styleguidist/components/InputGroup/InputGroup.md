```jsx
import {Input} from '@sberbusiness/triplex/components/Input/Input';
import {Select} from '@sberbusiness/triplex/components/Select/Select';

const options = Array(5).fill().map((item, index) => ({id: index.toString(), value: index + 1, label: `Option ${index + 1}`}));

const renderInput = () => <Input placeholder="Введите значение" />;

const renderSelect = () => {
    const [value, setValue] = React.useState();
    
    return (
        <Select
            value={value}
            placeholder="Выберите значение"
            options={options}
            onChange={setValue}
        />
    );
};

<InputGroup>
    {renderInput()}
    {renderSelect()}
</InputGroup>
```
###  Amount input / Masked input
```jsx
import {AmountInput} from '@sberbusiness/triplex/components/AmountInput/AmountInput';
import {MaskedInput} from '@sberbusiness/triplex/components/MaskedInput/MaskedInput';

const renderAmountInput = () => {
    const [value, setValue] = React.useState('');

    return (
        <AmountInput value={value} onChange={setValue} />
    );
};

const renderMaskedInput = () => {
    const [value, setValue] = React.useState('');

    return (
        <MaskedInput
            value={value}
            mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
            onChange={(event) => setValue(event.target.value)}
        />
    );
};

<InputGroup>
    {renderAmountInput()}
    {renderMaskedInput()}
</InputGroup>
```

### Suggest / Number input

```jsx
import {Suggest} from '@sberbusiness/triplex/components/Suggest/Suggest';
import {NumberInput} from '@sberbusiness/triplex/components/NumberInput/NumberInput';

const options = Array(5).fill().map((item, index) => ({value: index + 1, label: `Option ${index + 1}`}));

const renderSuggest = () => {
    const [state, setState] = React.useState({options});

    const handleFilter = (string) =>
        setState({
            ...state,
            options: options.filter((option) => option.label.toLowerCase().indexOf(string.toLowerCase()) != -1),
        });

    return (
        <Suggest
            value={state.value}
            placeholder="Начните вводить"
            tooltipHint="Совпадений не найдено."
            options={options}
            isTooltipOpened={!state.options.length}
            onFilter={handleFilter}
            onSelect={(value) => setState({...state, value, options})}
        />
    );
};

const renderNumberInput = () => {
    return (
        <NumberInput placeholder="Введите значение" />
    )
};

<InputGroup>
    {renderSuggest()}
    {renderNumberInput()}
</InputGroup>
```
