```jsx
import {Tag} from '@sberbusiness/triplex/components/Tag/Tag';
import {ETagSize} from '@sberbusiness/triplex/components/Tag/enums';

const items = [
    {id: 'tag-group-item-1', title: 'Значение'},
    {id: 'tag-group-item-2', title: 'Выбранное значение'},
    {id: 'tag-group-item-3', title: 'Выбранное значение длинное'},
    {id: 'tag-group-item-4', title: 'Выбранное значение очень длинное'},
    {id: 'tag-group-item-5', title: 'Выбранное значение очень длинное в данном случае'},
];

const handleRemove = () => alert('Remove handler called.');

<TagGroup size={ETagSize.MD}>
    {items.map(({id, title}) => (
        <Tag key={id} id={id} size={ETagSize.MD} title={title} onRemove={handleRemove} maxWidth={275}>
            {title}
        </Tag>
    ))}
</TagGroup>
```

### Small size

```jsx
import {Tag} from '@sberbusiness/triplex/components/Tag/Tag';
import {ETagSize} from '@sberbusiness/triplex/components/Tag/enums';

const items = [
    {id: 'tag-group-item-1', title: 'Значение'},
    {id: 'tag-group-item-2', title: 'Выбранное значение'},
    {id: 'tag-group-item-3', title: 'Выбранное значение длинное'},
    {id: 'tag-group-item-4', title: 'Выбранное значение очень длинное'},
    {id: 'tag-group-item-5', title: 'Выбранное значение очень длинное в данном случае'},
];

const handleRemove = () => alert('Remove handler called.');

<TagGroup size={ETagSize.SM}>
    {items.map(({id, title}) => (
        <Tag key={id} id={id} size={ETagSize.SM} title={title} onRemove={handleRemove} maxWidth={275}>
            {title}
        </Tag>
    ))}
</TagGroup>
```
