import React, {useState} from 'react';
import * as module from '@sberbusiness/icons/NavigationIndex';
import {SVGPreview} from '../../common/components/SVGPreview/SVGPreview';
import {ComponentControlPanel} from '../../common/components/ComponentControlPanel/ComponentControlPanel';

const [active, setActive] = useState(false);
const [disabled, setDisabled] = useState(false);

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Checkbox checked={active} setChecked={setActive}>
            Active
        </ComponentControlPanel.Checkbox>
        <ComponentControlPanel.Checkbox checked={disabled} setChecked={setDisabled}>
            Disabled
        </ComponentControlPanel.Checkbox>
    </ComponentControlPanel>
);

<>
    {renderControlPanel()}
    <SVGPreview value={module} folder="icons" status={{active, disabled}} />
</>