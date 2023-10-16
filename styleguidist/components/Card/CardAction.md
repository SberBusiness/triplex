### CardAction Basic

```jsx
import {ECardContentPaddingSize, ECardRoundingSize} from '@sberbusiness/triplex/components/Card/enums';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {Title} from '@sberbusiness/triplex/components/Typography/Title';
import {EFontType, EFontWeight, ELineType, ETextSize, ETitleSize} from '@sberbusiness/triplex/components/Typography/enums';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/components/Link/Link';
import {NotificationwaitStsIcon20} from '@sberbusiness/icons/NotificationwaitStsIcon20';
import {SeaSrvIcon20} from '@sberbusiness/icons/SeaSrvIcon20';
import {SuccessStsIcon16} from '@sberbusiness/icons/SuccessStsIcon16';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

const [paddingSize, setPaddingSize] = React.useState(ECardContentPaddingSize.MD);
const [roundingSize, setRoundingSize] = React.useState(ECardRoundingSize.MD);
const [selected, setSelected] = React.useState(false);

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

const handlePropagation = (event) => event.stopPropagation();

<>
    {renderControlPanel()}
    <CardAction onToggle={setSelected} roundingSize={roundingSize} style={{width: '232px'}}>
        <CardAction.Media style={{backgroundImage: 'url(styleguidist/public/evotor.png)', height: '129px'}} />
        <CardAction.Content paddingSize={paddingSize}>
            <CardAction.Content.Header>
                <Title tag="div" size={ETitleSize.H3} weight={EFontWeight.REGULAR}>
                    Заголовок
                </Title>
            </CardAction.Content.Header>
            <CardAction.Content.Body>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <NotificationwaitStsIcon20 />
                    <Text size={ETextSize.B1} style={{marginLeft: '8px'}}>
                        Название
                    </Text>
                </div>
                <div style={{display: 'flex', alignItems: 'center', marginTop: '16px'}}>
                    <SeaSrvIcon20 />
                    <Text size={ETextSize.B1} style={{marginLeft: '8px'}}>
                        Название
                    </Text>
                </div>
                <div style={{display: 'flex', alignItems: 'center', marginTop: '16px'}}>
                    <SeaSrvIcon20 />
                    <Text size={ETextSize.B1} style={{marginLeft: '8px'}}>
                        Название
                    </Text>
                </div>
                <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B2} style={{marginTop: '8px'}}>
                    Дополнительная информация: текст пояснения, которое коротко описывает суть.
                </Text>
                <div style={{marginTop: '8px', lineHeight: '100%'}}>
                    <Link linkType={ELinkType.TEXT} size={ELinkSize.SM} onClick={handlePropagation} onMouseDown={handlePropagation} onKeyDown={handlePropagation}>
                        Подробнее
                    </Link>
                </div>
            </CardAction.Content.Body>
            <CardAction.Content.Footer>
                {!selected ? (
                    <Button
                        theme={EButtonTheme.SECONDARY}
                        size={EButtonSize.SM}
                        onMouseDown={handlePropagation}
                        onKeyDown={handlePropagation}
                    >
                        Выбрать
                    </Button>
                ) : (
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <SuccessStsIcon16 />
                        <Text size={ETextSize.B1} line={ELineType.EXTRA} style={{marginLeft: '8px', marginRight: '18px'}}>
                            Выбрано
                        </Text>
                        <Button
                            theme={EButtonTheme.LINK}
                            size={EButtonSize.SM}
                            onClick={handlePropagation}
                            onMouseDown={handlePropagation}
                            onKeyDown={handlePropagation}
                        >
                            Ссылка
                        </Button>
                    </div>
                )}
            </CardAction.Content.Footer>
        </CardAction.Content>
    </CardAction>
</>
```

### CardAction Controlled

```jsx
import {ECardContentPaddingSize} from '@sberbusiness/triplex/components/Card/enums';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {Title} from '@sberbusiness/triplex/components/Typography/Title';
import {EFontType, EFontWeight, ELineType, ETextSize, ETitleSize} from '@sberbusiness/triplex/components/Typography/enums';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/components/Link/Link';
import {NotificationwaitStsIcon20} from '@sberbusiness/icons/NotificationwaitStsIcon20';
import {SeaSrvIcon20} from '@sberbusiness/icons/SeaSrvIcon20';
import {SuccessStsIcon16} from '@sberbusiness/icons/SuccessStsIcon16';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

const [selected, setSelected] = React.useState(false);

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Checkbox checked={selected} setChecked={setSelected}>
            Selected
        </ComponentControlPanel.Checkbox>
    </ComponentControlPanel>
);

const handlePropagation = (event) => event.stopPropagation();

<>
    {renderControlPanel()}
    <CardAction selected={selected} toggle={setSelected} style={{width: '216px'}}>
        <CardAction.Content paddingSize={ECardContentPaddingSize.SM}>
            <CardAction.Content.Header>
                <Title tag="div" size={ETitleSize.H3} weight={EFontWeight.REGULAR}>
                    Заголовок
                </Title>
            </CardAction.Content.Header>
            <CardAction.Content.Body>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <NotificationwaitStsIcon20 />
                    <Text size={ETextSize.B1} style={{marginLeft: '8px'}}>
                        Название
                    </Text>
                </div>
                <div style={{display: 'flex', alignItems: 'center', marginTop: '16px'}}>
                    <SeaSrvIcon20 />
                    <Text size={ETextSize.B1} style={{marginLeft: '8px'}}>
                        Название
                    </Text>
                </div>
                <div style={{display: 'flex', alignItems: 'center', marginTop: '16px'}}>
                    <SeaSrvIcon20 />
                    <Text size={ETextSize.B1} style={{marginLeft: '8px'}}>
                        Название
                    </Text>
                </div>
                <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B2} style={{marginTop: '8px'}}>
                    Дополнительная информация: текст пояснения, которое коротко описывает суть.
                </Text>
                <div style={{marginTop: '8px', lineHeight: '100%'}}>
                    <Link linkType={ELinkType.TEXT} size={ELinkSize.SM} onClick={handlePropagation} onMouseDown={handlePropagation} onKeyDown={handlePropagation}>
                        Подробнее
                    </Link>
                </div>
            </CardAction.Content.Body>
            <CardAction.Content.Footer>
                {!selected ? (
                    <Button
                        theme={EButtonTheme.SECONDARY}
                        size={EButtonSize.SM}
                        onMouseDown={handlePropagation}
                        onKeyDown={handlePropagation}
                    >
                        Выбрать
                    </Button>
                ) : (
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <SuccessStsIcon16 />
                        <Text size={ETextSize.B1} line={ELineType.EXTRA} style={{marginLeft: '8px', marginRight: '18px'}}>
                            Выбрано
                        </Text>
                        <Button
                            theme={EButtonTheme.LINK}
                            size={EButtonSize.SM}
                            onClick={handlePropagation}
                            onMouseDown={handlePropagation}
                            onKeyDown={handlePropagation}
                        >
                            Ссылка
                        </Button>
                    </div>
                )}
            </CardAction.Content.Footer>
        </CardAction.Content>
    </CardAction>
</>
```
