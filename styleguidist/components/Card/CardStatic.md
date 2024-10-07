```jsx
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {Title} from '@sberbusiness/triplex/components/Typography/Title';
import {EFontType, ELineType, ETextSize, ETitleSize} from '@sberbusiness/triplex/components/Typography/enums';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/components/Link/Link';

<CardStatic style={{width: `232px`}}>
    <CardStatic.Content>
        <CardStatic.Content.Header>
            <Text tag="div" size={ETextSize.B1} line={ELineType.EXTRA}>
                Название без иконки
            </Text>
        </CardStatic.Content.Header>
        <CardStatic.Content.Body>
            <Text tag="div" size={ETextSize.B1} line={ELineType.EXTRA}>
                Текст пояснения, который коротко описывает суть атрибута.
            </Text>
            <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B2} style={{marginTop: '8px'}}>
                Дополнительная информация: текст пояснения, который коротко описывает суть атрибута.
            </Text>
            <div style={{marginTop: '8px', lineHeight: '100%'}}>
                <Title size={ETitleSize.H4}>1234567,00</Title>
                <Text type={EFontType.SECONDARY} size={ETextSize.B2}>
                    Текст пояснения
                </Text>
            </div>
            <div style={{marginTop: '8px', lineHeight: '100%'}}>
                <Title size={ETitleSize.H4}>1234567,00</Title>
                <Text type={EFontType.SECONDARY} size={ETextSize.B2}>
                    Текст пояснения
                </Text>
            </div>
            <div style={{marginTop: '8px', lineHeight: '100%'}}>
                <Title size={ETitleSize.H4}>1234567,00</Title>
                <Text type={EFontType.SECONDARY} size={ETextSize.B2}>
                    Текст пояснения
                </Text>
            </div>
            <div style={{marginTop: '8px', lineHeight: '100%'}}>
                <Link linkType={ELinkType.TEXT} size={ELinkSize.SM}>Подробнее</Link>
            </div>
        </CardStatic.Content.Body>
    </CardStatic.Content>
</CardStatic>
```

### Small padding size

```jsx
import {ECardContentPaddingSize} from '@sberbusiness/triplex/components/Card/enums';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {Title} from '@sberbusiness/triplex/components/Typography/Title';
import {EFontType, ELineType, ETextSize, ETitleSize} from '@sberbusiness/triplex/components/Typography/enums';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/components/Link/Link';

<CardStatic style={{width: `232px`}}>
    <CardStatic.Content paddingSize={ECardContentPaddingSize.SM}>
        <CardStatic.Content.Header>
            <Text tag="div" size={ETextSize.B1} line={ELineType.EXTRA}>
                Название без иконки
            </Text>
        </CardStatic.Content.Header>
        <CardStatic.Content.Body>
            <Text tag="div" size={ETextSize.B1} line={ELineType.EXTRA}>
                Текст пояснения, который коротко описывает суть атрибута.
            </Text>
            <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B2} style={{marginTop: '8px'}}>
                Дополнительная информация: текст пояснения, который коротко описывает суть атрибута.
            </Text>
            <div style={{marginTop: '8px', lineHeight: '100%'}}>
                <Title size={ETitleSize.H4}>1234567,00</Title>
                <Text type={EFontType.SECONDARY} size={ETextSize.B2}>
                    Текст пояснения
                </Text>
            </div>
            <div style={{marginTop: '8px', lineHeight: '100%'}}>
                <Title size={ETitleSize.H4}>1234567,00</Title>
                <Text type={EFontType.SECONDARY} size={ETextSize.B2}>
                    Текст пояснения
                </Text>
            </div>
            <div style={{marginTop: '8px', lineHeight: '100%'}}>
                <Title size={ETitleSize.H4}>1234567,00</Title>
                <Text type={EFontType.SECONDARY} size={ETextSize.B2}>
                    Текст пояснения
                </Text>
            </div>
            <div style={{marginTop: '8px', lineHeight: '100%'}}>
                <Link linkType={ELinkType.TEXT} size={ELinkSize.SM}>Подробнее</Link>
            </div>
        </CardStatic.Content.Body>
    </CardStatic.Content>
</CardStatic>
```

### Small rounding size

```jsx
import {ECardRoundingSize} from '@sberbusiness/triplex/components/Card/enums';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {Title} from '@sberbusiness/triplex/components/Typography/Title';
import {EFontType, ELineType, ETextSize, ETitleSize} from '@sberbusiness/triplex/components/Typography/enums';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/components/Link/Link';

 <CardStatic roundingSize={ECardRoundingSize.SM} style={{width: `232px`}}>
    <CardStatic.Content>
        <CardStatic.Content.Header>
            <Text tag="div" size={ETextSize.B1} line={ELineType.EXTRA}>
                Название без иконки
            </Text>
        </CardStatic.Content.Header>
        <CardStatic.Content.Body>
            <Text tag="div" size={ETextSize.B1} line={ELineType.EXTRA}>
                Текст пояснения, который коротко описывает суть атрибута.
            </Text>
            <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B2} style={{marginTop: '8px'}}>
                Дополнительная информация: текст пояснения, который коротко описывает суть атрибута.
            </Text>
            <div style={{marginTop: '8px', lineHeight: '100%'}}>
                <Title size={ETitleSize.H4}>1234567,00</Title>
                <Text type={EFontType.SECONDARY} size={ETextSize.B2}>
                    Текст пояснения
                </Text>
            </div>
            <div style={{marginTop: '8px', lineHeight: '100%'}}>
                <Title size={ETitleSize.H4}>1234567,00</Title>
                <Text type={EFontType.SECONDARY} size={ETextSize.B2}>
                    Текст пояснения
                </Text>
            </div>
            <div style={{marginTop: '8px', lineHeight: '100%'}}>
                <Title size={ETitleSize.H4}>1234567,00</Title>
                <Text type={EFontType.SECONDARY} size={ETextSize.B2}>
                    Текст пояснения
                </Text>
            </div>
            <div style={{marginTop: '8px', lineHeight: '100%'}}>
                <Link linkType={ELinkType.TEXT} size={ELinkSize.SM}>Подробнее</Link>
            </div>
        </CardStatic.Content.Body>
    </CardStatic.Content>
</CardStatic>
```
