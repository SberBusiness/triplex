Если вы хотите настроить тему, вам необходимо использовать компонент ThemeProvider, чтобы внедрить тему в&nbsp;ваше приложение.
ThemeProvider полагается на&nbsp;функцию контекста React для передачи темы компонентам, поэтому необходимо убедиться, что ThemeProvider является родительским компонентом для компонентов, которые вы&nbsp;настраиваете.

Если вы используете одновременно несколько тем для разных областей лайаута, то на текущий момент есть проблемы с темизацией компонентов, которые рендерятся через портал(ModalWindow, Dropdown). Нужно не забывать, что scopeRef должен находиться выше, чем DOM нода, в которую рендерятся ModalWindow или Dropdown. В случае переключения темы на все приложения проблем не возникнет. 

Темизация основывается на дизайн-токенах. Есть core дизайн-токены и дизайн-токены компонентов(локальные).
Все токены объединены в групы. Для core токенов группы определяются по схожести цветовой гаммы, например - primary, error. Для дизайн-токенов компонентов, группой является название компонента, например - button, input. Описание токенов можно посмотреть в разделе DesignTokens.

Triplex включает в себя значения токенов для светлой и темной темы.

### Светлая тема

```jsx
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonSize, EButtonTheme} from '@sberbusiness/triplex/components/Button/enums';
import {ThemeProvider} from '@sberbusiness/triplex/components/ThemeProvider/ThemeProvider';
import {ETriplexTheme} from '@sberbusiness/triplex/components/ThemeProvider/ETriplexTheme';

const themeContainerRef = React.useRef(null);

<ThemeProvider
  theme={ETriplexTheme.LIGHT}
  styleTagId="example-light-theme"
  scopeRef={themeContainerRef}
>
  <div ref={themeContainerRef}>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>Button name</Button>
  </div>
</ThemeProvider>
```

### Темная тема

```jsx
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonSize, EButtonTheme} from '@sberbusiness/triplex/components/Button/enums';
import {ThemeProvider} from '@sberbusiness/triplex/components/ThemeProvider/ThemeProvider';
import {ETriplexTheme} from '@sberbusiness/triplex/components/ThemeProvider/ETriplexTheme';

const themeContainerRef = React.useRef(null);

<ThemeProvider
  theme={ETriplexTheme.DARK}
  styleTagId="example-dark-theme"
  scopeRef={themeContainerRef}
>
  <div ref={themeContainerRef}>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>Button name</Button>
  </div>
</ThemeProvider>
```

### Изменение токена

```jsx
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonSize, EButtonTheme} from '@sberbusiness/triplex/components/Button/enums';
import {ThemeProvider} from '@sberbusiness/triplex/components/ThemeProvider/ThemeProvider';
import {ETriplexTheme} from '@sberbusiness/triplex/components/ThemeProvider/ETriplexTheme';

const themeContainerRef = React.useRef(null);

<ThemeProvider
  styleTagId="example-change-token"
  scopeRef={themeContainerRef}
  tokens={{
    Basic: {
      100: {
        value: "#FFCC00",
      },
    },
  }}
>
  <div ref={themeContainerRef}>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>Button name</Button>
  </div>
</ThemeProvider>
```

### Вложенные конфигурации

```jsx
import {Button} from "@sberbusiness/triplex/components/Button/Button";
import {EButtonSize, EButtonTheme} from "@sberbusiness/triplex/components/Button/enums";
import {ThemeProvider} from "@sberbusiness/triplex/components/ThemeProvider/ThemeProvider";
import {ETriplexTheme} from '@sberbusiness/triplex/components/ThemeProvider/ETriplexTheme';

const themeContainerRef1 = React.useRef(null);
const themeContainerRef2 = React.useRef(null);

<ThemeProvider
  theme={ETriplexTheme.DARK}
  styleTagId="example-nested-configs-1"
  scopeRef={themeContainerRef1}
>
  <div ref={themeContainerRef1}>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>Button name</Button>
    <ThemeProvider
      styleTagId="example-nested-configs-2"
      scopeRef={themeContainerRef2}
      tokens={{
        Basic: {
          100: {
            value: "#FFCC00"
          }
        }
      }}
    >
        <span ref={themeContainerRef2}>
          <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>Button name</Button>
        </span>
    </ThemeProvider>
  </div>
</ThemeProvider>;

```

### Хук UseToken

Позволяет получить текущие значения темы и токенов.

```jsx
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonSize, EButtonTheme} from '@sberbusiness/triplex/components/Button/enums';
import {ThemeProvider} from '@sberbusiness/triplex/components/ThemeProvider/ThemeProvider';
import {ETriplexTheme} from '@sberbusiness/triplex/components/ThemeProvider/ETriplexTheme';
import {useToken} from '@sberbusiness/triplex/components/ThemeProvider/useToken';

const themeContainerRef = React.useRef(null);

const UseTokenExample = () => {
  const {theme, tokens} = useToken();

  return (
    <div>
      Текущая тема - {theme},<br /> basic 300 - {tokens.Basic['100'].value}
    </div>
  );
};

<ThemeProvider
  styleTagId="example-hook-token"
  scopeRef={themeContainerRef}
  tokens={{
    Basic: {
      100: {
        value: "#FFCC00",
      },
    },
  }}
>
  <div ref={themeContainerRef}>
    <UseTokenExample />
  </div>
</ThemeProvider>
```

### Игровая

```jsx
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonSize, EButtonTheme} from '@sberbusiness/triplex/components/Button/enums';
import {ButtonDropdown} from '@sberbusiness/triplex/components/Button/ButtonDropdown';
import {ESegmentedControlType, SegmentedControl} from '@sberbusiness/triplex/components/SegmentedControl/SegmentedControl';
import {ThemeProvider} from '@sberbusiness/triplex/components/ThemeProvider/ThemeProvider';

const options = [
  {id: 'buttonDropdownOption1', label: 'Текст строки меню 1', onSelect: () => alert('Выбран пункт меню 1.')},
  {id: 'buttonDropdownOption5', label: 'Текст строки меню 5', onSelect: () => alert('Выбран пункт меню 5.')},
];

  const [primary700, setPrimary700] = React.useState('#107F8C');
  const [primary500, setPrimary500] = React.useState('#21A19A');
  const themeContainerRef = React.useRef(null);
  const [value, setValue] = React.useState('1');

    <>
      primary-700{' '}
      <input
        type="color"
        value={primary700}
        onChange={(e) => {
          setPrimary700(e.target.value);
        }}
        style={{marginRight: '20px'}}
      />
      primary-500{' '}
      <input
        type="color"
        value={primary500}
        onChange={(e) => {
          setPrimary500(e.target.value);
        }}
      />
      <br />
      <br />
      <br />
      <br />
      <ThemeProvider
        styleTagId="example-demo-other-themes"
        tokens={{
          Primary: {
            700: {value: primary700},
            500: {value: primary500},
          },
        }}
        scopeRef={themeContainerRef}
      >
        <div ref={themeContainerRef}>
          <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
            Button name
          </Button>

          <ButtonDropdown theme={EButtonTheme.GENERAL} size={EButtonSize.MD} options={options}>
            Button Name
          </ButtonDropdown>
          <br />
          <br />
          <br />
          <SegmentedControl type={ESegmentedControlType.SINGLE} onSelect={setValue} value={value}>
            {['1', '2', '3'].map((segmentValue) => (
              <SegmentedControl.Segment key={segmentValue} value={segmentValue}>
                {`Сегмент ${segmentValue}`}
              </SegmentedControl.Segment>
            ))}
          </SegmentedControl>
        </div>
      </ThemeProvider>
    </>
```
