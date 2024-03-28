```jsx
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {Notification} from '@sberbusiness/triplex/components/Notification/Notification';
import {NotificationwarningStsIcon20} from '@sberbusiness/icons/NotificationwarningStsIcon20';

const closeNotification = () => alert('Обработчик закрытия нотификации');

<>
    <Notification>
        <Notification.Icon>
            <NotificationwarningStsIcon20 />
        </Notification.Icon>
        <Notification.Body>
            <Notification.Body.Content>
                Максимальное количество символов ― 160. Если не достаточно, то вариант со списком.
            </Notification.Body.Content>
        </Notification.Body>
        <Notification.Close onClick={closeNotification} />
    </Notification>

    <Gap size={8} />

    <Notification>
        <Notification.Icon>
            <NotificationwarningStsIcon20 />
        </Notification.Icon>
        <Notification.Body>
            <Notification.Body.Content>
                Максимальное количество символов ― 420. Сюда входят все текстовые элементы, в том числе и
                строки списка. В списке мб столько пунктов, сколько укладывается в 420 символов. Список
                опционален.
            </Notification.Body.Content>
            <Notification.Body.List
                values={['Пункт из списка', 'Пункт из списка', 'Пункт из списка', 'Пункт из списка']}
            />
        </Notification.Body>
        <Notification.Close onClick={closeNotification} />
    </Notification>
</>
```
