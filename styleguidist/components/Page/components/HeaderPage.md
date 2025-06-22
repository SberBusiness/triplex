### Basic

```jsx
import React from 'react';
import {HeaderPage} from '@sberbusiness/triplex/components/Page/components/HeaderPage';

<HeaderPage>
    <HeaderPage.Title>
        <HeaderPage.Title.Content>
            <HeaderPage.Title.Content.Text>
                Шаблонный текст заголовка в одну строку
            </HeaderPage.Title.Content.Text>
        </HeaderPage.Title.Content>
    </HeaderPage.Title>
</HeaderPage>
```

### Basic Link Controls

```jsx
import React from 'react';
import {HeaderPage} from '@sberbusiness/triplex/components/Page/components/HeaderPage';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';

const options = [
    {id: 'headerPageBasicLinkOption1', label: 'действие 1', onSelect: () => alert('действие 1')},
    {id: 'headerPageBasicLinkOption2', label: 'действие 2', onSelect: () => alert('действие 2')},
    {id: 'headerPageBasicLinkOption3', label: 'действие 3', onSelect: () => alert('действие 3')},
];

<HeaderPage>
    <HeaderPage.Link href="#" onClick={(event) => event.preventDefault()}>
        Текст ссылки
    </HeaderPage.Link>
    <HeaderPage.Title>
        <HeaderPage.Title.Content>
            <HeaderPage.Title.Content.Text>
                Шаблонный текст заголовка в одну строку
            </HeaderPage.Title.Content.Text>
        </HeaderPage.Title.Content>
        <HeaderPage.Title.Controls>
            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                Button Name
            </Button>
            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                Button Name
            </Button>
        </HeaderPage.Title.Controls>
    </HeaderPage.Title>
</HeaderPage>
```

### Extended

```jsx
import React from 'react';
import {HeaderPage} from '@sberbusiness/triplex/components/Page/components/HeaderPage';

<HeaderPage>
    <HeaderPage.Title>
        <HeaderPage.Title.Content>
            <HeaderPage.Title.Content.Text>
                Шаблонный текст заголовка в одну строку
            </HeaderPage.Title.Content.Text>
            <HeaderPage.Title.Content.Subhead>
                Шаблонный текст для описания
            </HeaderPage.Title.Content.Subhead>
        </HeaderPage.Title.Content>
    </HeaderPage.Title>
</HeaderPage>
```

### Extended Controls

```jsx
import React from 'react';
import {HeaderPage} from '@sberbusiness/triplex/components/Page/components/HeaderPage';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {ButtonDropdown} from '@sberbusiness/triplex/components/Button/ButtonDropdown';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';

const options = [
    {id: 'headerPageExtendedOption1', label: 'действие 1', onSelect: () => alert('действие 1')},
    {id: 'headerPageExtendedOption2', label: 'действие 2', onSelect: () => alert('действие 2')},
    {id: 'headerPageExtendedOption3', label: 'действие 3', onSelect: () => alert('действие 3')},
];

<HeaderPage>
    <HeaderPage.Title>
        <HeaderPage.Title.Content>
            <HeaderPage.Title.Content.Text>
                Шаблонный текст заголовка в одну строку
            </HeaderPage.Title.Content.Text>
            <HeaderPage.Title.Content.Subhead>
                Шаблонный текст для описания
            </HeaderPage.Title.Content.Subhead>
        </HeaderPage.Title.Content>
        <HeaderPage.Title.Controls>
            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                Button Name
            </Button>
            <ButtonDropdown theme={EButtonTheme.DOTS} size={EButtonSize.MD} options={options} />
        </HeaderPage.Title.Controls>
    </HeaderPage.Title>
</HeaderPage>
```

### Extended Link

```jsx
import React from 'react';
import {HeaderPage} from '@sberbusiness/triplex/components/Page/components/HeaderPage';

<HeaderPage>
    <HeaderPage.Link href="#" onClick={(event) => event.preventDefault()}>
        Текст ссылки
    </HeaderPage.Link>
    <HeaderPage.Title>
        <HeaderPage.Title.Content>
            <HeaderPage.Title.Content.Text>
                Шаблонный текст заголовка в одну строку
            </HeaderPage.Title.Content.Text>
            <HeaderPage.Title.Content.Subhead>
                Шаблонный текст для описания
            </HeaderPage.Title.Content.Subhead>
        </HeaderPage.Title.Content>
    </HeaderPage.Title>
</HeaderPage>
```

### Extended Link Controls

```jsx
import React from 'react';
import {HeaderPage} from '@sberbusiness/triplex/components/Page/components/HeaderPage';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {ButtonDropdown} from '@sberbusiness/triplex/components/Button/ButtonDropdown';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';

const options = [
    {id: 'header-page-extended-option-1', label: 'действие 1', onSelect: () => alert('действие 1')},
    {id: 'header-page-extended-option-2', label: 'действие 2', onSelect: () => alert('действие 2')},
    {id: 'header-page-extended-option-3', label: 'действие 3', onSelect: () => alert('действие 3')},
];

<HeaderPage>
    <HeaderPage.Link href="#" onClick={(event) => event.preventDefault()}>
        Текст ссылки
    </HeaderPage.Link>
    <HeaderPage.Title>
        <HeaderPage.Title.Content>
            <HeaderPage.Title.Content.Text>
                Шаблонный текст заголовка в одну строку
            </HeaderPage.Title.Content.Text>
            <HeaderPage.Title.Content.Subhead>
                Шаблонный текст для описания
            </HeaderPage.Title.Content.Subhead>
        </HeaderPage.Title.Content>
        <HeaderPage.Title.Controls>
            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                Button Name
            </Button>
            <ButtonDropdown theme={EButtonTheme.DOTS} size={EButtonSize.MD} options={options} />
        </HeaderPage.Title.Controls>
    </HeaderPage.Title>
</HeaderPage>
```

### Редактирование номера документа

```jsx
import React, {useState} from 'react';
import {HeaderPage} from '@sberbusiness/triplex/components/Page/components/HeaderPage';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {ButtonDropdown} from '@sberbusiness/triplex/components/Button/ButtonDropdown';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {DocumentNumberEdit} from '@sberbusiness/triplex/components/DocumentNumberEdit/DocumentNumberEdit';

const options = [
    {id: 'header-page-edit-option-1', label: 'действие 1', onSelect: () => alert('действие 1')},
    {id: 'header-page-edit-option-2', label: 'действие 2', onSelect: () => alert('действие 2')},
    {id: 'header-page-edit-option-3', label: 'действие 3', onSelect: () => alert('действие 3')},
];

const [value, setValue] = useState();

const handleChange = (event) => setValue(event.target.value);

<HeaderPage>
    <HeaderPage.Link href="#" onClick={(event) => event.preventDefault()}>
        Текст ссылки
    </HeaderPage.Link>
    <HeaderPage.Title>
        <HeaderPage.Title.Content>
            <HeaderPage.Title.Content.Text>
                Рублёвый платёж контрагенту
            </HeaderPage.Title.Content.Text>

            <HeaderPage.Title.Content.Subhead>
                <DocumentNumberEdit
                    onChange={handleChange}
                    value={value}
                    buttonLabel="Изменить"
                    emptyNumberButtonLabel="Задать номер"
                    emptyNumberLabel="Номер документа будет присвоен автоматически"
                    numberLabel="Документ №"
                />
            </HeaderPage.Title.Content.Subhead>
        </HeaderPage.Title.Content>

        <HeaderPage.Title.Controls>
            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                Button Name
            </Button>
            <ButtonDropdown theme={EButtonTheme.DOTS} size={EButtonSize.MD} options={options} />
        </HeaderPage.Title.Controls>
    </HeaderPage.Title>
</HeaderPage>
```

### Tabs

```jsx
import React, {useState} from 'react';
import {HeaderPage} from '@sberbusiness/triplex/components/Page/components/HeaderPage';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {ButtonDropdown} from '@sberbusiness/triplex/components/Button/ButtonDropdown';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';

const [selectedTabId, setSelectedTabId] = useState('3');

const options = [
    {id: 'header-page-tabs-option-1', label: 'действие 1', onSelect: () => alert('действие 1')},
    {id: 'header-page-tabs-option-2', label: 'действие 2', onSelect: () => alert('действие 2')},
    {id: 'header-page-tabs-option-3', label: 'действие 3', onSelect: () => alert('действие 3')},
];

const tabs = [
    {id: '1', label: 'Tab Name'},
    {id: '2', label: 'Tab Name'},
    {id: '3', label: 'Tab Name'},
    {id: '4', label: 'Tab Name'},
    {id: '5', label: 'Tab Name'},
    {id: '6', label: 'Tab Name'},
    {id: '7', label: 'Tab Name'},
    {id: '8', label: 'Tab Name'},
    {id: '9', label: 'Tab Name'},
];

<HeaderPage>
    <HeaderPage.Title>
        <HeaderPage.Title.Content>
            <HeaderPage.Title.Content.Text>
                Шаблонный текст заголовка в одну строку
            </HeaderPage.Title.Content.Text>
        </HeaderPage.Title.Content>
    </HeaderPage.Title>
    <HeaderPage.Tabs>
        <HeaderPage.Tabs.Content>
            <HeaderPage.Tabs.Content.Tabs
                tabs={tabs}
                selectedTabId={selectedTabId}
                onSelectTab={(id) => setSelectedTabId(id)}
            />
        </HeaderPage.Tabs.Content>
        <HeaderPage.Tabs.Controls>
            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                Button Name
            </Button>
            <ButtonDropdown theme={EButtonTheme.DOTS} size={EButtonSize.MD} options={options} />
        </HeaderPage.Tabs.Controls>
    </HeaderPage.Tabs>
</HeaderPage>
```

### TabsFolder

```jsx
import React, {useState} from 'react';
import {HeaderPage} from '@sberbusiness/triplex/components/Page/components/HeaderPage';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {ButtonDropdown} from '@sberbusiness/triplex/components/Button/ButtonDropdown';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {TabsFolder} from '@sberbusiness/triplex/components/TabsFolder/TabsFolder';

const [selectedTabId, setSelectedTabId] = useState('3');
const [selectedTabFolderId, setSelectedTabFolderId] = useState('3');

const options = [
    {id: 'header-page-tabs-option-1', label: 'действие 1', onSelect: () => alert('действие 1')},
    {id: 'header-page-tabs-option-2', label: 'действие 2', onSelect: () => alert('действие 2')},
    {id: 'header-page-tabs-option-3', label: 'действие 3', onSelect: () => alert('действие 3')},
];

const tabs = [
    {id: '1', label: 'Tab Name'},
    {id: '2', label: 'Tab Name'},
    {id: '3', label: 'Tab Name'},
    {id: '4', label: 'Tab Name'},
    {id: '5', label: 'Tab Name'},
    {id: '6', label: 'Tab Name'},
    {id: '7', label: 'Tab Name'},
    {id: '8', label: 'Tab Name'},
    {id: '9', label: 'Tab Name'},
];

const tabsFolderTabs = [
    {id: '1', label: 'Tab Name'},
    {id: '2', label: 'Tab Name'},
    {id: '3', label: 'Tab Name'},
    {id: '4', label: 'Tab Name'},
    {id: '5', label: 'Tab Name'},
    {id: '6', label: 'Tab Name'},
];

<HeaderPage>
    <HeaderPage.Title>
        <HeaderPage.Title.Content>
            <HeaderPage.Title.Content.Text>
                Шаблонный текст заголовка в одну строку
            </HeaderPage.Title.Content.Text>
        </HeaderPage.Title.Content>
    </HeaderPage.Title>
    <HeaderPage.Tabs>
        <HeaderPage.Tabs.Content>
            <HeaderPage.Tabs.Content.Tabs
                tabs={tabs}
                selectedTabId={selectedTabId}
                onSelectTab={(id) => setSelectedTabId(id)}
            />
        </HeaderPage.Tabs.Content>
        <HeaderPage.Tabs.Controls>
            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                Button Name
            </Button>
            <ButtonDropdown theme={EButtonTheme.DOTS} size={EButtonSize.MD} options={options} />
        </HeaderPage.Tabs.Controls>
    </HeaderPage.Tabs>
    <HeaderPage.Subhead className="tabsFolder">
        <TabsFolder
            tabs={tabsFolderTabs}
            selectedTabId={selectedTabFolderId}
            onSelectTab={(id) => setSelectedTabFolderId(id)}
        />
    </HeaderPage.Subhead>
</HeaderPage>
```

### With sidebar

```jsx
import React, {useState} from 'react';
import {HeaderPage} from '@sberbusiness/triplex/components/Page/components/HeaderPage';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {ButtonDropdown} from '@sberbusiness/triplex/components/Button/ButtonDropdown';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import './style.less';

const [selectedTabId, setSelectedTabId] = useState('3');

const options = [
    {id: 'header-page-sidebar-option-1', label: 'действие 1', onSelect: () => alert('действие 1')},
    {id: 'header-page-sidebar-option-2', label: 'действие 2', onSelect: () => alert('действие 2')},
    {id: 'header-page-sidebar-option-3', label: 'действие 3', onSelect: () => alert('действие 3')},
];

const tabs = [
    {id: '1', label: 'Tab Name'},
    {id: '2', label: 'Tab Name'},
    {id: '3', label: 'Tab Name'},
    {id: '4', label: 'Tab Name'},
    {id: '5', label: 'Tab Name'},
    {id: '6', label: 'Tab Name'},
    {id: '7', label: 'Tab Name'},
    {id: '8', label: 'Tab Name'},
    {id: '9', label: 'Tab Name'},
];

<HeaderPage>
    <HeaderPage.LayoutSidebar>
        <HeaderPage.LayoutSidebar.Content>
            <HeaderPage.Title>
                <HeaderPage.Title.Content>
                    <HeaderPage.Title.Content.Text>
                        Шаблонный текст заголовка в одну строку
                    </HeaderPage.Title.Content.Text>
                </HeaderPage.Title.Content>
            </HeaderPage.Title>

            <HeaderPage.Tabs>
                <HeaderPage.Tabs.Content>
                    <HeaderPage.Tabs.Content.Tabs
                        tabs={tabs}
                        selectedTabId={selectedTabId}
                        onSelectTab={(id) => setSelectedTabId(id)}
                    />
                </HeaderPage.Tabs.Content>
                <HeaderPage.Tabs.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                        Button Name
                    </Button>
                </HeaderPage.Tabs.Controls>
            </HeaderPage.Tabs>
        </HeaderPage.LayoutSidebar.Content>

        <HeaderPage.LayoutSidebar.Sidebar className="sidebar">
            Sidebar
            <span className="sidebar-background" />
        </HeaderPage.LayoutSidebar.Sidebar>
    </HeaderPage.LayoutSidebar>
</HeaderPage>
```
