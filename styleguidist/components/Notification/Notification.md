```jsx
import {Notification} from '@sberbusiness/triplex/components/Notification/Notification';
import {Link, ELinkSize, ELinkType} from '@sberbusiness/triplex/components/Link/Link';
import {LinkNavIcon16} from '@sberbusiness/icons/LinkNavIcon16';

const handleClick = () => alert('Обработчик клика на нотификацию');
const closeNotification = () => alert('Обработчик закрытия нотификации');

const renderLink = (children) => (
    <Link
        href="#"
        linkType={ELinkType.TEXT}
        size={ELinkSize.LG}
        contentAfter={() => <LinkNavIcon16 />}
        onClick={(event) => event.preventDefault()}
    >
        {children}
    </Link>
);

<Notification withExtraBottomPadding isShowCloseOnHover onClick={handleClick}>
    <Notification.Body>
        <Notification.Body.Header>Внимание</Notification.Body.Header>
        <Notification.Body.Content>
            Вы собираетесь перейти по {renderLink('ссылке')} Не указывайте свой логин и пароль от
            интернет-банка на внешнем ресурсе.
        </Notification.Body.Content>
    </Notification.Body>
    <Notification.Close onClick={closeNotification} />
    <Notification.Time time="22:45" />
</Notification>
```
