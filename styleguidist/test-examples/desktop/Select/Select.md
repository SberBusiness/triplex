```jsx 
import React, {useState, useEffect} from 'react';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import {SelectExample} from './SelectExample';

const selectDataTestId = 'Default_Select';

const [topOrientation, setTopOrientation] = useState(false);
const [disabled, setDisabled] = useState(false);
const [error, setError] = useState(false);
const [loading, setLoading] = useState(false);
const [isOpen, setIsOpen] = useState(false);
const [inputValue, setInputValue] = useState('');

useEffect(() => {
    if (isOpen) {
        const selectTarget = document.querySelector(`[data-test-id="${selectDataTestId}__target"]`);
        if (selectTarget) {
            selectTarget.click();
        }
    }
}, [isOpen]);

const checkboxOptions = [
    {
        id: 'Select-openToTop',
        label: 'Dropdown to top',
        checked: topOrientation,
        onChange: setTopOrientation,
    }, {
        id: 'Select-disabled',
        label: 'Disabled',
        checked: disabled,
        onChange: setDisabled,
    }, {
        id: 'Select-error',
        label: 'Error',
        checked: error,
        onChange: setError,
    }, {
        id: 'Select-loading',
        label: 'Loading',
        checked: loading,
        onChange: setLoading,
    }, {
        id: 'Select-isOpen',
        label: 'Is open',
        hidden: true,
        checked: isOpen,
        onChange: setIsOpen,
    },
];

const inputOptions = [
    {
        id: 'inputValue',
        hidden: true,
        value: inputValue,
        onChange: setInputValue,
    },
];

<>
    <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions}/>
    <ComponentPreview
        style={{
            boxSizing: 'border-box',
            height: isOpen ? '240px' : undefined,
            paddingTop: isOpen && topOrientation ? '208px' : undefined,
        }}
    >
        <SelectExample
            error={error}
            disabled={disabled}
            loading={loading}
            placeholder="Выберите значение" 
            topOrientation={topOrientation}
            inputValue={inputValue}
            data-test-id={selectDataTestId}
        />
    </ComponentPreview>
</>
````