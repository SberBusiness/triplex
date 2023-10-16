```jsx
import React, {useState} from 'react';
import {LightBox} from '@sberbusiness/triplex/components/LightBox/LightBox';
import {Page} from '@sberbusiness/triplex/components/Page/Page';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';

const [openedLightBox, setOpenedLightBox] = useState(false);
const [selectedTabId, setSelectedTabId] = useState('3');

const tabs = [
    {id: '1', label: 'Tab Name'},
    {id: '2', label: 'Tab Name', showNotificationIcon: true},
    {id: '3', label: 'Tab Name'},
    {id: '4', label: 'Tab Name', ariaAttributes: {label: 'Tab Name'}},
    {id: '5', label: 'Tab Name', dataAttributes: {'test-id': 'Tab Name Id'}},
    {id: '6', label: 'Tab Name'},
    {id: '7', label: 'Tab Name'},
    {id: '8', label: 'Tab Name'},
    {id: '9', label: 'Tab Name'},
    {id: '10', label: 'Tab Name'},
    {id: '11', label: 'Tab Name'},
    {id: '12', label: 'Tab Name'},
    {id: '13', label: 'Tab Name'},
    {id: '14', label: 'Tab Name'},
    {id: '15', label: 'Tab Name'},
];

<>
    {openedLightBox ? (
        <LightBox>
            <LightBox.Content>
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
            </LightBox.Content>

            <LightBox.Controls>
                <LightBox.Controls.Close data-test-id="lightbox-close" onClick={() => setOpenedLightBox(false)} title="Закрыть" />
            </LightBox.Controls>
        </LightBox>
    ) : (
        <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpenedLightBox(true)}>
            Открыть лайтбокс
        </Button>
    )}
</>
```
