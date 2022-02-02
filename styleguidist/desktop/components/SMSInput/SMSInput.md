```jsx
const COUNTDOWN_TIME = 10;

const message = 'Запросить новый код';
const messageTicking = 'Запросить новый код через';

const [disabledSubmit, setDisabledSubmit] = React.useState(false);
const [hasError, setError] = React.useState(false);

<>
    <div style={{width: '169px'}}>
        <SMSInput
            message={message}
            messageTicking={messageTicking}
            disabledSubmit={disabledSubmit}
            hasError={hasError}
            onChange={() => {
                if (hasError) {
                    setError(false);
                }
            }}
            onRefreshCode={() => {
                if (hasError) {
                    setError(false);
                }
            }}
            onSubmitCode={(value) => {
                setDisabledSubmit(true);
                setTimeout(() => {
                    setError(true);
                    setDisabledSubmit(false);
                }, 1000);
            }}
            smsCountdownTime={COUNTDOWN_TIME}
        />
    </div>
    <br />
    <div style={{width: '169px'}}>
        <SMSInput
            message={message}
            messageTicking={messageTicking}
            hasError
            onRefreshCode={() => {}}
            onSubmitCode={(value) => {}}
            smsCountdownTime={COUNTDOWN_TIME}
        />
    </div>
    <br />
    <div style={{width: '169px'}}>
        <SMSInput
            message={message}
            messageTicking={messageTicking}
            disabled
            onRefreshCode={() => {}}
            onSubmitCode={(value) => {}}
            smsCountdownTime={COUNTDOWN_TIME}
        />
    </div>
</>
```
