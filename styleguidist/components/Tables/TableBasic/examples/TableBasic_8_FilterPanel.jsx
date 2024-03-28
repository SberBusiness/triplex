import React, {useState, useEffect} from 'react';
import {EmptytableSrvIcon64} from "@sberbusiness/icons/EmptytableSrvIcon64";
import {MasterTable} from '@sberbusiness/triplex/components/Tables/MasterTable';
import {EHorizontalAlign} from '@sberbusiness/triplex/components/Tables/TableBasic/enums';
import {Amount} from '@sberbusiness/triplex/components/Amount/Amount';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {ETextSize, EFontType, ELineType} from '@sberbusiness/triplex/components/Typography/enums';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {Link, ELinkSize, ELinkType} from '@sberbusiness/triplex/components/Link/Link';
import {MarkerStatus} from '@sberbusiness/triplex/components/MarkerStatus/MarkerStatus';
import {decorate} from '@sberbusiness/triplex/utils/accountsUtils';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {Row} from '@sberbusiness/triplex/components/Row/Row';
import {Field} from '@sberbusiness/triplex/components/Field/Field';
import {Label} from '@sberbusiness/triplex/components/Label/Label';
import {Select} from '@sberbusiness/triplex/components/Select/Select';
import {Tag} from '@sberbusiness/triplex/components/Tag/Tag';
import {TagGroup} from '@sberbusiness/triplex/components/Tag/TagGroup';
import {ETagSize} from '@sberbusiness/triplex/components/Tag/enums';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums'

const [open, setOpen] = useState(false);
const [applied, setApplied] = useState(false);
const [filters, setFilters] = useState({
    counterparty: {value: 'Все', label: 'Все'},
    status: {value: 'Все', label: 'Все'},
})

useEffect(() => {
    if (applied) {
        setApplied(filters.counterparty.value != 'Все' || filters.status.value != 'Все');
    }
}, [filters]);

const counterparties = ['Ромашка', 'Росинка', 'Белоснежка', 'Дюймовочка', 'Золушка'];
const statuses = ['Исполнено', 'Ошибка', 'Предупреждение', 'Ожидание'];

const options = {
    counterparty: [
        {value: 'Все', label: 'Все'},
        ...counterparties.map(label => ({value: label, label}))
    ],
    status: [
        {value: 'Все', label: 'Все'},
        ...statuses.map(label => ({value: label, label}))
    ]
};

const data = Array.from({length: 10}, ((value, index) => (
    {
        number: 1397450 + index,
        counterparty: index % 5,
        status: index % 4,
        sum: '1220000000',
    }
)));

const columns = [
    {
        fieldKey: 'number',
        label: '№',
    },
    {
        fieldKey: 'value',
        label: 'Значение',
    },
    {
        fieldKey: 'sum',
        label: 'Сумма',
        horizontalAlign: EHorizontalAlign.RIGHT,
        renderCell: (value) => value && <Amount value={value} currency="RUB" />,
    },
    {
        fieldKey: 'status',
        label: 'Статус',
    },
];

const getTableRecord = (record) => (
    {
        rowKey: `table-basic-row-${record.number}`,
        rowData: {
            number: record.number,
            value: (
                <>
                    <Text size={ETextSize.B1} type={EFontType.GENERAL} line={ELineType.EXTRA}>
                        {`Платежное поручение ООО ${counterparties[record.counterparty]}`}
                        <br />
                        {decorate(`40702810205275000000`)}
                    </Text>
                    <Gap size={4} />
                    <Text tag="div" size={ETextSize.B2} type={EFontType.SECONDARY}>
                        В том числе НДС 20%
                    </Text>
                </>
            ),
            sum: record.sum,
            status: (
                <MarkerStatus status={record.status} description="Пояснения к статусу">
                    {statuses[record.status]}
                </MarkerStatus>
            )
        }
    }
);

const getTableData = () => (
    data.filter(record => (
        !applied ||
        (filters.counterparty.value == 'Все' ||
            counterparties[record.counterparty] == filters.counterparty.value) &&
        (filters.status.value == 'Все' || statuses[record.status] == filters.status.value)
    ))
        .map(getTableRecord)
);

const applyFilters = () => {
    if (filters.counterparty.value != 'Все' || filters.status.value != 'Все') {
        setApplied(true);
    }
};

const clearFilters = (event) => {
    event.preventDefault();
    setFilters({
        counterparty: {value: 'Все', label: 'Все'},
        status: {value: 'Все', label: 'Все'},
    })
};

const changeFilters = (event) => {
    event.preventDefault();
    setApplied(false);
};

const hideFilterPanel = (event) => {
    event.preventDefault();
    setOpen(false);
};

const showFilterPanel = (event) => {
    event.preventDefault();
    setOpen(true);
};

const renderTableFilterPanelLinks = () => (
    <MasterTable.TableFilterPanel.Links>
        {applied ? (
            <>
                <Link href="#" linkType={ELinkType.TEXT} size={ELinkSize.LG} onClick={clearFilters}>
                    Сбросить всё
                </Link>
                <Link href="#" linkType={ELinkType.TEXT} size={ELinkSize.LG} onClick={changeFilters}>
                    Изменить фильтры
                </Link>
            </>
        ) : open ? (
            <Link href="#" linkType={ELinkType.TEXT} size={ELinkSize.LG} onClick={hideFilterPanel}>
                Скрыть фильтры
            </Link>
        ) : (
            <Link href="#" linkType={ELinkType.TEXT} size={ELinkSize.LG} onClick={showFilterPanel}>
                Фильтры
            </Link>
        )}
    </MasterTable.TableFilterPanel.Links>
);

const renderFilterPanelCol = ({label, component}) => (
    <Col key={`${component.props['id']}-col`} size={6}>
        <Row>
            <Col>
                <Field alignLabel>
                    <Col size={4}>
                        <Label>
                            <Label.Text id={component.props['aria-labelledby']}>
                                {label}
                            </Label.Text>
                        </Label>
                    </Col>
                    <Col size={8}>{component}</Col>
                </Field>
            </Col>
        </Row>
    </Col>
);

const renderFilterPanelRow = (items) => (
    <Row>
        {items.map(renderFilterPanelCol)}
    </Row>
);

const renderFilterPanelFilters = () => (
    <>
        {renderFilterPanelRow([
            {
                label: 'Контрагент',
                component: (
                    <Select
                        id="table-basic-filter-counterparty"
                        value={filters.counterparty}
                        options={options.counterparty}
                        aria-labelledby="table-basic-filter-counterparty-label"
                        onChange={(counterparty) => setFilters({...filters, counterparty})}
                    />
                ),
            },
            {
                label: 'Статус',
                component: (
                    <Select
                        id="table-basic-filter-status"
                        value={filters.status}
                        options={options.status}
                        aria-labelledby="table-basic-filter-status-label"
                        onChange={(status) => setFilters({...filters, status})}
                    />
                ),
            }
        ])}
        <Gap size={8} />
        <div style={{textAlign: 'right'}}>
            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM} onClick={clearFilters}>
                Сбросить
            </Button>
            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.SM} onClick={applyFilters}>
                Применить
            </Button>
        </div>
    </>
);

const handleRemoveTag = (id) => {
    switch (id) {
        case "tag-filter-counterparty":
            return setFilters({...filters, counterparty: {value: 'Все', label: 'Все'}});
        case "tag-filter-status":
            return setFilters({...filters, status: {value: 'Все', label: 'Все'}});
    }
};

const renderFilterPanelTags = () => {
    const tags = [];

    if (filters.counterparty.value != 'Все') {
        tags.push(
            <Tag
                key="tag-filter-counterparty"
                id="tag-filter-counterparty"
                size={ETagSize.MD}
                onRemove={handleRemoveTag}
            >
                {`Контрагент: ${filters.counterparty.value}`}
            </Tag>
        )
    }

    if (filters.status.value != 'Все') {
        tags.push(
            <Tag
                key="tag-filter-status"
                id="tag-filter-status"
                size={ETagSize.MD}
                onRemove={handleRemoveTag}
            >
                {`Статус: ${filters.status.value}`}
            </Tag>
        )
    }

    return <TagGroup size={ETagSize.MD}>{tags}</TagGroup>;
};

const renderFilterPanel = () => (
    <MasterTable.FilterPanel data-test-id="TestTable__MasterTable.FilterPanel">
        {applied ? renderFilterPanelTags() : renderFilterPanelFilters()}
    </MasterTable.FilterPanel>
);

const renderNoData = () => (
    <>
        <EmptytableSrvIcon64 />
        <Text tag="div" size={ETextSize.B1} type={EFontType.GENERAL} line={ELineType.EXTRA}>
            Нет данных, но можно предложить какие-то действия для заполнения таблицы
        </Text>
        <Gap size={24} />
        <div>
            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
                Button Name
            </Button>
            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.SM}>
                Button Name
            </Button>
        </div>
    </>
);

<MasterTable>
    <MasterTable.TableFilterPanel>
        {renderTableFilterPanelLinks()}
    </MasterTable.TableFilterPanel>
    {open && renderFilterPanel()}
    <MasterTable.TableBasic columns={columns} data={getTableData()} renderNoData={renderNoData} />
</MasterTable>