```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency 
    componentTitle="Notification"
    isMobileComponent={false} 
/>
```

```jsx
import {Notification} from '@sberbusiness/triplex/desktop/components/Notification/Notification';
import {NotificationGrouped} from '@sberbusiness/triplex/desktop/components/Notification/NotificationGrouped';
import {MailSrvIcon20} from '@sberbusiness/icons/MailSrvIcon20';

const closeNotification = () => alert('Обработчик закрытия нотификации');
const handleNotificationClick = () => alert('Обработчик клика на нотификацию');

<NotificationGrouped>
    <Notification withExtraBottomPadding onClick={handleNotificationClick}>
        <Notification.Icon>
            <MailSrvIcon20 />
        </Notification.Icon>
        <Notification.Body>
            <Notification.Body.Header>Тема письма</Notification.Body.Header>
            <Notification.Body.Content>Уважаемый Иван Николаевич! Чтобы получить VIP-статус и обслуживание...</Notification.Body.Content>
        </Notification.Body>
        <Notification.Close onClick={closeNotification} />
        <Notification.Time time="22:45" />
    </Notification>
</NotificationGrouped>
```
