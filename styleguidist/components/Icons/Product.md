```jsx noeditor
import React, {useEffect, useState} from 'react';
import * as module from '@sberbusiness/icons/ProductIndex';
import {SVGPreview} from './components/SVGPreview';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

const [active, setActive] = React.useState(false);

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Checkbox checked={active} setChecked={setActive}>
            Active
        </ComponentControlPanel.Checkbox>
    </ComponentControlPanel>
);

<>
    {renderControlPanel()}
    <SVGPreview value={module} folder="icons" status={{active}} />
</>
```
