import React, {useState} from 'react';
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
import {Checkbox} from '@sberbusiness/triplex/components/Checkbox/Checkbox';
import {CheckboxYGroup} from '@sberbusiness/triplex/components/Checkbox/CheckboxYGroup';
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

const data = Array.from({length: 5}, (value, index) => ({
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
                <Text tag="div" size={ETextSize.B1} type={EFontType.GENERAL} line={ELineType.EXTRA}>
                    Платежное поручение ООО Ромашка
                    <br />
                    {decorate(`40702810205275000000`)}
                </Text>
                <Gap size={4} />
                <Text tag="div" size={ETextSize.B2} type={EFontType.SECONDARY}>
                    В том числе НДС 20%
                </Text>
            </>
        ),
    },
    rowKey: `table-basic-row-${index}`,
}));

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

const TableBasicSettingsColumnExample = () => {
    const [columns, setColumns] = useState(columnsDefault);
    const [settingsDropdownOpened, setSettingsDropdownOpened] = useState(false);

    const resetColumns = () => {
        setColumns(
            columns.map((c) => {
                c.hidden = false;
                return c;
            })
        );
    };

    const showAllColumns = () => {
        setColumns(
            columns.map((c) => {
                c.hidden = false;
                return c;
            })
        );
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
                            <ColumnSettings>
                                {({columns: settingsColumns}) => (
                                    <CheckboxYGroup>
                                        {settingsColumns.map((column) => (
                                            <Checkbox
                                                key={column.fieldKey}
                                                name={column.fieldKey}
                                                value={column.fieldKey}
                                                checked={!column.hidden}
                                                onChange={(event) => {
                                                    setColumns(
                                                        settingsColumns.map((c) => {
                                                            if (column.fieldKey === c.fieldKey) {
                                                                c.hidden = !event.target.checked;
                                                            }

                                                            return c;
                                                        })
                                                    );
                                                }}
                                            >
                                                {column.label}
                                            </Checkbox>
                                        ))}
                                    </CheckboxYGroup>
                                )}
                            </ColumnSettings>
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

<TableBasicSettingsColumnExample />;