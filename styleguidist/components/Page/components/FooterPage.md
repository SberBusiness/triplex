### Basic

```jsx
import {FooterPage} from '@sberbusiness/triplex/components/Page/components/FooterPage';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';

<FooterPage>
    <FooterPage.Description>
        <FooterPage.Description.Controls>
            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                Button Name
            </Button>
            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                Button Name
            </Button>
        </FooterPage.Description.Controls>
    </FooterPage.Description>
</FooterPage>
```

### Basic Link

```jsx
import {FooterPage} from '@sberbusiness/triplex/components/Page/components/FooterPage';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/components/Link/Link';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';

<FooterPage>
    <FooterPage.Description>
        <FooterPage.Description.Content>
            <Link
                href="#"
                linkType={ELinkType.TEXT}
                size={ELinkSize.LG}
                onClick={(event) => event.preventDefault()}
            >
                Текст ссылки
            </Link>
        </FooterPage.Description.Content>
        <FooterPage.Description.Controls>
            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                Button Name
            </Button>
            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                Button Name
            </Button>
        </FooterPage.Description.Controls>
    </FooterPage.Description>
</FooterPage>
```

### Extended

```jsx
import {FooterPage} from '@sberbusiness/triplex/components/Page/components/FooterPage';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';

<FooterPage>
    <FooterPage.Description>
        <FooterPage.Description.Content>Текст в 1 строку</FooterPage.Description.Content>
        <FooterPage.Description.Controls>
            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                Button Name
            </Button>
            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                Button Name
            </Button>
        </FooterPage.Description.Controls>
    </FooterPage.Description>
</FooterPage>
```
