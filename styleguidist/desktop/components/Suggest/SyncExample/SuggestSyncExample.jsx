import React, {useState} from 'react';
import {Col} from '@sbbol/web-library/desktop/components/Col/Col';
import {Label} from '@sbbol/web-library/desktop/components/Label/Label';
import {Row} from '@sbbol/web-library/desktop/components/Row/Row';
import {Suggest} from '@sbbol/web-library/desktop/components/Suggest/Suggest';
import {Field} from '@sbbol/web-library/desktop/components/Field/Field';

const data = [
    {   
        id: 0,
        value: "1",
        label: "Анапсиды", 
        labelReactNode: (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>Анапсиды</div>
                <div>0001231</div>
            </div>)
    },
    {value: "2", label: "Синапсиды", id: 1},
    {value: "3", label: "Диапсиды", id: 2},
    {value: "4", label: "В кладистике нет настолько длинных названиий отрядов/подотрядов, чтобы вылезать за границы дозволенного в саджесте", id: 3},
];

const SuggestSyncExample = () => {
    // работа с данными
    const [state, setState] = useState({
        options: data,
        value: null,
        notFound: false,
    });

    const onFocus = () => setState({
        ...state,
        notFound: false,
    });

    const handleSelect = (value) => {
        setState({
            ...state,
            value,
            // эмуляция внешнего обновления списка
            options: [...state.options],
        });
    };

    const filterFn = (query) => {
        const options = data.filter((item) => {
           const q = query.toLowerCase();
           const i = item.label.toLowerCase();

           return i.indexOf(q) !== -1;
        });
        setState({
            ...state,
            options,
            notFound: options.length === 0,
        })
    }

    return (
        <>
            <Row>
                <Col>
                    <Field alignLabel>
                        <Col size={3}>
                            <Label>
                                <Label.Text>Suggest</Label.Text>
                            </Label>
                        </Col>
                        <Col size={9}>
                            <Suggest
                                data-test-id="sync-suggest"
                                loading={state.isLoading}
                                value={state.value}
                                onFilter={filterFn}
                                options={state.options}
                                onFocus={onFocus}
                                onSelect={handleSelect}
                                saveFilterOnFocus={false}
                                tooltipHint="Совпадений не найдено"
                                isTooltipOpened={state.notFound}
                                placeholder="Начните вводить"
                            />
                        </Col>
                    </Field>
                </Col>
            </Row>
        </>
    );
};

// tslint:disable-next-line:no-unused-expression
<SuggestSyncExample />;
