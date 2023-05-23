/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {Row} from '@sberbusiness/triplex/desktop/components/Row/Row';
import {SubRow} from '@sberbusiness/triplex/desktop/components/SubRow/SubRow';
import {Col} from '@sberbusiness/triplex/desktop/components/Col/Col';
import {Label} from '@sberbusiness/triplex/desktop/components/Label/Label';
import {Input} from '@sberbusiness/triplex/desktop/components/Input/Input';
import {AlertContext} from '@sberbusiness/triplex/desktop/components/Alert/AlertContext/AlertContext';
import {AccordionForm} from '@sberbusiness/triplex/desktop/components/AccordionForm/AccordionForm';
import {Button} from '@sberbusiness/triplex/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {AlertProcess} from '@sberbusiness/triplex/desktop/components/Alert/AlertProcess/AlertProcess';
import {UnorderedList} from '@sberbusiness/triplex/desktop/components/List/UnorderedList';
import {EStepStatus} from '@sberbusiness/triplex/desktop/components/Step/enums';
import {Field} from '@sberbusiness/triplex/desktop/components/Field/Field';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';
import {ISelectOption, Select} from '@sberbusiness/triplex/desktop/components/Select/Select';
import {EAlertType} from '@sberbusiness/triplex/desktop/components/Alert/EAlertType';
import {Gap} from '@sberbusiness/triplex/desktop/components/Gap/Gap';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/desktop/components/Link/Link';

export const AccordionFormExample = () => {
    const selectOptions: ISelectOption[] = [
        {value: 'i1', label: 'Первый'},
        {value: 'i2', label: 'Второй'},
        {value: 'i3', label: 'Третий'},
        {value: 'i4', label: 'Четвертый'},
        {value: 'i5', label: 'Пятый'},
        {value: 'i6', label: 'Шестой'},
        {value: 'i7', label: 'Седьмой'},
        {value: 'i8', label: 'Восьмой'},
    ];
// eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectValue, setSelectValue] = useState<ISelectOption | undefined>(undefined);

    const predefinedBodies = [
        <Row key={0}>
            <Col>
                <Row>
                    <Col>
                        <Field alignLabel>
                            <Col size={3}>
                                <Label>
                                    <Label.Text htmlFor="accordion-form-input1">Текст в 1 строку</Label.Text>
                                    <Label.Description>Текст пояснения</Label.Description>
                                </Label>
                            </Col>
                            <Col size={8}>
                                <Input id="accordion-form-input1" />
                            </Col>
                        </Field>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Field alignLabel>
                            <Col size={3}>
                                <Label>
                                    <Label.Text htmlFor="accordion-form-input2">Текст в 1 строку</Label.Text>
                                    <Label.Description>Текст пояснения</Label.Description>
                                </Label>
                            </Col>
                            <Col size={8}>
                                <Input id="accordion-form-input2" />
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
                                    <Label.Text htmlFor="accordion-form-input2.1">Текст в 1 строку</Label.Text>
                                    <Label.Description>Текст пояснения</Label.Description>
                                </Label>
                            </Col>
                            <Col size={8}>
                                <Input id="accordion-form-input2.1" />
                            </Col>
                        </Field>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Field alignLabel>
                            <Col size={3}>
                                <Label>
                                    <Label.Text id="select_id1">Текст в 1 строку</Label.Text>
                                    <Label.Description>Текст пояснения</Label.Description>
                                </Label>
                            </Col>
                            <Col size={8}>
                                <Select value={selectValue} onChange={setSelectValue} options={selectOptions} aria-labelledby="select_id1" />
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
                            Максимальное количество символов в одном сообщении об ошибке — 210. Объясняем пользователю, что нужно сделать:
                            указываем недостающую информацию для пользователя, точнее что нужно дозаполнить, и кавычки не ставим.
                            <Gap size={8}/>
                            <UnorderedList
                                values={[
                                    'Допустимое количество сообщений об ошибке — 3. Максимальное количество символов одного сообщения в списке  — 180 символов.',
                                    'Допустимое количество сообщений об ошибке — 3. Максимальное количество символов одного сообщения в списке  — 180 символов.',
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
                                    <Label.Text htmlFor="accordion-form-input3">Текст в 1 строку</Label.Text>
                                    <Label.Description>Текст пояснения</Label.Description>
                                    <Label.CodeNumber>000</Label.CodeNumber>
                                </Label>
                            </Col>
                            <Col size={8}>
                                <Input id="accordion-form-input3" />
                            </Col>
                        </Field>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Field alignLabel>
                            <Col size={3}>
                                <Label>
                                    <Label.Text htmlFor="accordion-form-input4">Текст в 1 строку</Label.Text>
                                </Label>
                            </Col>
                            <Col size={8}>
                                <Input id="accordion-form-input4" />
                            </Col>
                        </Field>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Field alignLabel>
                            <Col size={3}>
                                <Label>
                                    <Label.Text htmlFor="accordion-form-input5">Текст в 1 строку</Label.Text>
                                    <Label.Description>Текст пояснения</Label.Description>
                                </Label>
                            </Col>
                            <Col size={8}>
                                <Input id="accordion-form-input5" />
                            </Col>
                        </Field>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Field alignLabel>
                            <Col size={3}>
                                <Label>
                                    <Label.Text htmlFor="accordion-form-input6">Текст в 1 строку</Label.Text>
                                    <Label.Description>Текст пояснения</Label.Description>
                                </Label>
                            </Col>
                            <Col size={8}>
                                <SubRow>
                                    <Col>
                                        <Input id="accordion-form-input6" />
                                    </Col>
                                </SubRow>
                                <SubRow>
                                    <Col>
                                        <AlertContext type={EAlertType.INFO}>
                                        <span>
                                            Текст информационного сообщения может быть больше одной строки.{' '}
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

    const [state, setState] = useState({
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

    const [viewOptions, setViewOptions] = useState({
        onlyOne: false,
        firstIsNoRemove: false,
        lastIsDisabled: false,
        independentMode: false,
        focusIdx: '-1',
        clickFocus: false,
        current: '0',
    });

    const handleRemoveItem = (id: string) => {
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

    const handleToggle = (newToggle: boolean, id: string) => {
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

    const createAddHandler = (idx: number) => () => {
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

    const createNextHandler = (idx: number) => () => {
        setViewOptions({
            ...viewOptions,
            current: idx >= state.items.length - 1 ? '0' : (idx + 1).toString(),
        });
    };

    const updateViewOptions = (newViewOptions: any) => {
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

    /**
     * Ну а что делать если не хватает симуляции нажатия и отпускания.
     */
    const mousePolyfill = (type: any) => {
        // Это не стрелочная функция намеренно, чтобы получить в this контекст кнопки.
        return function () {
            const e = document.createEvent('MouseEvents');
            e.initEvent(type, true, true);
            // @ts-ignore
            this.dispatchEvent(e);
        };
    };
// @ts-ignore
    HTMLButtonElement.prototype.mousedown = mousePolyfill('mousedown');
// @ts-ignore
    HTMLButtonElement.prototype.mouseup = mousePolyfill('mouseup');

// eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const focusIdx = parseInt(viewOptions.focusIdx);
        if (focusIdx !== -1) {
            setTimeout(() => {
                const buttons = document.querySelectorAll('ul[class^="accordion__"] li[class^="item__"] button[class^="header__"]');
                const button = buttons[focusIdx];
                if (button) {
                    // @ts-ignore
                    button.focus();
                    if (viewOptions.clickFocus) {
                        // На самом деле у кнопки нет таких методов, просто для тестов пришлось заполифиллить.
                        // @ts-ignore
                        button.mousedown();
                        // @ts-ignore
                        button.mouseup();
                        // @ts-ignore
                        button.click();
                    }
                }
            }, 250);
        }
    }, [viewOptions.focusIdx, viewOptions.clickFocus]);

    const checkboxOptions = [
        {
            id: 'firstIsNoRemove',
            label: 'Первый без крестика',
            checked: viewOptions.firstIsNoRemove,
            onChange: (checked: boolean) => updateViewOptions({firstIsNoRemove: checked}),
        },
        {
            id: 'lastIsDisabled',
            label: 'Последний заблокирован',
            checked: viewOptions.lastIsDisabled,
            onChange: (checked: boolean) => updateViewOptions({lastIsDisabled: checked}),
        },
        {
            id: 'onlyOne',
            label: 'Только один',
            checked: viewOptions.onlyOne,
            onChange: (checked: boolean) => updateViewOptions({onlyOne: checked}),
        },
        {
            id: 'independentMode',
            label: 'Независимое открытие',
            checked: viewOptions.independentMode,
            onChange: (checked: boolean) => updateViewOptions({independentMode: checked}),
        },
        {
            id: 'clickFocus',
            label: 'Фокусим мышью, для тестирования другого цвета рамки',
            hidden: true,
            checked: viewOptions.clickFocus,
            onChange: (checked: boolean) => updateViewOptions({clickFocus: checked}),
        },
    ];

    const inputOptions = [
        {
            id: 'focusIdx',
            hidden: true,
            value: viewOptions.focusIdx,
            onChange: (value: any) => updateViewOptions({focusIdx: value}),
        },
        {
            id: 'current',
            hidden: true,
            value: viewOptions.current,
            onChange: (value: any) => updateViewOptions({current: value}),
        },
    ];

return (
    <>
        <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions}/>
        <ComponentPreview>
            <div style={{paddingRight: '16px'}}>
                <AccordionForm onToggle={handleToggle}>
                    {(viewOptions.onlyOne && state.items.length ? [state.items[0]] : state.items).map((item, idx) => (
                        <AccordionForm.Item
                            id={idx.toString()}
                            key={idx}
                            opened={viewOptions.current.split(' ').indexOf(idx.toString()) !== -1}
                            status={item.status}
                            // @ts-ignore
                            disabled={item.disabled || (viewOptions.onlyOne && viewOptions.lastIsDisabled)}
                            // @ts-ignore
                            stepHint={`Текстовая подсказка к шагу вкладки ${item.id || idx + 1}`}
                            // @ts-ignore
                            onRemove={item.noRemove ? undefined : handleRemoveItem}
                            data-test-id={`accordion-item-${idx}`}
                            // @ts-ignore
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
        </ComponentPreview>
    </>);
}