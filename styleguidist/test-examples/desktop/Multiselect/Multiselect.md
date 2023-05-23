```jsx
import React, {useState, useEffect, useRef} from 'react';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';
import {Multiselect} from '@sberbusiness/triplex/desktop/components/Multiselect/Multiselect';
import {Input} from '@sberbusiness/triplex/desktop/components/Input/Input';
import {Button} from '@sberbusiness/triplex/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {SpinnerWidget} from '@sberbusiness/triplex/desktop/components/SpinnerWidget/SpinnerWidget';

const [disabled, setDisabled] = useState(false);
const [error, setError] = useState(false);
const [loading, setLoading] = useState(false);
const [filter, setFilter] = useState('');
const [open, setOpen] = useState(false);

useEffect(() => {
    if (open) {
        const el = document.getElementById('multiselect-target-screenshot-test');

        if (el) {
            el.click();
        }
    }
}, [open]);

const checkboxOptions = [
    {
        id: 'open',
        label: 'open',
        checked: open,
        onChange: setOpen,
    },
    {
        id: 'disabled',
        label: 'disabled',
        checked: disabled,
        onChange: setDisabled,
    },
    {
        id: 'error',
        label: 'error',
        checked: error,
        onChange: setError,
    },
    {
        id: 'loading',
        label: 'loading',
        checked: loading,
        onChange: setLoading,
    },
];

const inputOptions = [
    {
        id: 'filter',
        hidden: true,
        value: filter,
        onChange: setFilter,
    },
];

let prevOpenedDropdown = false;
let inputFilterNode = useRef(null);

/** Рендерит нескрываемую часть Select. */
const renderTarget = (props) => (
    <Multiselect.Target
        id="multiselect-target-screenshot-test"
        disabled={disabled}
        error={error}
        placeholder="Выберите значение"
        {...props}
    />
);

/** Рендерит dropdown-часть Select. */
const renderDropdown = (dropdownProps) => {
    if (!prevOpenedDropdown && dropdownProps.opened) {
        requestAnimationFrame(() => inputFilterNode.current && inputFilterNode.current.focus());
    }

    prevOpenedDropdown = dropdownProps.opened;

    return (
        <Multiselect.Dropdown {...dropdownProps}>
            <Multiselect.Dropdown.Header>
                <Input
                    value={filter}
                    onChange={(event) => {
                        setFilter(event.target.value);
                    }}
                    ref={inputFilterNode}
                />
            </Multiselect.Dropdown.Header>
            <div style={{position: 'relative'}}>
                <Multiselect.Dropdown.Content>Content</Multiselect.Dropdown.Content>
                <Multiselect.Dropdown.Footer>
                    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
                        Выбрать
                    </Button>
                    <Button theme={EButtonTheme.LINK} size={EButtonSize.SM}>
                        Сбросить
                    </Button>
                </Multiselect.Dropdown.Footer>
                {loading && <SpinnerWidget />}
            </div>
        </Multiselect.Dropdown>
    );
};

<>
    <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions} />
    <ComponentPreview style={{boxSizing: 'border-box', height: open ? '370px' : undefined}}>
        <Multiselect renderTarget={renderTarget}>{(dropdownProps) => renderDropdown(dropdownProps)}</Multiselect>
    </ComponentPreview>
</>
```
