```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency
    componentTitle="LightBox"
    isMobileComponent={false}
/>
```

LightBox может позиционироваться не только относительно экрана устройства, но и относительно некоторого DOM элемента.
При позиционировании относительно DOM элемента, LightBox рассчитает левую координату и ширину элемента, и отрендерит себя в этих границах. Верхний отступ LightBox от границ экрана будет равен высоте DOM элемента, если оступ не нужен высота элемента должны быть равно 0. При изменении ширины/высоты DOM элемента LightBox будет осуществлять rerender. 

Способы включения позиционирования LightBox относительно DOM элемента:

DOM элементу присвоить id из константы lightBoxViewManagerNodeIdDefault:
```html
import {lightBoxViewManagerNodeIdDefault} from '@sberbusiness/triplex/desktop/components/LightBox/LightBox';

// Элемент, в границах которого будет рендериться LightBox.
<div id={lightBoxViewManagerNodeIdDefault} />
```

Передать произвольный id в DOM элемент и в LightBox.
```html
// Элемент, в границах которого будет рендериться LightBox.
<div id="custom-id" />

<LightBox lightBoxViewManagerNodeId="custom-id">
```

LightBox найдет нужную DOM ноду для расчета своего положения на экране, в случае остутствия DOM ноды, LightBox ее создаст и добавить в html-элемент body.

```jsx
import React, {useState, useEffect} from 'react';
import {Button} from '@sberbusiness/triplex/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {Page} from '@sberbusiness/triplex/desktop/components/Page/Page';
import {LightBox} from '@sberbusiness/triplex/desktop/components/LightBox/LightBox';
import {ELightBoxSideOverlaySize} from '@sberbusiness/triplex/desktop/components/LightBox/LightBoxSideOverlay/LightBoxSideOverlay';
import {Confirm} from '@sberbusiness/triplex/desktop/components/Confirm/Confirm';
import './styles.less';

const [openedCustomTopPanel, setOpenedCustomTopPanel] = useState(false);
const [openedSideOverlayMD, setOpenedSideOverlayMD] = useState(false);
const [openedLightBox, setOpenedLightBox] = useState(false);
const [openedLightBoxTopOverlay, setOpenedLightBoxTopOverlay] = useState(false);
// Флаг закрытия LightBox, после того, как будет закрыт TopOverlay.
const [closeLightBoxAfterCloseTopOverlay, setCloseLightBoxAfterCloseTopOverlay] = useState(false);
const [openedTopOverlayInSideOverlay, setOpenedTopOverlayInSideOverlay] = useState(false);
// Флаг закрытия SideOverlay, после того, как будет закрыт TopOverlay.
const [closeSideOverlayAfterCloseTopOverlay, setCloseSideOverlayAfterCloseTopOverlay] = useState(false);
const [viewManagerNodeWidth, setViewManagerNodeWidth] = useState(80);

const renderControls = () => (
    <div style={{display: 'flex', flexDirection: 'column', marginBottom: '16px'}}>
        <label style={{display: 'inline-flex'}}>
            <input
                type="checkbox"
                checked={openedCustomTopPanel}
                onChange={(event) => setOpenedCustomTopPanel(event.target.checked)}
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
                <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => {
                    setCloseLightBoxAfterCloseTopOverlay(false);
                    setOpenedLightBoxTopOverlay(false);
                }}>
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

// Обработчик закрытия TopOverlay в SideOverlay.
const handleCloseTopOverlayInSideOverlay = () => {
    if (closeSideOverlayAfterCloseTopOverlay) {
        setOpenedSideOverlayMD(false);
    }
};

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
                onClick={() => {
                    setCloseSideOverlayAfterCloseTopOverlay(false);
                    setOpenedTopOverlayInSideOverlay(false)
                }}
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
                </Page.Header.Title.Content>
                <Page.Header.Title.Controls>{headerActionButton}</Page.Header.Title.Controls>
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
    <div className={`custom-top-panel ${openedCustomTopPanel ? 'opened' : ''}`} style={{
        left: (100 - viewManagerNodeWidth) / 2 + '%',
        width: viewManagerNodeWidth + '%',
    }}>
        <br />
        Ширина области с LightBox, в процентах от размера экрана:
        <input
            type="number"
            value={viewManagerNodeWidth}
            onChange={(e) => setViewManagerNodeWidth(parseInt(e.target.value))}
            min={1}
            max={100}
            style={{width: '60px'}}
        />
        
        <br />
        
        <button onClick={() => setOpenedCustomTopPanel(false)}>Скрыть панель</button>
        
        {/* Элемент, в визуальных границах (левая и правая координата) которого рендерится LightBox. Отступ LightBox от верхней границы экрана равен высоте этого элемента. */}
        <div
            id="lightBoxViewManagerNodeId"
            style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                pointerEvents: 'none'
            }}
        />
    </div>
    
    {openedLightBox && (
        <>
            <LightBox
                lightBoxViewManagerNodeId="lightBoxViewManagerNodeId"
                isLoading={false} 
                isSideOverlayOpened={openedSideOverlayMD} 
                isTopOverlayOpened={openedLightBoxTopOverlay}
            >
                <LightBox.Content>
                    {renderPage(
                        <>
                            {!openedCustomTopPanel && (
                                <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpenedCustomTopPanel(true)}>
                                    Показать панель
                                </Button>
                            )}
                            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} onClick={() => setOpenedSideOverlayMD(true)}>
                                Open SideOverlayMD
                            </Button>
                        </>
                    )}
                    {renderTopOverlay()}
                </LightBox.Content>

                <LightBox.Controls>
                    <LightBox.Controls.Close data-test-id="lightbox-close" onClick={() => setOpenedLightBoxTopOverlay(true)}  title="Закрыть" />
                </LightBox.Controls>
    
                <LightBox.SideOverlay
                    opened={openedSideOverlayMD}
                    size={ELightBoxSideOverlaySize.MD}
                    isTopOverlayOpened={openedTopOverlayInSideOverlay}
                    isTopLevelSideOverlayOpened={false}
                >
                    {renderPage(
                        <LightBox.SideOverlay.Close
                            // Закрытие SideOverlay по Esc не должно работать при открытом TopOverlay.
                            clickByEsc={!openedTopOverlayInSideOverlay}
                            data-test-id="lightbox-side-overlay-close"
                            onClick={() => setOpenedTopOverlayInSideOverlay(true)}
                            title="Закрыть"
                        />
                    )}
                    {renderTopOverlayInSideOverlay()}
                </LightBox.SideOverlay>
            </LightBox>
            
        </>
    )}
    
    <div>
        {renderControls()}

        <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpenedLightBox(true)}>
            Открыть лайтбокс
        </Button>
    </div>
    
</>
```
