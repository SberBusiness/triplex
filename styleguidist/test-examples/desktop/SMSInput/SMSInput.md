```jsx noeditor
import React, { useEffect, useState } from 'react';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';
import {SMSInput} from '@sbbol/web-library/desktop/components/SMSInput/SMSInput';

const COUNTDOWN_TIME = 10;
const [error, setError] = useState(false);
const [disabled, setDisabled] = useState(false);
const [filled, setFilled] = useState(false);
const [isTooltipOpen, setIsTooltipOpen] = useState(false);
const [codeRequested, setCodeRequested] = useState(false);

useEffect(() => {
    const input = document.querySelector('[data-id="sms-input"] input');
    if (input) {
        if (filled) {
            input.value = '12345678';
        } else {
            input.value = '';
        }
    }
}, [filled]);

useEffect(() => {
    if (isTooltipOpen) {
        const btnRefresh = document.querySelector('[data-id="sms-input"] div');
        if (btnRefresh) {
            btnRefresh.dispatchEvent(new KeyboardEvent('keyup', {code: 'Tab'}));
        }
    }
}, [isTooltipOpen]);

useEffect(() => {
    if (codeRequested) {
        const btnRefresh = document.querySelector('[data-id="sms-input"] div');
        if (btnRefresh) {
            btnRefresh.click();
        }
    }
}, [codeRequested]);

const checkboxOptions = [
    {
        id: 'SMSInput-error',
        label: 'Error',
        checked: error,
        onChange: setError,
    },
    {
        id: 'SMSInput-disabled',
        label: 'Disabled',
        checked: disabled,
        onChange: setDisabled,
    },
    {
        id: 'SMSInput-filled',
        label: 'Filled',
        hidden: true,
        checked: filled,
        onChange: setFilled,
    },
    {
        id: 'SMSInput-openTooltip',
        label: 'Open tooltip',
        hidden: true,
        checked: isTooltipOpen,
        onChange: setIsTooltipOpen,
    },
    {
        id: 'SMSInput-codeRequested',
        label: 'Request code',
        hidden: true,
        checked: codeRequested,
        onChange: setCodeRequested,
    },
];

<>
    <ComponentOptions checkboxOptions={checkboxOptions} />
    <ComponentPreview
        style={
            isTooltipOpen ? {
                boxSizing: 'border-box',
                height: '116px',
                paddingTop: '84px',
                paddingLeft: '82px',
            } : undefined
        }
    >
        <div style={{width: '169px'}}>
            <SMSInput
                message="Запросить новый код"
                messageTicking="Запросить новый код через"
                data-id="sms-input"
                disabled={disabled}
                hasError={error}
                onRefreshCode={() => {}}
                onSubmitCode={(value) => {}}
                smsCountdownTime={COUNTDOWN_TIME}
            />
        </div>
    </ComponentPreview>
</>
```
