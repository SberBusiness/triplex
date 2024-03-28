### Text sizes

```jsx
import {ETextSize} from '@sberbusiness/triplex/components/Typography/enums';

<div style={{display: 'flex', justifyContent: 'space-around'}}>
    <Text size={ETextSize.B1}>Sample Text B1</Text>
    <Text size={ETextSize.B2}>Sample Text B2</Text>
    <Text size={ETextSize.B3}>Sample Text B3</Text>
</div>
```

### Font types

```jsx
import {ETextSize, EFontType} from '@sberbusiness/triplex/components/Typography/enums';

<div style={{display: 'flex', justifyContent: 'space-around'}}>
    <Text size={ETextSize.B1} type={EFontType.GENERAL}>
        General
    </Text>
    <Text size={ETextSize.B1} type={EFontType.SECONDARY}>
        Secondary
    </Text>
    <Text size={ETextSize.B1} type={EFontType.SUCCESS}>
        Success
    </Text>
    <Text size={ETextSize.B1} type={EFontType.WARNING}>
        Warning
    </Text>
    <Text size={ETextSize.B1} type={EFontType.DANGER}>
        Danger
    </Text>
    <Text size={ETextSize.B1} type={EFontType.DISABLED}>
        Disabled
    </Text>
</div>
```

### Font weights

```jsx
import {ETextSize, EFontWeight} from '@sberbusiness/triplex/components/Typography/enums';

<div style={{display: 'flex', justifyContent: 'space-around'}}>
    <Text size={ETextSize.B1} weight={EFontWeight.LIGHT}>
        Light
    </Text>
    <Text size={ETextSize.B1} weight={EFontWeight.REGULAR}>
        Regular
    </Text>
    <Text size={ETextSize.B1} weight={EFontWeight.SEMIBOLD}>
        Semibold
    </Text>
    <Text size={ETextSize.B1} weight={EFontWeight.BOLD}>
        Bold
    </Text>
</div>
```

### Line types

```jsx
import {ETextSize, ELineType} from '@sberbusiness/triplex/components/Typography/enums';

<div style={{display: 'flex', justifyContent: 'space-around'}}>
    <Text size={ETextSize.B1} line={ELineType.NORMAL}>
        Normal Normal Normal Normal Normal Normal Normal Normal Normal Normal Normal Normal Normal Normal
        Normal Normal Normal Normal Normal Normal Normal Normal Normal Normal
    </Text>
    <Text size={ETextSize.B1} line={ELineType.EXTRA}>
        Extra Extra Extra Extra Extra Extra Extra Extra Extra Extra Extra Extra Extra Extra Extra Extra
        Extra Extra Extra Extra Extra Extra Extra Extra Extra Extra Extra Extra Extra Extra
    </Text>
</div>
```

### States

```jsx
import {ETextSize} from '@sberbusiness/triplex/components/Typography/enums';

<div style={{display: 'flex', justifyContent: 'space-around'}}>
    <Text size={ETextSize.B1} underline>
        Underline
    </Text>
    <Text size={ETextSize.B1} strikethrough>
        Strikethrough
    </Text>
</div>
```
