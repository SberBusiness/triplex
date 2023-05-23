```jsx
import * as iconsModule from '@sberbusiness/illustrations/ScreenMarketIndex';
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {getIconsFromModule, renderIcon} from './utils.tsx';
import './styles.less';

const [highlighted, setHighlighted] = React.useState(false);

const renderControlPanel = () => (
    <ExampleControlPanel>
        <input type="checkbox" checked={highlighted} onChange={(event) => setHighlighted(event.target.checked)} data-label="Dark background" />
    </ExampleControlPanel>
);

const className = classnames('icons-list', {highlighted});

const renderIconsComponents = () => getIconsFromModule(iconsModule).map(renderIcon);

<>
    {renderControlPanel()}
    <div className={className}>{renderIconsComponents()}</div>
</>
```
