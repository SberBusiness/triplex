import React, {useState} from 'react';
import {MaskedInput} from '@sberbusiness/triplex/components/MaskedInput/MaskedInput';
import {Field} from '@sberbusiness/triplex/components/Field/Field';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {Row} from '@sberbusiness/triplex/components/Row/Row';
import {Label} from '@sberbusiness/triplex/components/Label/Label';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';

const renderRowExample = (label, props) => {
    const [value, setValue] = useState('');
    const {text, description} = label;

    return (
        <>
            <Field alignLabel>
                <Col size={3}>
                    <Label>
                        <Label.Text>{text}</Label.Text>
                        <Label.Description>{description}</Label.Description>
                    </Label>
                </Col>
                <Col size={9}>
                    <MaskedInput
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                        {...props}
                    />
                </Col>
            </Field>
            <Gap size={16} />
        </>
    );
}

<>
    {renderRowExample({
        text: 'Номер счёта'
    }, {
        mask: MaskedInput.presets.masks.account
    })}

    {renderRowExample({
        text: 'Номер карты',
        description: '(от 16 до 20 символов)'
    }, {
        mask: MaskedInput.presets.masks.cardNumber,
        placeholderMask: MaskedInput.presets.placeholderMasks.cardNumber
    })}

    {renderRowExample({
        text: 'Дата'
    }, {
        mask: MaskedInput.presets.masks.date,
        placeholderMask: MaskedInput.presets.placeholderMasks.date
    })}

    {renderRowExample({
        text: 'Номер телефона'
    }, {
        mask: MaskedInput.presets.masks.phone
    })}

    {renderRowExample({
        text: 'Доб. номер',
        description: '(от 3 до 4 символов)'
    }, {
        mask: MaskedInput.presets.masks.phoneExtension,
        placeholderMask: MaskedInput.presets.placeholderMasks.phoneExtension,
    })}

    {renderRowExample({
        text: 'СНИЛС'
    }, {
        mask: MaskedInput.presets.masks.snils
    })}

    {renderRowExample({
        text: 'БИК'
    }, {
        mask: MaskedInput.presets.masks.bic
    })}

    {renderRowExample({
        text: 'ИНН',
        description: '(от 10 до 12 символов)'
    }, {
        mask: MaskedInput.presets.masks.inn,
        placeholderMask: MaskedInput.presets.placeholderMasks.inn
    })}

    {renderRowExample({
        text: 'КБК'
    }, {
        mask: MaskedInput.presets.masks.kbk
    })}

    {renderRowExample({
        text: 'КПП'
    }, {
        mask: MaskedInput.presets.masks.kpp
    })}

    {renderRowExample({
        text: 'ОКТМО'
    }, {
        mask: MaskedInput.presets.masks.oktmo
    })}

    {renderRowExample({
        text: 'УИН'
    }, {
        mask: MaskedInput.presets.masks.uin
    })}

    {renderRowExample({
        text: 'ОГРН'
    }, {
        mask: MaskedInput.presets.masks.ogrn
    })}

    <br />

    <Row>
        <Col>
            <b>ЖКУ</b>
        </Col>
    </Row>

    {renderRowExample({
        text: 'Идентификатор платёжного документа'
    }, {
        mask: MaskedInput.presets.masks.zhkuPaymentDocumentId,
        placeholderMask: MaskedInput.presets.placeholderMasks.zhkuPaymentDocumentId
    })}

    {renderRowExample({
        text: 'Идентификатор ЖКУ'
    }, {
        mask: MaskedInput.presets.masks.zhkuId,
        placeholderMask: MaskedInput.presets.placeholderMasks.zhkuId
    })}

    {renderRowExample({
        text: 'Единый лицевой счёт поставщика услуг'
    }, {
        mask: MaskedInput.presets.masks.zhkuAccount,
        placeholderMask: MaskedInput.presets.placeholderMasks.zhkuAccount
    })}

    <br />

    <Row>
        <Col>
            <b>Паспорт РФ</b>
        </Col>
    </Row>

    {renderRowExample({
        text: 'Серия'
    }, {
        mask: MaskedInput.presets.masks.passport.series
    })}

    {renderRowExample({
        text: 'Номер'
    }, {
        mask: MaskedInput.presets.masks.passport.number
    })}

    {renderRowExample({
        text: 'Код подразделения'
    }, {
        mask: MaskedInput.presets.masks.passport.departmentCode
    })}

    <br />

    <Row>
        <Col>
            <b>Автомобиль</b>
        </Col>
    </Row>

    {renderRowExample({
        text: 'Номер машины'
    }, {
        mask: MaskedInput.presets.masks.carNumber,
        placeholderMask: MaskedInput.presets.placeholderMasks.carNumber
    })}

    {renderRowExample({
        text: 'Водительское удостоверение'
    }, {
        mask: MaskedInput.presets.masks.driversLicense
    })}

    <br />

    <Row>
        <Col>
            <b>Адрес</b>
        </Col>
    </Row>

    {renderRowExample({
        text: 'Индекс'
    }, {
        mask: MaskedInput.presets.masks.postalCode
    })}

    {renderRowExample({
        text: 'Широта'
    }, {
        mask: MaskedInput.presets.masks.latitude
    })}

    {renderRowExample({
        text: 'Долгота'
    }, {
        mask: MaskedInput.presets.masks.longitude
    })}
</>