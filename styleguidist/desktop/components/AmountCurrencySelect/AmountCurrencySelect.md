```jsx
import React, {useState} from 'react';
import {Row} from '@sbbol/web-library/desktop/components/Row/Row';
import {Col} from '@sbbol/web-library/desktop/components/Col/Col';
import {Label} from '@sbbol/web-library/desktop/components/Label/Label';
import {Field} from '@sbbol/web-library/desktop/components/Field/Field';
import {AmountCurrencySelect} from '@sbbol/web-library/desktop/components/AmountCurrencySelect/AmountCurrencySelect';

const [state, setState] = useState({
    amountValueBasic: '',
    amountValueDisable: '',
    amountValueLoading: '',
    amountValueError: '',
    amountCurrencySelectedBasic: null,
    amountCurrencySelectedDisable: null,
    amountCurrencySelectedLoading: null,
    amountCurrencySelectedError: null,
});

const currencyOptions = [
    {label: 'RUB', value: 'RUB'},
    {label: 'USD', value: 'USD'},
    {label: 'EUR', value: 'EUR'},
];

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
                    <AmountCurrencySelect
                        value={state.amountValueBasic}
                        onChange={(amountValueBasic) => setState({...state, amountValueBasic})}
                        currency={state.amountCurrencySelectedBasic}
                        currencyProps={{title: state.amountCurrencySelectedBasic ? state.amountCurrencySelectedBasic.label : undefined}}
                        currencyOptions={currencyOptions}
                        onSelect={(amountCurrencySelectedBasic) => setState({...state, amountCurrencySelectedBasic})}
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
                        <Label.Text>Loading</Label.Text>
                    </Label>
                </Col>
                <Col size={4}>
                    <AmountCurrencySelect
                        value={state.amountValueLoading}
                        onChange={(amountValueLoading) => setState({...state, amountValueLoading})}
                        currency={state.amountCurrencySelectedLoading}
                        currencyOptions={currencyOptions}
                        onSelect={(amountCurrencySelectedLoading) => setState({...state, amountCurrencySelectedLoading})}
                        loading
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
                    <AmountCurrencySelect
                        value={state.amountValueError}
                        onChange={(amountValueError) => setState({...state, amountValueError})}
                        currency={state.amountCurrencySelectedError}
                        currencyOptions={currencyOptions}
                        onSelect={(amountCurrencySelectedError) => setState({...state, amountCurrencySelectedError})}
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
                    <AmountCurrencySelect
                        value={state.amountValueDisable}
                        onChange={(amountValueDisable) => setState({...state, amountValueDisable})}
                        currency={state.amountCurrencySelectedDisable}
                        currencyOptions={currencyOptions}
                        onSelect={(amountCurrencySelectedDisable) => setState({...state, amountCurrencySelectedDisable})}
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
                        <Label.Text>Disabled right part</Label.Text>
                    </Label>
                </Col>
                <Col size={4}>
                    <AmountCurrencySelect
                        value=""
                        onChange={() => {}}
                        currency={null}
                        currencyProps={{disabled: true}}
                        currencyOptions={currencyOptions}
                        onSelect={() => {}}
                    />
                </Col>
            </Field>
        </Col>
    </Row>
</>;
```
