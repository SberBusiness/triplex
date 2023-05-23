```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency
    componentTitle="LightBox"
    isMobileComponent={false}
/>
```

```jsx
import React, {useState} from 'react';
import {LightBox} from '@sberbusiness/triplex/desktop/components/LightBox/LightBox';
import {Page} from '@sberbusiness/triplex/desktop/components/Page/Page';
import {Button} from '@sberbusiness/triplex/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {Confirm} from '@sberbusiness/triplex/desktop/components/Confirm/Confirm';

const [openedLightBoxTopOverlay, setOpenedLightBoxTopOverlay] = useState(false);
const [openedLightBox, setOpenedLightBox] = useState(false);
// Флаг закрытия LightBox, после того, как будет закрыт TopOverlay.
const [closeLightBoxAfterCloseTopOverlay, setCloseLightBoxAfterCloseTopOverlay] = useState(false);

// Обработчик закрытия TopOverlay.
const handleCloseTopOverlay = () => {
    if (closeLightBoxAfterCloseTopOverlay) {
        setOpenedLightBox(false);
    }
};

const renderTopOverlay = () => (
    <LightBox.TopOverlay
        onClose={handleCloseTopOverlay}
        onOpen={() => console.log('TopOverlay on open.')}
        opened={openedLightBoxTopOverlay}
    >
        <Confirm>
            <Confirm.Content>
                <Confirm.Content.Title>Внимание</Confirm.Content.Title>
                <Confirm.Content.SubTitle>
                    Несохранённые данные будут утеряны. Вы уверены, что хотите покинуть форму редактирования?
                </Confirm.Content.SubTitle>
            </Confirm.Content>
            <Confirm.Controls>
                <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpenedLightBoxTopOverlay(false)}>
                    Продолжить
                </Button>
                <Button
                    theme={EButtonTheme.DANGER}
                    size={EButtonSize.MD}
                    onClick={() => {
                        setOpenedLightBoxTopOverlay(false);
                        setCloseLightBoxAfterCloseTopOverlay(true);
                    }}
                >
                    Покинуть форму
                </Button>
            </Confirm.Controls>
            <Confirm.Close
                onClick={() => setOpenedLightBoxTopOverlay(false)}
                // Закрыть по Esc, если TopOverlay открыт.
                clickByEsc={openedLightBoxTopOverlay}
                title="Закрыть"
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

                <Page.Header.LayoutSidebar.Sidebar style={{padding: '24px 24px 24px 0'}}>
                    Sidebar
                </Page.Header.LayoutSidebar.Sidebar>
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
                    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                        Button Name
                    </Button>
                </Page.Footer.Description.Controls>
            </Page.Footer.Description>
        </Page.Footer>
    </Page>
);

<>
    {openedLightBox ? (
        <LightBox isTopOverlayOpened={openedLightBoxTopOverlay}>
            <LightBox.Content>
                {renderPage()}
                {renderTopOverlay()}
            </LightBox.Content>

            <LightBox.Controls>
                <LightBox.Controls.Close data-test-id="lightbox-close" onClick={() => setOpenedLightBoxTopOverlay(true)} title="Закрыть" />
            </LightBox.Controls>
        </LightBox>
    ) : (
        <Button
            theme={EButtonTheme.SECONDARY}
            size={EButtonSize.MD}
            onClick={() => {
                setCloseLightBoxAfterCloseTopOverlay(false);
                setOpenedLightBox(true);
            }}
        >
            Открыть лайтбокс
        </Button>
    )}
</>
```
