### Text sizes

```jsx
import {ETitleSize} from '@sberbusiness/triplex/components/Typography/enums';

<div style={{display: 'flex', justifyContent: 'space-around'}}>
    <Title size={ETitleSize.H1}>Sample Text H1</Title>
    <Title size={ETitleSize.H2}>Sample Text H2</Title>
    <Title size={ETitleSize.H3}>Sample Text H3</Title>
    <Title size={ETitleSize.H4}>Sample Text H4</Title>
</div>
```

### Font types

```jsx
import {ETitleSize, EFontType} from '@sberbusiness/triplex/components/Typography/enums';

<div style={{display: 'flex', justifyContent: 'space-around'}}>
    <Title size={ETitleSize.H4} type={EFontType.GENERAL}>
        General
    </Title>
    <Title size={ETitleSize.H4} type={EFontType.SECONDARY}>
        Secondary
    </Title>
    <Title size={ETitleSize.H4} type={EFontType.SUCCESS}>
        Success
    </Title>
    <Title size={ETitleSize.H4} type={EFontType.WARNING}>
        Warning
    </Title>
    <Title size={ETitleSize.H4} type={EFontType.DANGER}>
        Danger
    </Title>
    <Title size={ETitleSize.H4} type={EFontType.DISABLED}>
        Disabled
    </Title>
</div>
```

### Font weights

```jsx
import {ETitleSize, EFontWeight} from '@sberbusiness/triplex/components/Typography/enums';

<div style={{display: 'flex', justifyContent: 'space-around'}}>
    <Title size={ETitleSize.H4} weight={EFontWeight.LIGHT}>
        Light
    </Title>
    <Title size={ETitleSize.H4} weight={EFontWeight.REGULAR}>
        Regular
    </Title>
    <Title size={ETitleSize.H4} weight={EFontWeight.SEMIBOLD}>
        Semibold
    </Title>
    <Title size={ETitleSize.H4} weight={EFontWeight.BOLD}>
        Bold
    </Title>
</div>
```

### States

```jsx
import {ETitleSize} from '@sberbusiness/triplex/components/Typography/enums';

<div style={{display: 'flex', justifyContent: 'space-around'}}>
    <Title size={ETitleSize.H4} underline>
        Underline
    </Title>
    <Title size={ETitleSize.H4} strikethrough>
        Strikethrough
    </Title>
</div>
```
