import * as React from 'react';
import {uniqueId} from '@sberbusiness/triplex/common/utils/uniqueId';
import {CurrencySrvIcon20} from '@sberbusiness/icons/CurrencySrvIcon20';
import {TestIds} from '@sberbusiness/triplex/common/dataTestIds/dataTestIds';
import {TestProps} from '@sberbusiness/triplex/desktop/common/types/CoreTypes';
import {ISelectOption, ISelectProps} from '@sberbusiness/triplex/desktop/components/Select/Select';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {NumberBaseInput} from '../protected/NumberBaseInput/NumberBaseInput';
import {INumberBaseInputProps} from '../protected/NumberBaseInput/types';
import {ISelectExtendedDropdownProvideProps, ISelectExtendedTargetProvideProps, SelectExtended} from '../SelectExtended/SelectExtended';
import {DropdownListContext} from '@sberbusiness/triplex/desktop/components/Dropdown/DropdownListContext';

/**
 * Свойства AmountCurrencySelect.
 *
 * @extends INumberBaseInputProps
 * @extends TestProps
 */
export interface IAmountCurrencySelectProps
    extends Omit<INumberBaseInputProps, 'onSelect' | 'valueFractionLength' | 'placeholderFractionLength'>,
        TestProps {
    /** Выбранная валюта.*/
    currency: ISelectOption | null;
    /** Список валют.*/
    currencyOptions: ISelectOption[];
    /** Обработчик выбора элемента списка.*/
    onSelect: (item: ISelectOption) => void;
    /** Флаг для отображения спиннера.*/
    loading?: boolean;
    /** Количество знаков после разделителя.*/
    fractionLength?: number;
    /** Свойства компонента выбора валюты.*/
    currencyProps?: ISelectProps;
}

/** Состояния AmountCurrencySelect. */
export interface IAmountCurrencySelectState {
    activeDescendant?: string;
}

/**
 * Компонент ввода суммы и выбора валюты.
 *
 * @deprecated Используйте компонент InputGroup.
 */
export class AmountCurrencySelect extends React.Component<IAmountCurrencySelectProps, IAmountCurrencySelectState> {
    public static displayName = 'AmountCurrencySelect';

    public state = {
        activeDescendant: undefined,
    };

    public static defaultProps = {
        fractionLength: 2,
    };

    private instanceId = uniqueId();

    private readonly targetRef: React.RefObject<HTMLDivElement>;

    constructor(props: IAmountCurrencySelectProps) {
        super(props);

        this.targetRef = React.createRef();
    }

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
            'data-test-id': dataTestId,
            ...restProps
        } = this.props;
        const {activeDescendant} = this.state;
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
                role="combobox"
                aria-controls={this.instanceId}
                aria-activedescendant={activeDescendant}
                ref={this.targetRef}
                {...props}
            />
        );

        return (
            <div className={classnames('cssClass[amountCurrencySelect]', className)} data-test-id={dataTestId}>
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
                    {({
                        className: dropdownClassName,
                        opened,
                        setOpened,
                        dropdownRef,
                        ...restDropdownProps
                    }: ISelectExtendedDropdownProvideProps) => (
                        <DropdownListContext.Provider value={{activeDescendant, setActiveDescendant: this.setActiveDescendant}}>
                            <SelectExtended.Dropdown
                                {...restDropdownProps}
                                className={classnames('cssClass[currencySelectExtendedDropdown]', dropdownClassName)}
                                data-test-id={dataTestId && `${dataTestId}${TestIds.AmountCurrencySelect.dropdown}`}
                                opened={opened}
                                targetRef={this.targetRef}
                                forwardedRef={dropdownRef}
                                fixedWidth={true}
                            >
                                <SelectExtended.Dropdown.List id={this.instanceId} dropdownOpened={opened}>
                                    {currencyOptions.map((option) => (
                                        <SelectExtended.Dropdown.List.Item
                                            {...option}
                                            key={option.value}
                                            id={option.value}
                                            className="cssClass[currencySelectExtendedDropdownListItem]"
                                            data-test-id={
                                                dataTestId &&
                                                `${dataTestId}${TestIds.AmountCurrencySelect.dropdown}${TestIds.Dropdown.listItem}`
                                            }
                                            selected={Boolean(currency && option.value === currency.value)}
                                            onSelect={() => {
                                                onSelect(option);
                                                setOpened(false);
                                            }}
                                        >
                                            {option.label}
                                        </SelectExtended.Dropdown.List.Item>
                                    ))}
                                </SelectExtended.Dropdown.List>
                            </SelectExtended.Dropdown>
                        </DropdownListContext.Provider>
                    )}
                </SelectExtended>
            </div>
        );
    }

    private setActiveDescendant = (id?: string) => {
        const {activeDescendant} = this.state;

        if (activeDescendant !== id) {
            this.setState({activeDescendant: id});
        }
    };
}
