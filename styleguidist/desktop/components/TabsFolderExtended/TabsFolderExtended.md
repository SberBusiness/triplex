```jsx
import {CarouselExtended} from '@sberbusiness/triplex/desktop/components/CarouselExtended/CarouselExtended';
import {TabsExtended} from '@sberbusiness/triplex/desktop/components/TabsExtended/TabsExtended';
import {ButtonIcon} from '@sberbusiness/triplex/desktop/components/Button/ButtonIcon';
import {TabfoldercarouselleftSrvxIcon32} from '@sberbusiness/icons/TabfoldercarouselleftSrvxIcon32';
import {TabfoldercarouselrightSrvxIcon32} from '@sberbusiness/icons/TabfoldercarouselrightSrvxIcon32';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import './styles.less';

const [selectedTabId, setSelectedTabId] = React.useState('tabs-folder-extended-tab-0');

const tabs = [
    {
        id: 'tabs-folder-extended-tab-0',
        label: 'Tab Name',
    },
    {
        id: 'tabs-folder-extended-tab-1',
        label: 'Tab Name',
    },
    {
        id: 'tabs-folder-extended-tab-2',
        label: 'Tab Name',
        disabled: true,
    },
    {
        id: 'tabs-folder-tab-extended-3',
        label: 'Tab Name',
    },
    {
        id: 'tabs-folder-tab-extended-4',
        label: 'Tab Name',
        notification: true,
    },
];

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
