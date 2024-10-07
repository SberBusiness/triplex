import React, {useState} from 'react';
import {ChipSuggest} from '@sberbusiness/triplex/components/Chip';
import {ISuggestOption} from '@sberbusiness/triplex/components/Suggest/types';
import {EFontType, ELineType, ETextSize} from '@sberbusiness/triplex/components/Typography/enums';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';

// Варианты саджеста выбор счета.
const accountSuggestOptionsData: ISuggestOption[] = [
    {
        id: 'account-filter-1',
        label: 'Клиринговый',
        labelReactNode: (
            <div className="account-filter-item">
                <span className="account-filter-item-title">Клиринговый</span>
                <Text
                    className="account-filter-item-number"
                    line={ELineType.EXTRA}
                    size={ETextSize.B1}
                    tag="span"
                    type={EFontType.SECONDARY}
                >
                    30414 810 9 3800 9654905
                </Text>
            </div>
        ),
        value: 'account-filter-1',
    },
    {
        id: 'account-filter-2',
        label: 'Расчётный',
        labelReactNode: (
            <div className="account-filter-item">
                <span className="account-filter-item-title">Расчётный</span>
                <Text
                    className="account-filter-item-number"
                    line={ELineType.EXTRA}
                    size={ETextSize.B1}
                    tag="span"
                    type={EFontType.SECONDARY}
                >
                    40702 810 3 3800 0247367
                </Text>
            </div>
        ),
        value: 'account-filter-2',
    },
    {
        id: 'account-filter-3',
        label: 'Расчётный',
        labelReactNode: (
            <div className="account-filter-item">
                <span className="account-filter-item-title">Расчётный</span>
                <Text
                    className="account-filter-item-number"
                    line={ELineType.EXTRA}
                    size={ETextSize.B1}
                    tag="span"
                    type={EFontType.SECONDARY}
                >
                    40702 810 9 3800 0017353
                </Text>
            </div>
        ),
        value: 'account-filter-3',
    },
    {
        id: 'account-filter-4',
        label: 'Расчётный',
        labelReactNode: (
            <div className="account-filter-item">
                <span className="account-filter-item-title">Расчётный</span>
                <Text
                    className="account-filter-item-number"
                    line={ELineType.EXTRA}
                    size={ETextSize.B1}
                    tag="span"
                    type={EFontType.SECONDARY}
                >
                    40702 810 2 3800 0099673
                </Text>
            </div>
        ),
        value: 'account-filter-4',
    },
    {
        id: 'account-filter-5',
        label: 'Расчётный',
        labelReactNode: (
            <div className="account-filter-item">
                <span className="account-filter-item-title">Расчётный</span>
                <Text
                    className="account-filter-item-number"
                    line={ELineType.EXTRA}
                    size={ETextSize.B1}
                    tag="span"
                    type={EFontType.SECONDARY}
                >
                    40702 810 4 0002 0000072
                </Text>
            </div>
        ),
        value: 'account-filter-5',
    },
    {
        id: 'account-filter-6',
        label: 'Расчётный',
        labelReactNode: (
            <div className="account-filter-item">
                <span className="account-filter-item-title">Расчётный</span>
                <Text
                    className="account-filter-item-number"
                    line={ELineType.EXTRA}
                    size={ETextSize.B1}
                    tag="span"
                    type={EFontType.SECONDARY}
                >
                    40702 810 5 3800 0099674
                </Text>
            </div>
        ),
        value: 'account-filter-6',
    },
    {
        id: 'account-filter-7',
        label: 'Специальный',
        labelReactNode: (
            <div className="account-filter-item">
                <span className="account-filter-item-title">Специальный</span>
                <Text
                    className="account-filter-item-number"
                    line={ELineType.EXTRA}
                    size={ETextSize.B1}
                    tag="span"
                    type={EFontType.SECONDARY}
                >
                    40702 810 3 3800 0068627
                </Text>
            </div>
        ),
        value: 'account-filter-7',
    },
];

interface ISuggestAccountProps {
    onChange: (value: ISuggestOption | undefined) => void;
    value: ISuggestOption | undefined;
}

/**
 * Саджест выбора номера счета.
 */
const SuggestAccount: React.FC<ISuggestAccountProps> = ({onChange, value}) => {
    // Отобразить состояние ничего не найдено в саджесте "Выбор счета".
    const [accountSuggestShowNotFound, setAccountSuggestShowNotFound] = useState(false);
    // Список опций в саджесте "Выбор счета" с учетом фильтра.
    const [accountSuggestOptions, setAccountSuggestOptions] = useState(accountSuggestOptionsData);

    // Обработчик клика по кнопке Сбросить значение в саджесте "Выбор счета".
    const handleClickClearSelectedAccountSuggest = () => {
        setAccountSuggestOptions(accountSuggestOptionsData);
        onChange(undefined);
        setAccountSuggestShowNotFound(false);
    };

    // Обработчик получения фокуса саджестом "Выбор счета".
    const handleFocusAccountSuggest = () => {
        setAccountSuggestOptions(accountSuggestOptionsData);
        setAccountSuggestShowNotFound(false);
    };

    // Обработчик изменения вводимого пользователем значение в саджесте "Выбор счета".
    const handleFilterAccountSuggest = (query: string) => {
        const nextOptions = accountSuggestOptionsData.filter(({label}) =>
            label.toLowerCase().includes(query.toLowerCase())
        );
        setAccountSuggestOptions(nextOptions);
        setAccountSuggestShowNotFound(nextOptions.length == 0);
    };

    return (
        <ChipSuggest
            clearSelected={handleClickClearSelectedAccountSuggest}
            dropdownHint={accountSuggestShowNotFound ? 'Совпадений не найдено.' : ''}
            label="Мой счёт"
            onFilter={handleFilterAccountSuggest}
            onFocus={handleFocusAccountSuggest}
            onSelect={onChange}
            options={accountSuggestOptions}
            placeholder="Введите название счета"
            value={value}
        />
    );
};

export default SuggestAccount;
