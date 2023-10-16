```jsx
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {MailbellPrdIcon32} from '@sberbusiness/icons/MailbellPrdIcon32';

<div style={{display: 'flex', alignItems: 'center'}}>
    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
        Button Name
    </Button>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
        Button Name
    </Button>
    <Button theme={EButtonTheme.DANGER} size={EButtonSize.MD}>
        Button Name
    </Button>
    <Button theme={EButtonTheme.DOTS} size={EButtonSize.MD}>
        Button Name
    </Button>
    <Button theme={EButtonTheme.LINK} size={EButtonSize.MD}>
        Button Name
    </Button>
    <Button theme={EButtonTheme.TILE}>
        <MailbellPrdIcon32 />
    </Button>
</div>
```

### Size small

```jsx
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';

<div style={{display: 'flex', alignItems: 'center'}}>
    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.SM}>
        Button Name
    </Button>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
        Button Name
    </Button>
    <Button theme={EButtonTheme.DANGER} size={EButtonSize.SM}>
        Button Name
    </Button>
    <Button theme={EButtonTheme.DOTS} size={EButtonSize.SM}>
        Button Name
    </Button>
    <Button theme={EButtonTheme.LINK} size={EButtonSize.SM}>
        Button Name
    </Button>
</div>
```

### Block mode

```jsx
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {MailbellPrdIcon32} from '@sberbusiness/icons/MailbellPrdIcon32';

<>
    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} block>
        Button Name
    </Button>
    <br />
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} block>
        Button Name
    </Button>
    <br />
    <Button theme={EButtonTheme.DANGER} size={EButtonSize.MD} block>
        Button Name
    </Button>
    <br />
    <Button theme={EButtonTheme.TILE} size={EButtonSize.MD} block>
        <MailbellPrdIcon32 />
    </Button>
</>
```

### Disabled state

```jsx
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {MailbellPrdIcon32} from '@sberbusiness/icons/MailbellPrdIcon32';

<div style={{display: 'flex', alignItems: 'center'}}>
    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} disabled>
        Button Name
    </Button>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} disabled>
        Button Name
    </Button>
    <Button theme={EButtonTheme.DANGER} size={EButtonSize.MD} disabled>
        Button Name
    </Button>
    <Button theme={EButtonTheme.DOTS} size={EButtonSize.MD} disabled>
        Button Name
    </Button>
    <Button theme={EButtonTheme.LINK} size={EButtonSize.MD} disabled>
        Button Name
    </Button>
    <Button theme={EButtonTheme.TILE} size={EButtonSize.MD} disabled>
        <MailbellPrdIcon32 />
    </Button>
</div>
```

### Loading state

```jsx
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {MailbellPrdIcon32} from '@sberbusiness/icons/MailbellPrdIcon32';

<div style={{display: 'flex', alignItems: 'center'}}>
    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} loading>
        Button Name
    </Button>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} loading>
        Button Name
    </Button>
    <Button theme={EButtonTheme.DANGER} size={EButtonSize.MD} loading>
        Button Name
    </Button>
    <Button theme={EButtonTheme.TILE} size={EButtonSize.MD} loading>
        <MailbellPrdIcon32 />
    </Button>
</div>
```

### Expanded state

```jsx
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {MailbellPrdIcon32} from '@sberbusiness/icons/MailbellPrdIcon32';

<div style={{display: 'flex', alignItems: 'center'}}>
    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} aria-expanded>
        Button Name
    </Button>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} aria-expanded>
        Button Name
    </Button>
    <Button theme={EButtonTheme.DOTS} size={EButtonSize.MD} aria-expanded>
        Button Name
    </Button>
    <Button theme={EButtonTheme.TILE} size={EButtonSize.MD} aria-expanded>
        <MailbellPrdIcon32 />
    </Button>
</div>
```
