### Позволяет отображать элементы, в зависимости от ширины окна браузера.

Брейкпоинты - https://getbootstrap.com/docs/5.0/layout/breakpoints/.

```jsx
import React, {useEffect, useState} from 'react';

const [windowWidth, setWindowWidth] = useState(window.innerWidth);

useEffect(() => {
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
});

<div>
    Текущая ширина экрана: <input value={`${windowWidth}px`} readOnly />
</div>
```

#### Контент переключается между мобильной (< 768px) и десктоп (>= 768px) версиями. Реализация на компоненте MediaWidth.
```jsx
import {EScreenWidth} from '@sberbusiness/triplex/common/enums/EScreenWidth';
import {MediaWidth} from '@sberbusiness/triplex/desktop/components/MediaWidth/MediaWidth';

<MediaWidth maxWidth={EScreenWidth.SM_MAX} fallback={<div>Декстоп контент.</div>}>
    <div>Мобильный контент.</div>
</MediaWidth>
```

#### Контент переключается между мобильной (< 768px) и десктоп (>= 768px) версиями. Реализация на компоненте MobileView.
```jsx
import {MobileView} from '@sberbusiness/triplex/desktop/components/MobileView/MobileView';

<MobileView fallback={<div>Декстоп контент.</div>}>
    <div>Мобильный контент.</div>
</MobileView>
```

#### Контент меняется при разрешении от 576px до 991px.
```jsx
import {EScreenWidth} from '@sberbusiness/triplex/common/enums/EScreenWidth';
import {MediaWidth} from '@sberbusiness/triplex/desktop/components/MediaWidth/MediaWidth';

<MediaWidth
    minWidth={EScreenWidth.SM_MIN}
    maxWidth={EScreenWidth.MD_MAX}
    fallback={<div>Контент за пределами разрешения от 576px до 991px.</div>}
>
    <div>Контент в пределах от 576px до 991px.</div>
</MediaWidth>
```

#### Контент меняется в зависимость от брейкпоинта XS, SM, MD.
```jsx
import {EScreenWidth} from '@sberbusiness/triplex/common/enums/EScreenWidth';
import {MediaWidth} from '@sberbusiness/triplex/desktop/components/MediaWidth/MediaWidth';

<MediaWidth
    minWidth={EScreenWidth.SM_MIN}
    maxWidth={EScreenWidth.SM_MAX}
    fallback={
        <MediaWidth minWidth={EScreenWidth.MD_MIN} fallback={<div>Контент XS брейкпоинта - {'<576px'}.</div>}>
            <div>Контент MD брейкпоинта - {'≥768px'}.</div>
        </MediaWidth>
    }
>
    <div>Контент SM брейкпоинта - {'≥576px'}.</div>
</MediaWidth>
```
