### Базовый пример с кнопками действий и футером.

```jsx
import {Link, ELinkSize, ELinkType} from '@sberbusiness/triplex/components/Link/Link';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {EWidgetHeaderControlsAlign} from '@sberbusiness/triplex/components/Widget/components/WidgetHeader/WidgetHeader';

const renderBody = (props) => (
    <Widget.Body {...props}>
        <div style={{height: '100px'}}>Контент</div>
    </Widget.Body>
);

const renderFooter = (props) => (
    <Widget.Footer {...props}>
        <Widget.Footer.Content>
            <Link
                href="#"
                linkType={ELinkType.TEXT}
                size={ELinkSize.LG}
                onClick={(event) => event.preventDefault()}
            >
                Текст ссылки
            </Link>
        </Widget.Footer.Content>
        <Widget.Footer.Controls>
            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
                Структура начислений
            </Button>
            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.SM}>
                Добавить начисления
            </Button>
        </Widget.Footer.Controls>
    </Widget.Footer>
);

const renderHeader = (props) => (
    <Widget.Header {...props} controlsAlign={EWidgetHeaderControlsAlign.LEFT}>
        <Widget.Header.Title>Расчёт по коммунальным платежам и другим услугам</Widget.Header.Title>
        <Widget.Header.Controls>
            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.SM} onClick={() => alert('Клик по кнопке "Добавить начисления.')}>
                Добавить начисления
            </Button>
        </Widget.Header.Controls>
    </Widget.Header>
);

<Widget renderBody={renderBody} renderFooter={renderFooter} renderHeader={renderHeader} />
```

### Без футера и без кнопок действий в хедере.

```jsx
const renderBody = (props) => (
    <Widget.Body {...props}>
        <div style={{height: '100px'}}>Контент</div>
    </Widget.Body>
);

const renderHeader = (props) => (
    <Widget.Header {...props}>
        <Widget.Header.Title>Расчёт по коммунальным платежам и другим услугам</Widget.Header.Title>
    </Widget.Header>
);

<Widget renderBody={renderBody} renderHeader={renderHeader} />
```

### Несворачиваемый виджет

```jsx
const renderBody = (props) => (
    <Widget.Body {...props}>
        <div style={{height: '100px'}}>Контент</div>
    </Widget.Body>
);

const renderHeader = (props) => (
    <Widget.Header {...props}>
        <Widget.Header.Title>Расчёт по коммунальным платежам и другим услугам</Widget.Header.Title>
    </Widget.Header>
);

<Widget renderBody={renderBody} renderHeader={renderHeader} isStatic />
```

### Контролируемый виджет.

```jsx
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

const [isOpen, setIsOpen] = React.useState(true);

const renderBody = (props) => (
    <Widget.Body {...props}>
        <div style={{height: '100px'}}>Контент</div>
    </Widget.Body>
);

const renderHeader = (props) => (
    <Widget.Header {...props}>
        <Widget.Header.Title>Расчёт по коммунальным платежам и другим услугам</Widget.Header.Title>
    </Widget.Header>
);

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Checkbox checked={isOpen} setChecked={setIsOpen}>
            Open
        </ComponentControlPanel.Checkbox>
    </ComponentControlPanel>
);

<>
    {renderControlPanel()}
    <Widget isOpen={isOpen} toggle={setIsOpen} renderBody={renderBody} renderHeader={renderHeader} />
</>
```
