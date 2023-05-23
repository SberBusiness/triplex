```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency 
    componentTitle="Notification"
    isMobileComponent={false} 
/>
```

```jsx
import {Notification} from '@sberbusiness/triplex/desktop/components/Notification/Notification';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/desktop/components/Link/Link';
import {LinkNavIcon16} from '@sberbusiness/icons/LinkNavIcon16';

const closeNotification = () => alert('Обработчик закрытия нотификации');
const handleNotificationClick = () => alert('Обработчик клика на нотификацию');

<Notification withExtraBottomPadding isShowCloseOnHover onClick={handleNotificationClick}>
    <Notification.Body>
        <Notification.Body.Header>Внимание</Notification.Body.Header>
        <Notification.Body.Content>
            Вы собираетесь перейти по <Link linkType={ELinkType.TEXT} size={ELinkSize.LG} contentAfter={() => <LinkNavIcon16 />} href="javascript:void(0);">ссылке</Link> Не указывайте свой логин и пароль
            от интернет-банка на внешнем ресурсе.
        </Notification.Body.Content>
    </Notification.Body>
    <Notification.Close onClick={closeNotification} />
    <Notification.Time time="22:45" />
</Notification>
```
