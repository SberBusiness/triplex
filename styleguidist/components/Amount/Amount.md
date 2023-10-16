```jsx
import {Row} from '@sberbusiness/triplex/components/Row/Row';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {Label} from '@sberbusiness/triplex/components/Label/Label';

const commonProps = {currency: 'RUB', currencyTitle: 'Российские рубли'};

const data = [
    {
        title: 'Обычный',
        element: <Amount value="8967452.3145" {...commonProps} />,
    },
    {
        title: 'Без копеек',
        element: <Amount value="8967452.31" fractionLength={0} {...commonProps} />,
    },
    {
        title: 'С 4 знаками после разделителя',
        element: <Amount key="2" value="8967452.31" fractionLength={4} {...commonProps} />,
    },
    {
        title: 'Положительный',
        element: <Amount value="+8967452.31" {...commonProps} />,
    },
    {
        title: 'Отрицательный',
        element: <Amount value="-8967452.31" {...commonProps} />,
    },
    {
        title: 'Без валюты',
        element: <Amount value="8967452.31" />,
    },
    {
        title: 'Большая сумма (50 миллиардов)',
        element: <Amount value="50000000000.31" {...commonProps} />,
    },
    {
        title: 'Адаптивная большая сумма (50 миллиардов)',
        element: <Amount value="50000000000.31" {...commonProps} adaptive />
    },
];

<>
    {data.map(({title, element}, index) => (
        <Row key={index}>
            <Col size={4}>
                <Label>
                    <Label.Text>{title}</Label.Text>
                </Label>
            </Col>
            <Col size={4}>{element}</Col>
        </Row>
    ))}
</>
```
