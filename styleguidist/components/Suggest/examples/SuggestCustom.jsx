import React from 'react';
import {SuggestMobile} from '@sberbusiness/triplex/components/Suggest/mobile/SuggestMobile';
import {MobileView} from '@sberbusiness/triplex/components/MobileView/MobileView';
import {Input} from '@sberbusiness/triplex/components/Input/Input';
import {SuggestCustom} from '@sberbusiness/triplex/components/Suggest/SuggestCustom';

const options = [
    {firstName: 'Ewan', label: 'Ewan McGregor', lastName: 'McGregor'},
    {firstName: 'Tom', label: 'Tom Hardy', lastName: 'Hardy'},
    {firstName: 'James', label: 'James Belushi', lastName: 'Belushi'},
    {firstName: 'Anthony', label: 'Anthony Hopkins', lastName: 'Hopkins'},
    {firstName: 'James', label: 'James Franco', lastName: 'Franco'},
    {firstName: 'Seth', label: 'Seth Rogen', lastName: 'Rogen'},
];

const TargetInput = ({
    disabled,
    tabIndex,
    onClick,
    onChange,
    dataTestId,
    focused,
    setRef,
    query,
    onFocus,
    opened,
    loading,
    optionsLength,
    renderTargetInput,
    renderTargetLabel,
    ...rest
}) => (
    <Input
        {...rest}
        ref={setRef}
        tabIndex={disabled ? -1 : tabIndex}
        value={query}
        disabled={disabled}
        onFocus={onFocus}
        onClick={onClick}
        onChange={onChange}
    />
);

const TargetLabel = ({
    renderTargetLabel,
    renderTargetInput,
    tabIndex,
    focused,
    opened,
    optionsLength,
    value,
    query,
    setRef,
    loading,
    dataTestId,
    ...rest
}) => <Input value={value ? `${value.firstName} ${value.lastName}` : ''} readOnly aria-hidden="true" {...rest} />;

const SuggestCustomExample = () => {
    const [state, setState] = React.useState({
        isTooltipOpened: false,
        options,
        value: undefined,
    });

    const onFocus = () =>
        setState({
            isTooltipOpened: false,
            ...state,
            options,
        });

    const handleSelect = (value) =>
        setState({
            ...state,
            // эмуляция внешнего обновления списка
            options: [...state.options],
            value,
        });

    const filterFn = (query) => {
        const optionsFiltered = options.filter(
            ({firstName, lastName}) =>
                firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1 || lastName.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );

        setState({
            ...state,
            isTooltipOpened: optionsFiltered.length === 0,
            options: optionsFiltered,
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
            renderTargetInput={TargetInput}
            renderTargetLabel={TargetLabel}
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

<SuggestCustomExample />;
