```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency 
    componentTitle="DocumentNumberEdit"
    isMobileComponent={false} 
/>
```

```jsx
import React, { useState } from 'react';
import {Row} from '@sberbusiness/triplex/desktop/components/Row/Row';
import {Col} from '@sberbusiness/triplex/desktop/components/Col/Col';
import {Gap} from '@sberbusiness/triplex/desktop/components/Gap/Gap';
import {Label} from '@sberbusiness/triplex/desktop/components/Label/Label';
import {Field} from '@sberbusiness/triplex/desktop/components/Field/Field';
import {Input} from '@sberbusiness/triplex/desktop/components/Input/Input';
import {DocumentNumberEdit} from '@sberbusiness/triplex/desktop/components/DocumentNumberEdit/DocumentNumberEdit';
import {ExampleBackground, ExampleBackgroundColor} from '../common/ExampleBackground/ExampleBackground';

const [state, setState] = useState({
    buttonLabel: 'Изменить',
    emptyNumberButtonLabel: 'Задать номер',
    emptyNumberLabel: 'Номер документа будет присвоен автоматически',
    numberLabel: 'Документ №',
    value: undefined,
});

const handleChange = (value) => setState({...state, value});

<ExampleBackground background={ExampleBackgroundColor.LIGHT}>
    <Row>
        <Col>
            <Field alignLabel>
                <Col size={6}>
                    <Label>
                        <Label.Text htmlFor="input1">Текст перед номером</Label.Text>
                    </Label>
                </Col>
                <Col size={6}>
                    <Input type="text" id="input1" value={state.numberLabel} onChange={(e) => setState({...state, numberLabel: e.target.value})} />
                </Col>
            </Field>
        </Col>
    </Row>
    <Row>
        <Col>
            <Field alignLabel>
                <Col size={6}>
                    <Label>
                        <Label.Text htmlFor="input2">Текст перед номером, при отсутствии номера</Label.Text>
                    </Label>
                </Col>
                <Col size={6}>
                    <Input type="text" id="input2" value={state.emptyNumberLabel} onChange={(e) => setState({...state, emptyNumberLabel: e.target.value})} />
                </Col>
            </Field>
        </Col>
    </Row>
    <Row>
        <Col>
            <Field alignLabel>
                <Col size={6}>
                    <Label>
                        <Label.Text htmlFor="input3">Текст кнопки "Изменить"</Label.Text>
                    </Label>
                </Col>
                <Col size={6}>
                    <Input type="text" id="input3" value={state.buttonLabel} onChange={(e) => setState({...state, buttonLabel: e.target.value})} />
                </Col>
            </Field>
        </Col>
    </Row>
    <Row>
        <Col>
            <Field alignLabel>
                <Col size={6}>
                    <Label>
                        <Label.Text htmlFor="input4">Текст кнопки "Изменить", при отсутствии номера</Label.Text>
                    </Label>
                </Col>
                <Col size={6}>
                    <Input type="text" id="input4" value={state.emptyNumberButtonLabel} onChange={(e) => setState({...state, emptyNumberButtonLabel: e.target.value})} />
                </Col>
            </Field>
        </Col>
    </Row>

    <Gap size={32} />
    
    <DocumentNumberEdit 
        buttonLabel={state.buttonLabel}
        emptyNumberButtonLabel={state.emptyNumberButtonLabel}
        emptyNumberLabel={state.emptyNumberLabel}
        numberLabel={state.numberLabel}
        onChange={handleChange} 
        value={state.value}
    />
</ExampleBackground>
```
