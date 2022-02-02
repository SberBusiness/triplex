```jsx
import React, {useState} from 'react';
import {LightBox} from '@sbbol/web-library/desktop/components/LightBox/LightBox';
import {Page} from '@sbbol/web-library/desktop/components/Page/Page';
import {Row} from '@sbbol/web-library/desktop/components/Row/Row';
import {Col} from '@sbbol/web-library/desktop/components/Col/Col';
import {Gap} from '@sbbol/web-library/desktop/components/Gap/Gap';
import {Divider} from '@sbbol/web-library/desktop/components/Divider/Divider';
import {AlertProcess} from '@sbbol/web-library/desktop/components/Alert/AlertProcess/AlertProcess';
import {EAlertType} from '@sbbol/web-library/desktop/components/Alert/EAlertType';
import {StatusTracker} from '@sbbol/web-library/desktop/components/StatusTracker/StatusTracker';
import {StatusTrackerStatus, StatusTrackerStepNumber} from '@sbbol/web-library/desktop/components/StatusTracker/enums';
import {Field} from '@sbbol/web-library/desktop/components/Field/Field';
import {Label} from '@sbbol/web-library/desktop/components/Label/Label';
import {SubRow} from '@sbbol/web-library/desktop/components/SubRow/SubRow';
import {SubLabel} from '@sbbol/web-library/desktop/components/SubLabel/SubLabel';
import {SubValue} from '@sbbol/web-library/desktop/components/SubValue/SubValue';
import {Button} from '@sbbol/web-library/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sbbol/web-library/desktop/components/Button/enums';
import {ELinkSize, ELinkType, Link} from '@sbbol/web-library/desktop/components/Link/Link';

const fields = [
    {label: 'Сумма платежа', value: '1 000 RUB'},
    {label: 'НДС', value: '20%'},
    {label: 'Назначение', value: 'В том числе НДС 20 % - 4.17 рублей.'},
    {label: 'Счёт списания', value: 'ООО "Ромашка"'},
    {label: 'Получатель', value: 'ООО "Роза"'},
];

const requisites = [
    {label: 'ИНН', value: '4416432600'},
    {label: 'Счёт', value: '40702 810 3 3800 1214593'},
    {label: 'Банк', value: 'ПАО СБЕРБАНК г. Москва'},
];

const [open, setOpen] = useState(false);

const renderField = (field, gap = true) => {
    return (
        <>
            {gap && <Gap size={16} />}
            <Field>
                <Col size={4}>
                    <Label>{field.label}</Label>
                </Col>
                <Col>
                    <Label>{field.value}</Label>
                </Col>
            </Field>
        </>
    );
};

const renderRequisite = (requisite) => {
    return (
        <>
            <Gap size={8} />
            <SubRow>
                <Col offset={4}>
                    <Field alignLabel>
                        <Col size={2}>
                            <SubLabel>{requisite.label}</SubLabel>
                        </Col>
                        <Col>
                            <SubValue>{requisite.value}</SubValue>
                        </Col>
                    </Field>
                </Col>
            </SubRow>
        </>
    );
};

<>
    {open ? (
        <LightBox>
            <LightBox.Controls>
                <LightBox.Controls.Close onClick={() => setOpen(false)} />
            </LightBox.Controls>
            <LightBox.Content>
                <Page>
                    <Page.Header sticky>
                        <Page.Header.Title>
                            <Page.Header.Title.Content>
                                <Page.Header.Title.Content.Text>Рублёвый платёж контрагенту</Page.Header.Title.Content.Text>
                            </Page.Header.Title.Content>
                            <Page.Header.Title.Subhead>Рублёвый платёж контрагенту № 58 от 26.04.2021</Page.Header.Title.Subhead>
                        </Page.Header.Title>
                    </Page.Header>
                    <Page.Body>
                        <Row>
                            <Col size={8}>
                                <AlertProcess type={EAlertType.INFO}>
                                    По вопросам внешнеэкономической деятельности обращайтесь по телефону 8 800 200-94-45 с 0:00 до 20:00
                                    МСК.
                                </AlertProcess>
                                <Gap size={8} />
                                {fields.slice(0, 3).map((field) => renderField(field))}
                                <Divider />
                                {fields.slice(3).map((field, index) => renderField(field, !!index))}
                                <Gap size={8} />
                                <div>{requisites.map((requisite) => renderRequisite(requisite))}</div>
                                <Divider />
                                <Label>
                                    Получено согласие с <Link linkType={ELinkType.TEXT} size={ELinkSize.LG}>условиями предложения</Link>.
                                </Label>
                            </Col>
                            <Col size={4}>
                                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <StatusTracker currentStep={StatusTrackerStepNumber.TWO} status={StatusTrackerStatus.WAIT}>
                                        <StatusTracker.Steps>
                                            <StatusTracker.Steps.Step>Создание документа</StatusTracker.Steps.Step>
                                            <StatusTracker.Steps.Step>Подписание документа</StatusTracker.Steps.Step>
                                            <StatusTracker.Steps.Step>Отправка документа в банк</StatusTracker.Steps.Step>
                                        </StatusTracker.Steps>
                                        <StatusTracker.Body>
                                            <StatusTracker.Body.Text>Платёжное поручение создано</StatusTracker.Body.Text>
                                            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                                                Получить СМС-код
                                            </Button>
                                        </StatusTracker.Body>
                                        <StatusTracker.Footer>
                                            <StatusTracker.Footer.Text>
                                                Подпишите его с помощью СМС-кода. Мы пришлём код на ваш телефон.
                                            </StatusTracker.Footer.Text>
                                        </StatusTracker.Footer>
                                    </StatusTracker>
                                </div>
                            </Col>
                        </Row>
                    </Page.Body>
                </Page>
            </LightBox.Content>
        </LightBox>
    ) : (
        <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpen(true)}>
            Open Form
        </Button>
    )}
</>
```
