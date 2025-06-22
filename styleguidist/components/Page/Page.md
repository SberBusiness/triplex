```jsx
import React from 'react';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';

<div style={{height: 500}}>
    <Page>
        <Page.Header>
            <Page.Header.Link href="#" onClick={(event) => event.preventDefault()}>
                Текст ссылки
            </Page.Header.Link>
            <Page.Header.Title>
                <Page.Header.Title.Content>
                    <Page.Header.Title.Content.Text>
                        Шаблонный текст заголовка в одну строку
                    </Page.Header.Title.Content.Text>
                    <Page.Header.Title.Content.Subhead>
                        Шаблонный текст для описания
                    </Page.Header.Title.Content.Subhead>
                </Page.Header.Title.Content>
                <Page.Header.Title.Controls>
                    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                        Button Name
                    </Button>
                    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                        Button Name
                    </Button>
                </Page.Header.Title.Controls>
            </Page.Header.Title>
        </Page.Header>
        <Page.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Page.Body>
        <Page.Footer>
            <Page.Footer.Description>
                <Page.Footer.Description.Content>Текст в одну строку</Page.Footer.Description.Content>
                <Page.Footer.Description.Controls>
                    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                        Button Name
                    </Button>
                    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                        Button Name
                    </Button>
                </Page.Footer.Description.Controls>
            </Page.Footer.Description>
        </Page.Footer>
    </Page>
</div>
```
