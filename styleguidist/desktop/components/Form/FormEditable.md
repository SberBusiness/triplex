```jsx
import React, {useState, useEffect} from 'react';
import {LightBox} from '@sbbol/web-library/desktop/components/LightBox/LightBox';
import {Page} from '@sbbol/web-library/desktop/components/Page/Page';
import {Row} from '@sbbol/web-library/desktop/components/Row/Row';
import {Col} from '@sbbol/web-library/desktop/components/Col/Col'
import {Gap} from '@sbbol/web-library/desktop/components/Gap/Gap';
import {Field} from '@sbbol/web-library/desktop/components/Field/Field';
import {Label} from '@sbbol/web-library/desktop/components/Label/Label';
import {DocumentNumberEdit} from '@sbbol/web-library/desktop/components/DocumentNumberEdit/DocumentNumberEdit';
import {AlertProcess} from '@sbbol/web-library/desktop/components/Alert/AlertProcess/AlertProcess';
import {AlertContext} from '@sbbol/web-library/desktop/components/Alert/AlertContext/AlertContext';
import {EAlertType} from '@sbbol/web-library/desktop/components/Alert/EAlertType'
import {UnorderedList} from '@sbbol/web-library/desktop/components/List/UnorderedList';
import {Input} from '@sbbol/web-library/desktop/components/Input/Input';
import {AmountInput} from '@sbbol/web-library/desktop/components/AmountInput/AmountInput';
import {MaskedInput} from '@sbbol/web-library/desktop/components/MaskedInput/MaskedInput';
import {Select} from '@sbbol/web-library/desktop/components/Select/Select';
import {SegmentedControl, ESegmentedControlType} from '@sbbol/web-library/desktop/components/SegmentedControl/SegmentedControl';
import {TextArea} from '@sbbol/web-library/desktop/components/TextArea/TextArea';
import {Divider} from '@sbbol/web-library/desktop/components/Divider/Divider';
import {Suggest} from '@sbbol/web-library/desktop/components/Suggest/Suggest';
import {Spoiler} from '@sbbol/web-library/desktop/components/Spoiler/Spoiler';
import {SubRow} from '@sbbol/web-library/desktop/components/SubRow/SubRow'
import {SubLabel} from '@sbbol/web-library/desktop/components/SubLabel/SubLabel';
import {ELinkSize, ELinkType, Link} from '@sbbol/web-library/desktop/components/Link/Link';
import {Button} from '@sbbol/web-library/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sbbol/web-library/desktop/components/Button/enums';

const vatOptions = [
    {value: '0', label: 'НДС включен в сумму платежа'},
    {value: '1', label: 'НДС добавляется к сумме платежа'},
];

const vatAmounts = [
    {value: '0', label: '0%'},
    {value: '10', label: '10%'},
    {value: '20', label: '20%'},
];

const senders = [
    {value: '0', label: '40702810205275000000'},
    {value: '1', label: '40702810205275000001'},
    {value: '2', label: '40702810205275000002'},
];

const receivers = [
    {value: '0', label: 'ООО "Стриж"'},
    {value: '1', label: 'ОАО "Хомячок"'},
    {value: '2', label: 'ЗАО "Кирпичик"'},
];

const [open, setOpen] = useState(false);
const [number, setNumber] = useState();
const [error, setError] = useState(false);
const [sum, setSum] = useState('');
const [text, setText] = useState('В том числе НДС 20 % - 0.00 рублей.');
const [vatOption, setVatOption] = useState(vatOptions[0]);
const [vatAmount, setVatAmount] = useState('20');
const [sender, setSender] = useState(null);
const [receiver, setReceiver] = useState(null);
const [options, setOptions] = useState(receivers);
const [inn, setInn] = useState('');
const [account, setAccount] = useState('');
const [bank, setBank] = useState('');

const renderProcessError = (...values) => {
    return (
        <>
            <Gap size={16} />
            <AlertProcess type={EAlertType.ERROR}>
                Исправьте данные перед отправкой в банк:
                <Gap size={8} />
                <UnorderedList values={values} />
            </AlertProcess>
        </>
    );
};

const renderContextError = (text) => {
    return (
        <>
            <Gap size={8} />
            <AlertContext type={EAlertType.ERROR}>{text}</AlertContext>
        </>
    );
};

const handleFilter = (str) => setOptions(receivers.filter((item) => item.label.startsWith(str)));

useEffect(() => {
    if (receiver) {
        setInn('4416432600');
        setAccount('40702810938000004049');
        setBank('ПАО СБЕРБАНК г. Москва');
    }
}, [receiver]);

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
                            <Page.Header.Title.Subhead>
                                <DocumentNumberEdit 
                                    value={number} 
                                    onChange={setNumber}
                                    buttonLabel="Изменить"
                                    emptyNumberButtonLabel="Задать номер"
                                    emptyNumberLabel="Номер документа будет присвоен автоматически"
                                    numberLabel="Документ №"
                                />
                            </Page.Header.Title.Subhead>
                        </Page.Header.Title>
                    </Page.Header>
                    <Page.Body>
                        <AlertProcess type={EAlertType.INFO}>
                            По вопросам внешнеэкономической деятельности обращайтесь по телефону 8 800 200-94-45 с 0:00 до 20:00
                            МСК.
                        </AlertProcess>
                        {error && renderProcessError('Укажите сумму платежа', 'Укажите ИНН/КИО получателя.')}
                        <Gap size={16} />
                        <Field alignLabel>
                            <Col size={3}>
                                <Label>Сумма платежа</Label>
                            </Col>
                            <Col size={3}>
                                <AmountInput value={sum} onChange={setSum} currency="RUB" error={error} />
                                {error && renderContextError('Укажите сумму платежа.')}
                            </Col>
                        </Field>
                        <Gap size={16} />
                        <Field alignLabel>
                            <Col size={3}>
                                <Label>
                                    <Label.Text>НДС</Label.Text>
                                    {'\u00A0'}
                                    <Label.HelpBoxSM>Выберите способ расчета и ставку НДС.</Label.HelpBoxSM>
                                </Label>
                            </Col>
                            <Col size={4}>
                                <Select value={vatOption} options={vatOptions} onChange={setVatOption} />
                            </Col>
                            <Col size={3}>
                                <SegmentedControl type={ESegmentedControlType.SINGLE} value={vatAmount} onSelect={setVatAmount}>
                                    {vatAmounts.map(segmentValue => (
                                        <SegmentedControl.Segment
                                            key={segmentValue.value}
                                            value={segmentValue.value}
                                        >
                                            {segmentValue.label}
                                        </SegmentedControl.Segment>
                                    ))}
                                </SegmentedControl>
                            </Col>
                        </Field>
                        <Gap size={16} />
                        <Field alignLabel>
                            <Col size={3}>
                                <Label>
                                    <Label.Text>Назначение</Label.Text>
                                    {'\u00A0'}
                                    <Label.HelpBoxSM>Укажите информацию о назначении платежа.</Label.HelpBoxSM>
                                </Label>
                            </Col>
                            <Col size={7}>
                                <TextArea rows={4} value={text} onChange={(event) => setText(event.target.value)} />
                                <Gap size={8} />
                                <AlertProcess type={EAlertType.INFO}>
                                    Не забудьте в назначении платежа указать номер и дату договора ВЭД
                                </AlertProcess>
                            </Col>
                        </Field>
                        <Row paddingBottom={false}>
                            <Col size={10}>
                                <Divider />
                            </Col>
                        </Row>
                        <Field alignLabel>
                            <Col size={3}>
                                <Label>Счёт списания</Label>
                            </Col>
                            <Col size={7}>
                                <Select 
                                    options={senders}
                                    value={sender}
                                    onChange={setSender}
                                    placeholder={'Выберите счет списания'}
                                />
                            </Col>
                        </Field>
                        <Row paddingBottom={false}>
                            <Col size={10}>
                                <Divider />
                            </Col>
                        </Row>
                        <Field alignLabel>
                            <Col size={3}>
                                <Label>
                                    <Label.Text>Получатель</Label.Text>
                                    {'\u00A0'}
                                    <Label.HelpBoxLG>
                                        Выберите получателя из списка или введите реквизиты получателя вручную.
                                    </Label.HelpBoxLG>
                                </Label>
                            </Col>
                            <Col size={7}>
                                <Suggest
                                    options={options}
                                    value={receiver}
                                    placeholder={'Начните вводить наименование получателя или выберите из списка'}
                                    notFound={false}
                                    onFocus={() => setOptions(receivers)}
                                    onSelect={setReceiver}
                                    onFilter={handleFilter}
                                    error={false}
                                />
                                <Gap size={8} />
                                <Spoiler labelExpand="Показать реквизиты" labelCollapse="Скрыть реквизиты">
                                    <SubRow>
                                        <Col>
                                            <Field>
                                                <Col size={5}>
                                                    <div style={{padding: '6px 0px'}}>
                                                        <SubLabel>{'ИНН / КИО'}</SubLabel>
                                                    </div>
                                                </Col>
                                                <Col size={7}>
                                                    <Input
                                                        value={inn}
                                                        placeholder={'Введите ИНН / КИО'}
                                                        onChange={(event) => setInn(event.target.value)}
                                                        error={error}
                                                    />
                                                    {error && renderContextError('Укажите ИНН / КИО получателя.')}
                                                </Col>
                                            </Field>
                                        </Col>
                                    </SubRow>
                                    <SubRow>
                                        <Col>
                                            <Field>
                                                <Col size={5}>
                                                    <div style={{padding: '6px 0px'}}>
                                                        <SubLabel>{'Счёт'}</SubLabel>
                                                    </div>
                                                </Col>
                                                <Col size={7}>
                                                    <MaskedInput value={account} mask="ddddd ddd d dddd ddddddd" onChange={setAccount} />
                                                </Col>
                                            </Field>
                                        </Col>
                                    </SubRow>
                                    <SubRow>
                                        <Col>
                                            <Field>
                                                <Col size={5}>
                                                    <div style={{padding: '6px 0px'}}>
                                                        <SubLabel>{'Банк'}</SubLabel>
                                                    </div>
                                                </Col>
                                                <Col size={7}>
                                                    <Input
                                                        value={bank}
                                                        placeholder={'Банк'}
                                                        onChange={(event) => setBank(event.target.value)}
                                                        disabled={true}
                                                    />
                                                </Col>
                                            </Field>
                                        </Col>
                                    </SubRow>
                                </Spoiler>
                            </Col>
                        </Field>
                        <Row paddingBottom={false}>
                            <Col size={10}>
                                <Divider />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Label>
                                    Нажимая на кнопку «Создать» вы соглашаетесь с <Link linkType={ELinkType.TEXT} size={ELinkSize.LG}>условиями предложения</Link>.
                                </Label>
                            </Col>
                        </Row>
                    </Page.Body>
                    <Page.Footer sticky>
                        <Page.Footer.Description>
                            <Page.Footer.Description.Controls>
                                <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setError(false)}>
                                    Отмена
                                </Button>
                                <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} onClick={() => setError(true)}>
                                    Создать
                                </Button>
                            </Page.Footer.Description.Controls>
                        </Page.Footer.Description>
                    </Page.Footer>
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
