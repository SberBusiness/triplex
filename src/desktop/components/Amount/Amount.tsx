import {formatAmount} from '@sberbusiness/triplex/desktop/utils/amountUtils';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import * as React from 'react';

/** Длина форматированной (с отступами и разделителем) строки amount, начиная с которой будет уменьшен шрифт. */
const adaptiveAmountLength = 14;

/**
 * Свойства компонента Amount.
 *
 * @prop {string} value Значение суммы.
 * @param {number} [fractionLength] Количество знаков после запятой.
 * @prop {string} [currency] Сокращённое обозначение валюты.
 * @prop {string} [currencyTitle] Сообщение подсказки названия валюты.
 * @prop {boolean} [adaptive] При большом количестве цифр уменьшает размер шрифта.
 * @prop {string} [dataTestId] Тестовый атрибут.
 */
interface IAmountProps extends React.HTMLAttributes<HTMLSpanElement> {
    value: string;
    fractionLength?: 0 | 4;
    currency?: string;
    currencyTitle?: string;
    adaptive?: boolean;
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
