Реализация частично копирует <a href="https://getbootstrap.com/docs/5.0/layout/grid/#grid-options">bootstrap grid</a>.

```jsx
import {Row} from '@sberbusiness/triplex/components/Row/Row';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';

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
    <div>Size не задан.</div>
    <Row>
        <Col>{renderFilledDiv('100% ширины')}</Col>
    </Row>

    <div>
        Колонки с шириной 4 и 8.
    </div>
    <Row>
        <Col size={4}>{renderFilledDiv('col-4')}</Col>
        <Col size={8}>{renderFilledDiv('col-8')}</Col>
    </Row>

    <div>Несколько строк в одном Row.</div>
    <Row>
        <Col>
            <>
                {renderFilledDiv('100% ширины')}
                <Gap size={4} />
            </>
        </Col>
        <Col>
            <>
                {renderFilledDiv('100% ширины')}
                <Gap size={4} />
            </>
        </Col>
        <Col>
            <>
                {renderFilledDiv('100% ширины')}
            </>
        </Col>
    </Row>

    <div>
        Колонка шириной 6 и отступом слева 3.
    </div>
    <Row>
        <Col offset={3} size={6}>
            {renderFilledDiv('offset-3 size-6')}
        </Col>
    </Row>

    <div>
        Адаптивные колонки, размером 6 и 6.<br />
        SM - 5 и 7<br />
        MD - 4 и 6<br />
        LG - 3 и 9<br />
        XL - 2 и 10<br />
    </div>
    <Row>
        <Col size={6} sizeSm={5}  sizeMd={4}  sizeLg={3}  sizeXl={2}>
            {renderFilledDiv('left')}
        </Col>
        <Col size={6} sizeSm={7}  sizeMd={8}  sizeLg={9}  sizeXl={10}>
            {renderFilledDiv('right')}
        </Col>
    </Row>

    <div>
        Средняя колонка скрывается на разрашениях {'<'} 768px.
    </div>
    <Row>
        <Col size={6} sizeMd={4}>
            {renderFilledDiv('size-6 size-md-4')}
        </Col>
        <Col sizeMd={4} hidden blockMd>
            {renderFilledDiv('size-md-4')}
        </Col>
        <Col size={6} sizeMd={4}>
            {renderFilledDiv('size-6  size-md-4')}
        </Col>
    </Row>
</>;
```
