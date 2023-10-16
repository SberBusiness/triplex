```jsx
import * as iconsModule from '@sberbusiness/icons/AccentIndex';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {getIconsFromModule, renderIcon} from './utils.tsx';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';
import './styles.less';

const [active, setActive] = React.useState(false);
const [highlighted, setHighlighted] = React.useState(false);

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Checkbox checked={active} setChecked={setActive}>
            Active
        </ComponentControlPanel.Checkbox>
        <ComponentControlPanel.Checkbox checked={highlighted} setChecked={setHighlighted}>
            Dark background
        </ComponentControlPanel.Checkbox>
    </ComponentControlPanel>    
);

const className = classnames('icons-list', {highlighted});

const renderIconsComponents = () => getIconsFromModule(iconsModule).map((icon) => renderIcon(icon, {active}));

<>
    {renderControlPanel()}
    <div className={className}>{renderIconsComponents()}</div>
</>
```
