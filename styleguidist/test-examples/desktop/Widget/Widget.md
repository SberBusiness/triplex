
```jsx noeditor
import React, { useState } from 'react';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import {WidgetExample} from './WidgetExample';

const [showHeaderControls, setShowHeaderControls] = useState(false)
const [isOpen, setIsOpen] = useState(false)
const [isStatic, setIsStatic] = useState(false)

const checkboxOptions = [
    {
        id: 'showHeaderControls',
        label: 'Действия в заголовке',
        checked: showHeaderControls,
        onChange: setShowHeaderControls
    }, {
        id: 'isOpen',
        hidden: true,
        label: 'Opened',
        checked: isOpen,
        onChange: setIsOpen
    }, {
        id: 'isStatic',
        label: 'Static',
        checked: isStatic,
        onChange: setIsStatic
    },
];

<>
    <ComponentOptions checkboxOptions={checkboxOptions} />

    <ComponentPreview>
        <WidgetExample isOpen={isOpen} toggle={setIsOpen} showFooter showHeaderControls={showHeaderControls} isStatic={isStatic} />
    </ComponentPreview>
</>
```
