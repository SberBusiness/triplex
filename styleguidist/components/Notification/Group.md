```jsx
import {Notification} from '@sberbusiness/triplex/components/Notification/Notification';
import {NotificationGrouped} from '@sberbusiness/triplex/components/Notification/NotificationGrouped';
import {MailSrvIcon20} from '@sberbusiness/icons/MailSrvIcon20';

const handleClick = () => alert('Обработчик клика на нотификацию');
const closeNotification = () => alert('Обработчик закрытия нотификации');

<NotificationGrouped>
    <Notification withExtraBottomPadding onClick={handleClick}>
        <Notification.Icon>
            <MailSrvIcon20 />
        </Notification.Icon>
        <Notification.Body>
            <Notification.Body.Header>Тема письма</Notification.Body.Header>
            <Notification.Body.Content>
                Уважаемый Иван Николаевич! Чтобы получить VIP-статус иобслуживание...
            </Notification.Body.Content>
        </Notification.Body>
        <Notification.Close onClick={closeNotification} />
        <Notification.Time time="22:45" />
    </Notification>
</NotificationGrouped>
```
