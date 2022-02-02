```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency
    componentTitle="LightBox"
    isMobileComponent={false}
/>
```

LightBox может позиционироваться не только относительно экрана устройства, но и относительно некоторого DOM элемента.
При позиционировании относительно DOM элемента, LightBox рассчитает левую координату и ширину элемента, и отрендерит себя в этих границах. При изменении ширины DOM элемента LightBox будет осуществлять rerender. 

Способы включения позиционирования LightBox относительно DOM элемента:

1. DOM элементу присвоить данный id:
```html
import {lightBoxViewManagerNodeIdDefault} from '@sbbol/web-library/desktop/components/LightBox/LightBox';

// Элемент, в границах которого будет рендериться LightBox.
<div id={lightBoxViewManagerNodeIdDefault} />
```

2. Передать произвольный id DOM элемента в LightBox.
```html
// Элемент, в границах которого будет рендериться LightBox.
<div id="custom-id" />

<LightBox lightBoxViewManagerNodeId="custom-id">
```

В обоих случаях LightBox найдет нужную DOM ноду для расчета своего положения на экране. 

```jsx
import React, {useState} from 'react';
import {LightBox} from '@sbbol/web-library/desktop/components/LightBox/LightBox';
import {Page} from '@sbbol/web-library/desktop/components/Page/Page';
import {Button} from '@sbbol/web-library/desktop/components/Button/Button';
import {EButtonSize, EButtonTheme} from '@sbbol/web-library/desktop/components/Button/enums';
import {Confirm} from '@sbbol/web-library/desktop/components/Confirm/Confirm';
import {ELightBoxSideOverlaySize} from '@sbbol/web-library/desktop/components/LightBox/LightBoxSideOverlay/LightBoxSideOverlay';

const [openedLightBox, setOpenedLightBox] = useState(false);
const [showDOMNode, setShowDOMNode] = useState(false);
const [viewManagerNodeWidth, setViewManagerNodeWidth] = useState(80);
const [openedSideOverlayMD, setOpenedSideOverlayMD] = useState(false);
const [openedTopOverlayInSideOverlay, setOpenedTopOverlayInSideOverlay] = useState(false);
// Флаг закрытия SideOverlay, после того, как будет закрыт TopOverlay.
const [closeSideOverlayAfterCloseTopOverlay, setCloseSideOverlayAfterCloseTopOverlay] = useState(false);
const [openedLightBoxTopOverlay, setOpenedLightBoxTopOverlay] = useState(false);
// Флаг закрытия LightBox, после того, как будет закрыт TopOverlay.
const [closeLightBoxAfterCloseTopOverlay, setCloseLightBoxAfterCloseTopOverlay] = useState(false);

const renderControls = () => (
    <div style={{display: 'flex', flexDirection: 'column', marginBottom: '16px'}}>
        <label style={{display: 'inline-flex'}}>
            <input
                type="checkbox"
                checked={showDOMNode}
                onChange={(event) => setShowDOMNode(event.target.checked)}
                style={{margin: 'auto 4px auto 0'}}
            />
            Отобразить DOM элемент, в границах которого рендерится LightBox.
        </label>
    </div>
);

// Обработчик закрытия TopOverlay.
const handleCloseTopOverlay = () => {
    if (closeLightBoxAfterCloseTopOverlay) {
        setOpenedLightBox(false);
    }
};

// Обработчик закрытия TopOverlay в SideOverlay.
const handleCloseTopOverlayInSideOverlay = () => {
    if (closeSideOverlayAfterCloseTopOverlay) {
        setOpenedSideOverlayMD(false);
    }
};

const renderTopOverlay = () => (
    <LightBox.TopOverlay onClose={handleCloseTopOverlay} opened={openedLightBoxTopOverlay}>
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
            />
        </Confirm>
    </LightBox.TopOverlay>
);

const renderTopOverlayInSideOverlay = () => (
    <LightBox.TopOverlay onClose={handleCloseTopOverlayInSideOverlay} opened={openedTopOverlayInSideOverlay}>
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
                        setOpenedTopOverlayInSideOverlay(false);
                    }}
                >
                    Продолжить
                </Button>
                <Button
                    theme={EButtonTheme.DANGER}
                    size={EButtonSize.MD}
                    onClick={() => {
                        setCloseSideOverlayAfterCloseTopOverlay(true);
                        setOpenedTopOverlayInSideOverlay(false);
                    }}
                >
                    Покинуть форму
                </Button>
            </Confirm.Controls>
            <Confirm.Close
                // Закрыть по Esc, если TopOverlay открыт.
                clickByEsc={openedTopOverlayInSideOverlay}
                onClick={() => setOpenedTopOverlayInSideOverlay(false)}
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
    {/* DOM элемент, в границах которого рендерится LightBox. ID этого элемента передается в <LightBox lightBoxViewManagerNodeId="lightBoxViewManagerNodeId" ... /> */}
    <div
        id="lightBoxViewManagerNodeId"
        style={{
            position: 'fixed',
            top: 0,
            left: (100 - viewManagerNodeWidth) / 2 + '%',
            width: viewManagerNodeWidth + '%',
            height: showDOMNode ? 'auto' : 0,
            overflow: 'hidden',
            boxSizing: 'border-box',
            background: 'lightblue',
            zIndex: 10,
        }}
    >
        <div style={{padding: '10px'}}>
            Ширина области с LightBox, в процентах от размера экрана:
            <input
                type="number"
                value={viewManagerNodeWidth}
                onChange={(e) => setViewManagerNodeWidth(parseInt(e.target.value))}
                min={1}
                max={100}
                style={{width: '60px'}}
            />
        </div>
    </div>

    {openedLightBox ? (
        <LightBox
            lightBoxViewManagerNodeId="lightBoxViewManagerNodeId"
            isLoading={false}
            isSideOverlayOpened={openedSideOverlayMD}
            isTopOverlayOpened={openedLightBoxTopOverlay}
        >
            <LightBox.Controls>
                <LightBox.Controls.Prev clickByArrowLeft onClick={() => console.log('Click prev!')} title="Назад" />
                <LightBox.Controls.Next clickByArrowRight onClick={() => console.log('Click next!')} title="Вперед" />
                <LightBox.Controls.Close data-test-id="lightbox-close" onClick={() => setOpenedLightBoxTopOverlay(true)} title="Закрыть" />
            </LightBox.Controls>

            <LightBox.Content>
                {renderPage(
                    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} onClick={() => setOpenedSideOverlayMD(true)}>
                        Open SideOverlayMD
                    </Button>
                )}
                {renderTopOverlay()}
            </LightBox.Content>

            <LightBox.SideOverlay
                opened={openedSideOverlayMD}
                size={ELightBoxSideOverlaySize.MD}
                isTopOverlayOpened={openedTopOverlayInSideOverlay}
                isTopLevelSideOverlayOpened={false}
            >
                {renderPage(
                    <LightBox.SideOverlay.Close
                        // Закрытие SideOverlay по Esc не должно работать при открытом TopOverlay.
                        clickByEsc={openedSideOverlayMD && !openedTopOverlayInSideOverlay}
                        data-test-id="lightbox-side-overlay-close"
                        onClick={() => setOpenedTopOverlayInSideOverlay(true)}
                    />
                )}
                {renderTopOverlayInSideOverlay()}
            </LightBox.SideOverlay>
        </LightBox>
    ) : (
        <>
            {renderControls()}
            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpenedLightBox(true)}>
                Открыть лайтбокс
            </Button>
        </>
    )}
</>
```
