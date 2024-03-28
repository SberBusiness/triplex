```jsx
import {SuggestMobile} from '@sberbusiness/triplex/components/Suggest/mobile/SuggestMobile';
import {MobileView} from '@sberbusiness/triplex/components/MobileView/MobileView';
import {Input} from '@sberbusiness/triplex/components/Input/Input';

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
        value: undefined,
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

    const renderSuggestDesktop = () => (
        <SuggestCustom
            data-test-id="extended-suggest"
            loading={false}
            value={state.value}
            onFilter={filterFn}
            options={state.options}
            onFocus={onFocus}
            onSelect={handleSelect}
            placeholder="Начните вводить"
            tooltipHint="Совпадений не найдено."
            isTooltipOpened={state.isTooltipOpened}
            renderDropdownItemLabel={({option}) => (
                <div style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                    <i>{option.lastName}</i> <b>{option.firstName}</b>
                </div>
            )}
            renderTargetLabel={({className, value, placeholder, onFocus, onClick}) => (
                <Input
                    className={className}
                    value={value && `${value.firstName} ${value.lastName}`}
                    placeholder={placeholder}
                    readOnly
                    onFocus={onFocus}
                    onClick={onClick}
                />
            )}
        />
    );

    const renderSuggestMobile = () => (
        <SuggestMobile
            dropdownHint={state.isTooltipOpened ? 'Совпадений не найдено.' : ''}
            onFilter={filterFn}
            onFocus={onFocus}
            onSelect={handleSelect}
            options={state.options}
            placeholder="Начните вводить"
            value={state.value}
        />
    );

    return <MobileView fallback={renderSuggestDesktop()}>{renderSuggestMobile()}</MobileView>;
};

<SuggestCustomExample />
```
