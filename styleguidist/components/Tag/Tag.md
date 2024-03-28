```jsx
import {ETagSize} from '@sberbusiness/triplex/components/Tag/enums';

const handleRemove = () => alert('Remove handler called.');

<Tag size={ETagSize.MD} title="Выбранное значение" onRemove={handleRemove}>
    Выбранное значение
</Tag>
```


### Editable

```jsx
import {ETagSize} from '@sberbusiness/triplex/components/Tag/enums';
import {Input} from '@sberbusiness/triplex/components/Input/Input';

const [label, setLabel] = React.useState('Выбранное значение');
const [editMode, setEditMode] = React.useState(false);

const handleRemove = () => alert('Remove handler called.');
const handleEdit = () => setEditMode(true);

<>
    {!editMode ? (
        <Tag size={ETagSize.MD} title="Выбранное значение" onRemove={handleRemove} onEdit={handleEdit}>
            {label}
        </Tag>
    ) : (
        <Input
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            onBlur={() => setEditMode(false)}
            autoFocus
        />
    )}
</>
```
