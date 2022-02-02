```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency 
    componentTitle="StatusTracker"
    isMobileComponent={false} 
/>
```

### Последовательность шагов с вариантами дочерних элементов

```jsx
import React from 'react';
import {StatusTracker} from '@sbbol/web-library/desktop/components/StatusTracker/StatusTracker';
import {StatusTrackerStatus, StatusTrackerStepNumber} from '@sbbol/web-library/desktop/components/StatusTracker/enums';
import {ELinkSize, ELinkType, Link} from '@sbbol/web-library/desktop/components/Link/Link';

const renderSteps = (count) => {
    const steps = [];
    for (i = 1; i <= count; i++) {
        steps.push(<StatusTracker.Steps.Step>{`Подсказка ${i}`}</StatusTracker.Steps.Step>);
    }
    return <StatusTracker.Steps>{steps}</StatusTracker.Steps>;
};

const renderWrapper = (statusTrackerExamples) => {
    const result = statusTrackerExamples.map((ste) => {
        return (
            <div
                style={{
                    margin: '0 4px 4px 0',
                }}
            >
                {ste}
            </div>
        );
    });

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
            }}
        >
            {result}
        </div>
    );
};

<div>
    {renderWrapper([
        <StatusTracker currentStep={StatusTrackerStepNumber.ONE} status={StatusTrackerStatus.WAIT}>
            {renderSteps(3)}
            <StatusTracker.Body>
                <StatusTracker.Body.Text>Длинный текст описания статуса в две строки без подвала</StatusTracker.Body.Text>
            </StatusTracker.Body>
        </StatusTracker>,

        <StatusTracker currentStep={StatusTrackerStepNumber.TWO} status={StatusTrackerStatus.WAIT}>
            {renderSteps(3)}
            <StatusTracker.Body>
                <StatusTracker.Body.Text>Длинный текст описания статуса в две строки</StatusTracker.Body.Text>
            </StatusTracker.Body>
            <StatusTracker.Footer>
                <StatusTracker.Footer.Text>Текст пояснения статуса в две строки, также в две строки</StatusTracker.Footer.Text>
            </StatusTracker.Footer>
        </StatusTracker>,

        <StatusTracker currentStep={StatusTrackerStepNumber.THREE} status={StatusTrackerStatus.WAIT}>
            {renderSteps(3)}
            <StatusTracker.Body showIcon data-test-id="three_wait">
                <StatusTracker.Body.Text>Длинный текст описания статуса в две строки</StatusTracker.Body.Text>
            </StatusTracker.Body>
            <StatusTracker.Footer>
                <Link linkType={ELinkType.TEXT} size={ELinkSize.SM} href="javascript:void(0)">текст ссылки</Link>
            </StatusTracker.Footer>
        </StatusTracker>,

        <StatusTracker currentStep={StatusTrackerStepNumber.FOUR} status={StatusTrackerStatus.WAIT}>
            {renderSteps(4)}
            <StatusTracker.Body showIcon data-test-id="four_wait">
                <StatusTracker.Body.Text>Длинный текст описания статуса в две строки</StatusTracker.Body.Text>
            </StatusTracker.Body>
            <StatusTracker.Footer>
                <StatusTracker.Footer.Text>Текст пояснения статуса в две строки и, если нужно, к нему</StatusTracker.Footer.Text>
                <Link linkType={ELinkType.TEXT} size={ELinkSize.SM} href="javascript:void(0)">текст ссылки</Link>
            </StatusTracker.Footer>
        </StatusTracker>,
    ])}
</div>
```

### Warning состояния

```jsx
import React from 'react';
import {StatusTracker} from '@sbbol/web-library/desktop/components/StatusTracker/StatusTracker';
import {StatusTrackerStatus, StatusTrackerStepNumber} from '@sbbol/web-library/desktop/components/StatusTracker/enums';
import {ELinkSize, ELinkType, Link} from '@sbbol/web-library/desktop/components/Link/Link';
import {Button} from '@sbbol/web-library/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sbbol/web-library/desktop/components/Button/enums';
import {Gap} from '@sbbol/web-library/desktop/components/Gap/Gap';


const renderSteps = (count) => {
    const steps = [];
    for (i = 1; i <= count; i++) {
        steps.push(<StatusTracker.Steps.Step>{`Подсказка ${i}`}</StatusTracker.Steps.Step>);
    }

    return <StatusTracker.Steps>{steps}</StatusTracker.Steps>;
};

const renderWrapper = (statusTrackerExamples) => {
    const result = statusTrackerExamples.map((ste) => {
        return (
            <div
                style={{
                    margin: '0 4px 4px 0',
                }}
            >
                {ste}
            </div>
        );
    });

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
            }}
        >
            {result}
        </div>
    );
};

<div>
    {renderWrapper([
        <StatusTracker currentStep={StatusTrackerStepNumber.ONE} status={StatusTrackerStatus.WARNING}>
            {renderSteps(4)}
            <StatusTracker.Body showIcon data-test-id="one_alert">
                <StatusTracker.Body.Text>Длинный текст описания статуса в две строки</StatusTracker.Body.Text>
            </StatusTracker.Body>
            <StatusTracker.Footer>
                <StatusTracker.Footer.Text>Текст пояснения статуса в две строки, также в две строки</StatusTracker.Footer.Text>
            </StatusTracker.Footer>
        </StatusTracker>,

        <StatusTracker currentStep={StatusTrackerStepNumber.TWO} status={StatusTrackerStatus.WARNING}>
            {renderSteps(4)}
            <StatusTracker.Body showIcon data-test-id="two_alert">
                <StatusTracker.Body.Text>Длинный текст описания статуса в две строки</StatusTracker.Body.Text>
                <Gap size={16} />
                <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                    Button Name
                </Button>
            </StatusTracker.Body>
            <StatusTracker.Footer>
                <Link linkType={ELinkType.TEXT} size={ELinkSize.SM} href="javascript:void(0)">текст ссылки</Link>
            </StatusTracker.Footer>
        </StatusTracker>,
    ])}
</div>
```

### Состояния успеха/ошибки (могут возникнуть только на последнем шаге)

```jsx
import React from 'react';
import {StatusTracker} from '@sbbol/web-library/desktop/components/StatusTracker/StatusTracker';
import {StatusTrackerStatus, StatusTrackerStepNumber} from '@sbbol/web-library/desktop/components/StatusTracker/enums';
import {ELinkSize, ELinkType, Link} from '@sbbol/web-library/desktop/components/Link/Link';
import {Button} from '@sbbol/web-library/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sbbol/web-library/desktop/components/Button/enums';
import {Gap} from '@sbbol/web-library/desktop/components/Gap/Gap';

const renderSteps = (count) => {
    const steps = [];
    for (i = 1; i <= count; i++) {
        steps.push(<StatusTracker.Steps.Step>{`Подсказка ${i}`}</StatusTracker.Steps.Step>);
    }

    return <StatusTracker.Steps>{steps}</StatusTracker.Steps>;
};

const renderWrapper = (statusTrackerExamples) => {
    const result = statusTrackerExamples.map((ste) => {
        return (
            <div
                style={{
                    margin: '0 4px 4px 0',
                }}
            >
                {ste}
            </div>
        );
    });

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
            }}
        >
            {result}
        </div>
    );
};

<div>
    {renderWrapper([
        <StatusTracker currentStep={StatusTrackerStepNumber.FOUR} status={StatusTrackerStatus.SUCCESS}>
            {renderSteps(4)}
            <StatusTracker.Body showIcon data-test-id="four_ok">
                <StatusTracker.Body.Text>Длинный текст описания статуса в две строки</StatusTracker.Body.Text>
                <Gap size={16} />
                <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                    Button Name
                </Button>
            </StatusTracker.Body>
            <StatusTracker.Footer>
                <StatusTracker.Footer.Text>Текст пояснения статуса в две строки, также в две строки</StatusTracker.Footer.Text>
            </StatusTracker.Footer>
        </StatusTracker>,
        <StatusTracker currentStep={StatusTrackerStepNumber.FOUR} status={StatusTrackerStatus.ERROR}>
            {renderSteps(4)}
            <StatusTracker.Body showIcon data-test-id="four_error">
                <StatusTracker.Body.Text>Длинный текст описания статуса в две строки</StatusTracker.Body.Text>
                <Gap size={16} />
                <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                    Button Name
                </Button>
            </StatusTracker.Body>
            <StatusTracker.Footer>
                <Link linkType={ELinkType.TEXT} size={ELinkSize.SM} href="javascript:void(0)">Текст ссылки</Link>
            </StatusTracker.Footer>
        </StatusTracker>,
        <StatusTracker currentStep={StatusTrackerStepNumber.THREE} status={StatusTrackerStatus.SUCCESS}>
            {renderSteps(3)}
            <StatusTracker.Body showIcon data-test-id="three_ok">
                <StatusTracker.Body.Text>Длинный текст описания статуса в две строки</StatusTracker.Body.Text>
                <Gap size={16} />
                <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                    Button Name
                </Button>
            </StatusTracker.Body>
            <StatusTracker.Footer>
                <StatusTracker.Footer.Text>Текст пояснения статуса в две строки, также в две строки</StatusTracker.Footer.Text>
            </StatusTracker.Footer>
        </StatusTracker>,
        <StatusTracker currentStep={StatusTrackerStepNumber.THREE} status={StatusTrackerStatus.ERROR}>
            {renderSteps(3)}
            <StatusTracker.Body showIcon data-test-id="three_error">
                <StatusTracker.Body.Text>Длинный текст описания статуса в две строки</StatusTracker.Body.Text>
                <Gap size={16} />
                <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                    Button Name
                </Button>
            </StatusTracker.Body>
            <StatusTracker.Footer>
                <Link linkType={ELinkType.TEXT} size={ELinkSize.SM} href="javascript:void(0)">текст ссылки</Link>
            </StatusTracker.Footer>
        </StatusTracker>,
    ])}
</div>
```

### Использование SMSInput

```jsx
import React from 'react';
import {StatusTracker} from '@sbbol/web-library/desktop/components/StatusTracker/StatusTracker';
import {StatusTrackerStatus, StatusTrackerStepNumber} from '@sbbol/web-library/desktop/components/StatusTracker/enums';
import {SMSInput} from '@sbbol/web-library/desktop/components/SMSInput/SMSInput';
import {Gap} from '@sbbol/web-library/desktop/components/Gap/Gap';

const COUNTDOWN_TIME = 10;

const renderSteps = (count) => {
    const steps = [];
    for (i = 1; i <= count; i++) {
        steps.push(<StatusTracker.Steps.Step>{`Подсказка ${i}`}</StatusTracker.Steps.Step>);
    }

    return <StatusTracker.Steps>{steps}</StatusTracker.Steps>;
};

const renderWrapper = (statusTrackerExamples) => {
    const result = statusTrackerExamples.map((ste) => {
        return (
            <div
                style={{
                    margin: '0 4px 4px 0',
                }}
            >
                {ste}
            </div>
        );
    });

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
            }}
        >
            {result}
        </div>
    );
};

<div>
    {renderWrapper([
        <StatusTracker currentStep={StatusTrackerStepNumber.FOUR} status={StatusTrackerStatus.WAIT}>
            {renderSteps(4)}
            <StatusTracker.Body showIcon data-test-id="four_wait">
                <StatusTracker.Body.Text>Длинный текст описания статуса в две строки</StatusTracker.Body.Text>
                <Gap size={16} />
                <div style={{width: '169px'}}>
                    <SMSInput
                        message="Запросить новый код"
                        messageTicking="Запросить новый код через"
                        onRefreshCode={() => {}}
                        onSubmitCode={() => alert('Кнопка нажата!')}
                        smsCountdownTime={COUNTDOWN_TIME}
                    />
                </div>
            </StatusTracker.Body>
            <StatusTracker.Footer>
                <StatusTracker.Footer.Text>Текст пояснения статуса в две строки, также в две строки</StatusTracker.Footer.Text>
            </StatusTracker.Footer>
        </StatusTracker>,
    ])}
</div>
```

### Использование MarkerStatus

```jsx
import React from 'react';
import {StatusTracker} from '@sbbol/web-library/desktop/components/StatusTracker/StatusTracker';
import {StatusTrackerStatus, StatusTrackerStepNumber} from '@sbbol/web-library/desktop/components/StatusTracker/enums';
import {MarkerStatus} from '@sbbol/web-library/desktop/components/MarkerStatus/MarkerStatus';
import {EMarkerStatus} from '@sbbol/web-library/desktop/components/Marker/enums';
import {Button} from '@sbbol/web-library/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sbbol/web-library/desktop/components/Button/enums';
import {Gap} from '@sbbol/web-library/desktop/components/Gap/Gap';

const renderSteps = (count) => {
    const steps = [];
    for (i = 1; i <= count; i++) {
        steps.push(<StatusTracker.Steps.Step>{`Подсказка ${i}`}</StatusTracker.Steps.Step>);
    }

    return <StatusTracker.Steps>{steps}</StatusTracker.Steps>;
};

const renderWrapper = (statusTrackerExamples) => {
    const result = statusTrackerExamples.map((ste) => {
        return (
            <div
                style={{
                    margin: '0 4px 4px 0',
                }}
            >
                {ste}
            </div>
        );
    });

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
            }}
        >
            {result}
        </div>
    );
};

<div>
    {renderWrapper([
        <StatusTracker currentStep={StatusTrackerStepNumber.ONE} status={StatusTrackerStatus.WARNING}>
            {renderSteps(4)}
            <StatusTracker.Body showIcon data-test-id="one_alert">
                <MarkerStatus status={EMarkerStatus.SUCCESS}>Первая подпись есть</MarkerStatus>
                <MarkerStatus status={EMarkerStatus.WAITING}>Ожидается ваша подпись</MarkerStatus>
                <Gap size={16} />
                <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                    Подписать
                </Button>
            </StatusTracker.Body>
            <StatusTracker.Footer>
                <StatusTracker.Footer.Text>Для отправки документа не хватает ещё вашей подписи.</StatusTracker.Footer.Text>
            </StatusTracker.Footer>
        </StatusTracker>,
    ])}
</div>
```

