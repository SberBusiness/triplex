```jsx
import {EButtonSize, EButtonTheme} from '@sberbusiness/triplex/components/Button/enums';

const options = [
    {
        id: 'button-dropdown-option-1',
        label: 'Текст пункта меню 1',
        onSelect: () => alert('Выбран пункт меню 1.'),
    },
    {
        id: 'button-dropdown-option-2',
        label: 'Текст пункта меню 2',
        onSelect: () => alert('Выбран пункт меню 2.'),
    },
    {
        id: 'button-dropdown-option-3',
        label: 'Текст пункта меню 3',
        onSelect: () => alert('Выбран пункт меню 3.'),
    },
];

<>
    <ButtonDropdown theme={EButtonTheme.GENERAL} size={EButtonSize.MD} options={options}>
        Button Name
    </ButtonDropdown>
    <ButtonDropdown theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} options={options}>
        Button Name
    </ButtonDropdown>
    <ButtonDropdown theme={EButtonTheme.DANGER} size={EButtonSize.MD} options={options}>
        Button Name
    </ButtonDropdown>
    <ButtonDropdown theme={EButtonTheme.DOTS} size={EButtonSize.MD} options={options} />
</>
```

### Size large

Для кнопок меньшего размера, используйте свойство size со значением EButtonSize.SM.

```jsx
import {EButtonSize, EButtonTheme} from '@sberbusiness/triplex/components/Button/enums';

const options = [
    {
        id: 'button-dropdown-option-1',
        label: 'Текст пункта меню 1',
        onSelect: () => alert('Выбран пункт меню 1.'),
    },
    {
        id: 'button-dropdown-option-2',
        label: 'Текст пункта меню 2',
        onSelect: () => alert('Выбран пункт меню 2.'),
    },
    {
        id: 'button-dropdown-option-3',
        label: 'Текст пункта меню 3',
        onSelect: () => alert('Выбран пункт меню 3.'),
    },
];

<>
    <ButtonDropdown theme={EButtonTheme.GENERAL} size={EButtonSize.LG} options={options}>
        Button Name
    </ButtonDropdown>
    <ButtonDropdown theme={EButtonTheme.SECONDARY} size={EButtonSize.LG} options={options}>
        Button Name
    </ButtonDropdown>
    <ButtonDropdown theme={EButtonTheme.DANGER} size={EButtonSize.LG} options={options}>
        Button Name
    </ButtonDropdown>
    <ButtonDropdown theme={EButtonTheme.DOTS} size={EButtonSize.LG} options={options} />
</>
```

### Size small

Для кнопок меньшего размера, используйте свойство size со значением EButtonSize.SM.

```jsx
import {EButtonSize, EButtonTheme} from '@sberbusiness/triplex/components/Button/enums';

const options = [
    {
        id: 'button-dropdown-option-1',
        label: 'Текст пункта меню 1',
        onSelect: () => alert('Выбран пункт меню 1.'),
    },
    {
        id: 'button-dropdown-option-2',
        label: 'Текст пункта меню 2',
        onSelect: () => alert('Выбран пункт меню 2.'),
    },
    {
        id: 'button-dropdown-option-3',
        label: 'Текст пункта меню 3',
        onSelect: () => alert('Выбран пункт меню 3.'),
    },
];

<>
    <ButtonDropdown theme={EButtonTheme.GENERAL} size={EButtonSize.SM} options={options}>
        Button Name
    </ButtonDropdown>
    <ButtonDropdown theme={EButtonTheme.SECONDARY} size={EButtonSize.SM} options={options}>
        Button Name
    </ButtonDropdown>
    <ButtonDropdown theme={EButtonTheme.DANGER} size={EButtonSize.SM} options={options}>
        Button Name
    </ButtonDropdown>
    <ButtonDropdown theme={EButtonTheme.DOTS} size={EButtonSize.SM} options={options} />
</>
```

### Block mode

В этом режиме кнопка занимает всю ширину контейнера.

```jsx
import {EButtonSize, EButtonTheme} from '@sberbusiness/triplex/components/Button/enums';

const options = [
    {
        id: 'button-dropdown-option-1',
        label: 'Текст пункта меню 1',
        onSelect: () => alert('Выбран пункт меню 1.'),
    },
    {
        id: 'button-dropdown-option-2',
        label: 'Текст пункта меню 2',
        onSelect: () => alert('Выбран пункт меню 2.'),
    },
    {
        id: 'button-dropdown-option-3',
        label: 'Текст пункта меню 3',
        onSelect: () => alert('Выбран пункт меню 3.'),
    },
];

<>
    <ButtonDropdown theme={EButtonTheme.GENERAL} size={EButtonSize.MD} options={options} block>
        Button Name
    </ButtonDropdown>
    <br />
    <ButtonDropdown theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} options={options} block>
        Button Name
    </ButtonDropdown>
    <br />
    <ButtonDropdown theme={EButtonTheme.DANGER} size={EButtonSize.MD} options={options} block>
        Button Name
    </ButtonDropdown>
</>
```

### Disabled

Свойство disabled отключает возможность взаимодействия пользователя с элементом.

```jsx
import {EButtonSize, EButtonTheme} from '@sberbusiness/triplex/components/Button/enums';

const options = [
    {
        id: 'button-dropdown-option-1',
        label: 'Текст пункта меню 1',
        onSelect: () => alert('Выбран пункт меню 1.'),
    },
    {
        id: 'button-dropdown-option-2',
        label: 'Текст пункта меню 2',
        onSelect: () => alert('Выбран пункт меню 2.'),
    },
    {
        id: 'button-dropdown-option-3',
        label: 'Текст пункта меню 3',
        onSelect: () => alert('Выбран пункт меню 3.'),
    },
];

<>
    <ButtonDropdown theme={EButtonTheme.GENERAL} size={EButtonSize.MD} options={options} disabled>
        Button Name
    </ButtonDropdown>
    <ButtonDropdown theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} options={options} disabled>
        Button Name
    </ButtonDropdown>
    <ButtonDropdown theme={EButtonTheme.DANGER} size={EButtonSize.MD} options={options} disabled>
        Button Name
    </ButtonDropdown>
    <ButtonDropdown theme={EButtonTheme.DOTS} size={EButtonSize.MD} options={options} disabled />
</>
```
