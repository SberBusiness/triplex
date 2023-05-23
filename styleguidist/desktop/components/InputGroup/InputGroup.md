```jsx
import {InputGroup} from '@sberbusiness/triplex/desktop/components/InputGroup/InputGroup';
import {Input} from '@sberbusiness/triplex/desktop/components/Input/Input';
import {NumberInput} from '@sberbusiness/triplex/desktop/components/NumberInput/NumberInput';
import {MaskedInput} from '@sberbusiness/triplex/desktop/components/MaskedInput/MaskedInput';
import {Suggest} from '@sberbusiness/triplex/desktop/components/Suggest/Suggest';
import {Select} from '@sberbusiness/triplex/desktop/components/Select/Select';
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';
import './InputGroup.less';

const [left, setLeft] = React.useState({name: 'Input'});
const [middle, setMiddle] = React.useState({name: 'Input'});
const [right, setRight] = React.useState({name: 'Input'});

const names = ['Input', 'NumberInput', 'MaskedInput', 'Suggest', 'Select'];

const options = Array(5).fill().map((item, index) => ({value: index + 1, label: `Option ${index + 1}`}));

const renderControlPanel = () => (
    <ExampleControlPanel>
        <select value={left.name} onChange={({target: {value}}) => setLeft({name: value})} data-label="Left">
            {names.map((value, index) => (
                <option key={index}>{value}</option>
            ))}
        </select>
        <select value={middle.name} onChange={({target: {value}}) => setMiddle({name: value})} data-label="Middle">
            {names.map((value, index) => (
                <option key={index}>{value}</option>
            ))}
        </select>
        <select value={right.name} onChange={({target: {value}}) => setRight({name: value})} data-label="Right">
            {names.map((value, index) => (
                <option key={index}>{value}</option>
            ))}
        </select>
    </ExampleControlPanel>
);

const renderComponent = (state, setState) => {
    const {name, props} = state;

    const setProps = (props) => setState({name, props});

    switch (name) {
        case 'Input':
            return renderInput(props, setProps);
        case 'NumberInput':
            return renderNumberInput(props, setProps);
        case 'MaskedInput':
            return renderMaskedInput(props, setProps);
        case 'Suggest':
            return renderSuggest(props, setProps);
        case 'Select':
            return renderSelect(props, setProps);
    }
};

const renderInput = (props = {value: ''}, setProps) => (
    <Input
        onChange={(event) => setProps({...props, value: event.target.value})}
        placeholder="Введите значение"
        {...props}
    />
);

const renderNumberInput = (props = {value: ''}, setProps) => (
    <NumberInput onChange={(value) => setProps({...props, value})} {...props} />
);

const renderMaskedInput = (props = {value: ''}, setProps) => (
    <MaskedInput
        className="masked-input"
        onChange={(event) => setProps({...props, value: event.target.value})}
        mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
        {...props}
    />
);

const renderSuggest = (props = {value: null, options}, setProps) => {
    const handleFilter = (string) =>
        setProps({
            ...props,
            options: options.filter((option) => option.label.toLowerCase().indexOf(string.toLowerCase()) != -1),
        });

    return (
        <Suggest
            onFilter={handleFilter}
            onSelect={(value) => setProps({...props, value, options})}
            placeholder="Начните вводить"
            tooltipHint="Совпадений не найдено."
            isTooltipOpened={!props.options.length}
            {...props}
        />
    );
};

const renderSelect = (props = {}, setProps) => (
    <Select
        onChange={(value) => setProps({...props, value})}
        options={options}
        placeholder="Выберите значение"
        {...props}
    />
);

<>
    {renderControlPanel()}
    <InputGroup>
        {renderComponent(left, setLeft)}
        {renderComponent(middle, setMiddle)}
        {renderComponent(right, setRight)}
    </InputGroup>
</>
```
