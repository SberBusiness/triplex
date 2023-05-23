```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency 
    componentTitle="Notification"
    isMobileComponent={false} 
/>
```

```jsx
import {Notification} from '@sberbusiness/triplex/desktop/components/Notification/Notification';
import {Button} from '@sberbusiness/triplex/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/desktop/components/Link/Link';

const closeNotification = () => alert('Обработчик закрытия нотификации');

<Notification>
    <Notification.Body>
        <Notification.Body.Header>Заголовок</Notification.Body.Header>
        <Notification.Body.Content>
            Максимальное количество строк текста - 4.<br />
            В это количество знаков входят все текстовые элементы.
        </Notification.Body.Content>
        <Notification.Body.Footer>
            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
                Button Name
            </Button>
            <Link linkType={ELinkType.TEXT} size={ELinkSize.LG} href="javascript:void(0);">
                Текст ссылки
            </Link>
        </Notification.Body.Footer>
    </Notification.Body>
    <Notification.Close onClick={closeNotification} />
</Notification>
```
