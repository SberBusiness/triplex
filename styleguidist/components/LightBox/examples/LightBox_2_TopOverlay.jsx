import React, {useState, useEffect} from 'react';
import {LightBox} from '@sberbusiness/triplex/components/LightBox/LightBox';
import {Page} from '@sberbusiness/triplex/components/Page/Page';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {Confirm} from '@sberbusiness/triplex/components/Confirm/Confirm';

const [open, setOpen] = useState(false);
const [isTopOverlayOpened, setIsTopOverlayOpened] = useState(false);
// Флаг закрытия LightBox, после того, как будет закрыт TopOverlay.
const [closeConfirmed, setCloseConfirmed] = useState(false);

useEffect(() => {
    if (open) {
        document.body.classList.add('dialogOpenExample');
    } else {
        document.body.classList.remove('dialogOpenExample');
    }
}, [open]);

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
    console.log('TopOverlay on close.');
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
                            <Page.Header.Title.Content.Text>
                                Евгений Онегин
                            </Page.Header.Title.Content.Text>
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
</>;
