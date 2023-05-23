```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency 
    componentTitle="Gap"
    isMobileComponent={false} 
/>
```

```jsx
import {Row} from '@sberbusiness/triplex/desktop/components/Row/Row';
import {Col} from '@sberbusiness/triplex/desktop/components/Col/Col';
import {Label} from '@sberbusiness/triplex/desktop/components/Label/Label';
import {Page} from '@sberbusiness/triplex/desktop/components/Page/Page';
import {Gap} from '@sberbusiness/triplex/desktop/components/Gap/Gap';

<Page.Body>
    {[4, 8, 12, 16, 24, 32, 64, 128].map(size => (
        <Row>
            <Col size={3}>
                <Label>
                    <Label.Text>Высота {size}px</Label.Text>
                </Label>
            </Col>
            <Col size={8}>
                <div style={{background: '#FFD9A0'}}>
                    <Gap size={size} />
                </div>
            </Col>
        </Row>
    ))}
</Page.Body>
```