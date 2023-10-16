```jsx
import {Notification} from '@sberbusiness/triplex/components/Notification/Notification';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {Link, ELinkSize, ELinkType} from '@sberbusiness/triplex/components/Link/Link';

const closeNotification = () => alert('Обработчик закрытия нотификации');

<Notification>
    <Notification.Body>
        <Notification.Body.Header>Заголовок</Notification.Body.Header>
        <Notification.Body.Content>
            Максимальное количество строк текста - 4.
            <br />
            В это количество знаков входят все текстовые элементы.
        </Notification.Body.Content>
        <Notification.Body.Footer>
            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
                Button Name
            </Button>
            <Link
                href="#"
                linkType={ELinkType.TEXT}
                size={ELinkSize.LG}
                onClick={(event) => event.preventDefault()}
            >
                Текст ссылки
            </Link>
        </Notification.Body.Footer>
    </Notification.Body>
    <Notification.Close onClick={closeNotification} />
</Notification>
```
