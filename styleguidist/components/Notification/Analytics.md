```jsx
import {Notification} from '@sberbusiness/triplex/components/Notification/Notification';
import {AlertContext} from '@sberbusiness/triplex/components/Alert/AlertContext/AlertContext';
import {EAlertType} from '@sberbusiness/triplex/components/Alert/EAlertType';
import {DownloadSrvIcon20} from '@sberbusiness/icons/DownloadSrvIcon20';

const handleClick = () => alert('Обработчик клика на нотификацию');
const closeNotification = () => alert('Обработчик закрытия нотификации');

<Notification
    data-analytics-action="click"
    data-analytics-label="notification_with_analytics"
    withExtraBottomPadding
    onClick={handleClick}
>
    <Notification.Icon>
        <DownloadSrvIcon20 />
    </Notification.Icon>
    <Notification.Body>
        <Notification.Body.Header>Заказанный файл</Notification.Body.Header>
        <Notification.Body.Content>
            Запрошенный документ godotchet.pdf готов к скачиванию
        </Notification.Body.Content>
        <Notification.Body.Footer>
            <AlertContext type={EAlertType.INFO}>Истёк срок скачивания</AlertContext>
        </Notification.Body.Footer>
    </Notification.Body>
    <Notification.Close
        data-test-id="notification-close"
        data-analytics-action="click"
        data-analytics-label="notification_close_btn"
        onClick={closeNotification}
    />
    <Notification.Time time="22:45" />
</Notification>
```
