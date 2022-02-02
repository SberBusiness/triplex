```jsx
import React, { useState } from 'react';
import {Row} from '@sbbol/web-library/desktop/components/Row/Row';
import {Col} from '@sbbol/web-library/desktop/components/Col/Col';
import {Label} from '@sbbol/web-library/desktop/components/Label/Label';
import {Field} from '@sbbol/web-library/desktop/components/Field/Field';
import {Amount} from '@sbbol/web-library/desktop/components/Amount/Amount';
import './styles.less';

const currencyTitle = 'Российские рубли';
const currency = 'RUB';
const [amountValue, handleChange] = useState('');

<>
    <Row>
        <Col>
            <Field alignLabel>
                <Col size={3}>
                    <Label>
                        <Label.Text>Default</Label.Text>
                    </Label>
                </Col>
                <Col size={4}>
                    <AmountInput
                        value={amountValue}
                        onChange={handleChange}
                        currency={currency}
                        data-test-id="default"
                    />
                </Col>
            </Field>
        </Col>
    </Row>

    <Row>
        <Col>
            <Field alignLabel>
                <Col size={3}>
                    <Label>
                        <Label.Text>4 characters limit</Label.Text>
                    </Label>
                </Col>
                <Col size={4}>
                    <AmountInput
                        value={amountValue}
                        onChange={handleChange}
                        currency={currency}
                        data-test-id="4chars"
                        maxLength={4}
                    />
                </Col>
            </Field>
        </Col>
    </Row>

    <Row>
        <Col>
            <Field alignLabel>
                <Col size={3}>
                    <Label>
                        <Label.Text>4 decimal places</Label.Text>
                    </Label>
                </Col>
                <Col size={4}>
                    <AmountInput
                        value={amountValue}
                        onChange={handleChange}
                        currency={currency}
                        data-test-id="4decimals"
                        fractionLength={4}
                    />
                </Col>
            </Field>
        </Col>
    </Row>

    <Row>
        <Col>
            <Field alignLabel>
                <Col size={3}>
                    <Label>
                        <Label.Text>Integer</Label.Text>
                    </Label>
                </Col>
                <Col size={4}>
                    <AmountInput
                        value={amountValue}
                        onChange={handleChange}
                        currency={currency}
                        data-test-id="integer"
                        fractionLength={0}
                    />
                </Col>
            </Field>
        </Col>
    </Row>

    <Row>
        <Col>
            <Field alignLabel>
                <Col size={3}>
                    <Label>
                        <Label.Text>Error</Label.Text>
                    </Label>
                </Col>
                <Col size={4}>
                    <AmountInput
                        value={amountValue}
                        onChange={handleChange}
                        currency={currency}
                        data-test-id="error"
                        error
                    />
                </Col>
            </Field>
        </Col>
    </Row>

    <Row>
        <Col>
            <Field alignLabel>
                <Col size={3}>
                    <Label>
                        <Label.Text>Disabled</Label.Text>
                    </Label>
                </Col>
                <Col size={4}>
                    <AmountInput
                        value={amountValue}
                        onChange={handleChange}
                        currency={currency}
                        data-test-id="disabled"
                        disabled
                    />
                </Col>
            </Field>
        </Col>
    </Row>

    <Row>
        <Col>
            <Field alignLabel>
                <Col size={3}>
                    <Label>
                        <Label.Text>Currency range</Label.Text>
                    </Label>
                </Col>
                <Col size={4}>
                    <div className="ammount-range">
                        <div className="amount">
                            <AmountInput
                                value={amountValue}
                                onChange={handleChange}
                                currency={currency}
                                data-test-id="min"
                            />
                        </div>
                        <div className="dash">—</div>
                        <div className="amount">
                            <AmountInput
                                value={amountValue}
                                onChange={handleChange}
                                currency={currency}
                                data-test-id="max"
                            />
                        </div>
                    </div>
                </Col>
            </Field>
        </Col>
    </Row>

    <Row>
        <Col>
            <Field>
                <Col size={3}>
                    <Label>
                        <Label.Text>Return value</Label.Text>
                    </Label>
                </Col>
                <Col size={4}>
                    <Amount
                        value={amountValue}
                        fractionLength={4}
                        currency={currency}
                        currencyTitle={currencyTitle}
                        data-test-id="return"
                    />
                </Col>
            </Field>
        </Col>
    </Row>
</>
```