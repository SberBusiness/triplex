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
import {ELightBoxSideOverlaySize} from '@sberbusiness/triplex/desktop/components/LightBox/LightBoxSideOverlay/LightBoxSideOverlay';
import {Page} from '@sberbusiness/triplex/desktop/components/Page/Page';
import {Button} from '@sberbusiness/triplex/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/desktop/components/Button/enums';

const [openedSideOverlayLG, setOpenedSideOverlayLG] = useState(false);
const [openedSideOverlayMD, setOpenedSideOverlayMD] = useState(false);
const [openedSideOverlaySM, setOpenedSideOverlaySM] = useState(false);
const [openedLightBox, setOpenedLightBox] = useState(false);

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
    {openedLightBox ? (
        <LightBox isLoading={false} isSideOverlayOpened={openedSideOverlayLG} isTopOverlayOpened={false}>

            <LightBox.Content isLoading={false}>
                {renderPage(
                    false,
                    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} onClick={() => setOpenedSideOverlayLG(true)}>
                        Open SideOverlayLG
                    </Button>,
                    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                        Button Name
                    </Button>
                )}
            </LightBox.Content>
            
            <LightBox.Controls>
                <LightBox.Controls.Close data-test-id="lightbox-close" onClick={() => setOpenedLightBox(false)} title="Закрыть" />
            </LightBox.Controls>

            <LightBox.SideOverlay
                opened={openedSideOverlayLG}
                size={ELightBoxSideOverlaySize.LG}
                isTopLevelSideOverlayOpened={openedSideOverlayMD}
                isTopOverlayOpened={false}
            >
                {renderPage(
                    false,
                    <LightBox.SideOverlay.Close
                        // Закрытие этого SideOverlay по Esc не должно работать при открытом SideOverlay верхнего уровня.
                        clickByEsc={!openedSideOverlayMD}
                        data-test-id="lightbox-side-overlay-close"
                        onClick={() => setOpenedSideOverlayLG(false)}
                    />,
                    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} onClick={() => setOpenedSideOverlayMD(true)}>
                        Open SideOverlayMD
                    </Button>
                )}
            </LightBox.SideOverlay>

            <LightBox.SideOverlay
                opened={openedSideOverlayMD}
                size={ELightBoxSideOverlaySize.MD}
                isTopLevelSideOverlayOpened={openedSideOverlaySM}
            >
                {renderPage(
                    false,
                    <LightBox.SideOverlay.Close
                        // Закрытие этого SideOverlay по Esc не должно работать при открытом SideOverlay верхнего уровня.
                        clickByEsc={!openedSideOverlaySM}
                        data-test-id="lightbox-side-overlay-close"
                        onClick={() => setOpenedSideOverlayMD(false)}
                    />,
                    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} onClick={() => setOpenedSideOverlaySM(true)}>
                        Open SideOverlaySM
                    </Button>
                )}
            </LightBox.SideOverlay>

            <LightBox.SideOverlay opened={openedSideOverlaySM} size={ELightBoxSideOverlaySize.SM}>
                {renderPage(
                    true,
                    <LightBox.SideOverlay.Close
                        clickByEsc
                        data-test-id="lightbox-side-overlay-close"
                        onClick={() => setOpenedSideOverlaySM(false)}
                    />,
                    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                        Button Name
                    </Button>
                )}
            </LightBox.SideOverlay>
        </LightBox>
    ) : (
        <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpenedLightBox(true)}>
            Открыть лайтбокс
        </Button>
    )}
</>
```
