//TableBasicExampleFilterPanel.tsx
import React from 'react';
import {Col} from '@sbbol/web-library/desktop/components/Col/Col';
import {Row} from '@sbbol/web-library/desktop/components/Row/Row';
import {Field} from '@sbbol/web-library/desktop/components/Field/Field';
import {Label} from '@sbbol/web-library/desktop/components/Label/Label';

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
