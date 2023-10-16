```jsx
import * as iconsModule from '@sberbusiness/illustrations/ScreenSystemIndex';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';
import {getIconsFromModule, renderIcon} from './utils.tsx';
import './styles.less';

const [highlighted, setHighlighted] = React.useState(false);

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Checkbox checked={highlighted} setChecked={setHighlighted}>
            Dark background
        </ComponentControlPanel.Checkbox>
    </ComponentControlPanel>
);

const className = classnames('icons-list', {highlighted});

const renderIconsComponents = () => getIconsFromModule(iconsModule).map(renderIcon);

<>
    {renderControlPanel()}
    <div className={className}>{renderIconsComponents()}</div>
</>
```
