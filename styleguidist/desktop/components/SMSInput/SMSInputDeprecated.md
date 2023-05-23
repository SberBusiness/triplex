```jsx
import {SMSInputDeprecated} from '@sberbusiness/triplex/desktop/components/SMSInput/SMSInputDeprecated';
import {ESMSInputSize} from '@sberbusiness/triplex/desktop/components/SMSInput/enums';
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';

const [size, setSize] = React.useState(ESMSInputSize.MD);
const [hasError, setHasError] = React.useState(false);
const [disabled, setDisabled] = React.useState(false);
const [disabledSubmit, setDisabledSubmit] = React.useState(false);

const renderExampleControlPanel = () => (
    <ExampleControlPanel>
        <select value={size} onChange={(event) => setSize(event.target.value)} data-label="Size">
            {Object.values(ESMSInputSize).map((value, index) => (
                <option key={index}>{value}</option>
            ))}
        </select>
        <input type="checkbox" checked={hasError} onChange={(event) => setHasError(event.target.checked)} data-label="Has error" />
        <input type="checkbox" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} data-label="Disabled" />
        <input
            type="checkbox"
            checked={disabledSubmit}
            onChange={(event) => setDisabledSubmit(event.target.checked)}
            data-label="Disabled (submit button)"
        />
    </ExampleControlPanel>
);

<>
    {renderExampleControlPanel()}
    <div style={{width: '169px'}}>
        <SMSInputDeprecated
            size={size}
            message="Запросить новый код"
            messageTicking="Запросить новый код через"
            onRefreshCode={() => {}}
            onSubmitCode={() => {
                setDisabledSubmit(true);
                setTimeout(() => {
                    setHasError(true);
                    setDisabledSubmit(false);
                }, 1000);
            }}
            smsCountdownTime={10}
            hasError={hasError}
            disabled={disabled}
            disabledSubmit={disabledSubmit}
        />
    </div>
</>
```

### SMSInputDeprecated Controlled code

```jsx
import {SMSInputDeprecated} from '@sberbusiness/triplex/desktop/components/SMSInput/SMSInputDeprecated';
import {ESMSInputSize} from '@sberbusiness/triplex/desktop/components/SMSInput/enums';

const [code, setCode] = React.useState('');

<>
    <div style={{width: '169px'}}>
        <SMSInputDeprecated
            code={code}
            size={ESMSInputSize.MD}
            message="Запросить новый код"
            messageTicking="Запросить новый код через"
            onChangeCode={(code) => setCode(code)}
            onRefreshCode={() => {}}
            onSubmitCode={() => setCode('')}
            smsCountdownTime={10}
        />
    </div>
</>
```

### SMSInputDeprecated Controlled tooltip

```jsx
import {SMSInputDeprecated} from '@sberbusiness/triplex/desktop/components/SMSInput/SMSInputDeprecated';
import {ESMSInputSize} from '@sberbusiness/triplex/desktop/components/SMSInput/enums';
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';

const [isOpen, setOpen] = React.useState(false);
const [toggleType, setToggleType] = React.useState('hover');

const renderExampleControlPanel = () => (
    <ExampleControlPanel>
        <input type="checkbox" checked={isOpen} onChange={(event) => setOpen(event.target.checked)} data-label="isOpen" />
        <input type="radio" checked={toggleType === 'hover'} onChange={(event) => setToggleType('hover')} data-label="Toggle by hover" />
        <input type="radio" checked={toggleType === 'click'} onChange={(event) => setToggleType('click')} data-label="Toggle by click" />
    </ExampleControlPanel>
);

<>
    {renderExampleControlPanel()}
    <div style={{width: '169px'}}>
        <SMSInputDeprecated
            isTooltipOpen={isOpen}
            toggleTooltip={next => setOpen(next)}
            tooltipToggleType={toggleType}
            size={ESMSInputSize.MD}
            message="Запросить новый код"
            messageTicking="Запросить новый код через"
            onRefreshCode={() => {}}
            onSubmitCode={() => {}}
            smsCountdownTime={10}
        />
    </div>
</>
```
