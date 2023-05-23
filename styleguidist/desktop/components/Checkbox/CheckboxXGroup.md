```jsx
import {Checkbox} from '@sberbusiness/triplex/desktop/components/Checkbox/Checkbox';

<CheckboxXGroup indent={12}>
    {[1, 2, 3].map((value, index) => (
        <Checkbox key={index} name="checkboxxgroup" value={value}>
            Шаблонный текст в 1 или
            <br />
            2-е строки, но не более
        </Checkbox>
    ))}
</CheckboxXGroup>
```
