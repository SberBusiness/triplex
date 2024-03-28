```jsx {"props": {"className": "white-to-black-background"}}
import {ELinkSize, ELinkType} from '@sberbusiness/triplex/components/Link/Link';

const handleClick = (event) => event.preventDefault();

<div style={{display: 'flex'}}>
    <div style={{flexBasis: '50%', textAlign: 'center'}}>
        <Link href="#" linkType={ELinkType.TEXT} size={ELinkSize.LG} onClick={handleClick}>
            Link Text
        </Link>
    </div>
    <div style={{flexBasis: '50%', textAlign: 'center'}}>
        <Link href="#" linkType={ELinkType.LINE} size={ELinkSize.LG} onClick={handleClick}>
            Link Line
        </Link>
    </div>
</div>
```

### Small size

```jsx {"props": {"className": "white-to-black-background"}}
import {ELinkSize, ELinkType} from '@sberbusiness/triplex/components/Link/Link';

const handleClick = (event) => event.preventDefault();

<div style={{display: 'flex'}}>
    <div style={{flexBasis: '50%', textAlign: 'center'}}>
        <Link href="#" linkType={ELinkType.TEXT} size={ELinkSize.SM} onClick={handleClick}>
            Link Text
        </Link>
    </div>
    <div style={{flexBasis: '50%', textAlign: 'center'}}>
        <Link href="#" linkType={ELinkType.LINE} size={ELinkSize.SM} onClick={handleClick}>
            Link Line
        </Link>
    </div>
</div>
```

### External

```jsx
import {ELinkSize, ELinkType} from '@sberbusiness/triplex/components/Link/Link';
import {LinkNavIcon16} from '@sberbusiness/icons/LinkNavIcon16';

const handleClick = (event) => event.preventDefault();

const renderContentAfter = () => <LinkNavIcon16 />;

<Link
    href="#"
    linkType={ELinkType.TEXT}
    size={ELinkSize.LG}
    contentAfter={renderContentAfter}
    onClick={handleClick}
>
    Link Text
</Link>
```
