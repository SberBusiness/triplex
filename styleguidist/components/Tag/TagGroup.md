```jsx
import {Row} from '@sberbusiness/triplex/components/Row/Row';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {CheckboxYGroup} from '@sberbusiness/triplex/components/Checkbox/CheckboxYGroup';
import {Checkbox} from '@sberbusiness/triplex/components/Checkbox/Checkbox';
import {Tag} from '@sberbusiness/triplex/components/Tag/Tag';
import {TagGroup} from '@sberbusiness/triplex/components/Tag/TagGroup';
import {ETagSize} from '@sberbusiness/triplex/components/Tag/enums';
import {Input} from '@sberbusiness/triplex/components/Input/Input';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

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

const [editable, setEditable] = React.useState(false);
const [fixedWidth, setFixedWidth] = React.useState(false);
const [maxWidth, setMaxWidth] = React.useState(275);
const [tagsMd, setTagsMd] = React.useState(generateTags(tagsCount));
const [tagsSm, setTagsSm] = React.useState(generateTags(tagsCount));
const [input, setInput] = React.useState({});
const [title, setTitle] = React.useState('');

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Checkbox checked={editable} setChecked={setEditable}>
            Editable
        </ComponentControlPanel.Checkbox>
        <ComponentControlPanel.Checkbox checked={fixedWidth} setChecked={setFixedWidth}>
            Fixed width
        </ComponentControlPanel.Checkbox>
        <ComponentControlPanel.Number
            value={maxWidth}
            setValue={setMaxWidth}
            disabled={!fixedWidth}
        >
            Max width
        </ComponentControlPanel.Number>
    </ComponentControlPanel>
);

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
    {renderControlPanel()}
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
</>
```
