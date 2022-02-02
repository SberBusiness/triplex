```jsx
import {ExampleBackground, ExampleBackgroundColor} from '../common/ExampleBackground/ExampleBackground';
import {ELinkSize, ELinkType, Link} from '@sbbol/web-library/desktop/components/Link/Link';
import {LinkNavIcon16} from '@sberbusiness/icons/LinkNavIcon16';
import {useState} from 'react';

const [type, setType] = useState(ELinkType.TEXT);
const [size, setSize] = useState(ELinkSize.SM);
const [hasContent, setHasContent] = useState(false);

const Background = ({children}) => type === ELinkType.TEXT ? children : <ExampleBackground background={ExampleBackgroundColor['graphite-01']}>{children}</ExampleBackground>;

<>
    <div style={{display: 'flex', flexDirection: 'column', marginBottom: '16px'}}>
        <label style={{display: 'inline-flex'}}>
            Type
            <select value={type} onChange={e => setType(+e.target.value)} style={{marginLeft: '4px'}}>
                <option value={ELinkType.TEXT}>TEXT</option>
                <option value={ELinkType.LINE}>LINE</option>
            </select>
        </label>
        <label style={{display: 'inline-flex'}}>
            Size
            <select value={size} onChange={e => setSize(+e.target.value)} style={{marginLeft: '4px'}}>
                <option value={ELinkSize.SM}>SM</option>
                <option value={ELinkSize.LG}>LG</option>
            </select>
        </label>
        {type === ELinkType.TEXT && <label style={{display: 'inline-flex'}}>
            <input type='checkbox' checked={hasContent} onChange={e => setHasContent(e.target.checked)} style={{margin: 'auto 4px auto 0'}} />
            With icon
        </label>}
    </div>

    <Background>
        <Link linkType={type} size={size} href="javascript:void(0)" contentAfter={hasContent ? () => <LinkNavIcon16 /> : undefined}>Текст ссылки</Link>
    </Background>
</>
```
