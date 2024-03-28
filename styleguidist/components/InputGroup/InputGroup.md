```jsx
import {Input} from '@sberbusiness/triplex/components/Input/Input';
import {Select} from '@sberbusiness/triplex/components/Select/Select';

const options = Array(5).fill().map((item, index) => ({value: index + 1, label: `Option ${index + 1}`}));

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


### Other inputs

```jsx
import {AmountInput} from '@sberbusiness/triplex/components/AmountInput/AmountInput';
import {MaskedInput} from '@sberbusiness/triplex/components/MaskedInput/MaskedInput';
import {Suggest} from '@sberbusiness/triplex/components/Suggest/Suggest';

const options = Array(5).fill().map((item, index) => ({value: index + 1, label: `Option ${index + 1}`}));

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
            onChange={setValue}
        />
    );
};

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

<InputGroup>
    {renderAmountInput()}
    {renderMaskedInput()}
    {renderSuggest()}
</InputGroup>
```
