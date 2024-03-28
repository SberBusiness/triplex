```jsx
import {HelpBox} from '@sberbusiness/triplex/components/HelpBox/HelpBox';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';

<HelpBox tooltipSize={ETooltipSize.SM}>
    <div>Текст подсказки.</div>
</HelpBox>
```

### Large Tooltip with Link

```jsx
import {HelpBox} from '@sberbusiness/triplex/components/HelpBox/HelpBox';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {Link, ELinkType, ELinkSize} from '@sberbusiness/triplex/components/Link/Link';

<HelpBox tooltipSize={ETooltipSize.LG}>
    <div>
        Текст подсказки.
        <Gap size={16} />
        <Link linkType={ELinkType.LINE} size={ELinkSize.SM}>Подробнее</Link>
    </div>
</HelpBox>
```

### Controlled

```jsx
import {HelpBox} from '@sberbusiness/triplex/components/HelpBox/HelpBox';
import {ETooltipSize, ETooltipPreferPlace} from '@sberbusiness/triplex/components/Tooltip/enums';
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
    <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.RIGHT} isOpen={open} toggle={setOpen}>
        <div>Текст подсказки.</div>
    </HelpBox>
</>
```

### Placement types

```jsx
import {HelpBox} from '@sberbusiness/triplex/components/HelpBox/HelpBox';
import {ETooltipSize, ETooltipPreferPlace} from '@sberbusiness/triplex/components/Tooltip/enums';

<div style={{display: 'flex', textAlign: 'center'}}>
    <div style={{flex: '1 1 0'}}>
        <div>Left</div>
        <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.LEFT}>
            <div>Текст подсказки.</div>
        </HelpBox>
    </div>
    <div style={{flex: '1 1 0'}}>
        <div>Above</div>
        <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.ABOVE}>
            <div>Текст подсказки.</div>
        </HelpBox>
    </div>
    <div style={{flex: '1 1 0'}}>
        <div>Below</div>
        <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.BELOW}>
            <div>Текст подсказки.</div>
        </HelpBox>
    </div>
    <div style={{flex: '1 1 0'}}>
        <div>Right</div>
        <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.RIGHT}>
            <div>Текст подсказки.</div>
        </HelpBox>
    </div>
</div>
```