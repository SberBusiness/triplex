import React from 'react';
import {AmountBaseInput} from '../protected/AmountBaseInput/AmountBaseInput';
import {IInputProps} from '@sberbusiness/triplex/components/Input/Input';
import {uniqueId} from '@sberbusiness/triplex/utils/uniqueId';
import {CurrencySrvIcon20} from '@sberbusiness/icons/CurrencySrvIcon20';
import {TestIds} from '@sberbusiness/triplex/dataTestIds/dataTestIds';
import {TestProps} from '@sberbusiness/triplex/types/CoreTypes';
import {ISelectOption, ISelectProps} from '@sberbusiness/triplex/components/Select/Select';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {ISelectExtendedDropdownProvideProps, ISelectExtendedTargetProvideProps, SelectExtended} from '../SelectExtended/SelectExtended';
import {DropdownListContext} from '@sberbusiness/triplex/components/Dropdown/DropdownListContext';

/** Свойства AmountCurrencySelect. */
export interface IAmountCurrencySelectProps extends Omit<IInputProps, 'type' | 'maxLength' | 'onChange' | 'onSelect'>, TestProps {
    /** Значение.  */
    value: string;
    /** Максимальное количество знаков перед запятой. */
    maxIntegerDigits?: number;
    /** Количество знаков после запятой. */
    fractionDigits?: number;
    /** Выбранная валюта. */
    currency: ISelectOption | null;
    /** Список валют. */
    currencyOptions: ISelectOption[];
    /** Обработчик выбора элемента списка. */
    onSelect: (item: ISelectOption) => void;
    /** Флаг для отображения спиннера. */
    loading?: boolean;
    /** Свойства компонента выбора валюты. */
    currencyProps?: ISelectProps;
    /** Обработчик изменения значения. */
    onChange: (value: string) => void;
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
        fractionDigits: 2,
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
            currency,
            currencyOptions,
            onSelect,
            loading,
            currencyProps,
            'data-test-id': dataTestId,
            ...restProps
        } = this.props;
        const {tabIndex, disabled, error} = restProps;
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
                <AmountBaseInput {...restProps} data-test-id={dataTestId && `${dataTestId}${TestIds.AmountCurrencySelect.input}`} />

                <SelectExtended
                    className="cssClass[currencySelectExtended]"
                    data-test-id={dataTestId && `${dataTestId}${TestIds.AmountCurrencySelect.select}`}
                    renderTarget={renderTarget}
                    closeOnTab
                >
                    {({opened, setOpened, dropdownRef, ...restDropdownProps}: ISelectExtendedDropdownProvideProps) => (
                        <DropdownListContext.Provider value={{activeDescendant, setActiveDescendant: this.setActiveDescendant}}>
                            <SelectExtended.Dropdown
                                {...restDropdownProps}
                                className="cssClass[currencySelectExtendedDropdown]"
                                data-test-id={dataTestId && `${dataTestId}${TestIds.AmountCurrencySelect.dropdown}`}
                                opened={opened}
                                setOpened={setOpened}
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
