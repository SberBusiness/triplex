```jsx
import {Row} from '@sberbusiness/triplex/components/Row/Row';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';

<div>
    {[4, 8, 12, 16, 24, 32, 64, 128].map((size, index) => (
        <Row key={index}>
            <Col size={3}>
                Высота {size}px
            </Col>
            <Col size={8}>
                <div style={{background: '#FFD9A0'}}>
                    <Gap size={size} />
                </div>
            </Col>
        </Row>
    ))}
</div>
```
