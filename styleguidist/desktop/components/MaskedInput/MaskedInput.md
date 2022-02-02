```jsx
import React, { useState } from 'react';
import {Row} from '@sbbol/web-library/desktop/components/Row/Row';
import {Col} from '@sbbol/web-library/desktop/components/Col/Col';
import {Label} from '@sbbol/web-library/desktop/components/Label/Label';
import {Field} from '@sbbol/web-library/desktop/components/Field/Field';

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
                    <MaskedInput value={account} mask="ddddd ddd d dddd ddddddd" onChange={setAccount} />
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
                    <MaskedInput
                        value={date}
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
                    <MaskedInput
                        value={phone}
                        mask="+7 (ddd) ddd-dd-dd"
                        onChange={setPhone}
                        overtype
                    />
                </Col>
            </Field>
        </Col>
    </Row>
</>
```
