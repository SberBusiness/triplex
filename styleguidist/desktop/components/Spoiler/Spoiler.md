### Spoiler Basic

```jsx
import React from 'react';
import {Col} from '@sberbusiness/triplex/desktop/components/Col/Col';
import {Field} from '@sberbusiness/triplex/desktop/components/Field/Field';
import {SubRow} from '@sberbusiness/triplex/desktop/components/SubRow/SubRow';
import {SubLabel} from '@sberbusiness/triplex/desktop/components/SubLabel/SubLabel';
import {SubValue} from '@sberbusiness/triplex/desktop/components/SubValue/SubValue';

const renderSubRow = (label, index) => {
    return (
        <SubRow key={index}>
            <Col>
                <Field alignLabel>
                    <Col size={2}>
                        <SubLabel>{label}</SubLabel>
                    </Col>
                    <Col size={2}>
                        <SubValue>{label}</SubValue>
                    </Col>
                </Field>
            </Col>
        </SubRow>
    );
};

const renderSpoilerContent = (count) => Array(count).fill().map((value, index) => renderSubRow('Текст в 1 строку', index));

<>
    <Spoiler labelExpand="Развернуть" labelCollapse="Свернуть">
        {renderSpoilerContent(4)}
    </Spoiler>
</>
```

### Spoiler Controlled

```jsx
import React, {useState} from 'react';
import {Col} from '@sberbusiness/triplex/desktop/components/Col/Col';
import {Field} from '@sberbusiness/triplex/desktop/components/Field/Field';
import {SubRow} from '@sberbusiness/triplex/desktop/components/SubRow/SubRow';
import {SubLabel} from '@sberbusiness/triplex/desktop/components/SubLabel/SubLabel';
import {SubValue} from '@sberbusiness/triplex/desktop/components/SubValue/SubValue';

const [expanded, setExpanded] = useState(false);

const renderSubRow = (label, index) => {
    return (
        <SubRow key={index}>
            <Col>
                <Field alignLabel>
                    <Col size={2}>
                        <SubLabel>{label}</SubLabel>
                    </Col>
                    <Col size={2}>
                        <SubValue>{label}</SubValue>
                    </Col>
                </Field>
            </Col>
        </SubRow>
    );
};

const renderSpoilerContent = (count) => Array(count).fill().map((value, index) => renderSubRow('Текст в 1 строку', index));

const handleChange = (event) => setExpanded(event.target.checked);

const renderControls = () => {
    return (
        <div style={{marginBottom: '16px'}}>
            <label style={{display: 'flex'}}>
                <input type="checkbox" checked={expanded} onChange={handleChange} />
                Expanded
            </label>
        </div>
    );
};

<>
    {renderControls()}
    <Spoiler labelExpand="Развернуть" labelCollapse="Свернуть" expanded={expanded} toggle={setExpanded}>
        {renderSpoilerContent(4)}
    </Spoiler>
</>
```
