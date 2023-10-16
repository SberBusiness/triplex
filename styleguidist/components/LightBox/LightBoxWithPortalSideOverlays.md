```jsx
import React, {useState} from 'react';
import {LightBox} from '@sberbusiness/triplex/components/LightBox/LightBox';
import {Page} from '@sberbusiness/triplex/components/Page/Page';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {Portal} from '@sberbusiness/triplex/components/Portal/Portal';

const [openedSideOverlayMD, setOpenedSideOverlayMD] = useState(false);
const [openedLightBox, setOpenedLightBox] = useState(false);
// Здесь не используется useRef, потому что он не вызовет rerender после изменения.
const [sideOverlayNode, setSideOverlayNode] = useState(null);

const renderSideOverlay = () => (
    <LightBox.SideOverlay opened={openedSideOverlayMD}>
        <Page>
            <Page.Header>
                <Page.Header.Title>
                    <Page.Header.Title.Content>
                        <Page.Header.Title.Content.Text>Евгений Онегин</Page.Header.Title.Content.Text>
                    </Page.Header.Title.Content>
                    <Page.Header.Title.Controls>
                        <LightBox.SideOverlay.Close
                            clickByEsc
                            data-test-id="lightbox-side-overlay-close"
                            onClick={() => setOpenedSideOverlayMD(false)}
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
    {openedLightBox && (
        <>
            <LightBox isLoading={false} isSideOverlayOpened={openedSideOverlayMD} isTopOverlayOpened={false}>

                <LightBox.Content>
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
                                        onClick={() => setOpenedSideOverlayMD(true)}
                                    >
                                        Open SideOverlayMD
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
                </LightBox.Content>

                <LightBox.Controls>
                    <LightBox.Controls.Close data-test-id="lightbox-close" onClick={() => setOpenedLightBox(false)} title="Закрыть" />
                </LightBox.Controls>

                <div ref={node => setSideOverlayNode(node)} />
            </LightBox>
        </>
    )}

    {sideOverlayNode && <Portal container={sideOverlayNode}>{renderSideOverlay()}</Portal>}

    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpenedLightBox(true)}>
        Открыть лайтбокс
    </Button>
</>
```
