```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency 
    componentTitle="Widget"
    isMobileComponent={false} 
/>
```

### Базовый пример с кнопками действий и футером.

```jsx
import React from 'react';
import {Widget} from '@sberbusiness/triplex/desktop/components/Widget/Widget';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/desktop/components/Link/Link';
import {Button} from '@sberbusiness/triplex/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {EWidgetHeaderControlsAlign} from '@sberbusiness/triplex/desktop/components/Widget/components/WidgetHeader/WidgetHeader';

const renderBody = (props) => (
    <Widget.Body {...props}>
        <div style={{height: '100px'}}>Контент</div>
    </Widget.Body>
);

const renderFooter = (props) => (
    <Widget.Footer {...props}>
        <Widget.Footer.Content>
            <Link linkType={ELinkType.TEXT} size={ELinkSize.LG} href="javascript:void(0)">Текст ссылки</Link>
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
import React from 'react';
import {Widget} from '@sberbusiness/triplex/desktop/components/Widget/Widget';

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
import React from 'react';
import {Widget} from '@sberbusiness/triplex/desktop/components/Widget/Widget';

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
import React, {useState} from 'react';
import {Widget} from '@sberbusiness/triplex/desktop/components/Widget/Widget';

const [isOpen, setIsOpen] = useState(true);

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

const renderControls = () => (
    <div style={{display: 'flex', flexDirection: 'column', marginBottom: '16px'}}>
        <label style={{display: 'inline-flex'}}>
            <input
                type="checkbox"
                checked={isOpen}
                onChange={(event) => setIsOpen(event.target.checked)}
                style={{margin: 'auto 4px auto 0'}}
            />
            Открыт
        </label>
    </div>
);

<>
    {renderControls()}
    <Widget isOpen={isOpen} toggle={setIsOpen} renderBody={renderBody} renderHeader={renderHeader} />
</>
```
