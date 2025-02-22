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

<div className="buttonRowWrapper">
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
</div>;
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

<div className="buttonRowWrapper">
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
</div>;
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

<div className="buttonRowWrapper">
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
</div>;
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

<div className="buttonColumnWrapper">
    <ButtonDropdown theme={EButtonTheme.GENERAL} size={EButtonSize.MD} options={options} block>
        Button Name
    </ButtonDropdown>
    <ButtonDropdown theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} options={options} block>
        Button Name
    </ButtonDropdown>
    <ButtonDropdown theme={EButtonTheme.DANGER} size={EButtonSize.MD} options={options} block>
        Button Name
    </ButtonDropdown>
</div>;
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

<div className="buttonRowWrapper">
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
</div>;
```

### Selected item

Свойство selected подсвечивает выбранный элемент.

```jsx
import {EButtonSize, EButtonTheme} from '@sberbusiness/triplex/components/Button/enums';

const [selected, setSelected] = React.useState();

const options = [
    {
        id: 'button-dropdown-option-1',
        label: 'Текст пункта меню 1',
        onSelect: () => setSelected({id: 'button-dropdown-option-1'}),
    },
    {
        id: 'button-dropdown-option-2',
        label: 'Текст пункта меню 2',
        onSelect: () => setSelected({id: 'button-dropdown-option-2'}),
    },
    {
        id: 'button-dropdown-option-3',
        label: 'Текст пункта меню 3',
        onSelect: () => setSelected({id: 'button-dropdown-option-3'}),
    },
];

<ButtonDropdown selected={selected} theme={EButtonTheme.DOTS} size={EButtonSize.MD} options={options} />;
```
