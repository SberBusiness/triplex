```jsx
import {HelpBox} from '@sberbusiness/triplex/desktop/components/HelpBox/HelpBox';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/desktop/components/Link/Link';
import {ETooltipSize} from '@sberbusiness/triplex/desktop/components/Tooltip/enums';
import {Gap} from '@sberbusiness/triplex/desktop/components/Gap/Gap';

<HelpBox tooltipSize={ETooltipSize.SM}>
    <div>Текст подсказки.</div>
</HelpBox>
```

### HelpBox со ссылкой внутри

```jsx
import {HelpBox} from '@sberbusiness/triplex/desktop/components/HelpBox/HelpBox';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/desktop/components/Link/Link';
import {Gap} from '@sberbusiness/triplex/desktop/components/Gap/Gap';
import {ETooltipSize} from '@sberbusiness/triplex/desktop/components/Tooltip/enums';

<HelpBox tooltipSize={ETooltipSize.LG}>
    <div>
        Текст подсказки.
        <Gap size={16} />
        <Link linkType={ELinkType.LINE} size={ELinkSize.SM}>Подробнее</Link>
    </div>
</HelpBox>
```

### HelpBox контролируемый снаружи

```jsx
import {HelpBox} from '@sberbusiness/triplex/desktop/components/HelpBox/HelpBox';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/desktop/components/Link/Link';
import {Gap} from '@sberbusiness/triplex/desktop/components/Gap/Gap';
import {ETooltipSize} from '@sberbusiness/triplex/desktop/components/Tooltip/enums';
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';

const [opened, setIsOpened] = React.useState(false);

<>
    <ExampleControlPanel>
        <input type="checkbox" checked={opened} onChange={(event) => setIsOpened(event.target.checked)} data-label="IsOpen" />
    </ExampleControlPanel>
    
    <HelpBox isOpen={opened} toggle={setIsOpened} tooltipSize={ETooltipSize.SM}>
        <div>Текст подсказки.</div>
    </HelpBox>
</>
```
