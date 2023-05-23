```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency 
    componentTitle="Tooltip"
    isMobileComponent={false}
/>
```

```jsx
import {ETooltipSize, ETooltipPreferPlace} from '@sberbusiness/triplex/desktop/components/Tooltip/enums';
import {ButtonIcon} from '@sberbusiness/triplex/desktop/components/Button/ButtonIcon';
import {EButtonIconShape} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {HintSrvIcon16} from '@sberbusiness/icons/HintSrvIcon16';
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';
import './TooltipExample.less';

const [size, setSize] = React.useState(ETooltipSize.SM);
const [preferPlace, setPreferPlace] = React.useState(ETooltipPreferPlace.ABOVE);
const [toggleType, setToggleType] = React.useState('hover');
const [xButton, setXButton] = React.useState(false);

const renderControlPanel = () => (
    <ExampleControlPanel>
        <select value={size} onChange={(event) => setSize(event.target.value)} data-label="Size">
            {Object.values(ETooltipSize).map((value, index) => (
                <option key={index}>{value}</option>
            ))}
        </select>
        <select
            value={preferPlace}
            onChange={(event) => setPreferPlace(event.target.value)}
            data-label="Placement"
        >
            {Object.values(ETooltipPreferPlace).map((value, index) => (
                <option key={index}>{value}</option>
            ))}
        </select>
        <select
            value={toggleType}
            onChange={(event) => setToggleType(event.target.value)}
            data-label="Toggle type"
        >
            {['hover', 'click'].map((value, index) => (
                <option key={index}>{value}</option>
            ))}
        </select>
        <input
            type="checkbox"
            checked={xButton}
            onChange={(event) => setXButton(event.target.checked)}
            data-label="X-Button"
        />
    </ExampleControlPanel>
);

<>
    {renderControlPanel()}
    <div className="tooltip-example-icon">
        <Tooltip size={size} toggleType={toggleType} preferPlace={preferPlace}>
            <Tooltip.Body>Текст подсказки.</Tooltip.Body>
            {xButton && <Tooltip.XButton aria-label="Закрыть" />}
            <Tooltip.Target>
                <ButtonIcon shape={EButtonIconShape.CIRCLE}>
                    <HintSrvIcon16 />
                </ButtonIcon>
            </Tooltip.Target>
        </Tooltip>
    </div>
</>
```
### Tooltip & render container

```jsx
import {ETooltipSize} from '@sberbusiness/triplex/desktop/components/Tooltip/enums';
import {ButtonIcon} from '@sberbusiness/triplex/desktop/components/Button/ButtonIcon';
import {EButtonIconShape} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {HintSrvIcon16} from '@sberbusiness/icons/HintSrvIcon16';
import {Tooltip} from '@sberbusiness/triplex/desktop/components/Tooltip/Tooltip';
import './TooltipExample.less';

const [tooltipRenderContainer, setTooltipRenderContainer] = React.useState(null);

React.useEffect(() => {
    setTooltipRenderContainer(() => document.querySelector('.tooltip-render-container'));
}, []);

<>
    <div className="tooltip-render-container" />
    {tooltipRenderContainer ? (
        <div className="tooltip-example-icon">
            <Tooltip size={ETooltipSize.SM} toggleType="hover" tooltipRenderContainer={tooltipRenderContainer}>
                <Tooltip.Body>Текст подсказки.</Tooltip.Body>
                <Tooltip.Target>
                    <ButtonIcon shape={EButtonIconShape.CIRCLE}>
                        <HintSrvIcon16 />
                    </ButtonIcon>
                </Tooltip.Target>
            </Tooltip>
        </div>
    ) : null}
</>
```

### Tooltip Controlled

```jsx
import {ETooltipSize} from '@sberbusiness/triplex/desktop/components/Tooltip/enums';
import {ButtonIcon} from '@sberbusiness/triplex/desktop/components/Button/ButtonIcon';
import {EButtonIconShape} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {HintSrvIcon16} from '@sberbusiness/icons/HintSrvIcon16';
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';
import './TooltipExample.less';

const [isOpen, setIsOpen] = React.useState(false);

const renderControlPanel = () => (
    <ExampleControlPanel>
        <input
            type="checkbox"
            checked={isOpen}
            onChange={(event) => setIsOpen(event.target.checked)}
            data-label="Open"
        />
    </ExampleControlPanel>
);

<>
    {renderControlPanel()}
    <div className="tooltip-example-icon">
        <Tooltip size={ETooltipSize.SM} toggleType="hover" isOpen={isOpen} toggle={setIsOpen}>
            <Tooltip.Body>Текст подсказки.</Tooltip.Body>
            <Tooltip.Target>
                <ButtonIcon shape={EButtonIconShape.CIRCLE}>
                    <HintSrvIcon16 />
                </ButtonIcon>
            </Tooltip.Target>
        </Tooltip>
    </div>
</>
```
