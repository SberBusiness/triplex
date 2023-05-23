```jsx
import {EAlertType} from '@sberbusiness/triplex/desktop/components/Alert/EAlertType';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/desktop/components/Link/Link';
import {LinkNavIcon16} from '@sberbusiness/icons/LinkNavIcon16';

<>
    <AlertContext type={EAlertType.INFO}>
        Текст информационного сообщения может быть больше одной строки.
        Возможно использование как обычных <Link linkType={ELinkType.TEXT} size={ELinkSize.SM}>ссылок</Link>, так и <Link linkType={ELinkType.TEXT} size={ELinkSize.SM} contentAfter={() => <LinkNavIcon16 />}>внешних</Link>.
    </AlertContext>
    <br />
    <AlertContext type={EAlertType.WARNING}>
        Текст предупреждения может быть больше одной строки.
        Возможно использование как обычных <Link linkType={ELinkType.TEXT} size={ELinkSize.SM}>ссылок</Link>, так и <Link linkType={ELinkType.TEXT} size={ELinkSize.SM} contentAfter={() => <LinkNavIcon16 />}>внешних</Link>.
    </AlertContext>
    <br />
    <AlertContext type={EAlertType.ERROR}>
        Текст ошибки может быть больше одной строки.
        Возможно использование как обычных <Link linkType={ELinkType.TEXT} size={ELinkSize.SM}>ссылок</Link>, так и <Link linkType={ELinkType.TEXT} size={ELinkSize.SM} contentAfter={() => <LinkNavIcon16 />}>внешних</Link>.
    </AlertContext>
    <br />
    <AlertContext type={EAlertType.SYSTEM}>
        Текст системного сообщения может быть больше одной строки.
        Возможно использование как обычных <Link linkType={ELinkType.TEXT} size={ELinkSize.SM}>ссылок</Link>, так и <Link linkType={ELinkType.TEXT} size={ELinkSize.SM} contentAfter={() => <LinkNavIcon16 />}>внешних</Link>.
    </AlertContext>
</>
```
