```jsx
import {Notification} from '@sberbusiness/triplex/components/Notification/Notification';
import {AlertContext} from '@sberbusiness/triplex/components/Alert/AlertContext/AlertContext';
import {EAlertType} from '@sberbusiness/triplex/components/Alert/EAlertType';
import {DownloadSrvIcon20} from '@sberbusiness/icons/DownloadSrvIcon20';

const closeNotification = () => alert('Обработчик закрытия нотификации');
const handleNotificationClick = () => alert('Обработчик клика на нотификацию');

<Notification
    withExtraBottomPadding
    data-analytics-action="click"
    data-analytics-label="notification_with_analytics"
    onClick={handleNotificationClick}
>
    <Notification.Icon>
        <DownloadSrvIcon20 />
    </Notification.Icon>
    <Notification.Body>
        <Notification.Body.Header>Заказанный файл</Notification.Body.Header>
        <Notification.Body.Content>Запрошенный документ godotchet.pdf готов к скачиванию</Notification.Body.Content>
        <Notification.Body.Footer>
            <AlertContext type={EAlertType.INFO}>Истёк срок скачивания</AlertContext>
        </Notification.Body.Footer>
    </Notification.Body>
    <Notification.Close
        onClick={closeNotification}
        data-test-id="notification-close"
        data-analytics-action="click"
        data-analytics-label="notification_close_btn"
    />
    <Notification.Time time="22:45" />
</Notification>
```
