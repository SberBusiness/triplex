```jsx
import {Radio} from '@sberbusiness/triplex/components/Radio/Radio';

<>
    <div id="id-RadioYGroup-label">Выберите вариант:</div><br />
    <RadioYGroup aria-labelledby="id-RadioYGroup-label">
        {[1, 2, 3].map((value, index) => (
            <Radio key={index} name="radioygroup" value={value}>
                {`Вариант - ${index + 1}`}
            </Radio>
        ))}
    </RadioYGroup>
</>
```
