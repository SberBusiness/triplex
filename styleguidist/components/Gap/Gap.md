```jsx
import {Page} from '@sberbusiness/triplex/components/Page/Page';
import {Row} from '@sberbusiness/triplex/components/Row/Row';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {Label} from '@sberbusiness/triplex/components/Label/Label';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';

<Page.Body>
    {[4, 8, 12, 16, 24, 32, 64, 128].map((size, index) => (
        <Row key={index}>
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
