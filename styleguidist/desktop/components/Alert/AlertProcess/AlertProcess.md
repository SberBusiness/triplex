```jsx
import React, {useState} from 'react';
import {EAlertType} from '@sberbusiness/triplex/desktop/components/Alert/EAlertType';
import {Gap} from '@sberbusiness/triplex/desktop/components/Gap/Gap';
import {Button} from '@sberbusiness/triplex/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/desktop/components/Link/Link';
import {UnorderedList} from '@sberbusiness/triplex/desktop/components/List/UnorderedList';

const [type, setType] = useState(EAlertType.INFO);
const [header, setHeader] = useState(false);
const [closable, setClosable] = useState(false);

const text =
    'Допустимое количество сообщений об ошибке — 3. Максимальное количество символов одного сообщения в списке  — 180 символов. Опционально использование Link External;';

const handleClose = () => alert();

const renderHeader = (props) => <AlertProcess.Header {...props}>Максимальное количество символов</AlertProcess.Header>;

const renderCheckbox = (label, checked, handler) => (
    <label style={{display: 'inline-flex'}}>
        <input type="checkbox" checked={checked} onChange={(event) => handler(event.target.checked)} style={{margin: 'auto 4px auto 0'}} />
        {label}
    </label>
);

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
        {renderSelect('Type', type, setType, [EAlertType.INFO, EAlertType.WARNING, EAlertType.ERROR, EAlertType.FEATURE])}
        {renderCheckbox('Header', header, setHeader)}
        {renderCheckbox('Closable', closable, setClosable)}
    </div>
);

<>
    {renderControls()}
    <AlertProcess type={type} renderHeader={header ? renderHeader : undefined} onClose={handleClose} closable={closable}>
        Максимальное количество символов одного сообщения об ошибке, можно использовать Link External — 180 символов.
    </AlertProcess>
    <br />
    <AlertProcess type={type} renderHeader={header ? renderHeader : undefined} onClose={handleClose} closable={closable}>
        Максимальное количество символов в одном сообщении об ошибке — 210. Объясняем пользователю, что нужно сделать: можно использовать
        Link External, указываем информацию для пользователя, точнее что нужно дозаполнить, и кавычки не ставим.
        <Gap size={8} />
        <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
            Button Name
        </Button>
    </AlertProcess>
    <br />
    <AlertProcess type={type} renderHeader={header ? renderHeader : undefined} onClose={handleClose} closable={closable}>
        Максимальное количество символов в одном сообщении об ошибке — 210. Объясняем пользователю, что нужно сделать: можно использовать
        Link External, указываем информацию для пользователя, точнее что нужно дозаполнить, и кавычки не ставим.
        <Gap size={8} />
        <Link linkType={ELinkType.TEXT} size={ELinkSize.LG} href="#!/Components/AlertProcess">Текст ссылки</Link>
    </AlertProcess>
    <br />
    <AlertProcess type={type} renderHeader={header ? renderHeader : undefined} onClose={handleClose} closable={closable}>
        Максимальное количество символов в одном сообщении об ошибке — 210. Объясняем пользователю, что нужно сделать: можно использовать
        Link External, указываем информацию для пользователя, точнее что нужно дозаполнить, и кавычки не ставим.
        <Gap size={8} />
        <UnorderedList values={Array(3).fill(text)} />
    </AlertProcess>
</>
```
