```jsx noeditor
import ComponentStylesDependency from '../../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency 
    componentTitle="Suggest"
    isMobileComponent={false} 
/>
```

```
import {Suggest} from '@sberbusiness/triplex/desktop/components/Suggest/Suggest';
import {ExampleControlPanel} from "../../common/ExampleControlPanel/ExampleControlPanel";

const [error, setError] = React.useState(false);
const [disabled, setDisabled] = React.useState(false);

const renderControlPanel = () => (
    <ExampleControlPanel>
        <input type="checkbox" checked={error} onChange={(event) => setError(event.target.checked)} data-label="Error" />
        <input type="checkbox" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} data-label="Disabled" />
    </ExampleControlPanel>
);

const data = [
    {
        value: '1',
        label: 'Анапсиды',
        labelReactNode: (
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>Анапсиды</div>
                <div>0001231</div>
            </div>
        ),
    },
    {value: '2', label: 'Синапсиды'},
    {value: '3', label: 'Диапсиды'},
    {value: '4', label: 'В кладистике нет настолько длинных названий отрядов/подотрядов, чтобы вылезать за границы дозволенного'},
];

const SuggestSyncExample = () => {
    // Работа с данными.
    const [state, setState] = React.useState({
        options: data,
        value: null,
        isTooltipOpened: false,
    });

    const onFocus = () =>
        setState({
            ...state,
            options: data,
            isTooltipOpened: false,
        });

    const handleSelect = (value) =>
        setState({
            ...state,
            value,
            // Эмуляция внешнего обновления списка.
            options: [...state.options],
        });

    const filterFn = (query) => {
        const options = data.filter((item) => {
            const q = query.toLowerCase();
            const i = item.label.toLowerCase();

            return i.indexOf(q) !== -1;
        });

        setState({
            ...state,
            options,
            isTooltipOpened: options.length === 0,
        });
    };

    return (
        <Suggest
            data-test-id="sync-suggest"
            disabled={disabled}
            error={error}
            loading={state.isLoading}
            value={state.value}
            onFilter={filterFn}
            options={state.options}
            onFocus={onFocus}
            onSelect={handleSelect}
            saveFilterOnFocus={false}
            tooltipHint="Совпадений не найдено"
            isTooltipOpened={state.isTooltipOpened}
            placeholder="Начните вводить"
        />
    );
};

<>
    {renderControlPanel()}
    <SuggestSyncExample />
</>
```
