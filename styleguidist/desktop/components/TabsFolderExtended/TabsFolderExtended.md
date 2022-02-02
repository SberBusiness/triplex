```jsx
import React, {useState} from 'react';
import {CarouselExtended} from '@sbbol/web-library/desktop/components/CarouselExtended/CarouselExtended';
import {TabsExtended} from '@sbbol/web-library/desktop/components/TabsExtended/TabsExtended';
import {ButtonIcon} from '@sbbol/web-library/desktop/components/Button/ButtonIcon/ButtonIcon';
import {TabfoldercarouselleftSrvxIcon32} from '@sberbusiness/icons/TabfoldercarouselleftSrvxIcon32';
import {TabfoldercarouselrightSrvxIcon32} from '@sberbusiness/icons/TabfoldercarouselrightSrvxIcon32';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import './styles.less';

const [selectedTabId, setSelectedTabId] = useState('0');

const tabs = Array(16)
    .fill()
    .map((value, index) => ({id: `${index++}`, label: `Tab Name`, disabled: !(index % 4), notification: !(index % 5)}));

const renderPrevButton = ({hidden, ...rest}) =>
    hidden ? null : (
        <ButtonIcon className="button-prev" {...rest}>
            <TabfoldercarouselleftSrvxIcon32 />
        </ButtonIcon>
    );

const renderNextButton = ({hidden, ...rest}) =>
    hidden ? null : (
        <ButtonIcon className="button-next" {...rest}>
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
    <TabsExtended className="inner" selectedId={selectedTabId} onSelectTab={setSelectedTabId}>
        <TabsExtended.Content className="content">
            <TabsExtended.Content.TabsWrapper>
                {tabs.map((item, index) => (
                    <TabsExtended.Content.Tab key={index} id={item.id} className={classnames('tab', {disabled: item.disabled})}>
                        {({selected}) => (
                            <TabsExtended.Content.TabButton
                                className={classnames('tab-button', {selected: selected, 'with-notification': item.notification})}
                                selected={selected}
                                disabled={item.disabled}
                            >
                                {item.label}
                            </TabsExtended.Content.TabButton>
                        )}
                    </TabsExtended.Content.Tab>
                ))}
            </TabsExtended.Content.TabsWrapper>
        </TabsExtended.Content>
    </TabsExtended>
</CarouselExtended>
```
