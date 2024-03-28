### Small size

```jsx
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {EButtonIconShape} from '@sberbusiness/triplex/components/Button/enums';
import {HintSrvIcon16} from '@sberbusiness/icons/HintSrvIcon16';
import './styles.less';

const renderTooltip = (size, closable) => (
    <div className="tooltip-example-icon">
        <Tooltip size={ETooltipSize.SM} toggleType="hover">
            <Tooltip.Body>Текст подсказки.</Tooltip.Body>
            {closable && <Tooltip.XButton aria-label="Закрыть" />}
            <Tooltip.Target>
                <ButtonIcon shape={EButtonIconShape.CIRCLE}>
                    <HintSrvIcon16 />
                </ButtonIcon>
            </Tooltip.Target>
        </Tooltip>
    </div>
);

<div style={{display: 'flex', textAlign: 'center'}}>
    <div style={{flex: '1 1 0'}}>
        <div>Basic</div>
        {renderTooltip(ETooltipSize.SM, false)}
    </div>
    <div style={{flex: '1 1 0'}}>
        <div>X-Button</div>
        {renderTooltip(ETooltipSize.SM, true)}
    </div>
</div>
```

### Large size

```jsx
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {EButtonIconShape} from '@sberbusiness/triplex/components/Button/enums';
import {HintSrvIcon16} from '@sberbusiness/icons/HintSrvIcon16';
import './styles.less';

const renderTooltip = (closable) => (
    <div className="tooltip-example-icon">
        <Tooltip size={ETooltipSize.LG} toggleType="hover">
            <Tooltip.Body>Текст подсказки.</Tooltip.Body>
            {closable && <Tooltip.XButton aria-label="Закрыть" />}
            <Tooltip.Target>
                <ButtonIcon shape={EButtonIconShape.CIRCLE}>
                    <HintSrvIcon16 />
                </ButtonIcon>
            </Tooltip.Target>
        </Tooltip>
    </div>
);

<div style={{display: 'flex', textAlign: 'center'}}>
    <div style={{flex: '1 1 0'}}>
        <div>Basic</div>
        {renderTooltip(false)}
    </div>
    <div style={{flex: '1 1 0'}}>
        <div>X-Button</div>
        {renderTooltip(true)}
    </div>
</div>
```

### Toggle types

```jsx
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {EButtonIconShape} from '@sberbusiness/triplex/components/Button/enums';
import {HintSrvIcon16} from '@sberbusiness/icons/HintSrvIcon16';
import './styles.less';

const renderTooltip = (size, toggleType) => (
    <div className="tooltip-example-icon">
        <Tooltip size={size} toggleType={toggleType}>
            <Tooltip.Body>Текст подсказки.</Tooltip.Body>
            <Tooltip.Target>
                <ButtonIcon shape={EButtonIconShape.CIRCLE}>
                    <HintSrvIcon16 />
                </ButtonIcon>
            </Tooltip.Target>
        </Tooltip>
    </div>
);

<div style={{display: 'flex', textAlign: 'center'}}>
    <div style={{flex: '1 1 0'}}>
        <div>Hover</div>
        {renderTooltip(ETooltipSize.SM, 'hover')}
    </div>
    <div style={{flex: '1 1 0'}}>
        <div>Click</div>
        {renderTooltip(ETooltipSize.SM, 'click')}
    </div>
</div>
```

### Placement types

```jsx
import {ETooltipSize, ETooltipPreferPlace} from '@sberbusiness/triplex/components/Tooltip/enums';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {EButtonIconShape} from '@sberbusiness/triplex/components/Button/enums';
import {HintSrvIcon16} from '@sberbusiness/icons/HintSrvIcon16';
import './styles.less';

const renderTooltip = (size, preferPlace) => (
    <div className="tooltip-example-icon">
        <Tooltip size={size} toggleType="hover" preferPlace={preferPlace}>
            <Tooltip.Body>Текст подсказки.</Tooltip.Body>
            <Tooltip.Target>
                <ButtonIcon shape={EButtonIconShape.CIRCLE}>
                    <HintSrvIcon16 />
                </ButtonIcon>
            </Tooltip.Target>
        </Tooltip>
    </div>
);

<div style={{display: 'flex', textAlign: 'center'}}>
    <div style={{flex: '1 1 0'}}>
        <div>Left</div>
        {renderTooltip(ETooltipSize.SM, ETooltipPreferPlace.LEFT)}
    </div>
    <div style={{flex: '1 1 0'}}>
        <div>Above</div>
        {renderTooltip(ETooltipSize.SM, ETooltipPreferPlace.ABOVE)}
    </div>
    <div style={{flex: '1 1 0'}}>
        <div>Below</div>
        {renderTooltip(ETooltipSize.SM, ETooltipPreferPlace.BELOW)}
    </div>
    <div style={{flex: '1 1 0'}}>
        <div>Right</div>
        {renderTooltip(ETooltipSize.SM, ETooltipPreferPlace.RIGHT)}
    </div>
</div>
```

### Controlled

```jsx
import {ETooltipSize, ETooltipPreferPlace} from '@sberbusiness/triplex/components/Tooltip/enums';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {EButtonIconShape} from '@sberbusiness/triplex/components/Button/enums';
import {HintSrvIcon16} from '@sberbusiness/icons/HintSrvIcon16';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';
import './styles.less';

const [isOpen, setIsOpen] = React.useState(false);

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Checkbox checked={isOpen} setChecked={setIsOpen}>
            Open
        </ComponentControlPanel.Checkbox>
    </ComponentControlPanel>
);

const renderTooltip = (size, preferPlace) => (
    <div className="tooltip-example-icon">
        <Tooltip size={size} preferPlace={preferPlace} isOpen={isOpen} toggle={setIsOpen}>
            <Tooltip.Body>Текст подсказки.</Tooltip.Body>
            <Tooltip.Target>
                <ButtonIcon shape={EButtonIconShape.CIRCLE}>
                    <HintSrvIcon16 />
                </ButtonIcon>
            </Tooltip.Target>
        </Tooltip>
    </div>
);

<>
    {renderControlPanel()}
    {renderTooltip(ETooltipSize.SM, ETooltipPreferPlace.RIGHT)}
</>
```

### Render container

```jsx
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {EButtonIconShape} from '@sberbusiness/triplex/components/Button/enums';
import {HintSrvIcon16} from '@sberbusiness/icons/HintSrvIcon16';
import './styles.less';

const [tooltipRenderContainer, setTooltipRenderContainer] = React.useState(null);

React.useEffect(() => {
    setTooltipRenderContainer(() => document.getElementById('tooltip-render-container'));
}, []);

const renderTooltip = (size) => (
    <div className="tooltip-example-icon">
        <Tooltip size={size} toggleType="hover" tooltipRenderContainer={tooltipRenderContainer}>
            <Tooltip.Body>Текст подсказки.</Tooltip.Body>
            <Tooltip.Target>
                <ButtonIcon shape={EButtonIconShape.CIRCLE}>
                    <HintSrvIcon16 />
                </ButtonIcon>
            </Tooltip.Target>
        </Tooltip>
    </div>
);

<>
    <div id="tooltip-render-container" />
    {tooltipRenderContainer && renderTooltip(ETooltipSize.SM)}
</>
```