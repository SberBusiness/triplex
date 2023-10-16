```jsx
import {Row} from '@sberbusiness/triplex/components/Row/Row';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {CheckboxYGroup} from '@sberbusiness/triplex/components/Checkbox/CheckboxYGroup';
import {Checkbox} from '@sberbusiness/triplex/components/Checkbox/Checkbox';
import {Tag} from '@sberbusiness/triplex/components/Tag/Tag';
import {ETagSize} from '@sberbusiness/triplex/components/Tag/enums';
import {Input} from '@sberbusiness/triplex/components/Input/Input';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

const [editable, setEditable] = React.useState(false);
const [fixedWidth, setFixedWidth] = React.useState(false);
const [removed, setRemoved] = React.useState([]);
const [maxWidth, setMaxWidth] = React.useState(120);
const [input, setInput] = React.useState(false);
const [title, setTitle] = React.useState('Выбранное значение');

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

const handleRemove = (id) => setRemoved([...removed, id]);
const handleEdit = () => setInput(true);
const handleInputBlur = () => setInput(false);
const handleInputChange = (value) => setTitle(value);

<>
    {renderControlPanel()}
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
