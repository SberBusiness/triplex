```jsx
import {HelpBox} from '@sberbusiness/triplex/components/HelpBox/HelpBox';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/components/Link/Link';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';

<HelpBox tooltipSize={ETooltipSize.SM}>
    <div>Текст подсказки.</div>
</HelpBox>
```

### HelpBox со ссылкой внутри

```jsx
import {HelpBox} from '@sberbusiness/triplex/components/HelpBox/HelpBox';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/components/Link/Link';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';

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
import {HelpBox} from '@sberbusiness/triplex/components/HelpBox/HelpBox';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/components/Link/Link';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

const [open, setOpen] = React.useState(false);

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Checkbox checked={open} setChecked={setOpen}>
            Open
        </ComponentControlPanel.Checkbox>
    </ComponentControlPanel>
);

<>
    {renderControlPanel()}
    <HelpBox tooltipSize={ETooltipSize.SM} isOpen={open} toggle={setOpen}>
        <div>Текст подсказки.</div>
    </HelpBox>
</>
```
