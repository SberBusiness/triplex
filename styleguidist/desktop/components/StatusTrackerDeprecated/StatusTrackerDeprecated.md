```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency 
    componentTitle="StatusTrackerDeprecated"
    isMobileComponent={false} 
/>
```

### Последовательность шагов с вариантами дочерних элементов

```jsx
import React from 'react';
import {StatusTrackerDeprecated} from '@sberbusiness/triplex/desktop/components/StatusTrackerDeprecated/StatusTrackerDeprecated';
import {
    StatusTrackerDeprecatedStatus,
    StatusTrackerDeprecatedStepNumber,
} from '@sberbusiness/triplex/desktop/components/StatusTrackerDeprecated/enums';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/desktop/components/Link/Link';

const renderSteps = (count) => {
    const steps = [];
    for (let i = 1; i <= count; i++) {
        steps.push(<StatusTrackerDeprecated.Steps.Step>{`Подсказка ${i}`}</StatusTrackerDeprecated.Steps.Step>);
    }
    return <StatusTrackerDeprecated.Steps>{steps}</StatusTrackerDeprecated.Steps>;
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
        <StatusTrackerDeprecated currentStep={StatusTrackerDeprecatedStepNumber.ONE} status={StatusTrackerDeprecatedStatus.WAIT}>
            {renderSteps(3)}
            <StatusTrackerDeprecated.Body>
                <StatusTrackerDeprecated.Body.Text>
                    Длинный текст описания статуса в две строки без подвала
                </StatusTrackerDeprecated.Body.Text>
            </StatusTrackerDeprecated.Body>
        </StatusTrackerDeprecated>,

        <StatusTrackerDeprecated currentStep={StatusTrackerDeprecatedStepNumber.TWO} status={StatusTrackerDeprecatedStatus.WAIT}>
            {renderSteps(3)}
            <StatusTrackerDeprecated.Body>
                <StatusTrackerDeprecated.Body.Text>Длинный текст описания статуса в две строки</StatusTrackerDeprecated.Body.Text>
            </StatusTrackerDeprecated.Body>
            <StatusTrackerDeprecated.Footer>
                <StatusTrackerDeprecated.Footer.Text>
                    Текст пояснения статуса в две строки, также в две строки
                </StatusTrackerDeprecated.Footer.Text>
            </StatusTrackerDeprecated.Footer>
        </StatusTrackerDeprecated>,

        <StatusTrackerDeprecated currentStep={StatusTrackerDeprecatedStepNumber.THREE} status={StatusTrackerDeprecatedStatus.WAIT}>
            {renderSteps(3)}
            <StatusTrackerDeprecated.Body showIcon data-test-id="three_wait">
                <StatusTrackerDeprecated.Body.Text>Длинный текст описания статуса в две строки</StatusTrackerDeprecated.Body.Text>
            </StatusTrackerDeprecated.Body>
            <StatusTrackerDeprecated.Footer>
                <Link linkType={ELinkType.TEXT} size={ELinkSize.SM} href="javascript:void(0)">
                    текст ссылки
                </Link>
            </StatusTrackerDeprecated.Footer>
        </StatusTrackerDeprecated>,

        <StatusTrackerDeprecated currentStep={StatusTrackerDeprecatedStepNumber.FOUR} status={StatusTrackerDeprecatedStatus.WAIT}>
            {renderSteps(4)}
            <StatusTrackerDeprecated.Body showIcon data-test-id="four_wait">
                <StatusTrackerDeprecated.Body.Text>Длинный текст описания статуса в две строки</StatusTrackerDeprecated.Body.Text>
            </StatusTrackerDeprecated.Body>
            <StatusTrackerDeprecated.Footer>
                <StatusTrackerDeprecated.Footer.Text>Текст пояснения статуса в две строки и, если нужно, к нему</StatusTrackerDeprecated.Footer.Text>
                <Link linkType={ELinkType.TEXT} size={ELinkSize.SM} href="javascript:void(0)">
                    текст ссылки
                </Link>
            </StatusTrackerDeprecated.Footer>
        </StatusTrackerDeprecated>,
    ])}
</div>
```

### Warning состояния

```jsx
import React from 'react';
import {StatusTrackerDeprecated} from '@sberbusiness/triplex/desktop/components/StatusTrackerDeprecated/StatusTrackerDeprecated';
import {
    StatusTrackerDeprecatedStatus,
    StatusTrackerDeprecatedStepNumber,
} from '@sberbusiness/triplex/desktop/components/StatusTrackerDeprecated/enums';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/desktop/components/Link/Link';
import {Button} from '@sberbusiness/triplex/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {Gap} from '@sberbusiness/triplex/desktop/components/Gap/Gap';

const renderSteps = (count) => {
    const steps = [];
    for (let i = 1; i <= count; i++) {
        steps.push(<StatusTrackerDeprecated.Steps.Step>{`Подсказка ${i}`}</StatusTrackerDeprecated.Steps.Step>);
    }

    return <StatusTrackerDeprecated.Steps>{steps}</StatusTrackerDeprecated.Steps>;
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
        <StatusTrackerDeprecated currentStep={StatusTrackerDeprecatedStepNumber.ONE} status={StatusTrackerDeprecatedStatus.WARNING}>
            {renderSteps(4)}
            <StatusTrackerDeprecated.Body showIcon data-test-id="one_alert">
                <StatusTrackerDeprecated.Body.Text>Длинный текст описания статуса в две строки</StatusTrackerDeprecated.Body.Text>
            </StatusTrackerDeprecated.Body>
            <StatusTrackerDeprecated.Footer>
                <StatusTrackerDeprecated.Footer.Text>
                    Текст пояснения статуса в две строки, также в две строки
                </StatusTrackerDeprecated.Footer.Text>
            </StatusTrackerDeprecated.Footer>
        </StatusTrackerDeprecated>,

        <StatusTrackerDeprecated currentStep={StatusTrackerDeprecatedStepNumber.TWO} status={StatusTrackerDeprecatedStatus.WARNING}>
            {renderSteps(4)}
            <StatusTrackerDeprecated.Body showIcon data-test-id="two_alert">
                <StatusTrackerDeprecated.Body.Text>Длинный текст описания статуса в две строки</StatusTrackerDeprecated.Body.Text>
                <Gap size={16} />
                <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                    Button Name
                </Button>
            </StatusTrackerDeprecated.Body>
            <StatusTrackerDeprecated.Footer>
                <Link linkType={ELinkType.TEXT} size={ELinkSize.SM} href="javascript:void(0)">
                    текст ссылки
                </Link>
            </StatusTrackerDeprecated.Footer>
        </StatusTrackerDeprecated>,
    ])}
</div>
```

### Состояния успеха/ошибки (могут возникнуть только на последнем шаге)

```jsx
import React from 'react';
import {StatusTrackerDeprecated} from '@sberbusiness/triplex/desktop/components/StatusTrackerDeprecated/StatusTrackerDeprecated';
import {
    StatusTrackerDeprecatedStatus,
    StatusTrackerDeprecatedStepNumber,
} from '@sberbusiness/triplex/desktop/components/StatusTrackerDeprecated/enums';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/desktop/components/Link/Link';
import {Button} from '@sberbusiness/triplex/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {Gap} from '@sberbusiness/triplex/desktop/components/Gap/Gap';

const renderSteps = (count) => {
    const steps = [];
    for (let i = 1; i <= count; i++) {
        steps.push(<StatusTrackerDeprecated.Steps.Step>{`Подсказка ${i}`}</StatusTrackerDeprecated.Steps.Step>);
    }

    return <StatusTrackerDeprecated.Steps>{steps}</StatusTrackerDeprecated.Steps>;
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
        <StatusTrackerDeprecated currentStep={StatusTrackerDeprecatedStepNumber.FOUR} status={StatusTrackerDeprecatedStatus.SUCCESS}>
            {renderSteps(4)}
            <StatusTrackerDeprecated.Body showIcon data-test-id="four_ok">
                <StatusTrackerDeprecated.Body.Text>Длинный текст описания статуса в две строки</StatusTrackerDeprecated.Body.Text>
                <Gap size={16} />
                <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                    Button Name
                </Button>
            </StatusTrackerDeprecated.Body>
            <StatusTrackerDeprecated.Footer>
                <StatusTrackerDeprecated.Footer.Text>
                    Текст пояснения статуса в две строки, также в две строки
                </StatusTrackerDeprecated.Footer.Text>
            </StatusTrackerDeprecated.Footer>
        </StatusTrackerDeprecated>,
        <StatusTrackerDeprecated currentStep={StatusTrackerDeprecatedStepNumber.FOUR} status={StatusTrackerDeprecatedStatus.ERROR}>
            {renderSteps(4)}
            <StatusTrackerDeprecated.Body showIcon data-test-id="four_error">
                <StatusTrackerDeprecated.Body.Text>Длинный текст описания статуса в две строки</StatusTrackerDeprecated.Body.Text>
                <Gap size={16} />
                <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                    Button Name
                </Button>
            </StatusTrackerDeprecated.Body>
            <StatusTrackerDeprecated.Footer>
                <Link linkType={ELinkType.TEXT} size={ELinkSize.SM} href="javascript:void(0)">
                    Текст ссылки
                </Link>
            </StatusTrackerDeprecated.Footer>
        </StatusTrackerDeprecated>,
        <StatusTrackerDeprecated currentStep={StatusTrackerDeprecatedStepNumber.THREE} status={StatusTrackerDeprecatedStatus.SUCCESS}>
            {renderSteps(3)}
            <StatusTrackerDeprecated.Body showIcon data-test-id="three_ok">
                <StatusTrackerDeprecated.Body.Text>Длинный текст описания статуса в две строки</StatusTrackerDeprecated.Body.Text>
                <Gap size={16} />
                <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                    Button Name
                </Button>
            </StatusTrackerDeprecated.Body>
            <StatusTrackerDeprecated.Footer>
                <StatusTrackerDeprecated.Footer.Text>
                    Текст пояснения статуса в две строки, также в две строки
                </StatusTrackerDeprecated.Footer.Text>
            </StatusTrackerDeprecated.Footer>
        </StatusTrackerDeprecated>,
        <StatusTrackerDeprecated currentStep={StatusTrackerDeprecatedStepNumber.THREE} status={StatusTrackerDeprecatedStatus.ERROR}>
            {renderSteps(3)}
            <StatusTrackerDeprecated.Body showIcon data-test-id="three_error">
                <StatusTrackerDeprecated.Body.Text>Длинный текст описания статуса в две строки</StatusTrackerDeprecated.Body.Text>
                <Gap size={16} />
                <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                    Button Name
                </Button>
            </StatusTrackerDeprecated.Body>
            <StatusTrackerDeprecated.Footer>
                <Link linkType={ELinkType.TEXT} size={ELinkSize.SM} href="javascript:void(0)">
                    текст ссылки
                </Link>
            </StatusTrackerDeprecated.Footer>
        </StatusTrackerDeprecated>,
    ])}
</div>
```

### Использование SMSInput

```jsx
import React from 'react';
import {StatusTrackerDeprecated} from '@sberbusiness/triplex/desktop/components/StatusTrackerDeprecated/StatusTrackerDeprecated';
import {
    StatusTrackerDeprecatedStatus,
    StatusTrackerDeprecatedStepNumber,
} from '@sberbusiness/triplex/desktop/components/StatusTrackerDeprecated/enums';
import {SMSInput} from '@sberbusiness/triplex/desktop/components/SMSInput/SMSInput';
import {Gap} from '@sberbusiness/triplex/desktop/components/Gap/Gap';

const COUNTDOWN_TIME = 10;

const renderSteps = (count) => {
    const steps = [];
    for (let i = 1; i <= count; i++) {
        steps.push(<StatusTrackerDeprecated.Steps.Step>{`Подсказка ${i}`}</StatusTrackerDeprecated.Steps.Step>);
    }

    return <StatusTrackerDeprecated.Steps>{steps}</StatusTrackerDeprecated.Steps>;
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
        <StatusTrackerDeprecated currentStep={StatusTrackerDeprecatedStepNumber.FOUR} status={StatusTrackerDeprecatedStatus.WAIT}>
            {renderSteps(4)}
            <StatusTrackerDeprecated.Body showIcon data-test-id="four_wait">
                <StatusTrackerDeprecated.Body.Text>Длинный текст описания статуса в две строки</StatusTrackerDeprecated.Body.Text>
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
            </StatusTrackerDeprecated.Body>
            <StatusTrackerDeprecated.Footer>
                <StatusTrackerDeprecated.Footer.Text>
                    Текст пояснения статуса в две строки, также в две строки
                </StatusTrackerDeprecated.Footer.Text>
            </StatusTrackerDeprecated.Footer>
        </StatusTrackerDeprecated>,
    ])}
</div>
```

### Использование MarkerStatus

```jsx
import React from 'react';
import {StatusTrackerDeprecated} from '@sberbusiness/triplex/desktop/components/StatusTrackerDeprecated/StatusTrackerDeprecated';
import {
    StatusTrackerDeprecatedStatus,
    StatusTrackerDeprecatedStepNumber,
} from '@sberbusiness/triplex/desktop/components/StatusTrackerDeprecated/enums';
import {MarkerStatus} from '@sberbusiness/triplex/desktop/components/MarkerStatus/MarkerStatus';
import {EMarkerStatus} from '@sberbusiness/triplex/desktop/components/Marker/enums';
import {Button} from '@sberbusiness/triplex/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {Gap} from '@sberbusiness/triplex/desktop/components/Gap/Gap';

const renderSteps = (count) => {
    const steps = [];
    for (let i = 1; i <= count; i++) {
        steps.push(<StatusTrackerDeprecated.Steps.Step>{`Подсказка ${i}`}</StatusTrackerDeprecated.Steps.Step>);
    }

    return <StatusTrackerDeprecated.Steps>{steps}</StatusTrackerDeprecated.Steps>;
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
        <StatusTrackerDeprecated currentStep={StatusTrackerDeprecatedStepNumber.ONE} status={StatusTrackerDeprecatedStatus.WARNING}>
            {renderSteps(4)}
            <StatusTrackerDeprecated.Body showIcon data-test-id="one_alert">
                <MarkerStatus status={EMarkerStatus.SUCCESS}>Первая подпись есть</MarkerStatus>
                <MarkerStatus status={EMarkerStatus.WAITING}>Ожидается ваша подпись</MarkerStatus>
                <Gap size={16} />
                <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                    Подписать
                </Button>
            </StatusTrackerDeprecated.Body>
            <StatusTrackerDeprecated.Footer>
                <StatusTrackerDeprecated.Footer.Text>
                    Для отправки документа не хватает ещё вашей подписи.
                </StatusTrackerDeprecated.Footer.Text>
            </StatusTrackerDeprecated.Footer>
        </StatusTrackerDeprecated>,
    ])}
</div>
```

