```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency 
    componentTitle="Notification"
    isMobileComponent={false} 
/>
```

```jsx
import React from 'react';
import {Notification} from '@sbbol/web-library/desktop/components/Notification/Notification';
import {Button} from '@sbbol/web-library/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sbbol/web-library/desktop/components/Button/enums';
import {ELinkSize, ELinkType, Link} from '@sbbol/web-library/desktop/components/Link/Link';

const closeNotification = () => alert('Обработчик закрытия нотификации');

<Notification>
    <Notification.Body>
        <Notification.Body.Header>Заголовок</Notification.Body.Header>
        <Notification.Body.Content>
            Максимальное количество строк текста - 4.
            <br />В это количество знаков входят все тестовые элементы.
        </Notification.Body.Content>
        <Notification.Body.Footer>
            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
                Button Name
            </Button>
            <Link linkType={ELinkType.TEXT} size={ELinkSize.LG} href="javascript:void(0);">Текст ссылки</Link>
        </Notification.Body.Footer>
    </Notification.Body>
    <Notification.Close onClick={closeNotification} />
</Notification>
```
