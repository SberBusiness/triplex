```jsx
import React, {useState} from 'react';
import {Row} from '@sberbusiness/triplex/components/Row/Row';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {Tag} from '@sberbusiness/triplex/components/Tag/Tag';
import {ETagSize} from '@sberbusiness/triplex/components/Tag/enums';
import {Input} from '@sberbusiness/triplex/components/Input/Input';
import ComponentOptions from '../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../common/components/ComponentPreview/ComponentPreview';

const [editable, setEditable] = useState(false);
const [fixedWidth, setFixedWidth] = useState(false);
const [removed, setRemoved] = useState([]);
const [maxWidth, setMaxWidth] = useState(120);
const [input, setInput] = useState(false);
const [title, setTitle] = useState('Выбранное значение');

const handleRemove = (id) => setRemoved([...removed, id]);
const handleEdit = () => setInput(true);
const handleInputBlur = () => setInput(false);
const handleInputChange = (value) => setTitle(value);

const inputOptions = [
    {
        id: 'maxWidth',
        label: 'Max width',
        value: maxWidth || '',
        onChange: setMaxWidth,
    },
];

const checkboxOptions = [
    {
        id: 'editable',
        label: 'Editable',
        checked: editable,
        onChange: setEditable,
    },
    {
        id: 'fixedWidth',
        label: 'Fixed Width',
        checked: fixedWidth,
        onChange: setFixedWidth,
    },
];

<>
    <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions}/>
    <ComponentPreview>
        <Row>
            <Col>MD</Col>
        </Row>
        <Row>
            <Col>
                {!removed.includes('md') ? (
                    !input ? (
                        <Tag
                            id="md"
                            size={ETagSize.MD}
                            title={title}
                            onRemove={handleRemove}
                            maxWidth={fixedWidth ? maxWidth : undefined}
                            onEdit={editable ? handleEdit : undefined}
                        >
                            {title}
                        </Tag>
                    ) : (
                        <div>
                            <Input
                                value={title}
                                onChange={(event) => handleInputChange(event.target.value)}
                                onBlur={handleInputBlur}
                                autoFocus
                            />
                        </div>
                    )
                ) : null}
            </Col>
        </Row>
        <Row>
            <Col>SM</Col>
        </Row>
        <Row>
            <Col>
                {!removed.includes('sm') ? (
                    <Tag
                        id="sm"
                        size={ETagSize.SM}
                        title="Выбранное значение"
                        onRemove={handleRemove}
                        maxWidth={fixedWidth ? maxWidth : undefined}
                    >
                        Выбранное значение
                    </Tag>
                ) : null}
            </Col>
        </Row>
    </ComponentPreview>
</>
```
