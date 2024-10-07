```jsx
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {Page} from '@sberbusiness/triplex/components/Page/Page';

const [open, setOpen] = React.useState(false);

const renderLightBox = () => (
    <LightBox>
        <LightBox.Content>
            {renderPage()}
        </LightBox.Content>
        <LightBox.Controls>
            <LightBox.Controls.Close
                title="Закрыть"
                data-test-id="lightbox-close"
                onClick={() => setOpen(false)}
            />
        </LightBox.Controls>
    </LightBox>
);

const renderPage = () => (
    <Page>
        <Page.Header sticky>
            <Page.Header.Title>
                <Page.Header.Title.Content>
                    <Page.Header.Title.Content.Text>Евгений Онегин</Page.Header.Title.Content.Text>
                    <Page.Header.Title.Content.Subhead>
                        Русский поэт, драматург и прозаик, заложивший основы русского реалистического
                        направления.
                    </Page.Header.Title.Content.Subhead>
                </Page.Header.Title.Content>
                <Page.Header.Title.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                        Button Name
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                        Button Name
                    </Button>
                </Page.Header.Title.Controls>
            </Page.Header.Title>
        </Page.Header>
        <Page.Body>
            <div>
                Мой дядя самых честных правил,<br />
                Когда не в шутку занемог,<br />
                Он уважать себя заставил<br />
                И лучше выдумать не мог.<br />
                Его пример другим наука;<br />
                Но, боже мой, какая скука<br />
                С больным сидеть и день и ночь,<br />
                Не отходя ни шагу прочь!<br />
                Какое низкое коварство<br />
                Полуживого забавлять,<br />
                Ему подушки поправлять,<br />
                Печально подносить лекарство,<br />
                Вздыхать и думать про себя:<br />
                Когда же черт возьмет тебя<br /><br />

                Так думал молодой повеса,<br />
                Летя в пыли на почтовых,<br />
                Всевышней волею Зевеса<br />
                Наследник всех своих родных.<br />
                Друзья Людмилы и Руслана!<br />
                С героем моего романа<br />
                Без предисловий, сей же час<br />
                Позвольте познакомить вас:<br />
                Онегин, добрый мой приятель,<br />
                Родился на брегах Невы,<br />
                Где, может быть, родились вы<br />
                Или блистали, мой читатель;<br />
                Там некогда гулял и я:<br />
                Но вреден север для меня.<br /><br />

                Служив отлично благородно,<br />
                Долгами жил его отец,<br />
                Давал три бала ежегодно<br />
                И промотался наконец.<br />
                Судьба Евгения хранила:<br />
                Сперва Madame за ним ходила,<br />
                Потом Monsieur ее сменил.<br />
                Ребенок был резов, но мил.<br />
                Monsieur l'Abbé, француз убогой,<br />
                Чтоб не измучилось дитя,<br />
                Учил его всему шутя,<br />
                Не докучал моралью строгой,<br />
                Слегка за шалости бранил<br />
                И в Летний сад гулять водил.<br /><br />

                Когда же юности мятежной<br />
                Пришла Евгению пора,<br />
                Пора надежд и грусти нежной,<br />
                Monsieur прогнали со двора.<br />
                Вот мой Онегин на свободе;<br />
                Острижен по последней моде,<br />
                Как dandy лондонский одет —<br />
                И наконец увидел свет.<br />
                Он по-французски совершенно<br />
                Мог изъясняться и писал;<br />
                Легко мазурку танцевал<br />
                И кланялся непринужденно;<br />
                Чего ж вам больше? Свет решил,<br />
                Что он умен и очень мил.<br /><br />
            </div>
        </Page.Body>
        <Page.Footer sticky>
            <Page.Footer.Description>
                <Page.Footer.Description.Content>А. С. Пушкин</Page.Footer.Description.Content>
                <Page.Footer.Description.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                        Button Name
                    </Button>
                </Page.Footer.Description.Controls>
            </Page.Footer.Description>
        </Page.Footer>
    </Page>
);

<>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpen(true)}>
        Open LightBox
    </Button>
    {open && renderLightBox()}
</>
```

### Loading emulation

Флаг `isLoading` нужно передать и в LightBox и в LightBox.Content.

```jsx
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {Page} from '@sberbusiness/triplex/components/Page/Page';

const [open, setOpen] = React.useState(false);
const [isLoading, setIsLoading] = React.useState(false);

React.useEffect(() => {
    if (open) {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 3000);
    }
}, [open]);

const renderLightBox = () => (
    <LightBox isLoading={isLoading}>
        <LightBox.Content isLoading={isLoading}>
            {renderPage()}
        </LightBox.Content>
        <LightBox.Controls>
            <LightBox.Controls.Next
                title="Вперёд"
                onClick={() => console.log('Next arrow clicked!')}
                clickByArrowRight
            />
            <LightBox.Controls.Prev
                title="Назад"
                onClick={() => console.log('Prev arrow clicked!')}
                clickByArrowLeft
            />
            <LightBox.Controls.Close
                title="Закрыть"
                data-test-id="lightbox-close"
                onClick={() => setOpen(false)}
            />
        </LightBox.Controls>
    </LightBox>
);

const renderPage = () => (
    <Page>
        <Page.Header sticky>
            <Page.Header.Title>
                <Page.Header.Title.Content>
                    <Page.Header.Title.Content.Text>Евгений Онегин</Page.Header.Title.Content.Text>
                    <Page.Header.Title.Content.Subhead>
                        Русский поэт, драматург и прозаик, заложивший основы русского реалистического
                        направления.
                    </Page.Header.Title.Content.Subhead>
                </Page.Header.Title.Content>

                <Page.Header.Title.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                        Button Name
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                        Button Name
                    </Button>
                </Page.Header.Title.Controls>
            </Page.Header.Title>
        </Page.Header>
        <Page.Body>
            <div>
                Мой дядя самых честных правил,<br />
                Когда не в шутку занемог,<br />
                Он уважать себя заставил<br />
                И лучше выдумать не мог.<br />
                Его пример другим наука;<br />
                Но, боже мой, какая скука<br />
                С больным сидеть и день и ночь,<br />
                Не отходя ни шагу прочь!<br />
                Какое низкое коварство<br />
                Полуживого забавлять,<br />
                Ему подушки поправлять,<br />
                Печально подносить лекарство,<br />
                Вздыхать и думать про себя:<br />
                Когда же черт возьмет тебя<br /><br />

                Так думал молодой повеса,<br />
                Летя в пыли на почтовых,<br />
                Всевышней волею Зевеса<br />
                Наследник всех своих родных.<br />
                Друзья Людмилы и Руслана!<br />
                С героем моего романа<br />
                Без предисловий, сей же час<br />
                Позвольте познакомить вас:<br />
                Онегин, добрый мой приятель,<br />
                Родился на брегах Невы,<br />
                Где, может быть, родились вы<br />
                Или блистали, мой читатель;<br />
                Там некогда гулял и я:<br />
                Но вреден север для меня.<br /><br />

                Служив отлично благородно,<br />
                Долгами жил его отец,<br />
                Давал три бала ежегодно<br />
                И промотался наконец.<br />
                Судьба Евгения хранила:<br />
                Сперва Madame за ним ходила,<br />
                Потом Monsieur ее сменил.<br />
                Ребенок был резов, но мил.<br />
                Monsieur l'Abbé, француз убогой,<br />
                Чтоб не измучилось дитя,<br />
                Учил его всему шутя,<br />
                Не докучал моралью строгой,<br />
                Слегка за шалости бранил<br />
                И в Летний сад гулять водил.<br /><br />

                Когда же юности мятежной<br />
                Пришла Евгению пора,<br />
                Пора надежд и грусти нежной,<br />
                Monsieur прогнали со двора.<br />
                Вот мой Онегин на свободе;<br />
                Острижен по последней моде,<br />
                Как dandy лондонский одет —<br />
                И наконец увидел свет.<br />
                Он по-французски совершенно<br />
                Мог изъясняться и писал;<br />
                Легко мазурку танцевал<br />
                И кланялся непринужденно;<br />
                Чего ж вам больше? Свет решил,<br />
                Что он умен и очень мил.<br /><br />
            </div>
        </Page.Body>
        <Page.Footer sticky>
            <Page.Footer.Description>
                <Page.Footer.Description.Content>А. С. Пушкин</Page.Footer.Description.Content>
                <Page.Footer.Description.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                        Button Name
                    </Button>
                </Page.Footer.Description.Controls>
            </Page.Footer.Description>
        </Page.Footer>
    </Page>
);

<>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpen(true)}>
        Open LightBox
    </Button>
    {open && renderLightBox()}
</>
```

### TopOverlay

```jsx
import {Page} from '@sberbusiness/triplex/components/Page/Page';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {Confirm} from '@sberbusiness/triplex/components/Confirm/Confirm';

const [open, setOpen] = React.useState(false);
const [isTopOverlayOpened, setIsTopOverlayOpened] = React.useState(false);
// Флаг закрытия LightBox, после того, как будет закрыт TopOverlay.
const [closeConfirmed, setCloseConfirmed] = React.useState(false);

const renderLightBox = () => (
    <LightBox isTopOverlayOpened={isTopOverlayOpened}>
        <LightBox.Content>
            {renderPage()}
            {renderTopOverlay()}
        </LightBox.Content>
        <LightBox.Controls>
            <LightBox.Controls.Next
                title="Вперёд"
                onClick={() => console.log('Next arrow clicked!')}
                clickByArrowRight
            />
            <LightBox.Controls.Prev
                title="Назад"
                onClick={() => console.log('Prev arrow clicked!')}
                clickByArrowLeft
            />
            <LightBox.Controls.Close
                title="Закрыть"
                data-test-id="lightbox-close"
                onClick={() => setIsTopOverlayOpened(true)}
            />
        </LightBox.Controls>
    </LightBox>
);

// Обработчик закрытия TopOverlay.
const handleCloseTopOverlay = () => {
    console.log('TopOverlay on close.')
    if (closeConfirmed) {
        setOpen(false);
        setCloseConfirmed(false);
    }
};

const renderTopOverlay = () => (
    <LightBox.TopOverlay
        opened={isTopOverlayOpened}
        onClose={handleCloseTopOverlay}
        onOpen={() => console.log('TopOverlay on open.')}
    >
        <Confirm>
            <Confirm.Content>
                <Confirm.Content.Title>Внимание</Confirm.Content.Title>
                <Confirm.Content.SubTitle>
                    Несохранённые данные будут утеряны. Вы уверены, что хотите покинуть форму
                    редактирования?
                </Confirm.Content.SubTitle>
            </Confirm.Content>
            <Confirm.Controls>
                <Button
                    theme={EButtonTheme.SECONDARY}
                    size={EButtonSize.MD}
                    onClick={() => setIsTopOverlayOpened(false)}
                >
                    Отмена
                </Button>
                <Button
                    theme={EButtonTheme.DANGER}
                    size={EButtonSize.MD}
                    onClick={() => {
                        setIsTopOverlayOpened(false);
                        setCloseConfirmed(true);
                    }}
                >
                    Покинуть форму
                </Button>
            </Confirm.Controls>
            <Confirm.Close
                title="Закрыть"
                // Закрыть по Esc, если TopOverlay открыт.
                clickByEsc={isTopOverlayOpened}
                onClick={() => setIsTopOverlayOpened(false)}
            />
        </Confirm>
    </LightBox.TopOverlay>
);

const renderPage = () => (
    <Page>
        <Page.Header sticky>
            <Page.Header.LayoutSidebar>
                <Page.Header.LayoutSidebar.Content>
                    <Page.Header.Title>
                        <Page.Header.Title.Content>
                            <Page.Header.Title.Content.Text>Евгений Онегин</Page.Header.Title.Content.Text>
                        </Page.Header.Title.Content>
                        <Page.Header.Title.Controls>
                            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                                Button Name
                            </Button>
                            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                                Button Name
                            </Button>
                        </Page.Header.Title.Controls>
                    </Page.Header.Title>
                </Page.Header.LayoutSidebar.Content>
            </Page.Header.LayoutSidebar>
        </Page.Header>
        <Page.Body>
            <div>
                Мой дядя самых честных правил,<br />
                Когда не в шутку занемог,<br />
                Он уважать себя заставил<br />
                И лучше выдумать не мог.<br />
                Его пример другим наука;<br />
                Но, боже мой, какая скука<br />
                С больным сидеть и день и ночь,<br />
                Не отходя ни шагу прочь!<br />
                Какое низкое коварство<br />
                Полуживого забавлять,<br />
                Ему подушки поправлять,<br />
                Печально подносить лекарство,<br />
                Вздыхать и думать про себя:<br />
                Когда же черт возьмет тебя<br /><br />

                Так думал молодой повеса,<br />
                Летя в пыли на почтовых,<br />
                Всевышней волею Зевеса<br />
                Наследник всех своих родных.<br />
                Друзья Людмилы и Руслана!<br />
                С героем моего романа<br />
                Без предисловий, сей же час<br />
                Позвольте познакомить вас:<br />
                Онегин, добрый мой приятель,<br />
                Родился на брегах Невы,<br />
                Где, может быть, родились вы<br />
                Или блистали, мой читатель;<br />
                Там некогда гулял и я:<br />
                Но вреден север для меня.<br /><br />

                Служив отлично благородно,<br />
                Долгами жил его отец,<br />
                Давал три бала ежегодно<br />
                И промотался наконец.<br />
                Судьба Евгения хранила:<br />
                Сперва Madame за ним ходила,<br />
                Потом Monsieur ее сменил.<br />
                Ребенок был резов, но мил.<br />
                Monsieur l'Abbé, француз убогой,<br />
                Чтоб не измучилось дитя,<br />
                Учил его всему шутя,<br />
                Не докучал моралью строгой,<br />
                Слегка за шалости бранил<br />
                И в Летний сад гулять водил.<br /><br />

                Когда же юности мятежной<br />
                Пришла Евгению пора,<br />
                Пора надежд и грусти нежной,<br />
                Monsieur прогнали со двора.<br />
                Вот мой Онегин на свободе;<br />
                Острижен по последней моде,<br />
                Как dandy лондонский одет —<br />
                И наконец увидел свет.<br />
                Он по-французски совершенно<br />
                Мог изъясняться и писал;<br />
                Легко мазурку танцевал<br />
                И кланялся непринужденно;<br />
                Чего ж вам больше? Свет решил,<br />
                Что он умен и очень мил.<br /><br />
            </div>
        </Page.Body>
        <Page.Footer>
            <Page.Footer.Description>
                <Page.Footer.Description.Content>А. С. Пушкин</Page.Footer.Description.Content>
                <Page.Footer.Description.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                        Button Name
                    </Button>
                </Page.Footer.Description.Controls>
            </Page.Footer.Description>
        </Page.Footer>
    </Page>
);

<>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpen(true)}>
        Open LightBox
    </Button>
    {open && renderLightBox()}
</>
```

### SideOverlay

```jsx
import {ELightBoxSideOverlaySize} from '@sberbusiness/triplex/components/LightBox/LightBoxSideOverlay/LightBoxSideOverlay';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {Page} from '@sberbusiness/triplex/components/Page/Page';

const [open, setOpen] = React.useState(false);
const [isSideOverlayOpened, setIsSideOverlayOpened] = React.useState(false);

const renderLightBox = () => (
    <LightBox isSideOverlayOpened={isSideOverlayOpened}>
        <LightBox.Content>
            {renderPage(
                <Button
                    theme={EButtonTheme.GENERAL}
                    size={EButtonSize.MD}
                    onClick={() => setIsSideOverlayOpened(true)}
                >
                    Open SideOverlay
                </Button>
            )}
        </LightBox.Content>
        <LightBox.Controls>
            <LightBox.Controls.Next
                title="Вперёд"
                onClick={() => console.log('Next arrow clicked!')}
                clickByArrowRight
            />
            <LightBox.Controls.Prev
                title="Назад"
                onClick={() => console.log('Prev arrow clicked!')}
                clickByArrowLeft
            />
            <LightBox.Controls.Close
                title="Закрыть"
                data-test-id="lightbox-close"
                onClick={() => setOpen(false)}
            />
        </LightBox.Controls>
        <LightBox.SideOverlay opened={isSideOverlayOpened} size={ELightBoxSideOverlaySize.MD}>
            {renderPage(
                <LightBox.SideOverlay.Close
                    title="Закрыть"
                    data-test-id="lightbox-side-overlay-close"
                    clickByEsc={true}
                    onClick={() => setIsSideOverlayOpened(false)}
                />
            )}
        </LightBox.SideOverlay>
    </LightBox>
);

const renderPage = (button) => (
    <Page>
        <Page.Header sticky>
            <Page.Header.Title>
                <Page.Header.Title.Content>
                    <Page.Header.Title.Content.Text>Евгений Онегин</Page.Header.Title.Content.Text>
                </Page.Header.Title.Content>
                <Page.Header.Title.Controls>{button}</Page.Header.Title.Controls>
            </Page.Header.Title>
        </Page.Header>
        <Page.Body>
            <div>
                Мой дядя самых честных правил,<br />
                Когда не в шутку занемог,<br />
                Он уважать себя заставил<br />
                И лучше выдумать не мог.<br />
                Его пример другим наука;<br />
                Но, боже мой, какая скука<br />
                С больным сидеть и день и ночь,<br />
                Не отходя ни шагу прочь!<br />
                Какое низкое коварство<br />
                Полуживого забавлять,<br />
                Ему подушки поправлять,<br />
                Печально подносить лекарство,<br />
                Вздыхать и думать про себя:<br />
                Когда же черт возьмет тебя<br />

                Так думал молодой повеса,<br />
                Летя в пыли на почтовых,<br />
                Всевышней волею Зевеса<br />
                Наследник всех своих родных.<br />
                Друзья Людмилы и Руслана!<br />
                С героем моего романа<br />
                Без предисловий, сей же час<br />
                Позвольте познакомить вас:<br />
                Онегин, добрый мой приятель,<br />
                Родился на брегах Невы,<br />
                Где, может быть, родились вы<br />
                Или блистали, мой читатель;<br />
                Там некогда гулял и я:<br />
                Но вреден север для меня.<br /><br />

                Служив отлично благородно,<br />
                Долгами жил его отец,<br />
                Давал три бала ежегодно<br />
                И промотался наконец.<br />
                Судьба Евгения хранила:<br />
                Сперва Madame за ним ходила,<br />
                Потом Monsieur ее сменил.<br />
                Ребенок был резов, но мил.<br />
                Monsieur l'Abbé, француз убогой,<br />
                Чтоб не измучилось дитя,<br />
                Учил его всему шутя,<br />
                Не докучал моралью строгой,<br />
                Слегка за шалости бранил<br />
                И в Летний сад гулять водил.<br /><br />

                Когда же юности мятежной<br />
                Пришла Евгению пора,<br />
                Пора надежд и грусти нежной,<br />
                Monsieur прогнали со двора.<br />
                Вот мой Онегин на свободе;<br />
                Острижен по последней моде,<br />
                Как dandy лондонский одет —<br />
                И наконец увидел свет.<br />
                Он по-французски совершенно<br />
                Мог изъясняться и писал;<br />
                Легко мазурку танцевал<br />
                И кланялся непринужденно;<br />
                Чего ж вам больше? Свет решил,<br />
                Что он умен и очень мил.<br /><br />
            </div>
        </Page.Body>
        <Page.Footer sticky>
            <Page.Footer.Description>
                <Page.Footer.Description.Content>А. С. Пушкин</Page.Footer.Description.Content>
                <Page.Footer.Description.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                        Button Name
                    </Button>
                </Page.Footer.Description.Controls>
            </Page.Footer.Description>
        </Page.Footer>
    </Page>
);

<>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpen(true)}>
        Open LightBox
    </Button>
    {open && renderLightBox()}
</>
```

### SideOverlay + Loading emulation

```jsx
import {ELightBoxSideOverlaySize} from '@sberbusiness/triplex/components/LightBox/LightBoxSideOverlay/LightBoxSideOverlay';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {Page} from '@sberbusiness/triplex/components/Page/Page';

const [open, setOpen] = React.useState(false);
const [isSideOverlayOpened, setIsSideOverlayOpened] = React.useState(false);
const [isSideOverlayLoading, setIsSideOverlayLoading] = React.useState(false);

React.useEffect(() => {
    if (isSideOverlayOpened) {
        setIsSideOverlayLoading(true);
        setTimeout(() => setIsSideOverlayLoading(false), 3000);
    }
}, [isSideOverlayOpened]);

const renderLightBox = () => (
    <LightBox isSideOverlayOpened={isSideOverlayOpened}>
        <LightBox.Content>
            {renderPage(
                <Button
                    theme={EButtonTheme.GENERAL}
                    size={EButtonSize.MD}
                    onClick={() => setIsSideOverlayOpened(true)}
                >
                    Open SideOverlay
                </Button>
            )}
        </LightBox.Content>
        <LightBox.Controls>
            <LightBox.Controls.Next
                title="Вперёд"
                onClick={() => console.log('Next arrow clicked!')}
                clickByArrowRight
            />
            <LightBox.Controls.Prev
                title="Назад"
                onClick={() => console.log('Prev arrow clicked!')}
                clickByArrowLeft
            />
            <LightBox.Controls.Close
                title="Закрыть"
                data-test-id="lightbox-close"
                onClick={() => setOpen(false)}
            />
        </LightBox.Controls>
        <LightBox.SideOverlay
            opened={isSideOverlayOpened}
            size={ELightBoxSideOverlaySize.MD}
            isLoading={isSideOverlayLoading}
        >
            {renderPage(
                <LightBox.SideOverlay.Close
                    title="Закрыть"
                    data-test-id="lightbox-side-overlay-close"
                    clickByEsc={true}
                    onClick={() => setIsSideOverlayOpened(false)}
                />
            )}
        </LightBox.SideOverlay>
    </LightBox>
);

const renderPage = (button) => (
    <Page>
        <Page.Header sticky>
            <Page.Header.Title>
                <Page.Header.Title.Content>
                    <Page.Header.Title.Content.Text>Евгений Онегин</Page.Header.Title.Content.Text>
                </Page.Header.Title.Content>
                <Page.Header.Title.Controls>{button}</Page.Header.Title.Controls>
            </Page.Header.Title>
        </Page.Header>
        <Page.Body>
            <div>
                Мой дядя самых честных правил,<br />
                Когда не в шутку занемог,<br />
                Он уважать себя заставил<br />
                И лучше выдумать не мог.<br />
                Его пример другим наука;<br />
                Но, боже мой, какая скука<br />
                С больным сидеть и день и ночь,<br />
                Не отходя ни шагу прочь!<br />
                Какое низкое коварство<br />
                Полуживого забавлять,<br />
                Ему подушки поправлять,<br />
                Печально подносить лекарство,<br />
                Вздыхать и думать про себя:<br />
                Когда же черт возьмет тебя<br />

                Так думал молодой повеса,<br />
                Летя в пыли на почтовых,<br />
                Всевышней волею Зевеса<br />
                Наследник всех своих родных.<br />
                Друзья Людмилы и Руслана!<br />
                С героем моего романа<br />
                Без предисловий, сей же час<br />
                Позвольте познакомить вас:<br />
                Онегин, добрый мой приятель,<br />
                Родился на брегах Невы,<br />
                Где, может быть, родились вы<br />
                Или блистали, мой читатель;<br />
                Там некогда гулял и я:<br />
                Но вреден север для меня.<br /><br />

                Служив отлично благородно,<br />
                Долгами жил его отец,<br />
                Давал три бала ежегодно<br />
                И промотался наконец.<br />
                Судьба Евгения хранила:<br />
                Сперва Madame за ним ходила,<br />
                Потом Monsieur ее сменил.<br />
                Ребенок был резов, но мил.<br />
                Monsieur l'Abbé, француз убогой,<br />
                Чтоб не измучилось дитя,<br />
                Учил его всему шутя,<br />
                Не докучал моралью строгой,<br />
                Слегка за шалости бранил<br />
                И в Летний сад гулять водил.<br /><br />

                Когда же юности мятежной<br />
                Пришла Евгению пора,<br />
                Пора надежд и грусти нежной,<br />
                Monsieur прогнали со двора.<br />
                Вот мой Онегин на свободе;<br />
                Острижен по последней моде,<br />
                Как dandy лондонский одет —<br />
                И наконец увидел свет.<br />
                Он по-французски совершенно<br />
                Мог изъясняться и писал;<br />
                Легко мазурку танцевал<br />
                И кланялся непринужденно;<br />
                Чего ж вам больше? Свет решил,<br />
                Что он умен и очень мил.<br /><br />
            </div>
        </Page.Body>
        <Page.Footer sticky>
            <Page.Footer.Description>
                <Page.Footer.Description.Content>А. С. Пушкин</Page.Footer.Description.Content>
                <Page.Footer.Description.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                        Button Name
                    </Button>
                </Page.Footer.Description.Controls>
            </Page.Footer.Description>
        </Page.Footer>
    </Page>
);

<>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpen(true)}>
        Open LightBox
    </Button>
    {open && renderLightBox()}
</>
```

### SideOverlay + TopOverlay

```jsx
import {ELightBoxSideOverlaySize} from '@sberbusiness/triplex/components/LightBox/LightBoxSideOverlay/LightBoxSideOverlay';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {Page} from '@sberbusiness/triplex/components/Page/Page';
import {Confirm} from '@sberbusiness/triplex/components/Confirm/Confirm';

const [open, setOpen] = React.useState(false);
const [isSideOverlayOpened, setIsSideOverlayOpened] = React.useState(false);
const [isTopOverlayOpened, setIsTopOverlayOpened] = React.useState(false);
// Флаг закрытия SideOverlay, после того, как будет закрыт TopOverlay.
const [closeConfirmed, setCloseConfirmed] = React.useState(false);

const renderLightBox = () => (
    <LightBox isSideOverlayOpened={isSideOverlayOpened} isTopOverlayOpened={false}>
        <LightBox.Content>
            {renderPage(
                <Button
                    theme={EButtonTheme.GENERAL}
                    size={EButtonSize.MD}
                    onClick={() => setIsSideOverlayOpened(true)}
                >
                    Open SideOverlay
                </Button>
            )}
        </LightBox.Content>
        <LightBox.Controls>
            <LightBox.Controls.Close
                title="Закрыть"
                data-test-id="lightbox-close"
                onClick={() => setOpen(false)}
            />
        </LightBox.Controls>
        <LightBox.SideOverlay
            opened={isSideOverlayOpened}
            size={ELightBoxSideOverlaySize.MD}
            isTopOverlayOpened={isTopOverlayOpened}
            isTopLevelSideOverlayOpened={false}
        >
            {renderPage(
                <LightBox.SideOverlay.Close
                    title="Закрыть"
                    data-test-id="lightbox-side-overlay-close"
                    // Закрытие SideOverlay по Esc не должно работать при открытом TopOverlay.
                    clickByEsc={!isTopOverlayOpened}
                    onClick={() => setIsTopOverlayOpened(true)}
                />
            )}
            {renderTopOverlay()}
        </LightBox.SideOverlay>
    </LightBox>
);

// Обработчик закрытия TopOverlay.
const handleCloseTopOverlay = () => {
    if (closeConfirmed) {
        setIsSideOverlayOpened(false);
    }
};

const renderTopOverlay = () => (
    <LightBox.TopOverlay opened={isTopOverlayOpened} onClose={handleCloseTopOverlay}>
        <Confirm>
            <Confirm.Content>
                <Confirm.Content.Title>Внимание</Confirm.Content.Title>
                <Confirm.Content.SubTitle>
                    Несохранённые данные будут утеряны. Вы уверены, что хотите покинуть форму
                    редактирования?
                </Confirm.Content.SubTitle>
            </Confirm.Content>
            <Confirm.Controls>
                <Button
                    theme={EButtonTheme.SECONDARY}
                    size={EButtonSize.MD}
                    onClick={() => {
                        setCloseConfirmed(false);
                        setIsTopOverlayOpened(false);
                    }}
                >
                    Отмена
                </Button>
                <Button
                    theme={EButtonTheme.DANGER}
                    size={EButtonSize.MD}
                    onClick={() => {
                        setCloseConfirmed(true);
                        setIsTopOverlayOpened(false);
                    }}
                >
                    Покинуть форму
                </Button>
            </Confirm.Controls>
            <Confirm.Close
                title="Закрыть"
                // Закрыть по Esc, если TopOverlay открыт.
                clickByEsc={isTopOverlayOpened}
                onClick={() => {
                    setCloseConfirmed(false);
                    setIsTopOverlayOpened(false);
                }}
            />
        </Confirm>
    </LightBox.TopOverlay>
);

const renderPage = (actionButton) => (
    <Page>
        <Page.Header sticky>
            <Page.Header.Title>
                <Page.Header.Title.Content>
                    <Page.Header.Title.Content.Text>Евгений Онегин</Page.Header.Title.Content.Text>
                </Page.Header.Title.Content>
                <Page.Header.Title.Controls>{actionButton}</Page.Header.Title.Controls>
            </Page.Header.Title>
        </Page.Header>
        <Page.Body>
            <div>
                Мой дядя самых честных правил,<br />
                Когда не в шутку занемог,<br />
                Он уважать себя заставил<br />
                И лучше выдумать не мог.<br />
                Его пример другим наука;<br />
                Но, боже мой, какая скука<br />
                С больным сидеть и день и ночь,<br />
                Не отходя ни шагу прочь!<br />
                Какое низкое коварство<br />
                Полуживого забавлять,<br />
                Ему подушки поправлять,<br />
                Печально подносить лекарство,<br />
                Вздыхать и думать про себя:<br />
                Когда же черт возьмет тебя<br />

                Так думал молодой повеса,<br />
                Летя в пыли на почтовых,<br />
                Всевышней волею Зевеса<br />
                Наследник всех своих родных.<br />
                Друзья Людмилы и Руслана!<br />
                С героем моего романа<br />
                Без предисловий, сей же час<br />
                Позвольте познакомить вас:<br />
                Онегин, добрый мой приятель,<br />
                Родился на брегах Невы,<br />
                Где, может быть, родились вы<br />
                Или блистали, мой читатель;<br />
                Там некогда гулял и я:<br />
                Но вреден север для меня.<br /><br />

                Служив отлично благородно,<br />
                Долгами жил его отец,<br />
                Давал три бала ежегодно<br />
                И промотался наконец.<br />
                Судьба Евгения хранила:<br />
                Сперва Madame за ним ходила,<br />
                Потом Monsieur ее сменил.<br />
                Ребенок был резов, но мил.<br />
                Monsieur l'Abbé, француз убогой,<br />
                Чтоб не измучилось дитя,<br />
                Учил его всему шутя,<br />
                Не докучал моралью строгой,<br />
                Слегка за шалости бранил<br />
                И в Летний сад гулять водил.<br /><br />

                Когда же юности мятежной<br />
                Пришла Евгению пора,<br />
                Пора надежд и грусти нежной,<br />
                Monsieur прогнали со двора.<br />
                Вот мой Онегин на свободе;<br />
                Острижен по последней моде,<br />
                Как dandy лондонский одет —<br />
                И наконец увидел свет.<br />
                Он по-французски совершенно<br />
                Мог изъясняться и писал;<br />
                Легко мазурку танцевал<br />
                И кланялся непринужденно;<br />
                Чего ж вам больше? Свет решил,<br />
                Что он умен и очень мил.<br /><br />
            </div>
        </Page.Body>
        <Page.Footer sticky>
            <Page.Footer.Description>
                <Page.Footer.Description.Content>А. С. Пушкин</Page.Footer.Description.Content>
                <Page.Footer.Description.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                        Button Name
                    </Button>
                </Page.Footer.Description.Controls>
            </Page.Footer.Description>
        </Page.Footer>
    </Page>
);

<>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpen(true)}>
        Open LightBox
    </Button>
    {open && renderLightBox()}
</>
```

### Nested SideOverlays

```jsx
import {ELightBoxSideOverlaySize} from '@sberbusiness/triplex/components/LightBox/LightBoxSideOverlay/LightBoxSideOverlay';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {Page} from '@sberbusiness/triplex/components/Page/Page';

const [open, setOpen] = React.useState(false);
const [isSideOverlayLGOpened, setIsSideOverlayLGOpened] = React.useState(false);
const [isSideOverlayMDOpened, setIsSideOverlayMDOpened] = React.useState(false);
const [isSideOverlaySMOpened, setIsSideOverlaySMOpened] = React.useState(false);

const renderLightBox = () => (
    <LightBox isSideOverlayOpened={isSideOverlayLGOpened}>
        <LightBox.Content isLoading={false}>
            {renderPage(
                false,
                <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                    Button Name
                </Button>,
                <Button
                    theme={EButtonTheme.SECONDARY}
                    size={EButtonSize.MD}
                    onClick={() => setIsSideOverlayLGOpened(true)}
                >
                    Open SideOverlayLG
                </Button>
            )}
        </LightBox.Content>
        <LightBox.Controls>
            <LightBox.Controls.Close
                title="Закрыть"
                data-test-id="lightbox-close"
                onClick={() => setOpen(false)}
            />
        </LightBox.Controls>
        <LightBox.SideOverlay
            opened={isSideOverlayLGOpened}
            size={ELightBoxSideOverlaySize.LG}
            isTopLevelSideOverlayOpened={isSideOverlayMDOpened}
            isTopOverlayOpened={false}
        >
            {renderPage(
                false,
                <LightBox.SideOverlay.Close
                    data-test-id="lightbox-side-overlay-close"
                    // Закрытие этого SideOverlay по Esc не должно работать при открытом SideOverlay
                    // верхнего уровня.
                    clickByEsc={!isSideOverlayMDOpened}
                    onClick={() => setIsSideOverlayLGOpened(false)}
                />,
                <Button
                    theme={EButtonTheme.SECONDARY}
                    size={EButtonSize.MD}
                    onClick={() => setIsSideOverlayMDOpened(true)}
                >
                    Open SideOverlayMD
                </Button>
            )}
        </LightBox.SideOverlay>
        <LightBox.SideOverlay
            opened={isSideOverlayMDOpened}
            size={ELightBoxSideOverlaySize.MD}
            isTopLevelSideOverlayOpened={isSideOverlaySMOpened}
        >
            {renderPage(
                false,
                <LightBox.SideOverlay.Close
                    data-test-id="lightbox-side-overlay-close"
                    // Закрытие этого SideOverlay по Esc не должно работать при открытом SideOverlay
                    // верхнего уровня.
                    clickByEsc={!isSideOverlaySMOpened}
                    onClick={() => setIsSideOverlayMDOpened(false)}
                />,
                <Button
                    theme={EButtonTheme.SECONDARY}
                    size={EButtonSize.MD}
                    onClick={() => setIsSideOverlaySMOpened(true)}
                >
                    Open SideOverlaySM
                </Button>
            )}
        </LightBox.SideOverlay>
        <LightBox.SideOverlay opened={isSideOverlaySMOpened} size={ELightBoxSideOverlaySize.SM}>
            {renderPage(
                true,
                <LightBox.SideOverlay.Close
                    data-test-id="lightbox-side-overlay-close"
                    clickByEsc={true}
                    onClick={() => setIsSideOverlaySMOpened(false)}
                />,
                <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                    Button Name
                </Button>
            )}
        </LightBox.SideOverlay>
    </LightBox>
);

const renderPage = (isShortBodyContent, headerActionButton, footerActionButton) => (
    <Page>
        <Page.Header sticky>
            <Page.Header.Title>
                <Page.Header.Title.Content>
                    <Page.Header.Title.Content.Text>Евгений Онегин</Page.Header.Title.Content.Text>
                </Page.Header.Title.Content>
                <Page.Header.Title.Controls>{headerActionButton}</Page.Header.Title.Controls>
            </Page.Header.Title>
        </Page.Header>
        <Page.Body>
            {isShortBodyContent ? (
                <div>
                    Мой дядя самых честных правил,<br />
                    Когда не в шутку занемог,<br />
                    Он уважать себя заставил<br />
                    И лучше выдумать не мог.<br />
                    Его пример другим наука;<br />
                    Но, боже мой, какая скука<br />
                    С больным сидеть и день и ночь,<br />
                    Не отходя ни шагу прочь!<br />
                    Какое низкое коварство<br />
                    Полуживого забавлять,<br />
                    Ему подушки поправлять,<br />
                    Печально подносить лекарство,<br />
                    Вздыхать и думать про себя:<br />
                    Когда же черт возьмет тебя
                </div>
            ) : (
                <div>
                    Мой дядя самых честных правил,<br />
                    Когда не в шутку занемог,<br />
                    Он уважать себя заставил<br />
                    И лучше выдумать не мог.<br />
                    Его пример другим наука;<br />
                    Но, боже мой, какая скука<br />
                    С больным сидеть и день и ночь,<br />
                    Не отходя ни шагу прочь!<br />
                    Какое низкое коварство<br />
                    Полуживого забавлять,<br />
                    Ему подушки поправлять,<br />
                    Печально подносить лекарство,<br />
                    Вздыхать и думать про себя:<br />
                    Когда же черт возьмет тебя<br /><br />

                    Так думал молодой повеса,<br />
                    Летя в пыли на почтовых,<br />
                    Всевышней волею Зевеса<br />
                    Наследник всех своих родных.<br />
                    Друзья Людмилы и Руслана!<br />
                    С героем моего романа<br />
                    Без предисловий, сей же час<br />
                    Позвольте познакомить вас:<br />
                    Онегин, добрый мой приятель,<br />
                    Родился на брегах Невы,<br />
                    Где, может быть, родились вы<br />
                    Или блистали, мой читатель;<br />
                    Там некогда гулял и я:<br />
                    Но вреден север для меня.<br /><br />

                    Служив отлично благородно,<br />
                    Долгами жил его отец,<br />
                    Давал три бала ежегодно<br />
                    И промотался наконец.<br />
                    Судьба Евгения хранила:<br />
                    Сперва Madame за ним ходила,<br />
                    Потом Monsieur ее сменил.<br />
                    Ребенок был резов, но мил.<br />
                    Monsieur l'Abbé, француз убогой,<br />
                    Чтоб не измучилось дитя,<br />
                    Учил его всему шутя,<br />
                    Не докучал моралью строгой,<br />
                    Слегка за шалости бранил<br />
                    И в Летний сад гулять водил.<br /><br />

                    Когда же юности мятежной<br />
                    Пришла Евгению пора,<br />
                    Пора надежд и грусти нежной,<br />
                    Monsieur прогнали со двора.<br />
                    Вот мой Онегин на свободе;<br />
                    Острижен по последней моде,<br />
                    Как dandy лондонский одет —<br />
                    И наконец увидел свет.<br />
                    Он по-французски совершенно<br />
                    Мог изъясняться и писал;<br />
                    Легко мазурку танцевал<br />
                    И кланялся непринужденно;<br />
                    Чего ж вам больше? Свет решил,<br />
                    Что он умен и очень мил.<br /><br />
                </div>
            )}
        </Page.Body>
        <Page.Footer sticky>
            <Page.Footer.Description>
                <Page.Footer.Description.Content>А. С. Пушкин</Page.Footer.Description.Content>
                <Page.Footer.Description.Controls>{footerActionButton}</Page.Footer.Description.Controls>
            </Page.Footer.Description>
        </Page.Footer>
    </Page>
);

<>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpen(true)}>
        Open LightBox
    </Button>
    {open && renderLightBox()}
</>
```

### SideOverlay + Portal

```jsx
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {Page} from '@sberbusiness/triplex/components/Page/Page';
import {Portal} from '@sberbusiness/triplex/components/Portal/Portal';

const [open, setOpen] = React.useState(false);
const [isSideOverlayOpened, setIsSideOverlayOpened] = React.useState(false);
// Здесь не используется useRef, потому что он не вызовет rerender после изменения.
const [sideOverlayNode, setSideOverlayNode] = React.useState(null);

const renderLightBox = () => (
    <LightBox isSideOverlayOpened={isSideOverlayOpened} isTopOverlayOpened={false}>
        <LightBox.Content>
            {renderPage()}
        </LightBox.Content>
        <LightBox.Controls>
            <LightBox.Controls.Close
                title="Закрыть"
                data-test-id="lightbox-close"
                onClick={() => setOpen(false)}
            />
        </LightBox.Controls>
        <div ref={node => setSideOverlayNode(node)} />
    </LightBox>
);

const renderPage = (actionButton) => (
    <Page>
        <Page.Header>
            <Page.Header.Title>
                <Page.Header.Title.Content>
                    <Page.Header.Title.Content.Text>Евгений Онегин</Page.Header.Title.Content.Text>
                </Page.Header.Title.Content>
                <Page.Header.Title.Controls>
                    <Button
                        theme={EButtonTheme.GENERAL}
                        size={EButtonSize.MD}
                        onClick={() => setIsSideOverlayOpened(true)}
                    >
                        Open SideOverlay
                    </Button>
                </Page.Header.Title.Controls>
            </Page.Header.Title>
        </Page.Header>
        <Page.Body>
            <div>
                Мой дядя самых честных правил,<br />
                Когда не в шутку занемог,<br />
                Он уважать себя заставил<br />
                И лучше выдумать не мог.<br />
                Его пример другим наука;<br />
                Но, боже мой, какая скука<br />
                С больным сидеть и день и ночь,<br />
                Не отходя ни шагу прочь!<br />
                Какое низкое коварство<br />
                Полуживого забавлять,<br />
                Ему подушки поправлять,<br />
                Печально подносить лекарство,<br />
                Вздыхать и думать про себя:<br />
                Когда же черт возьмет тебя
            </div>
        </Page.Body>
        <Page.Footer>
            <Page.Footer.Description>
                <Page.Footer.Description.Content>А. С. Пушкин</Page.Footer.Description.Content>
                <Page.Footer.Description.Controls>
                    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                        Button Name
                    </Button>
                </Page.Footer.Description.Controls>
            </Page.Footer.Description>
        </Page.Footer>
    </Page>
);

const renderSideOverlay = () => (
    <LightBox.SideOverlay opened={isSideOverlayOpened}>
        <Page>
            <Page.Header>
                <Page.Header.Title>
                    <Page.Header.Title.Content>
                        <Page.Header.Title.Content.Text>Евгений Онегин</Page.Header.Title.Content.Text>
                    </Page.Header.Title.Content>
                    <Page.Header.Title.Controls>
                        <LightBox.SideOverlay.Close
                            data-test-id="lightbox-side-overlay-close"
                            clickByEsc={true}
                            onClick={() => setIsSideOverlayOpened(false)}
                        />
                    </Page.Header.Title.Controls>
                </Page.Header.Title>
            </Page.Header>
            <Page.Body>
                <div>
                    Так думал молодой повеса,<br />
                    Летя в пыли на почтовых,<br />
                    Всевышней волею Зевеса<br />
                    Наследник всех своих родных.<br />
                    Друзья Людмилы и Руслана!<br />
                    С героем моего романа<br />
                    Без предисловий, сей же час<br />
                    Позвольте познакомить вас:<br />
                    Онегин, добрый мой приятель,<br />
                    Родился на брегах Невы,<br />
                    Где, может быть, родились вы<br />
                    Или блистали, мой читатель;<br />
                    Там некогда гулял и я:<br />
                    Но вреден север для меня.
                </div>
            </Page.Body>
            <Page.Footer>
                <Page.Footer.Description>
                    <Page.Footer.Description.Content>А. С. Пушкин</Page.Footer.Description.Content>
                    <Page.Footer.Description.Controls>
                        <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                            Button Name
                        </Button>
                    </Page.Footer.Description.Controls>
                </Page.Footer.Description>
            </Page.Footer>
        </Page>
    </LightBox.SideOverlay>
);

<>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpen(true)}>
        Open LightBox
    </Button>
    {open && renderLightBox()}
    {sideOverlayNode && <Portal container={sideOverlayNode}>{renderSideOverlay()}</Portal>}
</>
```

### Tabs

```jsx
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {Page} from '@sberbusiness/triplex/components/Page/Page';

const [open, setOpen] = React.useState(false);
const [selectedTabId, setSelectedTabId] = React.useState('lightbox-tab-0');

const tabs = [
    {id: 'lightbox-tab-0', label: 'Tab Name'},
    {id: 'lightbox-tab-1', label: 'Tab Name'},
    {id: 'lightbox-tab-2', label: 'Tab Name'},
    {id: 'lightbox-tab-3', label: 'Tab Name'},
    {id: 'lightbox-tab-4', label: 'Tab Name'},
    {id: 'lightbox-tab-5', label: 'Tab Name'},
    {id: 'lightbox-tab-6', label: 'Tab Name'},
    {id: 'lightbox-tab-7', label: 'Tab Name'},
    {id: 'lightbox-tab-8', label: 'Tab Name'},
    {id: 'lightbox-tab-9', label: 'Tab Name'},
];

const renderLightBox = () => (
    <LightBox>
        <LightBox.Content>{renderPage()}</LightBox.Content>
        <LightBox.Controls>
            <LightBox.Controls.Close
                title="Закрыть"
                data-test-id="lightbox-close"
                onClick={() => setOpen(false)}
            />
        </LightBox.Controls>
    </LightBox>
);

const renderPage = () => (
    <Page>
        <Page.Header>
            <Page.Header.Title>
                <Page.Header.Title.Content>
                    <Page.Header.Title.Content.Text>Евгений Онегин</Page.Header.Title.Content.Text>
                </Page.Header.Title.Content>
            </Page.Header.Title>
            <Page.Header.Tabs>
                <Page.Header.Tabs.Content>
                    <Page.Header.Tabs.Content.Tabs
                        tabs={tabs}
                        selectedTabId={selectedTabId}
                        onSelectTab={(id) => setSelectedTabId(id)}
                    />
                </Page.Header.Tabs.Content>
            </Page.Header.Tabs>
        </Page.Header>
        <Page.Body>
            <div>
                Мой дядя самых честных правил,<br />
                Когда не в шутку занемог,<br />
                Он уважать себя заставил<br />
                И лучше выдумать не мог.<br />
                Его пример другим наука;<br />
                Но, боже мой, какая скука<br />
                С больным сидеть и день и ночь,<br />
                Не отходя ни шагу прочь!<br />
                Какое низкое коварство<br />
                Полуживого забавлять,<br />
                Ему подушки поправлять,<br />
                Печально подносить лекарство,<br />
                Вздыхать и думать про себя:<br />
                Когда же черт возьмет тебя
            </div>
        </Page.Body>
        <Page.Footer>
            <Page.Footer.Description>
                <Page.Footer.Description.Content>А. С. Пушкин</Page.Footer.Description.Content>
            </Page.Footer.Description>
        </Page.Footer>
    </Page>
);

<>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpen(true)}>
        Open LightBox
    </Button>
    {open && renderLightBox()}
</>
```

### Custom positioning

LightBox может позиционироваться не только относительно экрана устройства, но и относительно некоторого DOM элемента.
При позиционировании относительно DOM элемента, LightBox рассчитает левую координату и ширину элемента, и отрендерит себя в этих границах. Верхний отступ LightBox от границ экрана будет равен высоте DOM элемента, если отступ не нужен высота элемента должна быть равна 0. При изменении ширины/высоты DOM элемента LightBox будет осуществлять re-render.

Способы включения позиционирования LightBox относительно DOM элемента:

DOM элементу присвоить id из константы lightBoxViewManagerNodeIdDefault:
```jsx static
import {lightBoxViewManagerNodeIdDefault} from '@sberbusiness/triplex/components/LightBox/LightBox';

// Элемент, в границах которого будет рендериться LightBox.
<div id={lightBoxViewManagerNodeIdDefault} />
```

Передать произвольный id в DOM элемент и в LightBox.
```jsx static
// Элемент, в границах которого будет рендериться LightBox.
<div id="custom-id" />

<LightBox lightBoxViewManagerNodeId="custom-id" />
```

LightBox найдет нужную DOM ноду для расчета своего положения на экране, в случае остутствия DOM ноды, LightBox ее создаст и добавить в html-элемент body.

```jsx
import {ELightBoxSideOverlaySize} from '@sberbusiness/triplex/components/LightBox/LightBoxSideOverlay/LightBoxSideOverlay';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {Page} from '@sberbusiness/triplex/components/Page/Page';
import {Portal} from '@sberbusiness/triplex/components/Portal/Portal';

import './styles.less';

const [open, setOpen] = React.useState(false);

const [isCustomPanelOpened, setIsCustomPanelOpened] = React.useState(false);
const [viewManagerNodeWidth, setViewManagerNodeWidth] = React.useState(80);

React.useEffect(() => {
    setIsCustomPanelOpened(open);
}, [open])

const renderLightBox = () => (
    <LightBox lightBoxViewManagerNodeId="lightBoxViewManagerNodeId">
        <LightBox.Content>{renderPage()}</LightBox.Content>
        <LightBox.Controls>
            <LightBox.Controls.Close
                title="Закрыть"
                data-test-id="lightbox-close"
                onClick={() => setOpen(false)}
            />
        </LightBox.Controls>
    </LightBox>
);

const renderPage = () => (
    <Page>
        <Page.Header sticky>
            <Page.Header.Title>
                <Page.Header.Title.Content>
                    <Page.Header.Title.Content.Text>Евгений Онегин</Page.Header.Title.Content.Text>
                </Page.Header.Title.Content>
                <Page.Header.Title.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                        Button Name
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                        Button Name
                    </Button>
                </Page.Header.Title.Controls>
            </Page.Header.Title>
        </Page.Header>
        <Page.Body>
            <div>
                Мой дядя самых честных правил,<br />
                Когда не в шутку занемог,<br />
                Он уважать себя заставил<br />
                И лучше выдумать не мог.<br />
                Его пример другим наука;<br />
                Но, боже мой, какая скука<br />
                С больным сидеть и день и ночь,<br />
                Не отходя ни шагу прочь!<br />
                Какое низкое коварство<br />
                Полуживого забавлять,<br />
                Ему подушки поправлять,<br />
                Печально подносить лекарство,<br />
                Вздыхать и думать про себя:<br />
                Когда же черт возьмет тебя<br />

                Так думал молодой повеса,<br />
                Летя в пыли на почтовых,<br />
                Всевышней волею Зевеса<br />
                Наследник всех своих родных.<br />
                Друзья Людмилы и Руслана!<br />
                С героем моего романа<br />
                Без предисловий, сей же час<br />
                Позвольте познакомить вас:<br />
                Онегин, добрый мой приятель,<br />
                Родился на брегах Невы,<br />
                Где, может быть, родились вы<br />
                Или блистали, мой читатель;<br />
                Там некогда гулял и я:<br />
                Но вреден север для меня.<br /><br />

                Служив отлично благородно,<br />
                Долгами жил его отец,<br />
                Давал три бала ежегодно<br />
                И промотался наконец.<br />
                Судьба Евгения хранила:<br />
                Сперва Madame за ним ходила,<br />
                Потом Monsieur ее сменил.<br />
                Ребенок был резов, но мил.<br />
                Monsieur l'Abbé, француз убогой,<br />
                Чтоб не измучилось дитя,<br />
                Учил его всему шутя,<br />
                Не докучал моралью строгой,<br />
                Слегка за шалости бранил<br />
                И в Летний сад гулять водил.<br /><br />

                Когда же юности мятежной<br />
                Пришла Евгению пора,<br />
                Пора надежд и грусти нежной,<br />
                Monsieur прогнали со двора.<br />
                Вот мой Онегин на свободе;<br />
                Острижен по последней моде,<br />
                Как dandy лондонский одет —<br />
                И наконец увидел свет.<br />
                Он по-французски совершенно<br />
                Мог изъясняться и писал;<br />
                Легко мазурку танцевал<br />
                И кланялся непринужденно;<br />
                Чего ж вам больше? Свет решил,<br />
                Что он умен и очень мил.<br /><br />
            </div>
        </Page.Body>
        <Page.Footer sticky>
            <Page.Footer.Description>
                <Page.Footer.Description.Content>А. С. Пушкин</Page.Footer.Description.Content>
                <Page.Footer.Description.Controls>
                    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                        Button Name
                    </Button>
                </Page.Footer.Description.Controls>
            </Page.Footer.Description>
        </Page.Footer>
    </Page>
);

<>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpen(true)}>
        Open LightBox
    </Button>
    {open && renderLightBox()}

    <Portal container={document.body}>
        {/* Элемент, в визуальных границах (левая и правая координата) которого рендерится LightBox.
            Отступ LightBox от верхней границы экрана равен высоте этого элемента. */}
        <div
            id="lightBoxViewManagerNodeId"
            style={{
                position: 'fixed',
                top: 0,
                height: 0,
                left: 0,
                right: '20%',
                pointerEvents: 'none',
            }}
        />
    </Portal>
</>
```

### ModalWindow over LightBox.

Это антипаттерн, применять такие кейсы не рекомендуется.

```jsx
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {Page} from '@sberbusiness/triplex/components/Page/Page';
import {
    ModalWindow,
    ModalWindowHeader,
    ModalWindowBody,
    ModalWindowFooter,
    ModalWindowClose,
    ModalWindowContent,
} from '@sberbusiness/triplex/components/ModalWindow';
import {EModalWindowSize} from '@sberbusiness/triplex/components/ModalWindow/enums';
import {Header} from '@sberbusiness/triplex/components/Header/Header';
import {FooterDescription} from '@sberbusiness/triplex/components/Footer/components/FooterDescription';

const [open, setOpen] = React.useState(false);
const [openModal, setOpenModal] = React.useState(false);

const handleOpen = () => setOpenModal(true);
const handleClose = () => setOpenModal(false);

const renderLightBox = () => (
    <LightBox>
        <LightBox.Content>
            {renderPage()}
        </LightBox.Content>
        <LightBox.Controls>
            <LightBox.Controls.Close
                title="Закрыть"
                data-test-id="lightbox-close"
                onClick={() => setOpen(false)}
            />
        </LightBox.Controls>
    </LightBox>
);

const renderPage = () => (
    <Page>
        <Page.Header sticky>
            <Page.Header.Title>
                <Page.Header.Title.Content>
                    <Page.Header.Title.Content.Text>Евгений Онегин</Page.Header.Title.Content.Text>
                    <Page.Header.Title.Content.Subhead>
                        Русский поэт, драматург и прозаик, заложивший основы русского реалистического
                        направления.
                    </Page.Header.Title.Content.Subhead>
                </Page.Header.Title.Content>
                <Page.Header.Title.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={handleOpen}>
                        Open ModalWindow
                    </Button>
                    
                </Page.Header.Title.Controls>
            </Page.Header.Title>
        </Page.Header>
        <Page.Body>
            <div>
                Мой дядя самых честных правил,<br />
                Когда не в шутку занемог,<br />
                Он уважать себя заставил<br />
                И лучше выдумать не мог.<br />
                Его пример другим наука;<br />
                Но, боже мой, какая скука<br />
                С больным сидеть и день и ночь,<br />
                Не отходя ни шагу прочь!<br />
                Какое низкое коварство<br />
                Полуживого забавлять,<br />
                Ему подушки поправлять,<br />
                Печально подносить лекарство,<br />
                Вздыхать и думать про себя:<br />
                Когда же черт возьмет тебя<br /><br />
            </div>
        </Page.Body>
        <Page.Footer sticky>
            <Page.Footer.Description>
                <Page.Footer.Description.Content>А. С. Пушкин</Page.Footer.Description.Content>
                <Page.Footer.Description.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                        Button Name
                    </Button>
                </Page.Footer.Description.Controls>
            </Page.Footer.Description>
        </Page.Footer>
    </Page>
);

<>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpen(true)}>
        Open LightBox
    </Button>
    
    {open && renderLightBox()}

    <ModalWindow closeButton={<ModalWindowClose onClick={handleClose} key="close" />} isOpen={openModal}>
        <ModalWindowContent>
            <ModalWindowHeader>
                <Header.Title>
                    <Header.Title.Content>
                        <Header.Title.Content.Text>Текст заголовка в одну строку</Header.Title.Content.Text>
                    </Header.Title.Content>
                </Header.Title>
            </ModalWindowHeader>
            <ModalWindowBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </ModalWindowBody>
            <ModalWindowFooter>
                <FooterDescription>
                    <FooterDescription.Controls>
                        <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                            Button Name
                        </Button>
                        <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                            Button Name
                        </Button>
                    </FooterDescription.Controls>
                </FooterDescription>
            </ModalWindowFooter>
        </ModalWindowContent>
    </ModalWindow>
</>
```

### Disable focusTrap.

```jsx
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {Page} from '@sberbusiness/triplex/components/Page/Page';

const [open, setOpen] = React.useState(false);

const renderLightBox = () => (
    <LightBox focusTrapProps={{active: false}}>
        <LightBox.Content>
            {renderPage()}
        </LightBox.Content>
        <LightBox.Controls>
            <LightBox.Controls.Close
                title="Закрыть"
                data-test-id="lightbox-close"
                onClick={() => setOpen(false)}
            />
        </LightBox.Controls>
    </LightBox>
);

const renderPage = () => (
    <Page>
        <Page.Header sticky>
            <Page.Header.Title>
                <Page.Header.Title.Content>
                    <Page.Header.Title.Content.Text>Евгений Онегин</Page.Header.Title.Content.Text>
                    <Page.Header.Title.Content.Subhead>
                        Русский поэт, драматург и прозаик, заложивший основы русского реалистического
                        направления.
                    </Page.Header.Title.Content.Subhead>
                </Page.Header.Title.Content>
                <Page.Header.Title.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                        Button Name
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                        Button Name
                    </Button>
                </Page.Header.Title.Controls>
            </Page.Header.Title>
        </Page.Header>
        <Page.Body>
            <div>
                Мой дядя самых честных правил,<br />
                Когда не в шутку занемог,<br />
                Он уважать себя заставил<br />
                И лучше выдумать не мог.<br />
                Его пример другим наука;<br />
                Но, боже мой, какая скука<br />
                С больным сидеть и день и ночь,<br />
                Не отходя ни шагу прочь!<br />
                Какое низкое коварство<br />
                Полуживого забавлять,<br />
                Ему подушки поправлять,<br />
                Печально подносить лекарство,<br />
                Вздыхать и думать про себя:<br />
                Когда же черт возьмет тебя<br /><br />
            </div>
        </Page.Body>
        <Page.Footer sticky>
            <Page.Footer.Description>
                <Page.Footer.Description.Content>А. С. Пушкин</Page.Footer.Description.Content>
                <Page.Footer.Description.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                        Button Name
                    </Button>
                </Page.Footer.Description.Controls>
            </Page.Footer.Description>
        </Page.Footer>
    </Page>
);

<>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpen(true)}>
        Open LightBox
    </Button>
    {open && renderLightBox()}
</>
```

