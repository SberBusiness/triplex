```jsx
import {Checkbox} from '@sberbusiness/triplex/desktop/components/Checkbox/Checkbox';

<CheckboxYGroup>
    {[1, 2, 3].map((value, index) => (
        <Checkbox key={index} name="checkboxygroup" value={value}>
            Шаблонный текст в 1 или
            <br />
            2-е строки, но не более
        </Checkbox>
    ))}
</CheckboxYGroup>
```
