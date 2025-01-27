```jsx
import React, {useState, useEffect} from 'react';
import {LightBox} from '@sberbusiness/triplex/components/LightBox/LightBox';
import {Page} from '@sberbusiness/triplex/components/Page/Page';
import {Row} from '@sberbusiness/triplex/components/Row/Row';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {Divider} from '@sberbusiness/triplex/components/Divider/Divider';
import {AlertProcess} from '@sberbusiness/triplex/components/Alert/AlertProcess/AlertProcess';
import {EAlertType} from '@sberbusiness/triplex/components/Alert/EAlertType';
import {Field} from '@sberbusiness/triplex/components/Field/Field';
import {Label} from '@sberbusiness/triplex/components/Label/Label';
import {SubRow} from '@sberbusiness/triplex/components/SubRow/SubRow';
import {SubLabel} from '@sberbusiness/triplex/components/SubLabel/SubLabel';
import {SubValue} from '@sberbusiness/triplex/components/SubValue/SubValue';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/components/Link/Link';

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

useEffect(() => {
    if (open) {
        document.body.classList.add('dialogOpenExample');
    } else {
        document.body.classList.remove('dialogOpenExample');
    }
}, [open]);

const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const renderField = (field, gap = true) => (
    <>
        {gap && <Gap size={16} />}
        <Field>
            <Col size={4}>
                <Label>{field.label}</Label>
            </Col>
            <Col size={8}>
                <Label>{field.value}</Label>
            </Col>
        </Field>
    </>
);

const renderRequisite = (requisite) => (
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

const renderLightBox = () => (
    <LightBox>
        <LightBox.Controls>
            <LightBox.Controls.Close onClick={handleClose} />
        </LightBox.Controls>
        <LightBox.Content>
            <Page>
                <Page.Header sticky>
                    <Page.Header.Title>
                        <Page.Header.Title.Content>
                            <Page.Header.Title.Content.Text>Рублёвый платёж контрагенту</Page.Header.Title.Content.Text>
                            <Page.Header.Title.Content.Subhead>
                                Рублёвый платёж контрагенту № 58 от 26.04.2021
                            </Page.Header.Title.Content.Subhead>
                        </Page.Header.Title.Content>
                    </Page.Header.Title>
                </Page.Header>
                <Page.Body>
                    <Row>
                        <Col size={8}>
                            <AlertProcess type={EAlertType.INFO}>
                                По вопросам внешнеэкономической деятельности обращайтесь по телефону 8 800 200-94-45 с 0:00 до 20:00 МСК.
                            </AlertProcess>
                            <Gap size={8} />
                            {fields.slice(0, 3).map((field) => renderField(field))}
                            <Divider marginTopSize={24} marginBottomSize={16} />
                            {fields.slice(3).map((field, index) => renderField(field, !!index))}
                            <Gap size={8} />
                            <div>{requisites.map((requisite) => renderRequisite(requisite))}</div>
                            <Divider marginTopSize={24} marginBottomSize={16} />
                            <Label>
                                Получено согласие с{' '}
                                <Link linkType={ELinkType.TEXT} size={ELinkSize.LG}>
                                    условиями предложения
                                </Link>
                                .
                            </Label>
                        </Col>
                        <Col size={4} />
                    </Row>
                </Page.Body>
            </Page>
        </LightBox.Content>
    </LightBox>
);

<>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={handleOpen}>
        Open Form
    </Button>
    {open && renderLightBox()}
</>;
```
