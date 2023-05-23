```jsx noeditor
import ComponentStylesDependency from '../../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency
    componentTitle="Suggest Extended"
    isMobileComponent={false}
/>
```

```jsx
import {SuggestCustom} from '@sberbusiness/triplex/desktop/components/Suggest/SuggestCustom';

const options = [
    {label: 'Ewan McGregor', firstName: 'Ewan', lastName: 'McGregor'},
    {label: 'Tom Hardy', firstName: 'Tom', lastName: 'Hardy'},
    {label: 'James Belushi', firstName: 'James', lastName: 'Belushi'},
    {label: 'Anthony Hopkins', firstName: 'Anthony', lastName: 'Hopkins'},
    {label: 'James Franco', firstName: 'James', lastName: 'Franco'},
    {label: 'Seth Rogen', firstName: 'Seth', lastName: 'Rogen'},
];

const SuggestCustomExample = () => {
    const [state, setState] = React.useState({
        options,
        value: null,
        isTooltipOpened: false,
    });

    const onFocus = () =>
        setState({
            ...state,
            options,
            isTooltipOpened: false,
        });

    const handleSelect = (value) =>
        setState({
            ...state,
            value,
            // эмуляция внешнего обновления списка
            options: [...state.options],
        });

    const filterFn = (query) => {
        const optionsFiltered = options.filter(
            ({firstName, lastName}) =>
                firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1 || lastName.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );

        setState({
            ...state,
            options: optionsFiltered,
            isTooltipOpened: optionsFiltered.length === 0,
        });
    };

    return (
        <SuggestCustom
            data-test-id="extended-suggest"
            loading={false}
            value={state.value}
            onFilter={filterFn}
            options={state.options}
            onFocus={onFocus}
            onSelect={handleSelect}
            placeholder="Начните вводить"
            tooltipHint="Совпадений не найдено"
            isTooltipOpened={state.isTooltipOpened}
            renderDropdownItemLabel={({option}) => (
                <div style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                    <i>{option.lastName}</i> <b>{option.firstName}</b>
                </div>
            )}
            renderTargetLabel={({className, value, placeholder, onFocus, onClick}) => (
                <div className={className} onFocus={onFocus} onClick={onClick}>
                    {!value ? (
                        placeholder
                    ) : (
                        <>
                            <b>{value.firstName}</b> <i>{value.lastName}</i>
                        </>
                    )}
                </div>
            )}
        />
    );
};

<SuggestCustomExample />
```
