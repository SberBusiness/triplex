```jsx
import React, {useState, useEffect} from 'react';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {Page} from '@sberbusiness/triplex/components/Page/Page';
import {LightBox} from '@sberbusiness/triplex/components/LightBox/LightBox';
import {ELightBoxSideOverlaySize} from '@sberbusiness/triplex/components/LightBox/LightBoxSideOverlay/LightBoxSideOverlay';
import {Confirm} from '@sberbusiness/triplex/components/Confirm/Confirm';

const [openedSideOverlayMD, setOpenedSideOverlayMD] = useState(false);
const [openedLightBox, setOpenedLightBox] = useState(false);
const [openedTopOverlay, setOpenedTopOverlay] = useState(false);
// Флаг закрытия SideOverlay, после того, как будет закрыт TopOverlay.
const [closeSideOverlayAfterCloseTopOverlay, setCloseSideOverlayAfterCloseTopOverlay] = useState(false);
const [isLoadingSideOverlay, setIsLoadingSideOverlay] = useState(false);

useEffect(() => {
    if (openedSideOverlayMD && isLoadingSideOverlay) {
        setTimeout(() => {
            setIsLoadingSideOverlay(false);
        }, 3000);
    }
}, [openedSideOverlayMD]);

// Обработчик закрытия TopOverlay.
const handleCloseTopOverlay = () => {
    if (closeSideOverlayAfterCloseTopOverlay) {
        setOpenedSideOverlayMD(false);
    }
};

const renderTopOverlay = () => (
    <LightBox.TopOverlay onClose={handleCloseTopOverlay} opened={openedTopOverlay}>
        <Confirm>
            <Confirm.Content>
                <Confirm.Content.Title>Внимание</Confirm.Content.Title>
                <Confirm.Content.SubTitle>
                    Несохранённые данные будут утеряны. Вы уверены, что хотите покинуть форму редактирования?
                </Confirm.Content.SubTitle>
            </Confirm.Content>
            <Confirm.Controls>
                <Button
                    theme={EButtonTheme.SECONDARY}
                    size={EButtonSize.MD}
                    onClick={() => {
                        setCloseSideOverlayAfterCloseTopOverlay(false);
                        setOpenedTopOverlay(false);
                    }}
                >
                    Продолжить
                </Button>
                <Button
                    theme={EButtonTheme.DANGER}
                    size={EButtonSize.MD}
                    onClick={() => {
                        setCloseSideOverlayAfterCloseTopOverlay(true);
                        setOpenedTopOverlay(false);
                    }}
                >
                    Покинуть форму
                </Button>
            </Confirm.Controls>
            <Confirm.Close
                // Закрыть по Esc, если TopOverlay открыт.
                clickByEsc={openedTopOverlay}
                onClick={() => {
                    setCloseSideOverlayAfterCloseTopOverlay(false);
                    setOpenedTopOverlay(false)
                }}
                title="Закрыть"
            />
        </Confirm>
    </LightBox.TopOverlay>
);

const renderPage = (headerActionButton, title, content) => (
    <Page>
        <Page.Header sticky>
            <Page.Header.Title>
                <Page.Header.Title.Content>
                    <Page.Header.Title.Content.Text>{title}</Page.Header.Title.Content.Text>
                </Page.Header.Title.Content>
                <Page.Header.Title.Controls>{headerActionButton}</Page.Header.Title.Controls>
            </Page.Header.Title>
        </Page.Header>

        <Page.Body>
            <div>
                {content}
            </div>
        </Page.Body>

        <Page.Footer sticky>
            <Page.Footer.Description>
                <Page.Footer.Description.Content>А. С. Пушкин</Page.Footer.Description.Content>
                <Page.Footer.Description.Controls>
                    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                        General button
                    </Button>
                </Page.Footer.Description.Controls>
            </Page.Footer.Description>
        </Page.Footer>
    </Page>
);

<>
    {openedLightBox ? (
        <LightBox isLoading={false} isSideOverlayOpened={openedSideOverlayMD} isTopOverlayOpened={false}>
            <LightBox.Content>
                {renderPage(
                    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} onClick={() => setOpenedSideOverlayMD(true)}>
                        Open SideOverlayMD
                    </Button>,
                    'Текст заголовка LightBox',
                    'Контент LightBox'
                )}
            </LightBox.Content>

            <LightBox.Controls>
                <LightBox.Controls.Close data-test-id="lightbox-close" onClick={() => setOpenedLightBox(false)} title="Закрыть LightBox" />
            </LightBox.Controls>

            <LightBox.SideOverlay
                opened={openedSideOverlayMD}
                size={ELightBoxSideOverlaySize.MD}
                isTopOverlayOpened={openedTopOverlay}
                isTopLevelSideOverlayOpened={false}
            >
                {renderPage(
                    <LightBox.SideOverlay.Close
                        // Закрытие SideOverlay по Esc не должно работать при открытом TopOverlay.
                        clickByEsc={!openedTopOverlay}
                        data-test-id="lightbox-side-overlay-close"
                        onClick={() => setOpenedTopOverlay(true)}
                        title="Закрыть SideOverlay"
                    />,
                    'Текст заголовка SideOverlay',
                    'Контент SideOverlay'
                )}
                {renderTopOverlay()}
            </LightBox.SideOverlay>
        </LightBox>
    ) : (
        <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpenedLightBox(true)}>
            Открыть лайтбокс
        </Button>
    )}
</>
```
