```jsx
import {ESMSInputSize} from '@sberbusiness/triplex/components/SMSInput/enums';

const [code, setCode] = React.useState('');
const [disabledRefresh, setDisabledRefresh] = React.useState(false);
const [countdownTimeLeft, setCountdownTimeLeft] = React.useState(0);
const timerId = React.useRef(null);

const COUNTDOWN_TIME = 10;

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

<div style={{width: '169px'}}>
    <SMSInput
        size={ESMSInputSize.MD}
        code={code}
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
        <SMSInput.Input
            placeholder="Введите код"
            aria-label="Введите код"
            data-test-id="SMSInput__input"
        />
        <SMSInput.Submit
            aria-label="Отправить код"
            data-test-id="SMSInput__button_submit"
        />
    </SMSInput>
</div>
```

### Small size

```jsx
import {ESMSInputSize} from '@sberbusiness/triplex/components/SMSInput/enums';

const [code, setCode] = React.useState('');
const [disabledRefresh, setDisabledRefresh] = React.useState(false);
const [countdownTimeLeft, setCountdownTimeLeft] = React.useState(0);
const timerId = React.useRef(null);

const COUNTDOWN_TIME = 10;

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

<div style={{width: '169px'}}>
    <SMSInput
        size={ESMSInputSize.SM}
        code={code}
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
        <SMSInput.Input
            placeholder="Введите код"
            aria-label="Введите код"
            data-test-id="SMSInput__input"
        />
        <SMSInput.Submit
            aria-label="Отправить код"
            data-test-id="SMSInput__button_submit"
        />
    </SMSInput>
</div>
```

### Disabled state

```jsx
import {ESMSInputSize} from '@sberbusiness/triplex/components/SMSInput/enums';

const [code, setCode] = React.useState('');

const COUNTDOWN_TIME = 10;

<div style={{width: '169px'}}>
    <SMSInput
        size={ESMSInputSize.MD}
        code={code}
        onChangeCode={setCode}
        disabled
    >
        <SMSInput.Tooltip message="Запросить новый код">
            <SMSInput.Refresh
                countdownTime={COUNTDOWN_TIME}
                countdownTimeLeft={0}
                aria-label="Запросить код"
                data-test-id="SMSInput__button_refresh"
            />
        </SMSInput.Tooltip>
        <SMSInput.Input
            placeholder="Введите код"
            aria-label="Введите код"
            data-test-id="SMSInput__input"
        />
        <SMSInput.Submit
            aria-label="Отправить код"
            data-test-id="SMSInput__button_submit"
        />
    </SMSInput>
</div>
```

### Error state

```jsx
import {ESMSInputSize} from '@sberbusiness/triplex/components/SMSInput/enums';

const [code, setCode] = React.useState('');
const [disabledRefresh, setDisabledRefresh] = React.useState(false);
const [countdownTimeLeft, setCountdownTimeLeft] = React.useState(0);
const timerId = React.useRef(null);

const COUNTDOWN_TIME = 10;

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

<div style={{width: '169px'}}>
    <SMSInput
        size={ESMSInputSize.MD}
        code={code}
        onChangeCode={setCode}
        onSubmitCode={handleSubmit}
        error
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
        <SMSInput.Input
            placeholder="Неверный код"
            aria-label="Неверный код"
            data-test-id="SMSInput__input"
        />
        <SMSInput.Submit
            aria-label="Отправить код"
            data-test-id="SMSInput__button_submit"
        />
    </SMSInput>
</div>
```

### Disabled submit button

```jsx
import {ESMSInputSize} from '@sberbusiness/triplex/components/SMSInput/enums';

const [code, setCode] = React.useState('');
const [disabledRefresh, setDisabledRefresh] = React.useState(false);
const [countdownTimeLeft, setCountdownTimeLeft] = React.useState(0);
const timerId = React.useRef(null);

const COUNTDOWN_TIME = 10;

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

<div style={{width: '169px'}}>
    <SMSInput
        size={ESMSInputSize.MD}
        code={code}
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
        <SMSInput.Input
            placeholder="Введите код"
            aria-label="Введите код"
            data-test-id="SMSInput__input"
        />
        <SMSInput.Submit
            aria-label="Отправить код"
            data-test-id="SMSInput__button_submit"
            disabled
        />
    </SMSInput>
</div>
```
