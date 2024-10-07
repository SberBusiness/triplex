import React from 'react';
import {formatAmount} from '@sberbusiness/triplex/utils/amountUtils';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Длина форматированной (с отступами и разделителем) строки amount, начиная с которой будет уменьшен шрифт. */
const adaptiveAmountLength = 14;

/** Свойства компонента Amount. */
interface IAmountProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Значение суммы. */
    value: string;
    /** Количество знаков после запятой. */
    fractionLength?: 0 | 1 | 2 | 3 | 4;
    /** Сокращённое обозначение валюты. */
    currency?: string;
    /** Сообщение подсказки названия валюты. */
    currencyTitle?: string;
    /** При большом количестве цифр уменьшает размер шрифта. */
    adaptive?: boolean;
    /** Тестовый атрибут. */
    dataTestId?: string;
}

/** Компонент отображения суммы. */
export const Amount: React.FC<IAmountProps> = ({
    className,
    value,
    fractionLength,
    currency,
    currencyTitle,
    adaptive,
    dataTestId,
    ...restProps
}) => {
    let formattedAmount = formatAmount(value, fractionLength);
    const classNames = classnames({'cssClass[amountAdaptive]': !!adaptive && formattedAmount.length >= adaptiveAmountLength}, className);

    if (formattedAmount[0] == '-') {
        // (Accessibility) Меняем дефис-минус на знак минуса для его озвучивания скрин-ридерами.
        formattedAmount = formattedAmount.replace('\u002D', '\u2212');
    }

    const renderCurrencyName = () => [
        '\u00A0',
        <span data-test-id={dataTestId && `${dataTestId}__currencyName`} title={currencyTitle} key="currencyName">
            {currency}
        </span>,
    ];

    return (
        <span className={classNames} {...restProps} data-tx={process.env.npm_package_version}>
            <span data-test-id={dataTestId && `${dataTestId}__amount`}>{formattedAmount}</span>
            {currency && renderCurrencyName()}
        </span>
    );
};

Amount.displayName = 'Amount';
