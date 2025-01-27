```jsx
import React, {useState} from 'react';
import {TabfoldercarouselleftSrvxIcon32} from '@sberbusiness/icons/TabfoldercarouselleftSrvxIcon32';
import {TabfoldercarouselrightSrvxIcon32} from '@sberbusiness/icons/TabfoldercarouselrightSrvxIcon32';
import {CarouselExtended} from '@sberbusiness/triplex/components/CarouselExtended/CarouselExtended';
import {TabsExtended} from '@sberbusiness/triplex/components/TabsExtended/TabsExtended';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import './styles.less';

const [selectedTabId, setSelectedTabId] = useState('tabs-folder-extended-tab-0');

const tabs = [
    {id: 'tabs-folder-extended-tab-0', label: 'Tab Name', notification: true},
    {id: 'tabs-folder-extended-tab-1', label: 'Tab Name'},
    {id: 'tabs-folder-extended-tab-2', label: 'Tab Name'},
    {id: 'tabs-folder-extended-tab-3', label: 'Tab Name'},
    {id: 'tabs-folder-extended-tab-4', label: 'Tab Name'},
    {id: 'tabs-folder-extended-tab-5', label: 'Tab Name'},
    {id: 'tabs-folder-extended-tab-6', label: 'Tab Name'},
    {id: 'tabs-folder-extended-tab-7', label: 'Tab Name'},
    {id: 'tabs-folder-extended-tab-8', label: 'Tab Name'},
    {id: 'tabs-folder-extended-tab-9', label: 'Tab Name', notification: true},
];

const renderPrevButton = ({hidden, ...rest}) =>
    hidden ? null : (
        <ButtonIcon className="button-prev" {...rest} aria-label="Прокрутить назад">
            <TabfoldercarouselleftSrvxIcon32 />
        </ButtonIcon>
    );

const renderNextButton = ({hidden, ...rest}) =>
    hidden ? null : (
        <ButtonIcon className="button-next" {...rest} aria-label="Прокрутить вперёд">
            <TabfoldercarouselrightSrvxIcon32 />
        </ButtonIcon>
    );

<CarouselExtended
    className="tabs-folder-extended"
    buttonPrev={renderPrevButton}
    buttonNext={renderNextButton}
    stepPrev={100}
    stepNext={100}
>
    <TabsExtended
        className="tabs-folder-extended-inner"
        selectedId={selectedTabId}
        onSelectTab={setSelectedTabId}
    >
        <TabsExtended.Content className="tabs-folder-extended-content">
            <TabsExtended.Content.TabsWrapper>
                {tabs.map(({id, label, notification}) => (
                    <TabsExtended.Content.Tab key={id} id={id} className="tabs-folder-extended-tab">
                        {({selected}) => (
                            <TabsExtended.Content.TabButton
                                className={classnames('tabs-folder-extended-tab-button', {
                                    selected,
                                    notification
                                })}
                                selected={selected}
                            >
                                {label}
                            </TabsExtended.Content.TabButton>
                        )}
                    </TabsExtended.Content.Tab>
                ))}
            </TabsExtended.Content.TabsWrapper>
        </TabsExtended.Content>
    </TabsExtended>
</CarouselExtended>
```
