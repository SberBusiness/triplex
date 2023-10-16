```jsx
import {InputGroup} from '@sberbusiness/triplex/components/InputGroup/InputGroup';
import {Input} from '@sberbusiness/triplex/components/Input/Input';
import {AmountInput} from '@sberbusiness/triplex/components/AmountInput/AmountInput';
import {MaskedInput} from '@sberbusiness/triplex/components/MaskedInput/MaskedInput';
import {Suggest} from '@sberbusiness/triplex/components/Suggest/Suggest';
import {Select} from '@sberbusiness/triplex/components/Select/Select';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';
import './InputGroup.less';

const [first, setFirst] = React.useState({name: 'Input'});
const [middle, setMiddle] = React.useState({name: 'Input'});
const [last, setLast] = React.useState({name: 'Input'});

const names = ['Input', 'AmountInput', 'MaskedInput', 'Suggest', 'Select'];

const options = Array(5).fill().map((item, index) => ({value: index + 1, label: `Option ${index + 1}`}));

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Select
            value={first.name}
            setValue={(value) => setFirst({name: value})}
            options={names}
        >
            First
        </ComponentControlPanel.Select>
        <ComponentControlPanel.Select
            value={middle.name}
            setValue={(value) => setMiddle({name: value})}
            options={names}
        >
            Middle
        </ComponentControlPanel.Select>
        <ComponentControlPanel.Select
            value={last.name}
            setValue={(value) => setLast({name: value})}
            options={names}
        >
            Last
        </ComponentControlPanel.Select>
    </ComponentControlPanel>
);

const renderComponent = (state, setState) => {
    const {name, props} = state;

    const setProps = (props) => setState({name, props});

    switch (name) {
        case 'Input':
            return renderInput(props, setProps);
        case 'AmountInput':
            return renderAmountInput(props, setProps);
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

const renderAmountInput = (props = {value: ''}, setProps) => (
    <AmountInput onChange={(value) => setProps({...props, value})} {...props} />
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
        {renderComponent(first, setFirst)}
        {renderComponent(middle, setMiddle)}
        {renderComponent(last, setLast)}
    </InputGroup>
</>
```
