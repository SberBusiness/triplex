```jsx
import React, {useRef, useState, useEffect} from 'react';
import {SuggestCustom} from '@sberbusiness/triplex/desktop/components/Suggest/SuggestCustom';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';

const getOptions = () => [
    {firstName: 'Ewan', lastName: 'McGregor'},
    {firstName: 'Tom', lastName: 'Hardy'},
    {firstName: 'James', lastName: 'Belushi'},
    {firstName: 'Anthony', lastName: 'Hopkins'},
    {firstName: 'James', lastName: 'Franco'},
    {firstName: 'Seth', lastName: 'Rogen'},
];

const [error, setError] = useState(false);
const [disabled, setDisabled] = useState(false);
const [opened, setOpened] = useState(false);
const [loading, setLoading] = useState(false);
const [notFound, setNotFound] = useState(false);
const [valued, setValued] = useState(false);
const [saveOnFocus, setSaveOnFocus] = useState(false);
const [placeholder, setPlaceholder] = useState('Placeholder');
const [options, setOptions] = useState(getOptions());
const [value, setValue] = useState(null);

const [openedWithoutValue, setOpenedWithoutValue] = useState(false);
const [openWithSelectedValue, setOpenWithSelectedValue] = useState(false);
const [openWithSelectedValueWithSavedQuery, setOpenWithSelectedValueWithSavedQuery] = useState(false);

const ref = useRef();

const toggleSuggest = () => {
    if (ref.current) {
        const input = ref.current.querySelector('input');
        opened ? (input.click(), input.focus()) : ref.current.parentElement.click();
    }
};

const inputOptions = [
    {
        id: 'placeholder',
        label: 'Placeholder',
        value: placeholder,
        onChange: setPlaceholder,
        hidden: true,
    },
];

const checkboxOptions = [
    {
        id: 'error',
        label: 'Error',
        checked: error,
        onChange: setError,
    },
    {
        id: 'disabled',
        label: 'Disabled',
        checked: disabled,
        onChange: setDisabled,
    },
    {
        id: 'loading',
        label: 'Loading',
        checked: loading,
        onChange: setLoading,
    },
    {
        id: 'opened',
        label: 'Opened',
        checked: opened,
        onChange: setOpened,
    },
    {
        id: 'notFound',
        label: 'Not Found',
        checked: notFound,
        onChange: setNotFound,
    },
    {
        id: 'valued',
        label: 'Closed with value',
        checked: valued,
        onChange: setValued,
    },
    {
        id: 'openedWithoutValue',
        label: 'Opened without value',
        checked: openedWithoutValue,
        onChange: setOpenedWithoutValue,
        hidden: true,
    },
    {
        id: 'openWithSelectedValue',
        label: 'Open Suggest with selected value',
        checked: openWithSelectedValue,
        onChange: setOpenWithSelectedValue,
    },
    {
        id: 'openWithSelectedValueWithSavedQuery',
        label: 'Open Suggest with selected value and save query',
        checked: openWithSelectedValueWithSavedQuery,
        onChange: setOpenWithSelectedValueWithSavedQuery,
    },
];

useEffect(() => toggleSuggest(), [opened]);

useEffect(() => {
    if (notFound || loading) {
        setOptions([]);
        setOpened(true);
    } else {
        setOpened(false);
        setOptions(getOptions());
    }
}, [notFound, loading]);

useEffect(() => {
    if (valued) {
        setValue(options[2]);
    } else {
        setValue(null);
    }
}, [valued]);

useEffect(() => {
    if (openedWithoutValue) {
        setTimeout(() => {
            setOpened(true);
        }, 0);
    } else {
        setOpened(false);
    }
}, [openedWithoutValue]);

useEffect(() => {
    if (openWithSelectedValue) {
        setValue(options[2]);
        setTimeout(() => {
            setOpened(true);
        }, 0);
    } else {
        setOpened(false);
        setValue(null);
    }
}, [openWithSelectedValue]);

useEffect(() => {
    if (openWithSelectedValueWithSavedQuery) {
        setTimeout(() => {
            setSaveOnFocus(true);
            setValue(options[2]);
            setOpened(true);
        }, 0);
    } else {
        setOpened(false);
        setValue(null);
        setSaveOnFocus(false);
    }
}, [openWithSelectedValueWithSavedQuery]);

const style = {
    height: opened || notFound ? '250px' : '',
    padding: '4px',
    paddingTop:  notFound ? '70px' : '',
};

<>
    <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions}/>
    <ComponentPreview>
        <div style={style}>
            <SuggestCustom
                setRef={(el) => ref.current = el}
                placeholder={placeholder}
                error={error}
                loading={loading}
                tooltipHint="Совпадений не найдено"
                isTooltipOpened={notFound}
                disabled={disabled}
                saveFilterOnFocus={saveOnFocus}
                options={options}
                onFilter={() => {}}
                onSelect={() => {}}
                value={value}
                renderDropdownItemLabel={(dropdownLabelProps) => {
                    const {option} = dropdownLabelProps;
                    return <div><i>{option.lastName}</i> <b>{option.firstName}</b></div>
                }}
                renderTargetLabel={(targetLabelProps) => {
                    const {className, value} = targetLabelProps;
                    return (
                        <div className={className}>
                            {
                                !value ?
                                    targetLabelProps.placeholder :
                                    (<><b>{value.firstName}</b> <i>{value.lastName}</i></>)
                            }
                        </div>
                    );
                }}
            />
        </div>
    </ComponentPreview>
</>
```