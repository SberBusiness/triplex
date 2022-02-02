```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency
    componentTitle="LightBox"
    isMobileComponent={false}
/>
```

```jsx
import React, {useState, useEffect} from 'react';
import {Button} from '@sbbol/web-library/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sbbol/web-library/desktop/components/Button/enums';
import {Page} from '@sbbol/web-library/desktop/components/Page/Page';
import {LightBox} from '@sbbol/web-library/desktop/components/LightBox/LightBox';
import {ELightBoxSideOverlaySize} from '@sbbol/web-library/desktop/components/LightBox/LightBoxSideOverlay/LightBoxSideOverlay';
import {Confirm} from '@sbbol/web-library/desktop/components/Confirm/Confirm';

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
                    Несохраненные данные будут утеряны. Вы уверены, что хотите покинуть форму редактирования?
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
                onClick={() => setOpenedTopOverlay(false)}
                title="Закрыть"
            />
        </Confirm>
    </LightBox.TopOverlay>
);

const renderPage = (headerActionButton) => (
    <Page>
        <Page.Header sticky>
            <Page.Header.Title>
                <Page.Header.Title.Content>
                    <Page.Header.Title.Content.Text>Евгений Онегин</Page.Header.Title.Content.Text>
                    <Page.Header.Title.Content.Controls>{headerActionButton}</Page.Header.Title.Content.Controls>
                </Page.Header.Title.Content>
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
    {openedLightBox ? (
        <LightBox isLoading={false} isSideOverlayOpened={openedSideOverlayMD} isTopOverlayOpened={false}>
            <LightBox.Controls>
                <LightBox.Controls.Close data-test-id="lightbox-close" onClick={() => setOpenedLightBox(false)}  title="Закрыть" />
            </LightBox.Controls>

            <LightBox.Content>
                {renderPage(
                    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} onClick={() => setOpenedSideOverlayMD(true)}>
                        Open SideOverlayMD
                    </Button>
                )}
            </LightBox.Content>

            <LightBox.SideOverlay
                opened={openedSideOverlayMD}
                size={ELightBoxSideOverlaySize.MD}
                isTopOverlayOpened={openedTopOverlay}
                isTopLevelSideOverlayOpened={false}
                isLoading={isLoadingSideOverlay}
            >
                {renderPage(
                    <LightBox.SideOverlay.Close
                        // Закрытие SideOverlay по Esc не должно работать при открытом TopOverlay.
                        clickByEsc={!openedTopOverlay && !isLoadingSideOverlay}
                        data-test-id="lightbox-side-overlay-close"
                        onClick={() => setOpenedTopOverlay(true)}
                        title="Закрыть"
                    />
                )}
                {renderTopOverlay()}
            </LightBox.SideOverlay>
        </LightBox>
    ) : (
        <div>
            <div>
                <label><input type="checkbox" checked={isLoadingSideOverlay} onChange={(e) => setIsLoadingSideOverlay(e.target.checked)} /> Эмулировать загрузку данных в SideOverlay.</label><br /><br />
            </div>

            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpenedLightBox(true)}>
                Открыть лайтбокс
            </Button>
        </div>
    )}
</>
```
