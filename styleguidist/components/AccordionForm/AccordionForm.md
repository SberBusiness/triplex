```jsx
import {Row} from '@sberbusiness/triplex/components/Row/Row';
import {SubRow} from '@sberbusiness/triplex/components/SubRow/SubRow';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {Label} from '@sberbusiness/triplex/components/Label/Label';
import {Input} from '@sberbusiness/triplex/components/Input/Input';
import {AlertContext} from '@sberbusiness/triplex/components/Alert/AlertContext/AlertContext';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {AlertProcess} from '@sberbusiness/triplex/components/Alert/AlertProcess/AlertProcess';
import {UnorderedList} from '@sberbusiness/triplex/components/List/UnorderedList';
import {EStepStatus} from '@sberbusiness/triplex/components/Step/enums';
import {Field} from '@sberbusiness/triplex/components/Field/Field';
import {Select} from '@sberbusiness/triplex/components/Select/Select';
import {EAlertType} from '@sberbusiness/triplex/components/Alert/EAlertType';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/components/Link/Link';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

const selectOptions = [
    {value: 'i1', label: 'Первый'},
    {value: 'i2', label: 'Второй'},
    {value: 'i3', label: 'Третий'},
    {value: 'i4', label: 'Четвертый'},
    {value: 'i5', label: 'Пятый'},
    {value: 'i6', label: 'Шестой'},
    {value: 'i7', label: 'Седьмой'},
    {value: 'i8', label: 'Восьмой'},
];

const [selectValue, setSelectValue] = React.useState(undefined);

const predefinedBodies = [
    <Row key={0}>
        <Col>
            <Row>
                <Col>
                    <Field alignLabel>
                        <Col size={3}>
                            <Label>
                                <Label.Text htmlFor="accordion-form-input-1">
                                    Текст в 1 строку
                                </Label.Text>
                                <Label.Description>Текст пояснения</Label.Description>
                            </Label>
                        </Col>
                        <Col size={8}>
                            <Input id="accordion-form-input-1" />
                        </Col>
                    </Field>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Field alignLabel>
                        <Col size={3}>
                            <Label>
                                <Label.Text htmlFor="accordion-form-input-2">
                                    Текст в 1 строку
                                </Label.Text>
                                <Label.Description>Текст пояснения</Label.Description>
                            </Label>
                        </Col>
                        <Col size={8}>
                            <Input id="accordion-form-input-2" />
                        </Col>
                    </Field>
                </Col>
            </Row>
        </Col>
    </Row>,
    <Row key={1}>
        <Col>
            <Row>
                <Col>
                    <Field alignLabel>
                        <Col size={3}>
                            <Label>
                                <Label.Text htmlFor="accordion-form-input-3">
                                    Текст в 1 строку
                                </Label.Text>
                                <Label.Description>Текст пояснения</Label.Description>
                            </Label>
                        </Col>
                        <Col size={8}>
                            <Input id="accordion-form-input-3" />
                        </Col>
                    </Field>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Field alignLabel>
                        <Col size={3}>
                            <Label>
                                <Label.Text id="accordion-form-select-1">
                                    Текст в 1 строку
                                </Label.Text>
                                <Label.Description>Текст пояснения</Label.Description>
                            </Label>
                        </Col>
                        <Col size={8}>
                            <Select
                                value={selectValue}
                                onChange={setSelectValue}
                                options={selectOptions}
                                aria-labelledby="accordion-form-select-1"
                            />
                        </Col>
                    </Field>
                </Col>
            </Row>
        </Col>
    </Row>,
    <Row key={2}>
        <Col>
            <Row>
                <Col>
                    <AlertProcess type={EAlertType.WARNING}>
                        Максимальное количество символов в одном сообщении об ошибке — 210. Объясняем
                        пользователю, что нужно сделать: указываем недостающую информацию для
                        пользователя, точнее что нужно дозаполнить, и кавычки не ставим.
                        <Gap size={8} />
                        <UnorderedList
                            values={[
                                'Допустимое количество сообщений об ошибке — 3. Максимальное' +
                                'количество символов одного сообщения в списке — 180 символов.',
                                'Допустимое количество сообщений об ошибке — 3. Максимальное' +
                                'количество символов одного сообщения в списке  — 180 символов.',
                            ]}
                        />
                    </AlertProcess>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Field alignLabel>
                        <Col size={3}>
                            <Label>
                                <Label.Text htmlFor="accordion-form-input-4">
                                    Текст в 1 строку
                                </Label.Text>
                                <Label.Description>Текст пояснения</Label.Description>
                                <Label.CodeNumber>000</Label.CodeNumber>
                            </Label>
                        </Col>
                        <Col size={8}>
                            <Input id="accordion-form-input-4" />
                        </Col>
                    </Field>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Field alignLabel>
                        <Col size={3}>
                            <Label>
                                <Label.Text htmlFor="accordion-form-input-5">
                                    Текст в 1 строку
                                </Label.Text>
                            </Label>
                        </Col>
                        <Col size={8}>
                            <Input id="accordion-form-input-5" />
                        </Col>
                    </Field>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Field alignLabel>
                        <Col size={3}>
                            <Label>
                                <Label.Text htmlFor="accordion-form-input-6">
                                    Текст в 1 строку
                                </Label.Text>
                                <Label.Description>Текст пояснения</Label.Description>
                            </Label>
                        </Col>
                        <Col size={8}>
                            <Input id="accordion-form-input-6" />
                        </Col>
                    </Field>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Field alignLabel>
                        <Col size={3}>
                            <Label>
                                <Label.Text htmlFor="accordion-form-input-7">
                                    Текст в 1 строку
                                </Label.Text>
                                <Label.Description>Текст пояснения</Label.Description>
                            </Label>
                        </Col>
                        <Col size={8}>
                            <SubRow>
                                <Col>
                                    <Input id="accordion-form-input-7" />
                                </Col>
                            </SubRow>
                            <SubRow>
                                <Col>
                                    <AlertContext type={EAlertType.INFO}>
                                        <span>
                                            Текст информационного сообщения может быть больше одной
                                            строки.{' '}
                                            <Link linkType={ELinkType.TEXT} size={ELinkSize.SM}>
                                                Ссылка
                                            </Link>{' '}
                                            может использоваться.
                                        </span>
                                    </AlertContext>
                                </Col>
                            </SubRow>
                        </Col>
                    </Field>
                </Col>
            </Row>
        </Col>
    </Row>,
];

const [state, setState] = React.useState({
    items: [
        {
            status: EStepStatus.SUCCESS,
        },
        {
            status: EStepStatus.WAIT,
        },
        {
            status: EStepStatus.WARNING,
        },
        {
            status: EStepStatus.DISABLED,
        },
        {
            status: EStepStatus.SUCCESS,
        },
    ],
});

const [viewOptions, setViewOptions] = React.useState({
    onlyOne: false,
    firstIsNoRemove: false,
    lastIsDisabled: false,
    independentMode: false,
    current: '0',
});

const handleRemoveItem = (id) => {
    const ids = viewOptions.current.split(' ');
    const idx = ids.indexOf(id);
    if (idx !== -1) {
        ids.splice(idx, 1);
        setViewOptions({...viewOptions, current: ids.join(' ')});
    }
    state.items.splice(parseInt(id), 1);
    setState({
        ...state,
        items: state.items,
    });
};

const handleToggle = (newToggle, id) => {
    let ids = viewOptions.current.split(' ');
    const idx = ids.indexOf(String(id));
    if (newToggle) {
        if (idx === -1) {
            ids = viewOptions.independentMode ? [...ids, id] : [id];
            setViewOptions({...viewOptions, current: ids.join(' ')});
        }
    } else {
        if (idx !== -1) {
            ids.splice(idx, 1);
            setViewOptions({...viewOptions, current: ids.join(' ')});
        }
    }
};

const createAddHandler = (idx) => () => {
    setState({
        ...state,
        items: [
            ...state.items.slice(0, idx + 1),
            {
                status: state.items[idx].status,
            },
            ...state.items.slice(idx + 1),
        ],
    });
};

const createNextHandler = (idx) => () => {
    setViewOptions({
        ...viewOptions,
        current: idx >= state.items.length - 1 ? '0' : (idx + 1).toString(),
    });
};

const updateViewOptions = (newViewOptions) => {
    const newState = {
        ...state,
        items: state.items.map((item) => ({
            ...item,
            noRemove: false,
            disabled: false,
        })),
    };
    newState.items[0].noRemove = newViewOptions.firstIsNoRemove;
    newState.items[newState.items.length - 1].disabled = newViewOptions.lastIsDisabled;

    setViewOptions((prevViewOptions) => ({...prevViewOptions, ...newViewOptions}));
    setState(newState);
};

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Checkbox
            checked={viewOptions.firstIsNoRemove}
            setChecked={(checked) => updateViewOptions({firstIsNoRemove: checked})}
        >
            Первый без крестика
        </ComponentControlPanel.Checkbox>
        <ComponentControlPanel.Checkbox
            checked={viewOptions.lastIsDisabled}
            setChecked={(checked) => updateViewOptions({lastIsDisabled: checked})}
        >
            Последний заблокирован
        </ComponentControlPanel.Checkbox>
        <ComponentControlPanel.Checkbox
            checked={viewOptions.onlyOne}
            setChecked={(checked) => updateViewOptions({onlyOne: checked})}
        >
            Только один
        </ComponentControlPanel.Checkbox>
        <ComponentControlPanel.Checkbox
            checked={viewOptions.independentMode}
            setChecked={(checked) => updateViewOptions({independentMode: checked})}
        >
            Независимое открытие
        </ComponentControlPanel.Checkbox>
    </ComponentControlPanel>
);

<>
    {renderControlPanel()}
    <div style={{paddingRight: '20px'}}>
        <AccordionForm onToggle={handleToggle}>
            {(viewOptions.onlyOne && state.items.length ? [state.items[0]] : state.items).map((item, idx) => (
                <AccordionForm.Item
                    id={idx.toString()}
                    key={idx}
                    opened={viewOptions.current.split(' ').indexOf(idx.toString()) !== -1}
                    status={item.status}
                    disabled={item.disabled || (viewOptions.onlyOne && viewOptions.lastIsDisabled)}
                    stepHint={`Текстовая подсказка к шагу вкладки ${item.id || idx + 1}`}
                    onRemove={item.noRemove ? undefined : handleRemoveItem}
                    data-test-id={`accordion-item-${idx}`}
                    title={<AccordionForm.Item.Title>{`Заголовок вкладки ${item.id || idx + 1}`}</AccordionForm.Item.Title>}
                >
                    <AccordionForm.Item.Content>{predefinedBodies[idx % predefinedBodies.length]}</AccordionForm.Item.Content>
                    <AccordionForm.Item.Footer>
                        <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM} onClick={createAddHandler(idx)}>
                            Добавить блок
                        </Button>
                        <Button theme={EButtonTheme.GENERAL} size={EButtonSize.SM} onClick={createNextHandler(idx)}>
                            Далее
                        </Button>
                    </AccordionForm.Item.Footer>
                </AccordionForm.Item>
            ))}
        </AccordionForm>
    </div>
</>
```
