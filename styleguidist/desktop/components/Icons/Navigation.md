```jsx
import * as iconsModule from '@sberbusiness/icons/NavigationIndex';
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {getIconsFromModule, renderIcon} from './utils.tsx';
import './styles.less';

const [highlighted, setHighlighted] = React.useState(false);
const [active, setActive] = React.useState(false);
const [disabled, setDisabled] = React.useState(false);

const renderControlPanel = () => (
    <ExampleControlPanel>
        <input type="checkbox" checked={highlighted} onChange={(event) => setHighlighted(event.target.checked)} data-label="Dark background" />
        <input type="checkbox" checked={active} onChange={(event) => setActive(event.target.checked)} data-label="Active" />
        <input type="checkbox" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} data-label="Disabled" />
    </ExampleControlPanel>
);

const className = classnames('icons-list', {highlighted});

const renderIconsComponents = () => getIconsFromModule(iconsModule).map((icon) => renderIcon(icon, {active, disabled}));

<>
    {renderControlPanel()}
    <div className={className}>{renderIconsComponents()}</div>
</>
```
