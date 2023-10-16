```jsx
import {Row} from '@sberbusiness/triplex/components/Row/Row';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import ComponentPreview from '../../common/components/ComponentPreview/ComponentPreview';

const renderFilledDiv = (text, margin = '0px') => (
    <div
        style={{
            backgroundColor: '#FFD9A0',
            textAlign: 'center',
            margin: margin,
        }}
    >
        {text}
    </div>
);

<ComponentPreview>
    <Row>
        <Col>{renderFilledDiv('size не задан')}</Col>
    </Row>
    <Row>
        <Col>{renderFilledDiv('эти Col\'ы', '0px 0px 8px')}</Col>
        <Col>{renderFilledDiv('в одном', '0px 0px 8px')}</Col>
        <Col>{renderFilledDiv('Row')}</Col>
    </Row>
    <Row>
        <Col offset={4} size={8} offsetSm={3} sizeSm={9} offsetMd={2} sizeMd={10} offsetLg={1} sizeLg={11} offsetXl={0}
             sizeXl={12}>
            {renderFilledDiv('адаптивный')}
        </Col>
    </Row>
    <Row>
        <Col size={4}>{renderFilledDiv('col-4')}</Col>
        <Col size={8}>{renderFilledDiv('col-8')}</Col>
    </Row>
    <Row>
        <Col offset={3} size={6}>
            {renderFilledDiv('offset-3 size-6')}
        </Col>
    </Row>
</ComponentPreview>;
```
