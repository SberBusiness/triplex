```jsx
import ComponentOptions from '../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../common/components/ComponentPreview/ComponentPreview';
import {
    ExampleBackground,
    ExampleBackgroundColor
} from '../../common/components/ExampleBackground/ExampleBackground';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/components/Link/Link';
import {LinkNavIcon16} from '@sberbusiness/icons/LinkNavIcon16';
import {useEffect, useRef, useState} from 'react';

const [focus, setFocus] = useState(false);
const [hasContentBefore, setHasContentBefore] = useState(false);
const [hasContentAfter, setHasContentAfter] = useState(false);
const [type, setType] = useState('text');
const [size, setSize] = useState('sm');

const linkRef = useRef();

const checkboxOptions = [
    {
        id: 'focus',
        label: 'Focus',
        checked: focus,
        onChange: setFocus,
    },
    {
        id: 'contentBefore',
        label: 'Content before',
        checked: hasContentBefore,
        onChange: setHasContentBefore,
    },
    {
        id: 'contentAfter',
        label: 'Content after',
        checked: hasContentAfter,
        onChange: setHasContentAfter,
    },
];

const inputOptions = [
    {
        id: 'size',
        onChange: setSize,
        value: size,
    },
    {
        id: 'type',
        onChange: setType,
        value: type,
    },
];

useEffect(() => {
    if (linkRef.current && focus) {
        linkRef.current.focus();
    }
}, [focus]);

const linkType = type === 'line' ? ELinkType.LINE : ELinkType.TEXT;
const linkSize = size === 'lg' ? ELinkSize.LG : ELinkSize.SM;
const contentBefore = type === 'text' && hasContentBefore ? () => <LinkNavIcon16/> : undefined;
const contentAfter = type === 'text' && hasContentAfter ? () => <LinkNavIcon16/> : undefined;

const renderLink = () => (
    <Link href="#" linkType={linkType} size={linkSize} ref={linkRef} contentBefore={contentBefore} contentAfter={contentAfter}>
        Текст ссылки
    </Link>
);

<>
    <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions}/>
    <ComponentPreview style={{paddingLeft: '10px'}}>
        {type === 'line' ? (
            <ExampleBackground background={ExampleBackgroundColor.DARK}>
                {renderLink()}
            </ExampleBackground>
        ) : renderLink()}
    </ComponentPreview>
</>
```
