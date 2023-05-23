```jsx
import React, {useState, useEffect} from 'react';
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';
import {ExampleBackground, ExampleBackgroundColor} from '../common/ExampleBackground/ExampleBackground';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/desktop/components/Link/Link';
import {LinkNavIcon16} from '@sberbusiness/icons/LinkNavIcon16';

const [type, setType] = useState(ELinkType.TEXT);
const [size, setSize] = useState(ELinkSize.SM);
const [external, setExternal] = useState(false);

useEffect(() => {
    if (type === ELinkType.LINE) setExternal(false);
}, [type]);

const Background = ({children}) =>
    type === ELinkType.TEXT ? children : <ExampleBackground background={ExampleBackgroundColor.DARK}>{children}</ExampleBackground>;

<>
    <ExampleControlPanel themed>
        <select value={type} onChange={(event) => setType(event.target.value)} data-label="Type">
            {Object.values(ELinkType).map((value, index) => (
                <option key={index}>{value}</option>
            ))}
        </select>
        <select value={size} onChange={(event) => setSize(event.target.value)} data-label="Size">
            {Object.values(ELinkSize).map((value, index) => (
                <option key={index}>{value}</option>
            ))}
        </select>
        <input
            type="checkbox"
            checked={external}
            onChange={(event) => setExternal(event.target.checked)}
            disabled={type === ELinkType.LINE}
            data-label="External"
        />
    </ExampleControlPanel>
    <Background>
        <Link linkType={type} size={size} href="javascript:void(0)" contentAfter={external ? () => <LinkNavIcon16 /> : undefined}>
            Текст ссылки
        </Link>
    </Background>
</>
```
