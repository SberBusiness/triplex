import React, {useState} from 'react';
import {EmptytableSrvIcon64} from '@sberbusiness/icons/EmptytableSrvIcon64';
import {MasterTable} from '@sberbusiness/triplex/components/Tables/MasterTable';
import {EHorizontalAlign} from '@sberbusiness/triplex/components/Tables/TableBasic/enums';
import {Amount} from '@sberbusiness/triplex/components/Amount/Amount';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {ETextSize, EFontType, ELineType} from '@sberbusiness/triplex/components/Typography/enums';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {Link, ELinkSize, ELinkType} from '@sberbusiness/triplex/components/Link/Link';
import {MarkerStatus} from '@sberbusiness/triplex/components/MarkerStatus/MarkerStatus';
import {EMarkerStatus} from '@sberbusiness/triplex/components/Marker/enums';
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
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';

const counterparties = ['Ромашка', 'Росинка', 'Белоснежка', 'Дюймовочка', 'Золушка'];
const statuses = ['Исполнено', 'Ошибка', 'Предупреждение', 'Ожидание'];

const options = {
    counterparty: ['Все', ...counterparties].map((label, index) => ({
        id: `option-counterparty-${index}`,
        value: label,
        label: label,
    })),
    status: ['Все', ...statuses].map((label, index) => ({
        id: `option-status-${index}`,
        value: label,
        label: label,
    })),
};

const defaultFilters = {
    counterparty: options.counterparty[0],
    status: options.status[0],
};

const [currentFilters, setCurrentFilters] = useState(defaultFilters);
const [appliedFilters, setAppliedFilters] = useState(defaultFilters);
const [tagNodes, setTagNodes] = useState([]);
const [filtersShown, setFiltersShown] = useState(false);

const data = Array.from({length: 10}, (value, index) => ({
    number: 1397450 + index,
    counterparty: counterparties[index % counterparties.length],
    status: statuses[index % statuses.length],
    sum: '1220000000',
}));

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

const statusNameToMarkerStatusMap = {
    [statuses[0]]: EMarkerStatus.SUCCESS,
    [statuses[1]]: EMarkerStatus.ERROR,
    [statuses[2]]: EMarkerStatus.WARNING,
    [statuses[3]]: EMarkerStatus.WAITING,
};

const getTableRecord = (record) => ({
    rowKey: `table-basic-row-${record.number}`,
    rowData: {
        number: record.number,
        value: (
            <>
                <Text size={ETextSize.B1} type={EFontType.GENERAL} line={ELineType.EXTRA}>
                    {`Платежное поручение ООО ${record.counterparty}`}
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
            <MarkerStatus
                status={statusNameToMarkerStatusMap[record.status]}
                description="Пояснения к статусу"
            >
                {record.status}
            </MarkerStatus>
        ),
    },
});

const getTableData = () => {
    if (tagNodes.length === 0) {
        return data.map(getTableRecord);
    }

    const filteredData = data.filter(
        (record) =>
            (record.counterparty === appliedFilters.counterparty.value ||
                appliedFilters.counterparty.value === defaultFilters.counterparty.value) &&
            (record.status === appliedFilters.status.value ||
                appliedFilters.status.value === defaultFilters.status.value)
    );

    return filteredData.map(getTableRecord);
};

const resetAllFilters = (event) => {
    event.preventDefault();

    setCurrentFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    setTagNodes([]);
};

const hideFilterPanel = (event) => {
    event.preventDefault();

    setCurrentFilters(appliedFilters);
    setFiltersShown(false);
};

const showFilterPanel = (event) => {
    event.preventDefault();

    setFiltersShown(true);
};

const renderTabsLinePanelLinks = () => (
    <MasterTable.TabsLinePanel.Links>
        {filtersShown ? (
            <Link href="#" linkType={ELinkType.TEXT} size={ELinkSize.LG} onClick={hideFilterPanel}>
                Скрыть фильтры
            </Link>
        ) : tagNodes.length > 0 ? (
            <>
                <Link href="#" linkType={ELinkType.TEXT} size={ELinkSize.LG} onClick={resetAllFilters}>
                    Сбросить всё
                </Link>
                <Link href="#" linkType={ELinkType.TEXT} size={ELinkSize.LG} onClick={showFilterPanel}>
                    Изменить фильтры
                </Link>
            </>
        ) : (
            <Link href="#" linkType={ELinkType.TEXT} size={ELinkSize.LG} onClick={showFilterPanel}>
                Фильтры
            </Link>
        )}
    </MasterTable.TabsLinePanel.Links>
);

const handleTagRemove = (newFilters) => () => {
    const newTagNodes = getTagNodes(newFilters);

    setCurrentFilters(newFilters);
    setAppliedFilters(newFilters);
    setTagNodes(newTagNodes);
};

const getTagNodes = (filters) => {
    const tags = [];

    if (filters.counterparty.value !== defaultFilters.counterparty.value) {
        tags.push(
            <Tag
                key="tag-filter-counterparty"
                id="tag-filter-counterparty"
                size={ETagSize.MD}
                onRemove={handleTagRemove({...filters, counterparty: defaultFilters.counterparty})}
            >
                {`Контрагент: ${filters.counterparty.value}`}
            </Tag>
        );
    }

    if (filters.status.value !== defaultFilters.status.value) {
        tags.push(
            <Tag
                key="tag-filter-status"
                id="tag-filter-status"
                size={ETagSize.MD}
                onRemove={handleTagRemove({...filters, status: defaultFilters.status})}
            >
                {`Статус: ${filters.status.value}`}
            </Tag>
        );
    }

    return tags;
};

const applyFilters = () => {
    const newTagNodes = getTagNodes(currentFilters);

    setAppliedFilters(currentFilters);
    setTagNodes(newTagNodes);
    setFiltersShown(false);
};

const resetCurrentFilters = () => {
    setCurrentFilters(defaultFilters);
};

const renderFilterPanelCol = ({label, component}) => (
    <Col key={`${component.props['id']}-col`} size={6}>
        <Row>
            <Col>
                <Field alignLabel>
                    <Col size={4}>
                        <Label>
                            <Label.Text id={component.props['aria-labelledby']}>{label}</Label.Text>
                        </Label>
                    </Col>
                    <Col size={8}>{component}</Col>
                </Field>
            </Col>
        </Row>
    </Col>
);

const renderFilterPanelRow = (items) => <Row>{items.map(renderFilterPanelCol)}</Row>;

const renderFilterPanelFilters = () => (
    <>
        {renderFilterPanelRow([
            {
                label: 'Контрагент',
                component: (
                    <Select
                        id="table-basic-filter-counterparty"
                        value={currentFilters.counterparty}
                        options={options.counterparty}
                        aria-labelledby="table-basic-filter-counterparty-label"
                        onChange={(counterparty) => setCurrentFilters({...currentFilters, counterparty})}
                    />
                ),
            },
            {
                label: 'Статус',
                component: (
                    <Select
                        id="table-basic-filter-status"
                        value={currentFilters.status}
                        options={options.status}
                        aria-labelledby="table-basic-filter-status-label"
                        onChange={(status) => setCurrentFilters({...currentFilters, status})}
                    />
                ),
            },
        ])}
        <Gap size={8} />
        <div style={{textAlign: 'right'}}>
            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM} onClick={resetCurrentFilters}>
                Сбросить
            </Button>
            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.SM} onClick={applyFilters}>
                Применить
            </Button>
        </div>
    </>
);

const renderFilterPanel = () => {
    let children = null;

    if (filtersShown) {
        children = renderFilterPanelFilters();
    } else if (tagNodes.length > 0) {
        children = <TagGroup size={ETagSize.MD}>{tagNodes}</TagGroup>;
    } else {
        return null;
    }

    return (
        <MasterTable.FilterPanel data-test-id="TestTable__MasterTable.FilterPanel">
            {children}
        </MasterTable.FilterPanel>
    );
};

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
    <MasterTable.TabsLinePanel>{renderTabsLinePanelLinks()}</MasterTable.TabsLinePanel>
    {renderFilterPanel()}
    <MasterTable.TableBasic columns={columns} data={getTableData()} renderNoData={renderNoData} />
</MasterTable>