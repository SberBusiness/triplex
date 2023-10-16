```jsx
import {EAlertType} from '@sberbusiness/triplex/components/Alert/EAlertType';

<>
    <AlertProcess type={EAlertType.INFO}>
        Текст сообщения
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.WARNING}>
        Текст сообщения
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.ERROR}>
        Текст сообщения
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.FEATURE}>
        Текст сообщения
    </AlertProcess>
</>
```

### Closable

```jsx
import {EAlertType} from '@sberbusiness/triplex/components/Alert/EAlertType';

const handleClose = () => alert();

<>
    <AlertProcess type={EAlertType.INFO} onClose={handleClose} closable>
        Текст сообщения
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.WARNING} onClose={handleClose} closable>
        Текст сообщения
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.ERROR} onClose={handleClose} closable>
        Текст сообщения
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.FEATURE} onClose={handleClose} closable>
        Текст сообщения
    </AlertProcess>
</>
```

### With header

```jsx
import {EAlertType} from '@sberbusiness/triplex/components/Alert/EAlertType';

const renderHeader = () => <AlertProcess.Header>Текст заголовка</AlertProcess.Header>;

<>
    <AlertProcess type={EAlertType.INFO} renderHeader={renderHeader}>
        Текст сообщения
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.WARNING} renderHeader={renderHeader}>
        Текст сообщения
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.ERROR} renderHeader={renderHeader}>
        Текст сообщения
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.FEATURE} renderHeader={renderHeader}>
        Текст сообщения
    </AlertProcess>
</>
```
