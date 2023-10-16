```jsx
import {ETooltipSize, ETooltipPreferPlace} from '@sberbusiness/triplex/components/Tooltip/enums';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {EButtonIconShape} from '@sberbusiness/triplex/components/Button/enums';
import {HintSrvIcon16} from '@sberbusiness/icons/HintSrvIcon16';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';
import './TooltipExample.less';

const [size, setSize] = React.useState(ETooltipSize.SM);
const [preferPlace, setPreferPlace] = React.useState(ETooltipPreferPlace.ABOVE);
const [toggleType, setToggleType] = React.useState('hover');
const [xButton, setXButton] = React.useState(false);

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Select
            value={size}
            setValue={setSize}
            options={Object.values(ETooltipSize)}
        >
            Size
        </ComponentControlPanel.Select>
        <ComponentControlPanel.Select
            value={preferPlace}
            setValue={setPreferPlace}
            options={Object.values(ETooltipPreferPlace)}
        >
            Placement
        </ComponentControlPanel.Select>
        <ComponentControlPanel.Select
            value={toggleType}
            setValue={setToggleType}
            options={['hover', 'click']}
        >
            Toggle type
        </ComponentControlPanel.Select>
        <ComponentControlPanel.Checkbox checked={xButton} setChecked={setXButton}>
            X-Button
        </ComponentControlPanel.Checkbox>
    </ComponentControlPanel>
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
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {EButtonIconShape} from '@sberbusiness/triplex/components/Button/enums';
import {HintSrvIcon16} from '@sberbusiness/icons/HintSrvIcon16';
import {Tooltip} from '@sberbusiness/triplex/components/Tooltip/Tooltip';
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
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {EButtonIconShape} from '@sberbusiness/triplex/components/Button/enums';
import {HintSrvIcon16} from '@sberbusiness/icons/HintSrvIcon16';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';
import './TooltipExample.less';

const [isOpen, setIsOpen] = React.useState(false);

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Checkbox checked={isOpen} setChecked={setIsOpen}>
            Open
        </ComponentControlPanel.Checkbox>
    </ComponentControlPanel>
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
