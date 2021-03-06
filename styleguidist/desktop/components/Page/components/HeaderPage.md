### Basic

```jsx
import {HeaderPage} from '@sbbol/web-library/desktop/components/Page/components/HeaderPage';
import {Gap} from '@sbbol/web-library/desktop/components/Gap/Gap';
import {SettingsSrvIcon20} from '@sberbusiness/icons/SettingsSrvIcon20';

const iconWrapperStyle = {
    position: 'relative',
    top: '4px',
};

<>
    <HeaderPage>
        <HeaderPage.Title>
            <HeaderPage.Title.Content>
                <HeaderPage.Title.Content.Text>Шаблонный текст заголовка в одну строку</HeaderPage.Title.Content.Text>
            </HeaderPage.Title.Content>
        </HeaderPage.Title>
    </HeaderPage>
    <Gap size={16} />
    <HeaderPage>
        <HeaderPage.Title>
            <HeaderPage.Title.Content>
                <HeaderPage.Title.Content.Text>
                    Шаблонный текст заголовка в одну строку{' '}
                    <span style={iconWrapperStyle}>
                        <SettingsSrvIcon20 />
                    </span>
                </HeaderPage.Title.Content.Text>
            </HeaderPage.Title.Content>
        </HeaderPage.Title>
    </HeaderPage>
</>
```

### Basic Link Controls

```jsx
import {HeaderPage} from '@sbbol/web-library/desktop/components/Page/components/HeaderPage';
import {ButtonDropdown} from '@sbbol/web-library/desktop/components/Button/ButtonDropdown';
import {EButtonTheme, EButtonSize} from '@sbbol/web-library/desktop/components/Button/enums';

const options = [
    {id: 'headerPageBasicLinkOption1', label: 'действие 1', onSelect: () => alert('действие 1')},
    {id: 'headerPageBasicLinkOption2', label: 'действие 2', onSelect: () => alert('действие 2')},
    {id: 'headerPageBasicLinkOption3', label: 'действие 3', onSelect: () => alert('действие 3')},
];

<>
    <HeaderPage>
        <HeaderPage.Title>
            <HeaderPage.Title.Link href="#">Текст ссылки</HeaderPage.Title.Link>
            <HeaderPage.Title.Content>
                <HeaderPage.Title.Content.Text>Шаблонный текст заголовка в одну строку</HeaderPage.Title.Content.Text>
                <HeaderPage.Title.Content.Controls>
                    <ButtonDropdown theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} options={options}>
                        Button Name
                    </ButtonDropdown>
                    <ButtonDropdown theme={EButtonTheme.GENERAL} size={EButtonSize.MD} options={options}>
                        Button Name
                    </ButtonDropdown>
                </HeaderPage.Title.Content.Controls>
            </HeaderPage.Title.Content>
        </HeaderPage.Title>
    </HeaderPage>
</>
```

### Extended

```jsx
import {HeaderPage} from '@sbbol/web-library/desktop/components/Page/components/HeaderPage';
import {SettingsSrvIcon20} from '@sberbusiness/icons/SettingsSrvIcon20';

const iconWrapperStyle = {
    position: 'relative',
    top: '4px',
};

<HeaderPage>
    <HeaderPage.Title>
        <HeaderPage.Title.Content>
            <HeaderPage.Title.Content.Text>
                Шаблонный текст заголовка в одну строку{' '}
                <span style={iconWrapperStyle}>
                    <SettingsSrvIcon20 />
                </span>
            </HeaderPage.Title.Content.Text>
        </HeaderPage.Title.Content>
        <HeaderPage.Title.Subhead>Шаблонный текст для описания</HeaderPage.Title.Subhead>
    </HeaderPage.Title>
</HeaderPage>
```

### Extended Controls

```jsx
import {HeaderPage} from '@sbbol/web-library/desktop/components/Page/components/HeaderPage';
import {Button} from '@sbbol/web-library/desktop/components/Button/Button';
import {ButtonDropdown} from '@sbbol/web-library/desktop/components/Button/ButtonDropdown';
import {EButtonTheme, EButtonSize} from '@sbbol/web-library/desktop/components/Button/enums';

const options = [
    {id: 'headerPageExtendedOption1', label: 'действие 1', onSelect: () => alert('действие 1')},
    {id: 'headerPageExtendedOption2', label: 'действие 2', onSelect: () => alert('действие 2')},
    {id: 'headerPageExtendedOption3', label: 'действие 3', onSelect: () => alert('действие 3')},
];

<HeaderPage>
    <HeaderPage.Title>
        <HeaderPage.Title.Content>
            <HeaderPage.Title.Content.Text>Шаблонный текст заголовка в одну строку</HeaderPage.Title.Content.Text>
            <HeaderPage.Title.Content.Controls>
                <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                    Button Name
                </Button>
                <ButtonDropdown theme={EButtonTheme.DOTS} size={EButtonSize.MD} options={options} />
            </HeaderPage.Title.Content.Controls>
        </HeaderPage.Title.Content>
        <HeaderPage.Title.Subhead>Шаблонный текст для описания</HeaderPage.Title.Subhead>
    </HeaderPage.Title>
</HeaderPage>
```

### Extended Link

```jsx
import {HeaderPage} from '@sbbol/web-library/desktop/components/Page/components/HeaderPage';

<HeaderPage>
    <HeaderPage.Title>
        <HeaderPage.Title.Link href="#">Текст ссылки</HeaderPage.Title.Link>
        <HeaderPage.Title.Content>
            <HeaderPage.Title.Content.Text>Шаблонный текст заголовка в одну строку</HeaderPage.Title.Content.Text>
        </HeaderPage.Title.Content>
        <HeaderPage.Title.Subhead>Шаблонный текст для описания</HeaderPage.Title.Subhead>
    </HeaderPage.Title>
</HeaderPage>
```

### Extended Link Controls

```jsx
import {HeaderPage} from '@sbbol/web-library/desktop/components/Page/components/HeaderPage';
import {Button} from '@sbbol/web-library/desktop/components/Button/Button';
import {ButtonDropdown} from '@sbbol/web-library/desktop/components/Button/ButtonDropdown';
import {EButtonTheme, EButtonSize} from '@sbbol/web-library/desktop/components/Button/enums';

const options = [
    {id: 'headerPageExtendedLinkOption1', label: 'действие 1', onSelect: () => alert('действие 1')},
    {id: 'headerPageExtendedLinkOption2', label: 'действие 2', onSelect: () => alert('действие 2')},
    {id: 'headerPageExtendedLinkOption3', label: 'действие 3', onSelect: () => alert('действие 3')},
];

<HeaderPage>
    <HeaderPage.Title>
        <HeaderPage.Title.Link href="#">Текст ссылки</HeaderPage.Title.Link>
        <HeaderPage.Title.Content>
            <HeaderPage.Title.Content.Text>
                Шаблонный текст заголовка в одну строку шаблонный текст заголовка в одну строку
            </HeaderPage.Title.Content.Text>
            <HeaderPage.Title.Content.Controls>
                <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                    Button Name
                </Button>
                <ButtonDropdown theme={EButtonTheme.DOTS} size={EButtonSize.MD} options={options} />
            </HeaderPage.Title.Content.Controls>
        </HeaderPage.Title.Content>
        <HeaderPage.Title.Subhead>Шаблонный текст для описания</HeaderPage.Title.Subhead>
    </HeaderPage.Title>
</HeaderPage>
```


### Редактирование номера документа

```jsx
import React, {useState} from 'react';
import {HeaderPage} from '@sbbol/web-library/desktop/components/Page/components/HeaderPage';
import {Button} from '@sbbol/web-library/desktop/components/Button/Button';
import {ButtonDropdown} from '@sbbol/web-library/desktop/components/Button/ButtonDropdown';
import {EButtonTheme, EButtonSize} from '@sbbol/web-library/desktop/components/Button/enums';
import {DocumentNumberEdit} from '@sbbol/web-library/desktop/components/DocumentNumberEdit/DocumentNumberEdit';

const options = [
    {id: 'headerPageEditOption1', label: 'действие 1', onSelect: () => alert('действие 1')},
    {id: 'headerPageEditOption2', label: 'действие 2', onSelect: () => alert('действие 2')},
    {id: 'headerPageEditOption3', label: 'действие 3', onSelect: () => alert('действие 3')},
];

const [value, setValue] = useState();

const handleChange = (value) => setValue(value);

<HeaderPage>
    <HeaderPage.Title>
        <HeaderPage.Title.Link href="#">Текст ссылки</HeaderPage.Title.Link>
        <HeaderPage.Title.Content>
            <HeaderPage.Title.Content.Text>Рублёвый платёж контрагенту</HeaderPage.Title.Content.Text>
            <HeaderPage.Title.Content.Controls>
                <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                    Button Name
                </Button>
                <ButtonDropdown theme={EButtonTheme.DOTS} size={EButtonSize.MD} options={options} />
            </HeaderPage.Title.Content.Controls>
        </HeaderPage.Title.Content>
        <HeaderPage.Title.Subhead>
            <DocumentNumberEdit 
                onChange={handleChange} 
                value={value}
                buttonLabel="Изменить"
                emptyNumberButtonLabel="Задать номер"
                emptyNumberLabel="Номер документа будет присвоен автоматически"
                numberLabel="Документ №"
            />
        </HeaderPage.Title.Subhead>
    </HeaderPage.Title>
</HeaderPage>
```

### Tabs

```jsx
import React, {useState} from 'react';
import {HeaderPage} from '@sbbol/web-library/desktop/components/Page/components/HeaderPage';
import {Button} from '@sbbol/web-library/desktop/components/Button/Button';
import {ButtonDropdown} from '@sbbol/web-library/desktop/components/Button/ButtonDropdown';
import {EButtonTheme, EButtonSize} from '@sbbol/web-library/desktop/components/Button/enums';

const [selectedTabId, setSelectedTabId] = useState('3');

const options = [
    {id: 'headerPageTabOption1', label: 'действие 1', onSelect: () => alert('действие 1')},
    {id: 'headerPageTabOption2', label: 'действие 2', onSelect: () => alert('действие 2')},
    {id: 'headerPageTabOption3', label: 'действие 3', onSelect: () => alert('действие 3')},
];

const tabs = [
    {id: '1', label: 'Tab Name'},
    {id: '2', label: 'Tab Name', showNotificationIcon: true},
    {id: '3', label: 'Tab Name'},
    {id: '4', label: 'Tab Name', ariaAttributes: {label: 'Tab Name'}},
    {id: '5', label: 'Tab Name', dataAttributes: {'test-id': 'Tab Name Id'}},
    {id: '6', label: 'Tab Name'},
    {id: '7', label: 'Tab Name'},
    {id: '8', label: 'Tab Name', showNotificationIcon: true},
    {id: '9', label: 'Tab Name'},
];

<>
    <HeaderPage>
        <HeaderPage.Title>
            <HeaderPage.Title.Content>
                <HeaderPage.Title.Content.Text>Шаблонный текст заголовка в одну строку</HeaderPage.Title.Content.Text>
            </HeaderPage.Title.Content>
        </HeaderPage.Title>
        <HeaderPage.Tabs>
            <HeaderPage.Tabs.Content>
                <HeaderPage.Tabs.Content.Tabs tabs={tabs} selectedTabId={selectedTabId} onSelectTab={(id) => setSelectedTabId(id)} />
            </HeaderPage.Tabs.Content>
            <HeaderPage.Tabs.Controls>
                <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                    Button Name
                </Button>
                <ButtonDropdown theme={EButtonTheme.DOTS} size={EButtonSize.MD} options={options} />
            </HeaderPage.Tabs.Controls>
        </HeaderPage.Tabs>
    </HeaderPage>
</>
```
