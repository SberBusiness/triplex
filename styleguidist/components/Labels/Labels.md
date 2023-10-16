```jsx
import React, {useState} from 'react';
import {Row} from '@sberbusiness/triplex/components/Row/Row';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {Label} from '@sberbusiness/triplex/components/Label/Label';
import {HelpBox} from '@sberbusiness/triplex/components/HelpBox/HelpBox';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';

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
                <Label.Text>{labelText}</Label.Text> <HelpBox tooltipSize={ETooltipSize.LG}>{labelText}</HelpBox>
            </Label>
        </Col>
    </Row>
    <Row>
        <Col size={3}>Helpbox (non-breaking)</Col>
        <Col size={3}>
            <Label>
                <Label.Text>{labelText}</Label.Text>
                {'\u00A0'}
                <HelpBox tooltipSize={ETooltipSize.LG}>{labelText}</HelpBox>
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
                <Label.CodeNumber>{codeNumber}</Label.CodeNumber> <HelpBox tooltipSize={ETooltipSize.SM}>{labelText}</HelpBox>
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
                <Label.Text>{labelText}</Label.Text> <HelpBox tooltipSize={ETooltipSize.SM}>{labelText}</HelpBox>
                <Label.Description>{description}</Label.Description>
            </Label>
        </Col>
    </Row>
    <Row>
        <Col size={3}>Number + Helpbox + Description</Col>
        <Col size={3}>
            <Label>
                <Label.Text>{labelText}</Label.Text>
                <Label.CodeNumber>{codeNumber}</Label.CodeNumber> <HelpBox tooltipSize={ETooltipSize.SM}>{labelText}</HelpBox>
                <Label.Description>{description}</Label.Description>
            </Label>
        </Col>
    </Row>
</>;
```
