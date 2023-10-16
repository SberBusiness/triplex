import {formatAmount} from '@sberbusiness/triplex/utils/amountUtils';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import React from 'react';

/** Длина форматированной (с отступами и разделителем) строки amount, начиная с которой будет уменьшен шрифт. */
const adaptiveAmountLength = 14;

/** Свойства компонента Amount. */
interface IAmountProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Значение суммы. */
    value: string;
    /** Количество знаков после запятой. */
    fractionLength?: 0 | 4;
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
    const formattedAmount = formatAmount(value, fractionLength);
    let amountClassName: string | undefined;

    if (adaptive && formattedAmount.length >= adaptiveAmountLength) {
        amountClassName = 'cssClass[amountAdaptive]';
    }

    const renderCurrency = () => [
        '\u00A0',
        <span data-test-id={dataTestId && `${dataTestId}__currencyName`} title={currencyTitle} key="currencyName">
            {currency}
        </span>,
    ];

    return (
        <span {...restProps} className={classnames(className, amountClassName)}>
            <span data-test-id={dataTestId && `${dataTestId}__amount`}>{formattedAmount}</span>
            {currency && renderCurrency()}
        </span>
    );
};

Amount.displayName = 'Amount';
