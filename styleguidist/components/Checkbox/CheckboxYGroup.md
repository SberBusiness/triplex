```jsx
import {Checkbox} from '@sberbusiness/triplex/components/Checkbox/Checkbox';

<>
    <div id="checkbox-y-group-label">Выберите вариант:</div>
    <br />
    <CheckboxYGroup aria-labelledby="checkbox-y-group-label">
        {[1, 2, 3].map((value, index) => (
            <Checkbox key={index} name="checkbox-y-group" value={value}>
                {`Вариант - ${index + 1}`}
            </Checkbox>
        ))}
    </CheckboxYGroup>
</>
```
