```jsx noeditor
import ComponentStylesDependency from '../../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency
    componentTitle="Suggest Extended"
    isMobileComponent={false}
/>
```

```jsx
import React, {useState} from 'react';
import {SuggestCustom} from '@sbbol/web-library/desktop/components/Suggest/SuggestCustom';

const options = [
    {firstName: 'Ewan', lastName: 'McGregor'},
    {firstName: 'Tom', lastName: 'Hardy'},
    {firstName: 'James', lastName: 'Belushi'},
    {firstName: 'Anthony', lastName: 'Hopkins'},
    {firstName: 'James', lastName: 'Franco'},
    {firstName: 'Seth', lastName: 'Rogen'},
];

const CustomExample = () => {
    const [state, setState] = useState({
        options: options,
        value: null,
        notFound: false,
    });

    const onFocus = () => setState({
        ...state,
        notFound: false,
    });

    const handleSelect = (value) => {
        setState({
            ...state,
            value,
            // эмуляция внешнего обновления списка
            options: [...state.options],
        });
    };

    const filterFn = (query) => {
        const optionsFiltered = options.filter(({firstName, lastName}) => {
            return firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1 || lastName.toLowerCase().indexOf(query.toLowerCase()) !== -1
        })
        setState({
            ...state,
            options: optionsFiltered,
            notFound: optionsFiltered.length === 0,
        });
    }

    return (
        <SuggestCustom
            data-test-id="extended-suggest"
            loading={false}
            value={state.value}
            onFilter={filterFn}
            options={state.options}
            onFocus={onFocus}
            onSelect={handleSelect}
            onBlur={() => setState({...state, options: options})}
            placeholder="Начните вводить"
            tooltipHint="Совпадений не найдено"
            isTooltipOpened={state.notFound}
            renderDropdownItemLabel={(dropdownLabelProps) => {
                const {option} = dropdownLabelProps;
                return <div><i>{option.lastName}</i> <b>{option.firstName}</b></div>
            }}
            renderTargetLabel={(targetLabelProps) => {
                const {className, value, placeholder, onFocus, onClick} = targetLabelProps;
                return (
                    <div className={className} onFocus={onFocus} onClick={onClick}>
                        {
                            !value ?
                                placeholder :
                                (<><b>{value.firstName}</b> <i>{value.lastName}</i></>)
                        }
                    </div>
                );
            }}
        />
    );
}

<CustomExample />
```
