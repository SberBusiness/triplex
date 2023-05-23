```jsx
import React, {useRef, useState, useEffect} from 'react';
import {Suggest} from '@sberbusiness/triplex/desktop/components/Suggest/Suggest';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';

const getOptions = () => [
    {label: 'Понедельник', value: '1'},
    {label: 'Вторник', value: '2'},
    {label: 'Среда', value: '3'},
    {label: 'Четверг', value: '4'},
    {label: 'Пятница', value: '5'},
    {label: 'Суббота', value: '6'},
    {label: 'Воскресенье', value: '7'},
    {label: 'Такого дня недели не существует, ты хоть тресни, но его нет. Такого дня недели не существует, ты хоть тресни, но его нет.', value: '8'},
];

const [error, setError] = useState(false);
const [disabled, setDisabled] = useState(false);
const [opened, setOpened] = useState(false);
const [loading, setLoading] = useState(false);
const [notFound, setNotFound] = useState(false);
const [valued, setValued] = useState(false);
const [withLongValue, setWithLongValue] = useState(false);
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
        id: 'withLongValue',
        label: 'Closed with long value',
        checked: withLongValue,
        onChange: setWithLongValue,
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
    if (withLongValue) {
        setValue(options[7]);
    } else {
        setValue(null);
    }
}, [withLongValue]);

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
    if (openedWithoutValue) {
        setTimeout(() => {
            setOpened(true);
        }, 0);
    } else {
        setOpened(false);
    }
}, [openedWithoutValue]);

useEffect(() => {
    if (openWithSelectedValueWithSavedQuery) {
        setSaveOnFocus(true);
        setTimeout(() => {
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
            <Suggest
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
            />
        </div>
    </ComponentPreview>
</>
```