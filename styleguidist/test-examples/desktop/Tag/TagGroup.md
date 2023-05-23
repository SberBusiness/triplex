```jsx
import React, { useState } from 'react';
import {Tag} from '@sberbusiness/triplex/desktop/components/Tag/Tag';
import {TagGroup} from '@sberbusiness/triplex/desktop/components/Tag/TagGroup';
import {ETagSize} from '@sberbusiness/triplex/desktop/components/Tag/enums';
import {Row} from '@sberbusiness/triplex/desktop/components/Row/Row';
import {Col} from '@sberbusiness/triplex/desktop/components/Col/Col';
import {Input} from '@sberbusiness/triplex/desktop/components/Input/Input';
import {Divider} from '@sberbusiness/triplex/desktop/components/Divider/Divider';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';

const tagTitles = [
    'Значение',
    'Выбранное значение',
    'Выбранное значение длинное',
    'Выбранное значение очень длинное',
    'Выбранное значение очень длинное в данном случае',
];

const generateTags = (count) =>
    Array(...Array(count)).map((i, idx) => ({
        id: idx.toString(),
        value: `${tagTitles[idx % tagTitles.length]}`,
    }));

const tagsCount = 5;

const [editable, setEditable] = useState(false);
const [fixedWidth, setFixedWidth] = useState(false);
const [maxWidth, setMaxWidth] = useState(275);
const [tagsMd, setTagsMd] = useState(generateTags(tagsCount));
const [tagsSm, setTagsSm] = useState(generateTags(tagsCount));
const [input, setInput] = useState({});
const [title, setTitle] = useState('');

const checkboxOptions = [
    {
        id: 'editable',
        label: 'Editbale',
        checked: editable,
        onChange: setEditable,
    },
    {
        id: 'fixedWidth',
        label: 'Fixed width',
        checked: fixedWidth,
        onChange: setFixedWidth,
    },
];

const inputOptions = [
    {
        id: 'maxWidth',
        label: 'Max width',
        onChange: setMaxWidth,
        value: maxWidth || '',
    },
];

const handleEdit = (id) => {
    let tag = tagsMd.find((tag) => tag.id == id);

    setInput(tag);
    setTitle(tag.value);
};
const handleInputBlur = () => {
    input.value = title;
    setInput({});
};
const handleInputChange = (value) => setTitle(value);
const handleRemoveMd = (id) => setTagsMd(tagsMd.filter((tag) => tag.id !== id));
const handleRemoveSm = (id) => setTagsSm(tagsSm.filter((tag) => tag.id !== id));

<>
    <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions} />
    <ComponentPreview>
        <Row>
            <Col>MD</Col>
        </Row>
        <Row>
            <Col>
                <TagGroup size={ETagSize.MD}>
                    {tagsMd.map((tag, index) =>
                        tag !== input ? (
                            <Tag
                                key={index}
                                id={tag.id}
                                size={ETagSize.MD}
                                title={tag.value}
                                onRemove={handleRemoveMd}
                                onEdit={editable ? handleEdit : undefined}
                                maxWidth={fixedWidth ? maxWidth : undefined}
                            >
                                {tag.value}
                            </Tag>
                        ) : (
                            <div style={{'margin': '8px 6px'}}>
                                <Input
                                    value={title}
                                    onChange={(event) => handleInputChange(event.target.value)}
                                    onBlur={handleInputBlur}
                                    autoFocus
                                />
                            </div>
                        )
                    )}
                </TagGroup>
            </Col>
        </Row>
        <Row>
            <Col>SM</Col>
        </Row>
        <Row>
            <Col>
                <TagGroup size={ETagSize.SM}>
                    {tagsSm.map((tag, index) => (
                        <Tag
                            key={index}
                            id={tag.id}
                            size={ETagSize.SM}
                            title={tag.value}
                            onRemove={handleRemoveSm}
                            maxWidth={fixedWidth ? maxWidth : undefined}
                        >
                            {tag.value}
                        </Tag>
                    ))}
                </TagGroup>
            </Col>
        </Row>
    </ComponentPreview>
</>
```
