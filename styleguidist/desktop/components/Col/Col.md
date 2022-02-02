```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';
<ComponentStylesDependency componentTitle="Col" isMobileComponent={false} />;
```

```jsx
import {Row} from '@sbbol/web-library/desktop/components/Row/Row';
import {Col} from '@sbbol/web-library/desktop/components/Col/Col';
import {Gap} from '@sbbol/web-library/desktop/components/Gap/Gap';

const renderFilledDiv = (text) => (
    <div
        style={{
            background: '#FFD9A0',
            textAlign: 'center',
        }}
    >
        {text}
    </div>
);

<>
    <span>
        Реализация частично копирует <a href="https://getbootstrap.com/docs/5.0/layout/grid/#grid-options">bootstrap grid</a>
    </span>
    <br />
    <Row>
        <Col>{renderFilledDiv('size не задан')}</Col>
    </Row>
    <Row>
        <Col>
            <>
                {renderFilledDiv('эти Col\'ы')}
                <Gap size={4} />
            </>
        </Col>
        <Col>
            <>
                {renderFilledDiv('в одном')}
                <Gap size={4} />
            </>
        </Col>
        <Col>
            <>
                {renderFilledDiv('Row')}
            </>
        </Col>
    </Row>
    <Row>
        <Col offset={4} size={8} offsetSm={3} sizeSm={9} offsetMd={2} sizeMd={10} offsetLg={1} sizeLg={11} offsetXl={0} sizeXl={12}>
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
</>;
```
