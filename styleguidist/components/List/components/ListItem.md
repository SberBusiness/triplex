### Простой элемент списка

```jsx
import React from 'react';
import {List, ListItem, ListItemContent} from '@sberbusiness/triplex/components/List';

<List>
    <ListItem>
        <ListItemContent>Элемент списка</ListItemContent>
    </ListItem>
</List>
```

### Элемент списка, отображающий подгрузку данных

Отображается последним элементом списка, при доскролле до которого загружаются новые элементы.

```jsx
import React from 'react';
import {List, ListItem, ListItemLoading} from '@sberbusiness/triplex/components/List';

<List>
    <ListItem>
        <ListItemLoading />
    </ListItem>
</List>
```

### Элемент списка с возможностью выбора

```jsx
import React, {useState} from 'react';
import {List, ListItem, ListItemContent, ListItemSelectable} from '@sberbusiness/triplex/components/List';

const [selected, setSelected] = useState(false);

<List>
    <ListItem>
        <ListItemSelectable selected={selected} onSelect={setSelected}>
            <ListItemContent>Элемент списка</ListItemContent>
        </ListItemSelectable>
    </ListItem>
</List>
```

### Элемент списка со свайпом и кнопками действий

```jsx
import React from 'react';
import {List, ListItem, ListItemContent, ListItemControls, ListItemControlsButton, ListItemControlsButtonDropdown} from '@sberbusiness/triplex/components/List';
import {SwipeableArea} from '@sberbusiness/triplex/components/SwipeableArea/SwipeableArea';
import {DownloadSrvIcon20} from '@sberbusiness/icons/DownloadSrvIcon20';
import {HeaderkebabSrvxIcon16} from '@sberbusiness/icons/HeaderkebabSrvxIcon16';

const options = [
    {
        id: 'list-item-controls-dropdown-option-1',
        label: 'Текст пункта меню 1',
        onSelect: () => alert('Выбран пункт меню 1.'),
    },
    {
        id: 'list-item-controls-dropdown-option-2',
        label: 'Текст пункта меню 2',
        onSelect: () => alert('Выбран пункт меню 2.'),
    },
    {
        id: 'list-item-controls-dropdown-option-3',
        label: 'Текст пункта меню 3',
        onSelect: () => alert('Выбран пункт меню 3.'),
    },
];

<List>
    <ListItem>
        <SwipeableArea rightSwipeableArea={
            <ListItemControls>
                <ListItemControlsButton icon={<DownloadSrvIcon20 />}>Скачать</ListItemControlsButton>
                <ListItemControlsButtonDropdown icon={<HeaderkebabSrvxIcon16 />} options={options}>
                    Действия
                </ListItemControlsButtonDropdown>
            </ListItemControls>
        }>
            <ListItemContent>Свайп влево</ListItemContent>
        </SwipeableArea>
    </ListItem>
    
    <ListItem>
        <SwipeableArea leftSwipeableArea={
            <ListItemControls>
                <ListItemControlsButton icon={<DownloadSrvIcon20 />}>Скачать</ListItemControlsButton>
                <ListItemControlsButtonDropdown icon={<HeaderkebabSrvxIcon16 />} options={options}>
                    Действия
                </ListItemControlsButtonDropdown>
            </ListItemControls>
        }>
            <ListItemContent>Свайп вправо</ListItemContent>
        </SwipeableArea>
    </ListItem>
</List>
```

### Эмуляция свайпа

```jsx
import React, {useState} from 'react';
import {List, ListItem, ListItemContent, ListItemControls, ListItemControlsButton, ListItemControlsButtonDropdown} from '@sberbusiness/triplex/components/List';
import {SwipeableArea} from '@sberbusiness/triplex/components/SwipeableArea/SwipeableArea';
import {DownloadSrvIcon20} from '@sberbusiness/icons/DownloadSrvIcon20';
import {HeaderkebabSrvxIcon16} from '@sberbusiness/icons/HeaderkebabSrvxIcon16';

const options = [
    {
        id: 'list-item-swipe-controls-dropdown-option-1',
        label: 'Текст пункта меню 1',
        onSelect: () => alert('Выбран пункт меню 1.'),
    },
    {
        id: 'list-item-swipe-controls-dropdown-option-2',
        label: 'Текст пункта меню 2',
        onSelect: () => alert('Выбран пункт меню 2.'),
    },
    {
        id: 'list-item-swipe-controls-dropdown-option-3',
        label: 'Текст пункта меню 3',
        onSelect: () => alert('Выбран пункт меню 3.'),
    },
];

const ref = React.useRef(null);

<>
    <button onClick={() => {
        ref.current.swipeLeft();
    }}>swipe</button>
    <button onClick={() => {
        ref.current.closeSwipe();
    }}>close</button><br />

    <List>
        <ListItem>
            <SwipeableArea ref={ref} rightSwipeableArea={
                <ListItemControls>
                    <ListItemControlsButton icon={<DownloadSrvIcon20 />}>Скачать</ListItemControlsButton>
                    <ListItemControlsButtonDropdown icon={<HeaderkebabSrvxIcon16 />} options={options}>
                        Действия
                    </ListItemControlsButtonDropdown>
                </ListItemControls>
            }>
                <ListItemContent>Свайп влево</ListItemContent>
            </SwipeableArea>
        </ListItem>
    </List>
</>
```

### Элемент списка для отображения табличных данных на мобильных устройствах

```jsx
import React from 'react';
import {Title} from '@sberbusiness/triplex/components/Typography/Title';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {ETitleSize, ETextSize, EFontType, ELineType} from '@sberbusiness/triplex/components/Typography/enums';
import {DownloadSrvIcon20} from '@sberbusiness/icons/DownloadSrvIcon20';
import {HeaderkebabSrvxIcon16} from '@sberbusiness/icons/HeaderkebabSrvxIcon16';
import {MarkerStatus} from '@sberbusiness/triplex/components/MarkerStatus/MarkerStatus';
import {EMarkerStatus} from '@sberbusiness/triplex/components/Marker/enums';
import {List, ListItemControlsButton, ListItemControlsButtonDropdown, ListItemTable} from '@sberbusiness/triplex/components/List';

const options = [
    {
        id: 'button-dropdown-card-option-1',
        label: 'Текст пункта меню 1',
        onSelect: () => alert('Выбран пункт меню 1.'),
    },
    {
        id: 'button-dropdown-card-option-2',
        label: 'Текст пункта меню 2',
        onSelect: () => alert('Выбран пункт меню 2.'),
    },
    {
        id: 'button-dropdown-card-option-3',
        label: 'Текст пункта меню 3',
        onSelect: () => alert('Выбран пункт меню 3.'),
    },
];

<List>
    <ListItemTable
        onClickItem={() => console.log('Клик по карточке.')}
        controlButtons={
            <>
                <ListItemControlsButton icon={<DownloadSrvIcon20 />}>Скачать</ListItemControlsButton>
                <ListItemControlsButtonDropdown icon={<HeaderkebabSrvxIcon16 />} options={options}>
                    Действия
                </ListItemControlsButtonDropdown>
            </>
        }
    >
        <Title size={ETitleSize.H4}>1 220 000 000 RUB</Title>

        <Text size={ETextSize.B1} line={ELineType.EXTRA} tag="div">
            №1 ООО Голубая Роза Голубая
        </Text>
        <Text size={ETextSize.B1} line={ELineType.EXTRA} tag="div">
            Длинное назначение платежа
        </Text>
        <Text size={ETextSize.B1} line={ELineType.EXTRA} type={EFontType.SECONDARY} tag="div">
            НДС не облагается
        </Text>
        <Text size={ETextSize.B1} line={ELineType.EXTRA} tag="div" type={EFontType.SECONDARY}>
            40702 810 2 0527 5000000 от 09.04.24
        </Text>
        <MarkerStatus status={EMarkerStatus.SUCCESS}>Исполнен частично</MarkerStatus>
    </ListItemTable>
</List>
```

### Эмуляция свайпа

```jsx
import React from 'react';
import {Title} from '@sberbusiness/triplex/components/Typography/Title';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {ETitleSize, ETextSize, EFontType, ELineType} from '@sberbusiness/triplex/components/Typography/enums';
import {DownloadSrvIcon20} from '@sberbusiness/icons/DownloadSrvIcon20';
import {HeaderkebabSrvxIcon16} from '@sberbusiness/icons/HeaderkebabSrvxIcon16';
import {MarkerStatus} from '@sberbusiness/triplex/components/MarkerStatus/MarkerStatus';
import {EMarkerStatus} from '@sberbusiness/triplex/components/Marker/enums';
import {List, ListItemControlsButton, ListItemControlsButtonDropdown, ListItemTable} from '@sberbusiness/triplex/components/List';

const options = [
    {
        id: 'button-dropdown-swipe-emulation-option-1',
        label: 'Текст пункта меню 1',
        onSelect: () => alert('Выбран пункт меню 1.'),
    },
    {
        id: 'button-dropdown-swipe-emulation-card-option-2',
        label: 'Текст пункта меню 2',
        onSelect: () => alert('Выбран пункт меню 2.'),
    },
    {
        id: 'button-dropdown-swipe-emulation-card-option-3',
        label: 'Текст пункта меню 3',
        onSelect: () => alert('Выбран пункт меню 3.'),
    },
];

const ref = React.useRef(null);

<>
    <button onClick={() => {
        ref.current.swipeLeft();
    }}>swipe</button>
    <button onClick={() => {
        ref.current.closeSwipe();
    }}>close</button><br />

    <List>
        <ListItemTable
            swipeableAreaRef={ref}
            onClickItem={() => console.log('Клик по карточке.')}
            controlButtons={
                <>
                    <ListItemControlsButton icon={<DownloadSrvIcon20 />}>Скачать</ListItemControlsButton>
                    <ListItemControlsButtonDropdown icon={<HeaderkebabSrvxIcon16 />} options={options}>
                        Действия
                    </ListItemControlsButtonDropdown>
                </>
            }
        >
            <Title size={ETitleSize.H4}>1 220 000 000 RUB</Title>
    
            <Text size={ETextSize.B1} line={ELineType.EXTRA} tag="div">
                №1 ООО Голубая Роза Голубая
            </Text>
            <Text size={ETextSize.B1} line={ELineType.EXTRA} tag="div">
                Длинное назначение платежа
            </Text>
            <Text size={ETextSize.B1} line={ELineType.EXTRA} type={EFontType.SECONDARY} tag="div">
                НДС не облагается
            </Text>
            <Text size={ETextSize.B1} line={ELineType.EXTRA} tag="div" type={EFontType.SECONDARY}>
                40702 810 2 0527 5000000 от 09.04.24
            </Text>
            <MarkerStatus status={EMarkerStatus.SUCCESS}>Исполнен частично</MarkerStatus>
        </ListItemTable>
    </List>
</>
```


### Элемент списка для отображения табличных данных на мобильных устройствах с возможностью выбора элемента

Выбор элемента происходит по нажатию на чекбокс.

```jsx
import React from 'react';
import {Title} from '@sberbusiness/triplex/components/Typography/Title';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {ETitleSize, ETextSize, EFontType, ELineType} from '@sberbusiness/triplex/components/Typography/enums';
import {DownloadSrvIcon20} from '@sberbusiness/icons/DownloadSrvIcon20';
import {HeaderkebabSrvxIcon16} from '@sberbusiness/icons/HeaderkebabSrvxIcon16';
import {MarkerStatus} from '@sberbusiness/triplex/components/MarkerStatus/MarkerStatus';
import {EMarkerStatus} from '@sberbusiness/triplex/components/Marker/enums';
import {List, ListItemControlsButton, ListItemControlsButtonDropdown, ListItemTable} from '@sberbusiness/triplex/components/List';

const options = [
    {
        id: 'button-dropdown-card-option-1',
        label: 'Текст пункта меню 1',
        onSelect: () => alert('Выбран пункт меню 1.'),
    },
    {
        id: 'button-dropdown-card-option-2',
        label: 'Текст пункта меню 2',
        onSelect: () => alert('Выбран пункт меню 2.'),
    },
    {
        id: 'button-dropdown-card-option-3',
        label: 'Текст пункта меню 3',
        onSelect: () => alert('Выбран пункт меню 3.'),
    },
];

const [selected, setSelected] = React.useState(false);

<List>
    <ListItemTable
        selected={selected}
        onSelect={setSelected}
        onClickItem={() => console.log('Клик по карточке.')}
        controlButtons={
            <>
                <ListItemControlsButton icon={<DownloadSrvIcon20 />}>Скачать</ListItemControlsButton>
                <ListItemControlsButtonDropdown icon={<HeaderkebabSrvxIcon16 />} options={options}>
                    Действия
                </ListItemControlsButtonDropdown>
            </>
        }
    >
        <Title size={ETitleSize.H4}>1 220 000 000 RUB</Title>

        <Text size={ETextSize.B1} line={ELineType.EXTRA} tag="div">
            №1 ООО Голубая Роза Голубая
        </Text>
        <Text size={ETextSize.B1} line={ELineType.EXTRA} tag="div">
            Длинное назначение платежа
        </Text>
        <Text size={ETextSize.B1} line={ELineType.EXTRA} type={EFontType.SECONDARY} tag="div">
            НДС не облагается
        </Text>
        <Text size={ETextSize.B1} line={ELineType.EXTRA} tag="div" type={EFontType.SECONDARY}>
            40702 810 2 0527 5000000 от 09.04.24
        </Text>
        <MarkerStatus status={EMarkerStatus.SUCCESS}>Исполнен частично</MarkerStatus>
    </ListItemTable>
</List>
```





