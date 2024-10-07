import React, {useState} from 'react';
import {ChipSuggest} from '@sberbusiness/triplex/components/Chip';
import {ISuggestOption} from '@sberbusiness/triplex/components/Suggest/types';
import {EFontType, ELineType, ETextSize} from '@sberbusiness/triplex/components/Typography/enums';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';

// Варианты саджеста выбор контрагента.
const counterpartySuggestOptionsData: ISuggestOption[] = [
    {
        id: 'counterparty-filter-1',
        label: 'ООО "МАЙ-БРЕНДС"',
        labelReactNode: (
            <div className="counterparty-filter-item">
                <span className="counterparty-filter-item-title">ООО "МАЙ-БРЕНДС"</span>
                <Text
                    className="counterparty-filter-item-number"
                    line={ELineType.EXTRA}
                    size={ETextSize.B1}
                    tag="span"
                    type={EFontType.SECONDARY}
                >
                    40702 810 8 2561 0200769
                </Text>
            </div>
        ),
        value: 'counterparty-filter-1',
    },
    {
        id: 'counterparty-filter-2',
        label: 'Бюджет УФК',
        labelReactNode: (
            <div className="counterparty-filter-item">
                <span className="counterparty-filter-item-title">Бюджет УФК</span>
                <Text
                    className="counterparty-filter-item-number"
                    line={ELineType.EXTRA}
                    size={ETextSize.B1}
                    tag="span"
                    type={EFontType.SECONDARY}
                >
                    40105 810 2 0000 0007900
                </Text>
            </div>
        ),
        value: 'counterparty-filter-2',
    },
    {
        id: 'counterparty-filter-3',
        label: 'ООО "ХОЛОДНЫЕ РЕШЕНИЯ"',
        labelReactNode: (
            <div className="counterparty-filter-item">
                <span className="counterparty-filter-item-title">ООО "ХОЛОДНЫЕ РЕШЕНИЯ"</span>
                <Text
                    className="counterparty-filter-item-number"
                    line={ELineType.EXTRA}
                    size={ETextSize.B1}
                    tag="span"
                    type={EFontType.SECONDARY}
                >
                    40702 810 0 1927 7777774
                </Text>
            </div>
        ),
        value: 'counterparty-filter-3',
    },
    {
        id: 'counterparty-filter-4',
        label: 'ООО "ХОЛОДНЫЕ РЕШЕНИЯ"',
        labelReactNode: (
            <div className="counterparty-filter-item">
                <span className="counterparty-filter-item-title">ООО "ХОЛОДНЫЕ РЕШЕНИЯ"</span>
                <Text
                    className="counterparty-filter-item-number"
                    line={ELineType.EXTRA}
                    size={ETextSize.B1}
                    tag="span"
                    type={EFontType.SECONDARY}
                >
                    40702 810 0 1923 8472896
                </Text>
            </div>
        ),
        value: 'counterparty-filter-4',
    },
    {
        id: 'counterparty-filter-5',
        label: 'ИП САМСОНОВ Т. Р.',
        labelReactNode: (
            <div className="counterparty-filter-item">
                <span className="counterparty-filter-item-title">ИП САМСОНОВ Т. Р.</span>
                <Text
                    className="counterparty-filter-item-number"
                    line={ELineType.EXTRA}
                    size={ETextSize.B1}
                    tag="span"
                    type={EFontType.SECONDARY}
                >
                    40824 810 6 3806 0100954
                </Text>
            </div>
        ),
        value: 'counterparty-filter-5',
    },
    {
        id: 'counterparty-filter-6',
        label: 'Киану Ривз',
        labelReactNode: (
            <div className="counterparty-filter-item">
                <span className="counterparty-filter-item-title">Киану Ривз</span>
                <Text
                    className="counterparty-filter-item-number"
                    line={ELineType.EXTRA}
                    size={ETextSize.B1}
                    tag="span"
                    type={EFontType.SECONDARY}
                >
                    40817 810 3 4001 0000000
                </Text>
            </div>
        ),
        value: 'counterparty-filter-6',
    },
    {
        id: 'counterparty-filter-7',
        label: 'ООО "АРТИС ГРУПП"',
        labelReactNode: (
            <div className="counterparty-filter-item">
                <span className="counterparty-filter-item-title">ООО "АРТИС ГРУПП"</span>
                <Text
                    className="counterparty-filter-item-number"
                    line={ELineType.EXTRA}
                    size={ETextSize.B1}
                    tag="span"
                    type={EFontType.SECONDARY}
                >
                    40702 810 2 3800 0099673
                </Text>
            </div>
        ),
        value: 'counterparty-filter-7',
    },
    {
        id: 'counterparty-filter-8',
        label: 'ООО "АНДРЕЙ"',
        labelReactNode: (
            <div className="counterparty-filter-item">
                <span className="counterparty-filter-item-title">ООО "АНДРЕЙ"</span>
                <Text
                    className="counterparty-filter-item-number"
                    line={ELineType.EXTRA}
                    size={ETextSize.B1}
                    tag="span"
                    type={EFontType.SECONDARY}
                >
                    42301 810 4 4000 0000000
                </Text>
            </div>
        ),
        value: 'counterparty-filter-8',
    },
];

interface ISuggestCounterpartyProps {
    onChange: (value: ISuggestOption | undefined) => void;
    value: ISuggestOption | undefined;
}

/**
 * Саджест выбора контрагента.
 */
const SuggestCounterparty: React.FC<ISuggestCounterpartyProps> = ({onChange, value}) => {
    // Отобразить состояние ничего не найдено в саджесте "Выбор контрагента".
    const [counterpartySuggestShowNotFound, setCounterpartySuggestShowNotFound] = useState(false);
    // Список опций в саджесте "Выбор контрагента" с учетом фильтра.
    const [counterpartySuggestOptions, setCounterpartySuggestOptions] = useState(
        counterpartySuggestOptionsData
    );

    // Обработчик клика по кнопке Сбросить значение в саджесте "Выбор счета".
    const handleClickClearSelectedCounterpartySuggest = () => {
        setCounterpartySuggestOptions(counterpartySuggestOptionsData);
        onChange(undefined);
        setCounterpartySuggestShowNotFound(false);
    };

    // Обработчик получения фокуса саджестом "Выбор счета".
    const handleFocusCounterpartySuggest = () => {
        setCounterpartySuggestOptions(counterpartySuggestOptionsData);
        setCounterpartySuggestShowNotFound(false);
    };

    // Обработчик изменения вводимого пользователем значение в саджесте "Выбор счета".
    const handleFilterCounterpartySuggest = (query: string) => {
        const nextOptions = counterpartySuggestOptionsData.filter(({label}) =>
            label.toLowerCase().includes(query.toLowerCase())
        );
        setCounterpartySuggestOptions(nextOptions);
        setCounterpartySuggestShowNotFound(nextOptions.length == 0);
    };

    return (
        <ChipSuggest
            clearSelected={handleClickClearSelectedCounterpartySuggest}
            dropdownHint={counterpartySuggestShowNotFound ? 'Совпадений не найдено.' : ''}
            label="Контрагент"
            onFilter={handleFilterCounterpartySuggest}
            onFocus={handleFocusCounterpartySuggest}
            onSelect={onChange}
            options={counterpartySuggestOptions}
            placeholder="Введите наименование или Ф. И. О."
            value={value}
        />
    );
};

export default SuggestCounterparty;
