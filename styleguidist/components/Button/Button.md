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
    <Button theme={EButtonTheme.LINK} size={EButtonSize.MD}>
        Button Name
    </Button>
    <Button theme={EButtonTheme.TILE}>
        <MailbellPrdIcon32 />
    </Button>
</div>
```

### Size large

```jsx
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';

<div style={{display: 'flex', alignItems: 'center'}}>
    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.LG}>
        Button Name
    </Button>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.LG}>
        Button Name
    </Button>
    <Button theme={EButtonTheme.DANGER} size={EButtonSize.LG}>
        Button Name
    </Button>
    <Button theme={EButtonTheme.LINK} size={EButtonSize.LG}>
        Button Name
    </Button>
</div>
```

### Size small

```jsx
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';

<>
    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.SM}>
        Button Name
    </Button>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
        Button Name
    </Button>
    <Button theme={EButtonTheme.DANGER} size={EButtonSize.SM}>
        Button Name
    </Button>
    <Button theme={EButtonTheme.LINK} size={EButtonSize.SM}>
        Button Name
    </Button>
</>
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
    <Button theme={EButtonTheme.TILE} size={EButtonSize.MD} aria-expanded>
        <MailbellPrdIcon32 />
    </Button>
</div>
```

### Link with icons

```jsx
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {AttachmentSrvIcon20} from '@sberbusiness/icons/AttachmentSrvIcon20';


<div>
    <Button theme={EButtonTheme.LINK} size={EButtonSize.LG}>
      <AttachmentSrvIcon20 />&nbsp;Button Name
    </Button>
    <br />
    <Button theme={EButtonTheme.LINK} size={EButtonSize.LG}>
      Button Name&nbsp;<AttachmentSrvIcon20 />
    </Button>
</div>
```
