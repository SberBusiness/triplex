```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency
    componentTitle="LightBox"
    isMobileComponent={false}
/>
```

```jsx
import React, {useState} from 'react';
import {LightBox} from '@sbbol/web-library/desktop/components/LightBox/LightBox';
import {Page} from '@sbbol/web-library/desktop/components/Page/Page';
import {Button} from '@sbbol/web-library/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sbbol/web-library/desktop/components/Button/enums';

const [openedLightBox, setOpenedLightBox] = useState(false);
const [fixedHeader, setFixedHeader] = useState(false);
const [fixedFooter, setFixedFooter] = useState(false);
const [arrows, setArrows] = useState(false);

<>
    {openedLightBox ? (
        <LightBox>
            <LightBox.Controls>
                {arrows && <LightBox.Controls.Prev clickByArrowLeft onClick={() => console.log('Click prev!')} title="Назад" />}
                {arrows && <LightBox.Controls.Next clickByArrowRight onClick={() => console.log('Click next!')} title="Вперед" />}
                <LightBox.Controls.Close data-test-id="lightbox-close" onClick={() => setOpenedLightBox(false)} title="Закрыть" />
            </LightBox.Controls>

            <LightBox.Content>
                <Page>
                    <Page.Header sticky={fixedHeader}>
                        <Page.Header.Title>
                            <Page.Header.Title.Content>
                                <Page.Header.Title.Content.Text>Евгений Онегин</Page.Header.Title.Content.Text>
                                <Page.Header.Title.Content.Controls>
                                    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                                        Button Name
                                    </Button>
                                    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                                        Button Name
                                    </Button>
                                </Page.Header.Title.Content.Controls>
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

                    <Page.Footer sticky={fixedFooter}>
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
            </LightBox.Content>
        </LightBox>
    ) : (
        <div>
            <div>
                <label><input type="checkbox" checked={fixedHeader} onChange={(e) => setFixedHeader(e.target.checked)} /> Фиксированный хедер</label><br />
                <label><input type="checkbox" checked={fixedFooter} onChange={(e) => setFixedFooter(e.target.checked)} /> Фиксированный футер</label><br />
                <label><input type="checkbox" checked={arrows} onChange={(e) => setArrows(e.target.checked)} /> Со стрелками</label><br /><br />
            </div>
            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpenedLightBox(true)}>
                Открыть лайтбокс
            </Button>
        </div>
    )}
</>
```
