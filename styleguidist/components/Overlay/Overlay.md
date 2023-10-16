### RIGHT

```jsx
import React, {useState} from 'react';
import {Overlay} from '@sberbusiness/triplex/components/Overlay/Overlay';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';

const [opened, setOpened] = useState(false);

const handleClick = () => setOpened(!opened);

<div style={{position: 'relative'}}>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={handleClick}>
        Open overlay
    </Button>
    <p>
        Любопытство меня мучило: куда ж отправляют меня, если уж не в Петербург? Я не сводил глаз с пера батюшкина,
        которое двигалось
        довольно медленно. Наконец он кончил, запечатал письмо в одном пакете с паспортом, снял очки и, подозвав меня,
        сказал: «Вот тебе
        письмо к Андрею Карловичу Р., моему старинному товарищу и другу. Ты едешь в Оренбург служить под его
        начальством».
    </p>
    <p>А. С. Пушкин. Капитанская дочка</p>
    <Overlay
        opened={opened}
        setOpened={setOpened}
    >
        {(props) => (
            <>
                <Overlay.Mask opened={props.opened} onClick={handleClick}/>
                <Overlay.Panel {...props}>
                    <div style={{width: 200}}>
                        Дорожные размышления мои были не очень приятны. Проигрыш мой, по тогдашним ценам, был
                        немаловажен. Я не мог не
                        признаться в душе, что поведение мое в симбирском трактире было глупо, и чувствовал себя
                        виноватым перед Савельичем. Все
                        это меня мучило. Старик угрюмо сидел на облучке, отворотясь от меня, и молчал, изредка только
                        покрякивая. Я непременно
                        хотел с ним помириться и не знал с чего начать. Наконец я сказал ему: «Ну, ну, Савельич! полно,
                        помиримся, виноват; вижу
                        сам, что виноват. Я вчера напроказил, а тебя напрасно обидел. Обещаюсь вперед вести себя умнее и
                        слушаться тебя. Ну, не
                        сердись; помиримся».
                    </div>
                </Overlay.Panel>
            </>
        )}
    </Overlay>
</div>
```

### LEFT

```jsx
import React, {useState} from 'react';
import {Overlay} from '@sberbusiness/triplex/components/Overlay/Overlay';
import {EOverlayDirection} from '@sberbusiness/triplex/components/Overlay/OverlayBase';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';

const [opened, setOpened] = useState(false);

const handleClick = () => setOpened(!opened);

<div style={{position: 'relative'}}>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={handleClick}>
        Open overlay
    </Button>
    <p>
        Мысль о скорой разлуке со мною так поразила матушку, что она уронила ложку в кастрюльку, и слезы потекли по ее
        лицу. Напротив того,
        трудно описать мое восхищение. Мысль о службе сливалась во мне с мыслями о свободе, об удовольствиях
        петербургской жизни. Я
        воображал себя офицером гвардии, что, по мнению моему, было верхом благополучия человеческого.
    </p>
    <p>А. С. Пушкин. Капитанская дочка</p>
    <Overlay
        opened={opened}
        setOpened={setOpened}
        direction={EOverlayDirection.LEFT}
    >
        {(props) => (
            <>
                <Overlay.Mask opened={props.opened} onClick={handleClick}/>
                <Overlay.Panel {...props}>
                    <div style={{width: 200}}>
                        Я приказал ехать на незнакомый предмет, который тотчас и стал подвигаться нам навстречу. Через
                        две минуты мы поравнялись
                        с человеком.
                    </div>
                </Overlay.Panel>
            </>
        )}
    </Overlay>
</div>
```

### BOTTOM

```jsx
import React, {useState} from 'react';
import {Overlay} from '@sberbusiness/triplex/components/Overlay/Overlay';
import {EOverlayDirection} from '@sberbusiness/triplex/components/Overlay/OverlayBase';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';

const [opened, setOpened] = useState(false);

const handleClick = () => setOpened(!opened);

<div style={{position: 'relative'}}>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={handleClick}>
        Open overlay
    </Button>
    <p>
        Что прикажете? День я кончил так же беспутно, как и начал. Мы отужинали у Аринушки. Зурин поминутно мне
        подливал, повторяя, что надобно к службе привыкать. Встав из-за стола, я чуть держался на ногах; в полночь Зурин
        отвез меня в трактир.
    </p>
    <p>А. С. Пушкин. Капитанская дочка</p>
    <Overlay
        opened={opened}
        setOpened={setOpened}
        direction={EOverlayDirection.BOTTOM}
    >
        {(props) => (
            <>
                <Overlay.Mask opened={props.opened} onClick={handleClick}/>
                <Overlay.Panel {...props}>
                    <div style={{height: '40px'}}>
                        Мне приснился сон, которого никогда не мог я позабыть и в котором до сих пор вижу нечто
                        пророческое, когда соображаю с ним странные обстоятельства моей жизни.
                    </div>
                </Overlay.Panel>
            </>
        )}
    </Overlay>
</div>
```

### TOP

```jsx
import React, {useState} from 'react';
import {Overlay} from '@sberbusiness/triplex/components/Overlay/Overlay';
import {EOverlayDirection} from '@sberbusiness/triplex/components/Overlay/OverlayBase';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';

const [opened, setOpened] = useState(false);

const handleClick = () => setOpened(!opened);

<div style={{position: 'relative'}}>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={handleClick}>
        Open overlay
    </Button>
    <p>
        На другой день я проснулся с головною болью, смутно припоминая себе вчерашние происшествия. Размышления мои
        прерваны были Савельичем, вошедшим ко мне с чашкою чая. «Рано, Петр Андреич, — сказал он мне, качая головою, —
        рано начинаешь гулять. И в кого ты пошел? Кажется, ни батюшка, ни дедушка пьяницами не бывали; о матушке и
        говорить нечего: отроду, кроме квасу, в рот ничего не
        изволили брать. А кто всему виноват? проклятый мусье. То и дело, бывало, к Антипьевне забежит: «Мадам, же ву
        при, водкю». Вот тебе и же ву при! Нечего сказать: добру наставил, собачий сын. И нужно было нанимать в дядьки
        басурмана, как будто у
        барина не стало и своих людей!»
    </p>
    <p>А. С. Пушкин. Капитанская дочка</p>
    <Overlay
        opened={opened}
        setOpened={setOpened}
        direction={EOverlayDirection.TOP}
    >
        {(props) => (
            <>
                <Overlay.Mask opened={props.opened} onClick={handleClick}/>
                <Overlay.Panel {...props}>
                    <div>
                        Читатель извинит меня: ибо, вероятно, знает по опыту, как сродно человеку предаваться суеверию,
                        несмотря на всевозможное презрение к предрассудкам.
                    </div>
                </Overlay.Panel>
            </>
        )}
    </Overlay>
</div>
```

### FULL PAGE AND CUSTOM STYLES

```jsx
import React, {useState, useEffect, useRef} from 'react';
import {Overlay} from '@sberbusiness/triplex/components/Overlay/Overlay';
import {OverlayMask} from '@sberbusiness/triplex/components/Overlay/OverlayMask';
import {EOverlayDirection} from '@sberbusiness/triplex/components/Overlay/OverlayBase';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {Portal} from '@sberbusiness/triplex/components/Portal/Portal';
import './example.less';

const [opened, setOpened] = useState(false);
const divEl = document.createElement('div');
const divRef = useRef(divEl);

const handleClick = () => setOpened(!opened);

useEffect(() => {
    document.body.appendChild(divEl);

    return () => document.body.removeChild(divEl);
}, []);

useEffect(() => {
    if (opened) {
        document.body.classList.add('overflow-hidden');
    } else {
        document.body.classList.remove('overflow-hidden');
    }

    return () => {
        document.body.classList.remove('overflow-hidden');
    };
}, [opened]);

<div style={{position: 'relative'}}>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={handleClick}>
        Open overlay
    </Button>
    <Portal container={divRef.current}>
        <Overlay
            fixed
            opened={opened}
            setOpened={setOpened}
            direction={EOverlayDirection.LEFT}
        >
            {(props) => (
                <>
                    <OverlayMask opened={props.opened} onClick={handleClick}/>
                    <Overlay.Panel className="custom-panel" {...props}>
                        <div style={{width: 200, height: '2000px'}}>
                            Я вышел из кибитки. Буран еще продолжался, хотя с меньшею силою. Было так темно, что хоть
                            глаз выколи. Хозяин встретил нас у ворот, держа фонарь под полою, и ввел меня в горницу,
                            тесную, но довольно чистую; лучина освещала ее.
                            На стене висела винтовка и высокая казацкая шапка.
                        </div>
                    </Overlay.Panel>
                </>
            )}
        </Overlay>
    </Portal>
</div>
```
