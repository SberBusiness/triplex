```jsx
import React, {useState} from 'react';
import * as iconsModule from '@sberbusiness/icons/ProductIndex';
import {Checkbox} from '@sbbol/web-library/desktop/components/Checkbox/Checkbox';
import {getIconsFromModule, renderIcon} from './utils.tsx';
import './styles.less';

const [highlighted, setHighlighted] = useState(false);

const handleChange = () => {
    setHighlighted(!highlighted);
};

const iconsClassName = `icons-list${highlighted ? ' highlighted' : ''}`;

const renderIconsComponents = () =>
    getIconsFromModule(iconsModule).map(renderIcon);

<>
    <Checkbox onChange={handleChange} checked={highlighted}>Темная подложка</Checkbox>
    <div className={iconsClassName}>{renderIconsComponents()}</div>
</>
```