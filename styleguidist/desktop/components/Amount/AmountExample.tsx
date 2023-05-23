import React from 'react';
import {Col} from '@sberbusiness/triplex/desktop/components/Col/Col';
import {Amount} from '@sberbusiness/triplex/desktop/components/Amount/Amount';
import {Label} from '@sberbusiness/triplex/desktop/components/Label/Label';
import {Row} from '@sberbusiness/triplex/desktop/components/Row/Row';

const currencyTitle = 'Российские рубли';
const currency = 'RUB';

const data: IAmountTestData[] = [
    {title: 'Обычный', amountElement: <Amount key="amount" value="8967452.3145" currency={currency} currencyTitle={currencyTitle} />},
    {
        title: 'Без копеек',
        amountElement: <Amount value="8967452.31" fractionLength={0} currency={currency} currencyTitle={currencyTitle} />,
    },
    {
        title: 'С 4 знаками после разделителя',
        amountElement: <Amount value="8967452.31" fractionLength={4} currency={currency} currencyTitle={currencyTitle} />,
    },
    {title: 'Положительный', amountElement: <Amount value="+8967452.31" currency={currency} currencyTitle={currencyTitle} />},
    {title: 'Отрицательный', amountElement: <Amount value="-8967452.31" currency={currency} currencyTitle={currencyTitle} />},
    {title: 'Без валюты', amountElement: <Amount value="8967452.31" />},
    {
        title: 'Большая сумма (50 миллиардов)',
        amountElement: <Amount value="50000000000.31" currency={currency} currencyTitle={currencyTitle} />,
    },
    {
        title: 'Адаптивная большая сумма (50 миллиардов)',
        amountElement: <Amount value="50000000000.31" currency={currency} currencyTitle={currencyTitle} adaptive />,
    },
];

interface IAmountTestData {
    title: string;
    amountElement: JSX.Element;
}

export const AmountExample: React.FC = () => {
    const renderAmount = ({title, amountElement}: IAmountTestData, i: number) => (
        <Row key={i}>
            <Col size={4}>
                <Label>
                    <Label.Text>{title}</Label.Text>
                </Label>
            </Col>
            <Col size={4}>{amountElement}</Col>
        </Row>
    );

    return <span>{data.map(renderAmount)}</span>;
};
