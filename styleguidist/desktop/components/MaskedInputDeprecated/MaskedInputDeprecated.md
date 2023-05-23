```jsx
import React, {useState} from 'react';
import {Row} from '@sberbusiness/triplex/desktop/components/Row/Row';
import {Col} from '@sberbusiness/triplex/desktop/components/Col/Col';
import {Label} from '@sberbusiness/triplex/desktop/components/Label/Label';
import {Field} from '@sberbusiness/triplex/desktop/components/Field/Field';
import {MaskedInputDeprecated} from '@sberbusiness/triplex/desktop/components/MaskedInputDeprecated/MaskedInputDeprecated';

const [account, setAccount] = useState('');
const [date, setDate] = useState('');
const [phone, setPhone] = useState('');

<>
    <Row>
        <Col>
            <Field alignLabel>
                <Col size={3}>
                    <Label>
                        <Label.Text>Счет</Label.Text>
                    </Label>
                </Col>
                <Col size={8}>
                    <MaskedInputDeprecated type="tel" value={account} mask="ddddd ddd d dddd ddddddd" onChange={setAccount} />
                </Col>
            </Field>
        </Col>
    </Row>

    <Row>
        <Col>
            <Field alignLabel>
                <Col size={3}>
                    <Label>
                        <Label.Text>Дата</Label.Text>
                    </Label>
                </Col>
                <Col size={8}>
                    <MaskedInputDeprecated
                        value={date}
                        type="tel"
                        mask="dd.dd.dd"
                        placeholderAsMask="дд.мм.гг"
                        onChange={setDate}
                        overtype
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
                        <Label.Text>Телефон</Label.Text>
                    </Label>
                </Col>
                <Col size={8}>
                    <MaskedInputDeprecated
                        value={phone}
                        type="tel"
                        mask="+7 ddd ddd-dd-dd"
                        onChange={setPhone}
                        overtype
                    />
                </Col>
            </Field>
        </Col>
    </Row>
</>
```
