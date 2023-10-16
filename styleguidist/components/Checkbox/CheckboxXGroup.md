```jsx
import {Checkbox} from '@sberbusiness/triplex/components/Checkbox/Checkbox';

<>
    <div id="checkbox-x-group-label">Выберите вариант:</div>
    <br />
    <CheckboxXGroup aria-labelledby="checkbox-x-group-label">
        {[1, 2, 3].map((value, index) => (
            <Checkbox key={index} name="checkbox-x-group" value={value}>
                {`Вариант - ${index + 1}`}
            </Checkbox>
        ))}
    </CheckboxXGroup>
</>
```
