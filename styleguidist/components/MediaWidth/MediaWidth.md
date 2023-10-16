### Позволяет отображать элементы, в зависимости от ширины окна браузера.

Брейкпоинты - https://getbootstrap.com/docs/5.0/layout/breakpoints/.

```jsx
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
});

<ComponentControlPanel>
    <ComponentControlPanel.Text value={`${windowWidth}px`} readOnly>
        Текущая ширина экрана:
    </ComponentControlPanel.Text>
</ComponentControlPanel>
```

#### Контент переключается между мобильной (< 768px) и десктоп (>= 768px) версиями. Реализация на компоненте MediaWidth.
```jsx
import {EScreenWidth} from '@sberbusiness/triplex/enums/EScreenWidth';
import {MediaWidth} from '@sberbusiness/triplex/components/MediaWidth/MediaWidth';

<MediaWidth maxWidth={EScreenWidth.SM_MAX} fallback={<div>Декстоп контент.</div>}>
    <div>Мобильный контент.</div>
</MediaWidth>
```

#### Контент переключается между мобильной (< 768px) и десктоп (>= 768px) версиями. Реализация на компоненте MobileView.
```jsx
import {MobileView} from '@sberbusiness/triplex/components/MobileView/MobileView';

<MobileView fallback={<div>Декстоп контент.</div>}>
    <div>Мобильный контент.</div>
</MobileView>
```

#### Контент меняется при разрешении от 576px до 991px.
```jsx
import {EScreenWidth} from '@sberbusiness/triplex/enums/EScreenWidth';
import {MediaWidth} from '@sberbusiness/triplex/components/MediaWidth/MediaWidth';

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
import {EScreenWidth} from '@sberbusiness/triplex/enums/EScreenWidth';
import {MediaWidth} from '@sberbusiness/triplex/components/MediaWidth/MediaWidth';

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
