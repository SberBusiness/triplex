```jsx
import {Radio} from '@sberbusiness/triplex/components/Radio/Radio';

<>
    <div id="id-RadioXGroup-label">Выберите вариант:</div><br />
    <RadioXGroup indent={12} aria-labelledby="id-RadioXGroup-label">
        {[1, 2, 3].map((value, index) => (
            <Radio key={index} name="radioxgroup" value={value}>
                {`Вариант - ${index + 1}`}
            </Radio>
        ))}
    </RadioXGroup>
</>
```
