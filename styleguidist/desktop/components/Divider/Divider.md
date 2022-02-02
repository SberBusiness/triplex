```jsx
import {Row} from '@sbbol/web-library/desktop/components/Row/Row';
import {Col} from '@sbbol/web-library/desktop/components/Col/Col';
import {Divider} from '@sbbol/web-library/desktop/components/Divider/Divider';

<>
    <span>Пример текста</span>
    <Row paddingBottom={false}>
        <Col size={4} offset={4}><Divider /></Col>
    </Row>
    <span>Пример текста</span>
    <Divider />
    <span>Пример текста</span>
</>
```