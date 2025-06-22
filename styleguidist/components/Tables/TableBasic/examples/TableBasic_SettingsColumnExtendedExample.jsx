import React, {useEffect, useState} from 'react';
import {MasterTable} from '@sberbusiness/triplex/components/Tables/MasterTable';
import {EHorizontalAlign} from '@sberbusiness/triplex/components/Tables/TableBasic/enums';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {
    ETextSize,
    EFontType,
    ELineType,
    ETitleSize,
    EFontWeight,
} from '@sberbusiness/triplex/components/Typography/enums';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {Amount} from '@sberbusiness/triplex/components/Amount/Amount';
import {MarkerStatus} from '@sberbusiness/triplex/components/MarkerStatus/MarkerStatus';
import {EMarkerStatus} from '@sberbusiness/triplex/components/Marker/enums';
import {decorate} from '@sberbusiness/triplex/utils/accountsUtils';
import {EmptytableSrvIcon64} from '@sberbusiness/icons/EmptytableSrvIcon64';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonSize, EButtonTheme} from '@sberbusiness/triplex/components/Button/enums';
import {ColumnSettings} from '@sberbusiness/triplex/components/Tables/TableBasicSettings/components/ColumnSettings';
import {CheckboxTree} from '@sberbusiness/triplex/components/CheckboxTree/CheckboxTree';
import {Title} from '@sberbusiness/triplex/components/Typography/Title';

const columnsDefault = [
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
        horizontalAlign: EHorizontalAlign.RIGHT,
        label: 'Сумма',
        renderCell: (fieldValue) => fieldValue && <Amount value={fieldValue} currency="RUB" />,
    },
    {
        fieldKey: 'status',
        label: 'Статус',
    },
];

/**
 * Возвращает данные для таблицы.
 * @param showCounterparty - показать блок Получатель в столбце Значение.
 * @param showNumber - показать блок Номер счета в столбце Значение.
 * @param showNDS - показать блок НДС счета в столбце Значение.
 */
const getData = ({showCounterparty, showNumber, showNDS}) => {
    return Array.from({length: 5}, (value, index) => ({
        rowData: {
            number: 1397450 + index,
            status: (
                <MarkerStatus status={EMarkerStatus.SUCCESS} description="Пояснения к статусу">
                    Исполнено
                </MarkerStatus>
            ),
            sum: '1220000000',
            value: (
                <>
                    {(showCounterparty || showNumber) && (
                        <>
                            <Text
                                tag="div"
                                size={ETextSize.B1}
                                type={EFontType.GENERAL}
                                line={ELineType.EXTRA}
                            >
                                {showCounterparty && (
                                    <>
                                        Платежное поручение ООО Ромашка <br />
                                    </>
                                )}
                                {showNumber && decorate(`40702810205275000000`)}
                            </Text>
                            <Gap size={4} />
                        </>
                    )}

                    {showNDS && (
                        <Text tag="div" size={ETextSize.B2} type={EFontType.SECONDARY}>
                            В том числе НДС 20%
                        </Text>
                    )}
                </>
            ),
        },
        rowKey: `table-basic-row-${index}`,
    }));
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

const TableBasicSettingsColumnExtendedExample = () => {
    const [data, setData] = useState(getData({showCounterparty: true, showNDS: true, showNumber: true}));
    const [columns, setColumns] = useState(columnsDefault);
    const [showCounterparty, setShowCounterparty] = useState(true);
    const [showNumber, setShowNumber] = useState(true);
    const [showNDS, setShowNDS] = useState(true);
    const [settingsDropdownOpened, setSettingsDropdownOpened] = useState(false);

    useEffect(() => {
        setData(getData({showCounterparty, showNDS, showNumber}));
    }, [showCounterparty, showNDS, showNumber, setData]);

    const resetColumns = () => {
        setColumns(
            columns.map((c) => {
                c.hidden = false;
                return c;
            })
        );

        setShowCounterparty(true);
        setShowNumber(true);
        setShowNDS(true);
    };

    const showAllColumns = () => {
        setColumns(
            columns.map((c) => {
                c.hidden = false;
                return c;
            })
        );
        setShowCounterparty(true);
        setShowNumber(true);
        setShowNDS(true);
    };

    const handleChangeCheckboxes = (checkboxes) => {
        const nextColumns = [...columns];
        const checkboxesTraversal = (checkboxes) => {
            checkboxes.forEach((checkbox) => {
                const column = nextColumns.filter((c) => c.fieldKey === checkbox.id)[0];
                // Чекбокс отвечает за показ колонки.
                if (column) {
                    column.hidden = !checkbox.checked;
                }

                // Чекбокс отвечает за показ элемента Номер счета.
                if (checkbox.id === 'showNumber') {
                    setShowNumber(checkbox.checked);
                } else if (checkbox.id === 'showNDS') {
                    // Чекбокс отвечает за показ элемента НДС.
                    setShowNDS(checkbox.checked);
                } else if (checkbox.id === 'showCounterparty') {
                    // Чекбокс отвечает за показ элемента Получатель.
                    setShowCounterparty(checkbox.checked);
                }

                if (checkbox.children && checkbox.children.length > 0) {
                    checkboxesTraversal(checkbox.children);
                }
            });
        };

        checkboxesTraversal(checkboxes);

        setColumns(nextColumns);
    };

    const renderTree = () => {
        const checkboxes = columns.map((column) => {
            let children;
            let bulk = false;

            if (column.fieldKey === 'value') {
                children = [
                    {
                        bulk: false,
                        checked: showCounterparty,
                        id: 'showCounterparty',
                        label: 'Получатель',
                    },
                    {
                        bulk: false,
                        checked: showNumber,
                        id: 'showNumber',
                        label: 'Номер счета',
                    },
                    {
                        bulk: false,
                        checked: showNDS,
                        id: 'showNDS',
                        label: 'НДС',
                    },
                ];

                // Если выбран один из вариантов, но не все.
                if (
                    (showCounterparty || showNumber || showNDS) &&
                    (!showCounterparty || !showNumber || !showNDS)
                ) {
                    bulk = true;
                }
            }

            return {
                bulk,
                checked: !column.hidden,
                children,
                id: column.fieldKey,
                label: column.label,
            };
        });

        return <CheckboxTree checkboxes={checkboxes} onChange={handleChangeCheckboxes} />;
    };

    const renderNoColumns = () => (
        <MasterTable.NoColumns>
            <Title size={ETitleSize.H3} weight={EFontWeight.REGULAR}>
                Все колонки таблицы скрыты
            </Title>
            <Gap size={8} />
            <Text tag="div" size={ETextSize.B1} type={EFontType.GENERAL} line={ELineType.EXTRA}>
                Выберите нужные вам для отображения колонки в настройках таблицы.
            </Text>
            <Gap size={24} />
            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} onClick={resetColumns}>
                Сбросить настройки
            </Button>
        </MasterTable.NoColumns>
    );

    return (
        <MasterTable>
            <MasterTable.TabsLinePanel>
                <MasterTable.TabsLinePanel.Links>
                    <MasterTable.TableBasicSettings
                        linkTitle={settingsDropdownOpened ? 'Скрыть настройки' : 'Настройки'}
                        opened={settingsDropdownOpened}
                        setOpened={setSettingsDropdownOpened}
                    >
                        <MasterTable.TableBasicSettings.Header>
                            Показать столбцы
                        </MasterTable.TableBasicSettings.Header>

                        <MasterTable.TableBasicSettings.Body>
                            <ColumnSettings>{renderTree}</ColumnSettings>
                        </MasterTable.TableBasicSettings.Body>

                        <MasterTable.TableBasicSettings.Footer>
                            <Button
                                theme={EButtonTheme.LINK}
                                size={EButtonSize.SM}
                                onClick={showAllColumns}
                            >
                                Выбрать все
                            </Button>
                            <Button
                                theme={EButtonTheme.LINK}
                                size={EButtonSize.SM}
                                onClick={resetColumns}
                            >
                                Сбросить настройки
                            </Button>
                        </MasterTable.TableBasicSettings.Footer>
                    </MasterTable.TableBasicSettings>
                </MasterTable.TabsLinePanel.Links>
            </MasterTable.TabsLinePanel>

            <MasterTable.TableBasic
                columns={columns}
                data={data}
                renderNoData={renderNoData}
                renderNoColumns={renderNoColumns}
            />
        </MasterTable>
    );
};

<TableBasicSettingsColumnExtendedExample />;