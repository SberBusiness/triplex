```jsx
import React, {useState, useRef} from 'react';
import {Row} from '@sberbusiness/triplex/components/Row/Row';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {MaskedInput} from '@sberbusiness/triplex/components/MaskedInput/MaskedInput';
import {Field} from '@sberbusiness/triplex/components/Field/Field';
import {Label} from '@sberbusiness/triplex/components/Label/Label';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';

const renderRowExample = (label, content) => (
    <>
        <Field alignLabel>
            <Col size={3}><Label><Label.Text>{label}</Label.Text></Label></Col>
            <Col size={9}>{content}</Col>
        </Field>
        <Gap size={16} />
    </>
);

const ref = useRef(null);
const [account, setAccount] = useState({value: ''});
const [accountPlaceholder, setAccountPlaceholder] = useState('');
const [bic, setBic] = useState('');
const [carNumber, setCarNumber] = useState('');
const [cardNumber, setCardNumber] = useState('');
const [date, setDate] = useState('');
const [driversLicense, setDriversLicense] = useState('');
const [inn, setInn] = useState('');
const [kbk, setKbk] = useState('');
const [kpp, setKpp] = useState('');
const [latitude, setLatitude] = useState('');
const [longitude, setLongitude] = useState('');
const [ogrn, setOgrn] = useState('');
const [oktmo, setOktmo] = useState('');
const [phone, setPhone] = useState('');
const [passportSeries, setPassportSeries] = useState('');
const [passportNumber, setPassportNumber] = useState('');
const [passportDepartment, setPassportDepartment] = useState('');
const [postalCode, setPostalCode] = useState('');
const [snils, setSnils] = useState('');
const [uin, setUin] = useState('');
const [zhkuAccount, setZhkuAccount] = useState('');
const [zhkuId, setZhkuId] = useState('');
const [zhkuPaymentDocumentId, setZhkuPaymentDocumentId] = useState('');

<>
    {renderRowExample(
        'Номер счёта',
        <MaskedInput
            forwardRef={ref}
            value={account.value}
            mask={MaskedInput.presets.masks.account}
            onChange={(event) => setAccount({value: event.target.value})}
        />
    )}

    {renderRowExample(
        'Номер счёта с плейсхолдером для пустого значения',
        <MaskedInput
            value={accountPlaceholder}
            placeholder="Введите значение"
            mask={MaskedInput.presets.masks.account}
            onChange={(event) => setAccountPlaceholder(event.target.value)}
        />
    )}

    {renderRowExample(
        'Номер карты (от 16 до 20 символов)',
        <MaskedInput
            value={cardNumber}
            placeholderMask={MaskedInput.presets.placeholderMasks.cardNumber}
            mask={MaskedInput.presets.masks.cardNumber}
            onChange={(event) => setCardNumber(event.target.value)}
        />
    )}

    {renderRowExample(
        'Дата',
        <MaskedInput
            placeholderMask={MaskedInput.presets.placeholderMasks.date}
            value={date}
            mask={MaskedInput.presets.masks.date}
            onChange={(event) => setDate(event.target.value)}
        />
    )}

    {renderRowExample(
        'Телефон',
        <MaskedInput value={phone} mask={MaskedInput.presets.masks.phone} onChange={(event) => setPhone(event.target.value)} />
    )}

    {renderRowExample(
        'СНИЛС',
        <MaskedInput value={snils} mask={MaskedInput.presets.masks.snils} onChange={(event) => setSnils(event.target.value)} />
    )}

    {renderRowExample(
        'БИК',
        <MaskedInput value={bic} mask={MaskedInput.presets.masks.bic} onChange={(event) => setBic(event.target.value)} />
    )}

    {renderRowExample(
        'ИНН (от 10 до 12 символов)',
        <MaskedInput
            placeholderMask={MaskedInput.presets.placeholderMasks.inn}
            value={inn}
            mask={MaskedInput.presets.masks.inn}
            onChange={(event) => setInn(event.target.value)}
        />
    )}

    {renderRowExample(
        'КБК',
        <MaskedInput value={kbk} mask={MaskedInput.presets.masks.kbk} onChange={(event) => setKbk(event.target.value)} />
    )}

    {renderRowExample(
        'КПП',
        <MaskedInput value={kpp} mask={MaskedInput.presets.masks.kpp} onChange={(event) => setKpp(event.target.value)} />
    )}

    {renderRowExample(
        'ОКТМО',
        <MaskedInput value={oktmo} mask={MaskedInput.presets.masks.oktmo} onChange={(event) => setOktmo(event.target.value)} />
    )}

    {renderRowExample(
        'УИН',
        <MaskedInput value={uin} mask={MaskedInput.presets.masks.uin} onChange={(event) => setUin(event.target.value)} />
    )}

    {renderRowExample(
        'ОГРН',
        <MaskedInput value={ogrn} mask={MaskedInput.presets.masks.ogrn} onChange={(event) => setOgrn(event.target.value)} />
    )}

    <br />

    <Row>
        <Col>
            <b>ЖКУ</b>
        </Col>
    </Row>

    {renderRowExample(
        'Идентификатор платёжного документа',
        <MaskedInput
            placeholderMask={MaskedInput.presets.placeholderMasks.zhkuPaymentDocumentId}
            value={zhkuPaymentDocumentId}
            mask={MaskedInput.presets.masks.zhkuPaymentDocumentId}
            onChange={(event) => setZhkuPaymentDocumentId(event.target.value)}
        />
    )}

    {renderRowExample(
        'Идентификатор ЖКУ',
        <MaskedInput
            placeholderMask={MaskedInput.presets.placeholderMasks.zhkuId}
            value={zhkuId}
            mask={MaskedInput.presets.masks.zhkuId}
            onChange={(event) => setZhkuId(event.target.value)}
        />
    )}

    {renderRowExample(
        'Единый лицевой счёт поставщика услуг',
        <MaskedInput
            placeholderMask={MaskedInput.presets.placeholderMasks.zhkuAccount}
            value={zhkuAccount}
            mask={MaskedInput.presets.masks.zhkuAccount}
            onChange={(event) => setZhkuAccount(event.target.value)}
        />
    )}

    <br />

    <Row>
        <Col>
            <b>Паспорт РФ</b>
        </Col>
    </Row>

    {renderRowExample(
        'Серия',
        <MaskedInput
            value={passportSeries}
            mask={MaskedInput.presets.masks.passport.series}
            onChange={(event) => setPassportSeries(event.target.value)}
        />
    )}

    {renderRowExample(
        'Номер',
        <MaskedInput
            value={passportNumber}
            mask={MaskedInput.presets.masks.passport.number}
            onChange={(event) => setPassportNumber(event.target.value)}
        />
    )}

    {renderRowExample(
        'Код подразделения',
        <MaskedInput
            value={passportDepartment}
            mask={MaskedInput.presets.masks.passport.departmentCode}
            onChange={(event) => setPassportDepartment(event.target.value)}
        />
    )}

    <br />

    <Row>
        <Col>
            <b>Автомобиль</b>
        </Col>
    </Row>

    {renderRowExample(
        'Номер машины',
        <MaskedInput
            value={carNumber}
            placeholderMask={MaskedInput.presets.placeholderMasks.carNumber}
            mask={MaskedInput.presets.masks.carNumber}
            onChange={(event) => setCarNumber(event.target.value)}
        />
    )}

    {renderRowExample(
        'Водительское удостоверение',
        <MaskedInput
            value={driversLicense}
            mask={MaskedInput.presets.masks.driversLicense}
            onChange={(event) => setDriversLicense(event.target.value)}
        />
    )}

    <br />

    <Row>
        <Col>
            <b>Адрес</b>
        </Col>
    </Row>

    {renderRowExample(
        'Индекс',
        <MaskedInput
            value={postalCode}
            mask={MaskedInput.presets.masks.postalCode}
            onChange={(event) => setPostalCode(event.target.value)}
        />
    )}

    {renderRowExample(
        'Широта',
        <MaskedInput
            value={latitude}
            mask={MaskedInput.presets.masks.latitude}
            onChange={(event) => setLatitude(event.target.value)}
        />
    )}

    {renderRowExample(
        'Долгота',
        <MaskedInput
            value={longitude}
            mask={MaskedInput.presets.masks.longitude}
            onChange={(event) => setLongitude(event.target.value)}
        />
    )}
</>
```
