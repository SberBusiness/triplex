### CardAction Basic

```jsx
import React, {useState} from 'react';
import {ECardContentPaddingSize, ECardRoundingSize} from '@sberbusiness/triplex/desktop/components/Card/enums';
import {Text} from '@sberbusiness/triplex/desktop/components/Typography/Text';
import {Title} from '@sberbusiness/triplex/desktop/components/Typography/Title';
import {EFontType, EFontWeight, ELineType, ETextSize, ETitleSize} from '@sberbusiness/triplex/desktop/components/Typography/enums';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/desktop/components/Link/Link';
import {NotificationwaitStsIcon20} from '@sberbusiness/icons/NotificationwaitStsIcon20';
import {SeaSrvIcon20} from '@sberbusiness/icons/SeaSrvIcon20';
import {SuccessStsIcon16} from '@sberbusiness/icons/SuccessStsIcon16';
import {Button} from '@sberbusiness/triplex/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/desktop/components/Button/enums';

const [paddingSize, setPaddingSize] = useState(ECardContentPaddingSize.MD);
const [roundingSize, setRoundingSize] = useState(ECardRoundingSize.MD);
const [selected, setSelected] = useState(false);

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

const handlePropagation = (event) => event.stopPropagation();

<>
    {renderControls()}
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
import React, {useState} from 'react';
import {ECardContentPaddingSize} from '@sberbusiness/triplex/desktop/components/Card/enums';
import {Text} from '@sberbusiness/triplex/desktop/components/Typography/Text';
import {Title} from '@sberbusiness/triplex/desktop/components/Typography/Title';
import {EFontType, EFontWeight, ELineType, ETextSize, ETitleSize} from '@sberbusiness/triplex/desktop/components/Typography/enums';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/desktop/components/Link/Link';
import {NotificationwaitStsIcon20} from '@sberbusiness/icons/NotificationwaitStsIcon20';
import {SeaSrvIcon20} from '@sberbusiness/icons/SeaSrvIcon20';
import {SuccessStsIcon16} from '@sberbusiness/icons/SuccessStsIcon16';
import {Button} from '@sberbusiness/triplex/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/desktop/components/Button/enums';

const [selected, setSelected] = useState(false);

const renderControls = () => (
    <div style={{display: 'flex', flexDirection: 'column', marginBottom: '16px'}}>
        <label style={{display: 'inline-flex'}}>
            <input
                type="checkbox"
                checked={selected}
                onChange={(event) => setSelected(event.target.checked)}
                style={{margin: 'auto 4px auto 0'}}
            />
            Selected
        </label>
    </div>
);

const handlePropagation = (event) => event.stopPropagation();

<>
    {renderControls()}
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
