import React from 'react';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonSize, EButtonTheme} from '@sberbusiness/triplex/components/Button/enums';
import {LightBox} from '@sberbusiness/triplex/components/LightBox/LightBox';
import {Page} from '@sberbusiness/triplex/components/Page/Page';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {EFontType, ELineType, ETextSize} from '@sberbusiness/triplex/components/Typography/enums';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {ChipGroup} from '@sberbusiness/triplex/components/ChipGroup/ChipGroup';
import SuggestAccount from './SuggestAccount';
import SuggestCounterparty from './SuggestCounterparty';
import {ISuggestOption} from '@sberbusiness/triplex/components/Suggest/types';
import {EListItemStatus} from './listItemsData';
import OptionsStatus from './OptionsStatus';
import {NumberInput} from '@sberbusiness/triplex/components/NumberInput/NumberInput';
import {AmountInput} from '@sberbusiness/triplex/components/AmountInput/AmountInput';
import {Input} from '@sberbusiness/triplex/components/Input/Input';
import DatePickerFrom from './DatePickerFrom';
import DatePickerTo from './DatePickerTo';

interface ILightBoxOptionsProps {
    // Сумма от.
    amountFromValue: string;
    // Обработчик изменения amountFromValue.
    onChangeAmountFromValue: (amountFromValue: string) => void;
    // Сумма до.
    amountToValue: string;
    // Метод, сбрасывающий значения фильтров.
    clearFilters: () => void;
    // Обработчик изменения amountToValue.
    onChangeAmountToValue: (amountToValue: string) => void;
    // Номер документа от.
    documentNumberFromValue: string;
    // Обработчик изменения documentNumberFromValue.
    onChangeDocumentNumberFromValue: (documentNumberFromValue: string) => void;
    // Номер документа до.
    documentNumberToValue: string;
    // Обработчик изменения documentNumberToValue.
    onChangeDocumentNumberToValue: (documentNumberToValue: string) => void;
    // Номер документа.
    documentNumberValue: string;
    // Обработчик изменения documentNumberValue.
    onChangeDocumentNumberValue: (documentNumberValue: string) => void;
    // Код таможни.
    customsCodeValue: string;
    // Обработчик изменения customsCodeValue.
    onChangeCustomsCodeValue: (customsCodeValue: string) => void;
    // Назначение платежа.
    purposeValue: string;
    // Обработчик изменения purposeValue.
    onChangePurposeValue: (purposeValue: string) => void;
    // Список измененных фильтров.
    changedFilters: Set<string>;
    // Функция, закрывающая лайтбокс.
    closeLightBox: () => void;
    // Значение саджеста "Выбор счета".
    accountSuggestValue?: ISuggestOption;
    // Обработчик изменения саджеста "Выбор счета".
    onChangeAccountSuggestValue: (value?: ISuggestOption) => void;
    // Значение саджеста "Выбор контрагента".
    counterpartySuggestValue?: ISuggestOption;
    // Значение DatePicker "Дата с".
    dateFrom: string;
    // Обработчик изменения dateFrom.
    onChangeDateFrom: (value: string) => void;
    // Значение DatePicker "Дата по".
    dateTo: string;
    // Обработчик изменения dateTo.
    onChangeDateTo: (value: string) => void;
    // Обработчик изменения саджеста "Выбор контрагента".
    onChangeCounterpartySuggestValue: (value?: ISuggestOption) => void;
    // Значения мультиселекта "Статуc".
    multiselectStatusValues: EListItemStatus[];
    // Обработчик изменения мультиселекта "Статуc".
    onChangeMultiselectStatusValues: (value: EListItemStatus[]) => void;
}

const LightBoxOptions: React.FC<ILightBoxOptionsProps> = ({
    accountSuggestValue,
    amountFromValue,
    amountToValue,
    changedFilters,
    clearFilters,
    closeLightBox,
    counterpartySuggestValue,
    customsCodeValue,
    dateFrom,
    dateTo,
    documentNumberValue,
    documentNumberFromValue,
    documentNumberToValue,
    onChangeAccountSuggestValue,
    onChangeAmountFromValue,
    onChangeAmountToValue,
    onChangeCounterpartySuggestValue,
    onChangeCustomsCodeValue,
    onChangeDateFrom,
    onChangeDateTo,
    onChangeDocumentNumberValue,
    onChangeDocumentNumberFromValue,
    onChangeDocumentNumberToValue,
    onChangePurposeValue,
    onChangeMultiselectStatusValues,
    multiselectStatusValues,
    purposeValue,
}) => {
    return (
        <LightBox>
            <LightBox.Content>
                <Page>
                    <Page.Header>
                        <Page.Header.Title>
                            <Page.Header.Title.Content>
                                <Page.Header.Title.Content.Text>
                                    Фильтры: {changedFilters.size}
                                </Page.Header.Title.Content.Text>
                            </Page.Header.Title.Content>
                        </Page.Header.Title>
                    </Page.Header>
                    <Page.Body>
                        <Text size={ETextSize.B1} line={ELineType.EXTRA} tag="div">
                            Плательщик и Получатель
                        </Text>
                        <Gap size={16} />
                        <ChipGroup>
                            <SuggestAccount
                                value={accountSuggestValue}
                                onChange={onChangeAccountSuggestValue}
                            />

                            <SuggestCounterparty
                                value={counterpartySuggestValue}
                                onChange={onChangeCounterpartySuggestValue}
                            />
                        </ChipGroup>
                        <Gap size={24} />

                        <Text size={ETextSize.B1} line={ELineType.EXTRA} tag="div">
                            Статус
                        </Text>
                        <Gap size={16} />
                        <ChipGroup>
                            <OptionsStatus
                                value={multiselectStatusValues}
                                onChange={onChangeMultiselectStatusValues}
                            />
                        </ChipGroup>
                        <Gap size={24} />

                        <Text size={ETextSize.B1} line={ELineType.EXTRA} tag="div">
                            Дата документа
                        </Text>
                        <Gap size={16} />
                        <div className="inputs-layout dates-layout">
                            <DatePickerFrom value={dateFrom} onChange={onChangeDateFrom} />
                            <span className="dash">—</span>
                            <DatePickerTo value={dateTo} onChange={onChangeDateTo} />
                        </div>
                        <Gap size={24} />

                        <Text size={ETextSize.B1} line={ELineType.EXTRA} tag="div">
                            Сумма
                        </Text>
                        <Gap size={16} />
                        <div className="inputs-layout">
                            <AmountInput
                                value={amountFromValue}
                                onChange={onChangeAmountFromValue}
                                currency="RUB"
                                fractionDigits={2}
                            />
                            <span className="dash">—</span>
                            <AmountInput
                                value={amountToValue}
                                onChange={onChangeAmountToValue}
                                currency="RUB"
                                fractionDigits={2}
                            />
                        </div>
                        <Gap size={24} />

                        <Text size={ETextSize.B1} line={ELineType.EXTRA} tag="div">
                            Документ
                        </Text>
                        <Gap size={16} />
                        <NumberInput
                            onChange={(event) => onChangeDocumentNumberValue(event.target.value)}
                            placeholder="Номер"
                            value={documentNumberValue}
                        />
                        <Gap size={24} />

                        <Text size={ETextSize.B1} line={ELineType.EXTRA} tag="div">
                            Диапазон номеров
                        </Text>
                        <Gap size={16} />
                        <div className="inputs-layout">
                            <NumberInput
                                placeholder="Номер с"
                                value={documentNumberFromValue}
                                onChange={(event) => onChangeDocumentNumberFromValue(event.target.value)}
                            />
                            <span className="dash">—</span>
                            <NumberInput
                                placeholder="Номер по"
                                value={documentNumberToValue}
                                onChange={(event) => onChangeDocumentNumberToValue(event.target.value)}
                            />
                        </div>
                        <Gap size={24} />

                        <Text size={ETextSize.B1} line={ELineType.EXTRA} tag="div">
                            Код таможни{' '}
                            <Text size={ETextSize.B1} line={ELineType.EXTRA} type={EFontType.SECONDARY}>
                                107
                            </Text>
                        </Text>
                        <Gap size={16} />
                        <Input
                            placeholder="Код таможенного органа"
                            value={customsCodeValue}
                            onChange={(event) => onChangeCustomsCodeValue(event.target.value)}
                        />
                        <Gap size={24} />

                        <Text size={ETextSize.B1} line={ELineType.EXTRA} tag="div">
                            Назначение
                        </Text>
                        <Gap size={16} />
                        <Input
                            placeholder="Назначение платежа"
                            value={purposeValue}
                            onChange={(event) => onChangePurposeValue(event.target.value)}
                        />
                        <Gap size={24} />
                    </Page.Body>
                    <Page.Footer>
                        <Page.Footer.Description>
                            <Page.Footer.Description.Controls>
                                <Button
                                    theme={EButtonTheme.SECONDARY}
                                    size={EButtonSize.MD}
                                    onClick={clearFilters}
                                >
                                    Сбросить
                                </Button>
                                <Button
                                    theme={EButtonTheme.GENERAL}
                                    size={EButtonSize.MD}
                                    onClick={closeLightBox}
                                >
                                    Применить
                                </Button>
                            </Page.Footer.Description.Controls>
                        </Page.Footer.Description>
                    </Page.Footer>
                </Page>
            </LightBox.Content>
            <LightBox.Controls>
                <LightBox.Controls.Close
                    title="Закрыть"
                    data-test-id="lightbox-close"
                    onClick={closeLightBox}
                />
            </LightBox.Controls>
        </LightBox>
    );
};

export default LightBoxOptions;
