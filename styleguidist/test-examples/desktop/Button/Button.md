```jsx noeditor
import React, {useState, useRef, useEffect} from 'react';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';
import {Button} from '@sberbusiness/triplex/desktop/components/Button/Button';
import {EButtonSize, EButtonTheme} from '@sberbusiness/triplex/desktop/components/Button/enums';

const [theme, setTheme] = useState(EButtonTheme.GENERAL);
const [size, setSize] = useState(EButtonSize.MD);
const [block, setBlock] = useState(false);
const [loading, setLoading] = useState(false);
const [disabled, setDisabled] = useState(false);
const [focused, setFocused] = useState(false);
const ref = useRef(null);

useEffect(() => {
    if (focused) {
        ref.current.focus();
    }
}, [focused]);

const checkboxOptions = [
    {
        id: 'focused',
        label: 'Focused',
        checked: focused,
        onChange: setFocused,
    },
    {
        id: 'block',
        label: 'Block mode',
        checked: block,
        onChange: setBlock,
    },
    {
        id: 'loading',
        label: 'Loading',
        checked: loading,
        onChange: setLoading,
    },
    {
        id: 'disabled',
        label: 'Disabled',
        checked: disabled,
        onChange: setDisabled,
    },
];

const inputOptions = [
    {
        id: 'theme',
        hidden: true,
        onChange: setTheme,
        value: theme,
    },
    {
        id: 'size',
        hidden: true,
        onChange: setSize,
        value: size,
    },
];

<>
    <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions} />
    <ComponentPreview>
        <Button theme={theme} size={size} block={block} loading={loading} disabled={disabled} ref={ref}>
            Button Name
        </Button>
    </ComponentPreview>
</>
```
