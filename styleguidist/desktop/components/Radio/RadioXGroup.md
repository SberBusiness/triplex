```jsx
import {Radio} from '@sberbusiness/triplex/desktop/components/Radio/Radio';

<RadioXGroup indent={12}>
    {[1, 2, 3].map((value, index) => (
        <Radio key={index} name="radioxgroup" value={value}>
            Шаблонный текст в 1 или
            <br />
            2-е строки, но не более
        </Radio>
    ))}
</RadioXGroup>
```
