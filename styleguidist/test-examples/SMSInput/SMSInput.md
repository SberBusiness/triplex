```jsx noeditor
import React, {useEffect, useState} from 'react';
import ComponentOptions from '../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../common/components/ComponentPreview/ComponentPreview';
import {SMSInput} from '@sberbusiness/triplex/components/SMSInput/SMSInput';
import {ESMSInputSize} from '@sberbusiness/triplex/components/SMSInput/enums';

const COUNTDOWN_TIME = 10;
const [code, setCode] = React.useState('');
const [size, setSize] = useState(ESMSInputSize.MD);
const [error, setError] = useState(false);
const [disabled, setDisabled] = useState(false);
const [filled, setFilled] = useState(false);
const [isTooltipOpen, setIsTooltipOpen] = useState(false);
const [codeRequested, setCodeRequested] = useState(false);
const [countdownTimeLeft, setCountdownTimeLeft] = React.useState(0);

useEffect(() => {
    if (filled) {
        setCode('12345678');
    }
}, [filled]);

useEffect(() => {
    if (isTooltipOpen) {
        const btnRefresh = document.querySelector('[data-id="sms-input"] button');

        if (btnRefresh) {
            btnRefresh.dispatchEvent(new KeyboardEvent('keyup', {code: 'Tab'}));
        }
    }
}, [isTooltipOpen]);

useEffect(() => {
    if (codeRequested) {
        setCountdownTimeLeft(9);
    }
}, [codeRequested]);

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
        id: 'filled',
        label: 'Filled',
        hidden: true,
        checked: filled,
        onChange: setFilled,
    },
    {
        id: 'openTooltip',
        label: 'Open tooltip',
        hidden: true,
        checked: isTooltipOpen,
        onChange: setIsTooltipOpen,
    },
    {
        id: 'codeRequested',
        label: 'Request code',
        hidden: true,
        checked: codeRequested,
        onChange: setCodeRequested,
    },
];

const inputOptions = [
    {
        id: 'size',
        value: size,
        onChange: setSize,
        hidden: true,
    },
];

const isTicking = countdownTimeLeft > 0;
const formattedTimeLeft = new Date(countdownTimeLeft * 1000).toISOString().substr(14, 5);
const message = isTicking ? `Запросить новый код через ${formattedTimeLeft}` : 'Запросить новый код';

<>
    <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions}/>
    <ComponentPreview
        style={
            isTooltipOpen
                ? {
                    boxSizing: 'border-box',
                    height: '116px',
                    paddingTop: '84px',
                    paddingLeft: '82px',
                }
                : undefined
        }
    >
        <div style={{width: '169px'}}>
            <SMSInput
                code={code}
                disabled={disabled}
                error={error}
                size={size}
                onChangeCode={setCode}
                onSubmitCode={() => {
                }}
                data-id="sms-input"
            >
                <SMSInput.Tooltip message={message}>
                    <SMSInput.Refresh
                        countdownTime={COUNTDOWN_TIME}
                        countdownTimeLeft={countdownTimeLeft}
                        onRefresh={() => {
                        }}
                    />
                </SMSInput.Tooltip>
                <SMSInput.Input/>
                <SMSInput.Submit/>
            </SMSInput>
        </div>
    </ComponentPreview>
</>
```
