```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency 
    componentTitle="Label"
    isMobileComponent={false} 
/>
```

```jsx
import React, {useState} from 'react';
import {Row} from '@sbbol/web-library/desktop/components/Row/Row';
import {Col} from '@sbbol/web-library/desktop/components/Col/Col';
import {Label} from '@sbbol/web-library/desktop/components/Label/Label';

const [labelText, setLabelText] = useState('Название поля');
const [codeNumber, setCodeNumber] = useState('000');
const [description, setDescription] = useState('Текст пояснения');

<>
    <Row>
        <Col size={3}>Default</Col>
        <Col size={3}>
            <Label>
                <Label.Text>{labelText}</Label.Text>
            </Label>
        </Col>
    </Row>
    <Row>
        <Col size={3}>Number</Col>
        <Col size={3}>
            <Label>
                <Label.Text>{labelText}</Label.Text>
                <Label.CodeNumber>{codeNumber}</Label.CodeNumber>
            </Label>
        </Col>
    </Row>
    <Row>
        <Col size={3}>Helpbox</Col>
        <Col size={3}>
            <Label>
                <Label.Text>{labelText}</Label.Text> <Label.HelpBoxLG>{labelText}</Label.HelpBoxLG>
            </Label>
        </Col>
    </Row>
    <Row>
        <Col size={3}>Helpbox (non-breaking)</Col>
        <Col size={3}>
            <Label>
                <Label.Text>{labelText}</Label.Text>
                {'\u00A0'}
                <Label.HelpBoxLG>{labelText}</Label.HelpBoxLG>
            </Label>
        </Col>
    </Row>
    <Row>
        <Col size={3}>Description</Col>
        <Col size={3}>
            <Label>
                <Label.Text>{labelText}</Label.Text>
                <Label.Description>{description}</Label.Description>
            </Label>
        </Col>
    </Row>
    <Row>
        <Col size={3}>Number + Helpbox</Col>
        <Col size={3}>
            <Label>
                <Label.Text>{labelText}</Label.Text>
                <Label.CodeNumber>{codeNumber}</Label.CodeNumber> <Label.HelpBoxSM>{labelText}</Label.HelpBoxSM>
            </Label>
        </Col>
    </Row>
    <Row>
        <Col size={3}>Number + Description</Col>
        <Col size={3}>
            <Label>
                <Label.Text>{labelText}</Label.Text>
                <Label.CodeNumber>{codeNumber}</Label.CodeNumber>
                <Label.Description>{description}</Label.Description>
            </Label>
        </Col>
    </Row>
    <Row>
        <Col size={3}>Helpbox + Description</Col>
        <Col size={3}>
            <Label>
                <Label.Text>{labelText}</Label.Text> <Label.HelpBoxSM>{labelText}</Label.HelpBoxSM>
                <Label.Description>{description}</Label.Description>
            </Label>
        </Col>
    </Row>
    <Row>
        <Col size={3}>Number + Helpbox + Description</Col>
        <Col size={3}>
            <Label>
                <Label.Text>{labelText}</Label.Text>
                <Label.CodeNumber>{codeNumber}</Label.CodeNumber> <Label.HelpBoxSM>{labelText}</Label.HelpBoxSM>
                <Label.Description>{description}</Label.Description>
            </Label>
        </Col>
    </Row>
</>;
```
