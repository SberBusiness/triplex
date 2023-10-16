```jsx
import {ECardContentPaddingSize, ECardRoundingSize} from '@sberbusiness/triplex/components/Card/enums';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {Title} from '@sberbusiness/triplex/components/Typography/Title';
import {EFontType, ELineType, ETextSize, ETitleSize} from '@sberbusiness/triplex/components/Typography/enums';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/components/Link/Link';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

const [paddingSize, setPaddingSize] = React.useState(ECardContentPaddingSize.MD);
const [roundingSize, setRoundingSize] = React.useState(ECardRoundingSize.MD);

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Select
            value={paddingSize}
            setValue={setPaddingSize}
            options={Object.values(ECardContentPaddingSize)}
        >
            Padding size
        </ComponentControlPanel.Select>
        <ComponentControlPanel.Select
            value={roundingSize}
            setValue={setRoundingSize}
            options={Object.values(ECardRoundingSize)}
        >
            Rounding size
        </ComponentControlPanel.Select>
    </ComponentControlPanel>
);

<>
    {renderControlPanel()}
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
