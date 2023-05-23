```jsx
import React, {useState} from 'react';
import {ECardContentPaddingSize, ECardRoundingSize} from '@sberbusiness/triplex/desktop/components/Card/enums';
import {Text} from '@sberbusiness/triplex/desktop/components/Typography/Text';
import {Title} from '@sberbusiness/triplex/desktop/components/Typography/Title';
import {EFontType, ELineType, ETextSize, ETitleSize} from '@sberbusiness/triplex/desktop/components/Typography/enums';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/desktop/components/Link/Link';

const [paddingSize, setPaddingSize] = useState(ECardContentPaddingSize.MD);
const [roundingSize, setRoundingSize] = useState(ECardRoundingSize.MD);

const renderSelect = (label, value, handler, options) => (
    <label style={{display: 'inline-flex'}}>
        {label}
        <select value={value} onChange={(event) => handler(event.target.value)} style={{marginLeft: '4px'}}>
            {options.map((value, index) => (
                <option key={index} value={value}>
                    {value}
                </option>
            ))}
        </select>
    </label>
);

const renderControls = () => (
    <div style={{display: 'flex', flexDirection: 'column', marginBottom: '16px'}}>
        {renderSelect('Padding size', paddingSize, setPaddingSize, Object.values(ECardContentPaddingSize))}
        {renderSelect('Rounding size', roundingSize, setRoundingSize, Object.values(ECardRoundingSize))}
    </div>
);

<>
    {renderControls()}
    <CardStatic roundingSize={roundingSize} style={{width: `232px`}}>
        <CardStatic.Content paddingSize={paddingSize}>
            <CardStatic.Content.Header>
                <Text tag="div" size={ETextSize.B1} line={ELineType.EXTRA}>
                    Название без иконки
                </Text>
            </CardStatic.Content.Header>
            <CardStatic.Content.Body>
                <Text tag="div" size={ETextSize.B1} line={ELineType.EXTRA}>
                    Текст пояснения, которое коротко описывает суть атрибута.
                </Text>
                <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B2} style={{marginTop: '8px'}}>
                    Дополнительная информация: текст пояснения, которое коротко описывает суть атрибута.
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
</>
```
