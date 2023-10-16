```jsx
import {ESMSInputSize} from '@sberbusiness/triplex/components/SMSInput/enums';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

const COUNTDOWN_TIME = 10;

const timerId = React.useRef(null);
const [code, setCode] = React.useState('');
const [size, setSize] = React.useState(ESMSInputSize.MD);
const [error, setError] = React.useState(false);
const [disabled, setDisabled] = React.useState(false);
const [disabledRefresh, setDisabledRefresh] = React.useState(false);
const [disabledSubmit, setDisabledSubmit] = React.useState(false);
const [countdownTimeLeft, setCountdownTimeLeft] = React.useState(0);

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Select
            value={size}
            setValue={setSize}
            options={Object.values(ESMSInputSize)}
        >
            Size
        </ComponentControlPanel.Select>
        <ComponentControlPanel.Checkbox checked={disabled} setChecked={setDisabled}>
            Disabled
        </ComponentControlPanel.Checkbox>
        <ComponentControlPanel.Checkbox checked={disabledRefresh} setChecked={setDisabledRefresh}>
            Disabled (refresh button)
        </ComponentControlPanel.Checkbox>
        <ComponentControlPanel.Checkbox checked={disabledSubmit} setChecked={setDisabledSubmit}>
            Disabled (submit button)
        </ComponentControlPanel.Checkbox>
        <ComponentControlPanel.Checkbox checked={error} setChecked={setError}>
            Error
        </ComponentControlPanel.Checkbox>
    </ComponentControlPanel>
);

React.useEffect(() => {
    const timerExpired = countdownTimeLeft <= 0;
    if (timerExpired) {
        setDisabledRefresh(false);
        return;
    }
    timerId.current = setInterval(() => {
        setCountdownTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);
    return () => {
        if (timerId.current) {
            clearInterval(timerId.current);
        }
        if (timerExpired) {
            timerId.current = null;
        }
    };
}, [countdownTimeLeft]);

const handleRefresh = () => {
    setCode('');
    setDisabledRefresh(true);
    setCountdownTimeLeft(COUNTDOWN_TIME);
};

const handleSubmit = () => setCode('');

const isTicking = countdownTimeLeft > 0;
const formattedTimeLeft = new Date(countdownTimeLeft * 1000).toISOString().substr(14, 5);
const message = isTicking ? `Запросить новый код через ${formattedTimeLeft}` : 'Запросить новый код';

<>
    {renderControlPanel()}
    <div style={{width: '169px'}}>
        <SMSInput
            code={code}
            disabled={disabled}
            error={error}
            size={size}
            onChangeCode={setCode}
            onSubmitCode={handleSubmit}
        >
            <SMSInput.Tooltip message={message}>
                <SMSInput.Refresh
                    countdownTime={COUNTDOWN_TIME}
                    countdownTimeLeft={countdownTimeLeft}
                    disabled={disabledRefresh}
                    onRefresh={handleRefresh}
                    aria-label="Запросить код"
                    data-test-id="SMSInput__button_refresh"
                />
            </SMSInput.Tooltip>
            <SMSInput.Input aria-label="Введите код" placeholder={error ? 'Неверный код' : 'Введите код'} data-test-id="SMSInput__input" />
            <SMSInput.Submit
                disabled={disabledSubmit}
                aria-label="Отправить код"
                data-test-id="SMSInput__button_submit"
            />
        </SMSInput>
    </div>
</>
```
