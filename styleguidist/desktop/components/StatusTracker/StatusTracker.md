```jsx
import {StatusTracker} from '@sberbusiness/triplex/desktop/components/StatusTracker/StatusTracker';
import {Title} from '@sberbusiness/triplex/desktop/components/Typography/Title';
import {Text} from '@sberbusiness/triplex/desktop/components/Typography/Text';
import {ETextSize, ETitleSize, EFontType, ELineType} from '@sberbusiness/triplex/desktop/components/Typography/enums';
import {Link, ELinkSize, ELinkType} from '@sberbusiness/triplex/desktop/components/Link/Link';
import {Divider} from '@sberbusiness/triplex/desktop/components/Divider/Divider';
import {MarkerStatus} from '@sberbusiness/triplex/desktop/components/MarkerStatus/MarkerStatus';
import {EMarkerStatus} from '@sberbusiness/triplex/desktop/components/Marker/enums';
import {Button} from '@sberbusiness/triplex/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {Gap} from '@sberbusiness/triplex/desktop/components/Gap/Gap';
import {SMSInput} from '@sberbusiness/triplex/desktop/components/SMSInput/SMSInput';
import {ESMSInputSize} from '@sberbusiness/triplex/desktop/components/SMSInput/enums';
import {SuccessStsIcon64} from '@sberbusiness/icons/SuccessStsIcon64';
import {WaitStsIcon16} from '@sberbusiness/icons/WaitStsIcon16';

const [showSMSInput, setShowSMSInput] = React.useState(false);
const [code, setCode] = React.useState('');
const [disabledRefresh, setDisabledRefresh] = React.useState(false);
const [countdownTimeLeft, setCountdownTimeLeft] = React.useState(0);
const timerId = React.useRef(null);

React.useEffect(() => {
    const timerExpired = countdownTimeLeft <= 0;

    if (timerExpired) {
        return setDisabledRefresh(false);
    }

    timerId.current = setInterval(() => {
        setCountdownTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);

    return () => {
        if (timerId.current) {
            clearInterval(timerId.current)
        }

        if (timerExpired) {
            timerId.current = null;
        }
    };
}, [countdownTimeLeft]);

const renderButton = () => (
    <Button onClick={() => setShowSMSInput(true)} theme={EButtonTheme.GENERAL} size={EButtonSize.MD} block={true}>
        Подписать СМС-кодом
    </Button>
);

const COUNTDOWN_TIME = 10;
const isTicking = countdownTimeLeft > 0;
const formattedTimeLeft = new Date(countdownTimeLeft * 1000).toISOString().substr(14, 5);
const message = isTicking ? `Запросить новый код через ${formattedTimeLeft}` : 'Запросить новый код';

const handleRefresh = React.useCallback(() => {
    setCode('');
    setDisabledRefresh(true);
    setCountdownTimeLeft(COUNTDOWN_TIME);
}, []);

const renderSMSInput = () => (
    <SMSInput size={ESMSInputSize.MD} code={code} onChangeCode={setCode} onSubmitCode={() => setCode('')}>
        <SMSInput.Tooltip message={message}>
            <SMSInput.Refresh
                disabled={disabledRefresh}
                aria-label="Запросить код"
                countdownTime={COUNTDOWN_TIME}
                countdownTimeLeft={countdownTimeLeft}
                onRefresh={handleRefresh}
            />
        </SMSInput.Tooltip>
        <SMSInput.Input placeholder="Введите код" autoFocus={true} />
        <SMSInput.Submit aria-label="Отправить код" />
    </SMSInput>
);

<StatusTracker>
    <StatusTracker.Icon>
        <SuccessStsIcon64 />
    </StatusTracker.Icon>
    <StatusTracker.Body>
        <Title size={ETitleSize.H4}>Title of different length</Title>
        <Gap size={4} />
        <Text tag="div" size={ETextSize.B1} line={ELineType.EXTRA} style={{color: '#565b62'}}>
            Text below the title explaining the status. Maybe two lines. May contain a text link.
        </Text>
        <Gap size={4} />
        <div>
            <Link size={ELinkSize.LG} linkType={ELinkType.TEXT}>
                Text link
            </Link>
        </div>
        <Gap size={8} />
        <Divider marginTopSize={4} marginBottomSize={4} />
        <Gap size={8} />
        <div style={{display: 'flex', margin: '0 -8px'}}>
            <span style={{margin: '0 8px'}}>
                <MarkerStatus status={EMarkerStatus.SUCCESS}>Success Status</MarkerStatus>
            </span>
            <span style={{margin: '0 8px'}}>
                <MarkerStatus status={EMarkerStatus.WARNING}>Warning Status</MarkerStatus>
            </span>
        </div>
        <Gap size={8} />
        <Divider marginTopSize={4} marginBottomSize={4} />
        <Gap size={8} />
        <div style={{display: 'flex', alignItems: 'center', margin: '0 -4px'}}>
            <Text size={ETextSize.B1} line={ELineType.EXTRA} style={{margin: '0 4px', color: '#565b62'}}>
                Text in one line
            </Text>
            <span style={{display: 'inline-flex', alignItems: 'center', margin: '0 4px'}}>
                <WaitStsIcon16 />
                <span style={{marginRight: '4px'}} />
                <Text size={ETextSize.B1} line={ELineType.EXTRA}>
                    Text in one line
                </Text>
            </span>
            <span style={{display: 'inline-flex', margin: '0 4px'}}>
                <Link size={ELinkSize.LG} linkType={ELinkType.TEXT}>
                    Text link
                </Link>
            </span>
        </div>
    </StatusTracker.Body>
    <StatusTracker.Sidebar>
        <div style={{width: '189px'}}>
            {showSMSInput ? renderSMSInput() : renderButton()}
            <Gap size={8} />
            <Text tag="div" size={ETextSize.B2} type={EFontType.SECONDARY} style={{textAlign: 'center'}}>
                Description
            </Text>
        </div>
    </StatusTracker.Sidebar>
</StatusTracker>
```
