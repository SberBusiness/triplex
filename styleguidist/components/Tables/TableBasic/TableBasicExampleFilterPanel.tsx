//TableBasicExampleFilterPanel.tsx
import React from 'react';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {Row} from '@sberbusiness/triplex/components/Row/Row';
import {Field} from '@sberbusiness/triplex/components/Field/Field';
import {Label} from '@sberbusiness/triplex/components/Label/Label';

export const renderFilterRow = (
    labelLeft: string,
    componentLeft: React.ReactNode,
    labelRight: string,
    componentRight: React.ReactNode
): JSX.Element => {
    return (
        <Row key={`${labelLeft}${labelRight}`}>
            <Col size={6}>
                <Row>
                    <Col>
                        <Field alignLabel>
                            <Col size={4}>
                                <Label>
                                    <Label.Text>{labelLeft}</Label.Text>
                                </Label>
                            </Col>
                            <Col size={8}>{componentLeft}</Col>
                        </Field>
                    </Col>
                </Row>
            </Col>
            <Col size={6}>
                <Row>
                    <Col>
                        <Field alignLabel>
                            <Col size={4}>
                                <Label>
                                    <Label.Text>{labelRight}</Label.Text>
                                </Label>
                            </Col>
                            <Col size={8}>{componentRight}</Col>
                        </Field>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};
