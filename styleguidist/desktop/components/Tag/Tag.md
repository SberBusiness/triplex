```jsx
import React, { useState } from 'react';
import {Row} from '@sberbusiness/triplex/desktop/components/Row/Row';
import {Col} from '@sberbusiness/triplex/desktop/components/Col/Col';
import {CheckboxYGroup} from '@sberbusiness/triplex/desktop/components/Checkbox/CheckboxYGroup';
import {Checkbox} from '@sberbusiness/triplex/desktop/components/Checkbox/Checkbox';
import {Tag} from '@sberbusiness/triplex/desktop/components/Tag/Tag';
import {ETagSize} from '@sberbusiness/triplex/desktop/components/Tag/enums';
import {Input} from '@sberbusiness/triplex/desktop/components/Input/Input';

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

<>
    <Row>
        <Col>
            <CheckboxYGroup>
                <Checkbox checked={editable} onChange={() => setEditable(!editable)}>
                    Editable
                </Checkbox>
                <Checkbox checked={fixedWidth} onChange={() => setFixedWidth(!fixedWidth)}>
                    Fixed width
                </Checkbox>
            </CheckboxYGroup>
        </Col>
    </Row>
    <Row>
        <Col size={4}>
            <label htmlFor="width">Max width:</label>
            <Input id="width" value={maxWidth} onChange={(event) => setMaxWidth(event.target.value)} disabled={!fixedWidth} />
        </Col>
    </Row>
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
</>
```