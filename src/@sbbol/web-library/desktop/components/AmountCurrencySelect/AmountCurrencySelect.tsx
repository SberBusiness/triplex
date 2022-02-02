import {CurrencySrvIcon20} from '@sberbusiness/icons/CurrencySrvIcon20';
import {TestIds} from '@sbbol/web-library/common/dataTestIds/dataTestIds';
import {TestProps} from '@sbbol/web-library/desktop/common/types/CoreTypes';
import {ISelectOption, ISelectProps} from '@sbbol/web-library/desktop/components/Select/Select';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import * as React from 'react';
import {NumberBaseInput} from '../protected/NumberBaseInput/NumberBaseInput';
import {INumberBaseInputProps} from '../protected/NumberBaseInput/types';
import {ISelectExtendedDropdownProvideProps, ISelectExtendedTargetProvideProps, SelectExtended} from '../Select/SelectExtended';

/**
 * Свойства компонента.
 *
 * @extends INumberBaseInputProps
 * @extends TestProps
 */
export interface IAmountCurrencySelectProps
    extends Omit<INumberBaseInputProps, 'onSelect' | 'valueFractionLength' | 'placeholderFractionLength'>,
        TestProps {
    /**@prop currency Выбранная валюта.*/
    currency: ISelectOption | null;
    /**@prop currencyOptions Список валют.*/
    currencyOptions: ISelectOption[];
    /**@prop onSelect Обработчик выбора элемента списка.*/
    onSelect: (item: ISelectOption) => void;
    /**@prop [loading] Флаг для отображения спиннера.*/
    loading?: boolean;
    /**@prop [setCurrencyRef] Установка рефа на селект.*/
    // setCurrencyRef?: TSetRef<HTMLElement | null>;
    /**@prop [fractionLength] Количество знаков после разделителя.*/
    fractionLength?: number;
    /**@prop [currencyProps] Свойства компонента выбора валюты.*/
    currencyProps?: ISelectProps;
}

/** Компонент ввода суммы и выбора валюты. */
export class AmountCurrencySelect extends React.Component<IAmountCurrencySelectProps> {
    public static displayName = 'AmountCurrencySelect';

    public static defaultProps = {
        fractionLength: 2,
    };

    public render(): JSX.Element {
        const {
            className,
            error,
            disabled,
            currency,
            currencyOptions,
            onSelect,
            loading,
            fractionLength,
            tabIndex,
            currencyProps,
            ...restProps
        } = this.props;
        const dataTestId = this.props['data-test-id'];

        const currencyTabIndex = typeof tabIndex === 'number' ? tabIndex + 1 : undefined;

        const renderTarget = (props: ISelectExtendedTargetProvideProps) => (
            <SelectExtended.Target
                className={classnames('cssClass[currencySelectExtendedTarget]', {
                    'cssClass[currencySelectExtendedTargetOpened]': props.opened,
                })}
                label={currency ? currency.label : ''}
                disabled={disabled || currencyProps?.disabled}
                error={error}
                loading={loading}
                placeholder={<CurrencySrvIcon20 className="cssClass[currencyIcon]" />}
                tabIndex={currencyTabIndex}
                title={currencyProps?.title}
                {...props}
            />
        );

        return (
            <div className={classnames(className, 'cssClass[amountCurrencySelect]')} data-test-id={dataTestId}>
                <NumberBaseInput
                    {...restProps}
                    valueFractionLength={fractionLength}
                    placeholderFractionLength={fractionLength}
                    data-test-id={dataTestId && `${dataTestId}${TestIds.AmountCurrencySelect.input}`}
                    error={error}
                    disabled={disabled}
                    tabIndex={tabIndex}
                />

                <SelectExtended
                    className="cssClass[currencySelectExtended]"
                    renderTarget={renderTarget}
                    data-test-id={dataTestId && `${dataTestId}${TestIds.AmountCurrencySelect.select}`}
                >
                    {(dropdownProps: ISelectExtendedDropdownProvideProps) => (
                        <SelectExtended.Dropdown
                            className={`cssClass[currencySelectExtendedDropdown] ${dropdownProps.className || ''}`}
                            {...dropdownProps}
                        >
                            <SelectExtended.Dropdown.List dropdownOpened={dropdownProps.opened}>
                                {currencyOptions.map((option) => (
                                    <SelectExtended.Dropdown.List.Item
                                        {...option}
                                        key={option.value}
                                        id={option.value}
                                        selected={Boolean(currency && option.value === currency.value)}
                                        onSelect={() => {
                                            onSelect(option);
                                            dropdownProps.setOpened(false);
                                        }}
                                    >
                                        {option.label}
                                    </SelectExtended.Dropdown.List.Item>
                                ))}
                            </SelectExtended.Dropdown.List>
                        </SelectExtended.Dropdown>
                    )}
                </SelectExtended>
            </div>
        );
    }
}
