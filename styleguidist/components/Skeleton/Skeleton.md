### На светлом фоне

Размер скелетона определяет родительский контейнер.

```jsx
import {ESkeletonType, Skeleton} from '@sberbusiness/triplex/components/Skeleton/Skeleton';
import './skeleton.less';

<div className="skeleton-example">
    <div className="skeleton-example-left">
        <ul className="skeleton-example-list">
            <li><span><Skeleton /></span><div><Skeleton /></div></li>
            <li><span><Skeleton /></span><div><Skeleton /></div></li>
            <li><span><Skeleton /></span><div><Skeleton /></div></li>
            <li><span><Skeleton /></span><div><Skeleton /></div></li>
        </ul>
    </div>
    <div className="skeleton-example-right">
        <div className="skeleton-example-grid">
            <div><Skeleton /></div>
            <div><Skeleton /></div>
            <div><Skeleton /></div>
            <div><Skeleton /></div>
        </div>
    </div>
</div>
```

### На темном фоне

Размер скелетона определяет родительский контейнер.

```jsx
import {ESkeletonType, Skeleton} from '@sberbusiness/triplex/components/Skeleton/Skeleton';
import './skeleton.less';

<div className="skeleton-example-gray">
    <div className="skeleton-example-grid">
        <div><Skeleton type={ESkeletonType.LIGHT} /></div>
        <div><Skeleton type={ESkeletonType.LIGHT} /></div>
        <div><Skeleton type={ESkeletonType.LIGHT} /></div>
        <div><Skeleton type={ESkeletonType.LIGHT} /></div>
    </div>
</div>
```

### Произвольный размер

Размер скелетона определяет переданный className.

```jsx
import {ESkeletonType, Skeleton} from '@sberbusiness/triplex/components/Skeleton/Skeleton';
import './skeleton.less';

<Skeleton className="skeleton-custom-size" />
```
