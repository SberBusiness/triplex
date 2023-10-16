```jsx
import {MarkerStatus} from '@sberbusiness/triplex/components/MarkerStatus/MarkerStatus';
import {EMarkerStatus} from '@sberbusiness/triplex/components/Marker/enums';

<>
    <MarkerStatus status={EMarkerStatus.SUCCESS} description="Пояснения к статусу">
        Исполнено
    </MarkerStatus>
    <br />
    <MarkerStatus status={EMarkerStatus.ERROR} description="Пояснения к статусу">
        Ошибка
    </MarkerStatus>
    <br />
    <MarkerStatus status={EMarkerStatus.WARNING} description="Пояснения к статусу">
        Важное
    </MarkerStatus>
    <br />
    <MarkerStatus status={EMarkerStatus.WAITING} description="Пояснения к статусу">
        Ожидание
    </MarkerStatus>
</>
```
