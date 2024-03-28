import React, {useState, useEffect, useRef} from 'react';
import {LightBox} from '@sberbusiness/triplex/components/LightBox/LightBox';
import {Page} from '@sberbusiness/triplex/components/Page/Page';
import {Row} from '@sberbusiness/triplex/components/Row/Row';
import {Col} from '@sberbusiness/triplex/components/Col/Col'
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {Field} from '@sberbusiness/triplex/components/Field/Field';
import {Label} from '@sberbusiness/triplex/components/Label/Label';
import {DocumentNumberEdit} from '@sberbusiness/triplex/components/DocumentNumberEdit/DocumentNumberEdit';
import {AlertProcess} from '@sberbusiness/triplex/components/Alert/AlertProcess/AlertProcess';
import {AlertContext} from '@sberbusiness/triplex/components/Alert/AlertContext/AlertContext';
import {EAlertType} from '@sberbusiness/triplex/components/Alert/EAlertType'
import {UnorderedList} from '@sberbusiness/triplex/components/List/UnorderedList';
import {Input} from '@sberbusiness/triplex/components/Input/Input';
import {AmountInput} from '@sberbusiness/triplex/components/AmountInput/AmountInput';
import {MaskedInput} from '@sberbusiness/triplex/components/MaskedInput/MaskedInput';
import {Select} from '@sberbusiness/triplex/components/Select/Select';
import {SegmentedControl, ESegmentedControlType} from '@sberbusiness/triplex/components/SegmentedControl/SegmentedControl';
import {TextArea} from '@sberbusiness/triplex/components/TextArea/TextArea';
import {Divider} from '@sberbusiness/triplex/components/Divider/Divider';
import {Suggest} from '@sberbusiness/triplex/components/Suggest/Suggest';
import {Spoiler} from '@sberbusiness/triplex/components/Spoiler/Spoiler';
import {SubRow} from '@sberbusiness/triplex/components/SubRow/SubRow'
import {SubLabel} from '@sberbusiness/triplex/components/SubLabel/SubLabel';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/components/Link/Link';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {Stepper} from '@sberbusiness/triplex/components/Stepper/Stepper';
import {EStepperStepIconType} from '@sberbusiness/triplex/components/Stepper/StepperStepIcon';
import {HelpBox} from '@sberbusiness/triplex/components/HelpBox/HelpBox';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {triplexInfo} from '../../tools/Triplex-info.js';

const steps = [
    {
        id: 'stepper-step-1',
        label: 'Completed',
        icon: <Stepper.Step.Icon type={EStepperStepIconType.FILLED} />,
    },
    {
        id: 'stepper-step-2',
        label: 'Completed',
        icon: <Stepper.Step.Icon type={EStepperStepIconType.FILLED} />,
    },
    {
        id: 'stepper-step-3',
        label: 'In propgress',
        icon: <Stepper.Step.Icon type={EStepperStepIconType.SUCCESS} />,
    },
    {
        id: 'stepper-step-4',
        label: 'Available',
    },
];

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

const [open, setOpen] = useState(true);
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
const [selectedStepId, setSelectedStepId] = useState('stepper-step-3');
const lightBoxRef = useRef(null);
const [shadow, setShadow] = useState(false);

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

const handleScroll = () => {
    if (lightBoxRef.current) {
        setShadow(lightBoxRef.current.scrollTop > 0)
    }
}

useEffect(() => {
    if (receiver) {
        setInn('4416432600');
        setAccount('40702810938000004049');
        setBank('ПАО СБЕРБАНК г. Москва');
    }
}, [receiver]);

<>
    {open ? (
        <LightBox onScroll={handleScroll} forwardRef={lightBoxRef}>
            <LightBox.Content>
                <Page>
                    <Page.Header sticky>
                        <Page.Header.Title>
                            <Page.Header.Title.Content>
                                <Page.Header.Title.Content.Text>Рублёвый платёж контрагенту</Page.Header.Title.Content.Text>
                                <Page.Header.Title.Content.Subhead>
                                    <DocumentNumberEdit
                                        value={number}
                                        onChange={setNumber}
                                        buttonLabel="Изменить"
                                        emptyNumberButtonLabel="Задать номер"
                                        emptyNumberLabel="Номер документа будет присвоен автоматически"
                                        numberLabel="Документ №"
                                    />
                                </Page.Header.Title.Content.Subhead>
                            </Page.Header.Title.Content>
                        </Page.Header.Title>
                        <Page.Header.Subhead withoutPaddings>
                            <Stepper.Wrapper shadow={shadow}>
                                <Stepper steps={steps} onSelectStep={setSelectedStepId} selectedStepId={selectedStepId} />
                                <Stepper.Progress value={40} />
                            </Stepper.Wrapper>
                        </Page.Header.Subhead>
                    </Page.Header>
                    <Page.Body>
                      {/*<button onClick={() => {*/}
                      {/*  triplexInfo.init();*/}
                      {/*}}>Вкл</button>*/}
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
                                    <HelpBox tooltipSize={ETooltipSize.SM}>Выберите способ расчета и ставку НДС.</HelpBox>
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
                                    <HelpBox tooltipSize={ETooltipSize.SM}>Укажите информацию о назначении платежа.</HelpBox>
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
                                <Divider marginTopSize={24} marginBottomSize={16} />
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
                                <Divider marginTopSize={24} marginBottomSize={16} />
                            </Col>
                        </Row>
                        <Field alignLabel>
                            <Col size={3}>
                                <Label>
                                    <Label.Text>Получатель</Label.Text>
                                    {'\u00A0'}
                                    <HelpBox tooltipSize={ETooltipSize.LG}>
                                        Выберите получателя из списка или введите реквизиты получателя вручную.
                                    </HelpBox>
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
                                                    <MaskedInput value={account} mask={MaskedInput.presets.masks.account} onChange={(event) => setAccount(event.target.value)} />
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
                                                        disabled
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
                                <Divider marginTopSize={24} marginBottomSize={16} />
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

            <LightBox.Controls>
                <LightBox.Controls.Close onClick={() => setOpen(false)} />
            </LightBox.Controls>
        </LightBox>
    ) : (
        <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpen(true)}>
            Open Form
        </Button>
    )}
</>

