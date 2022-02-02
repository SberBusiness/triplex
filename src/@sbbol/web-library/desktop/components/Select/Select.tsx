import * as React from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {
    ISelectExtendedDropdownProvideProps,
    ISelectExtendedProps,
    ISelectExtendedTargetProvideProps,
    SelectExtended,
} from './SelectExtended';
import {ISelectExtendedTargetProps} from './components/SelectExtendedTarget';
import {TestProps} from '../../common/types/CoreTypes';
import {TestIds} from '../../../common/dataTestIds/dataTestIds';
import {IDropdownListItemProps} from '../Dropdown/components/DropdownListItem';

/**
 * Направление открытия выпадающего списка.
 */
export enum ESelectOrientation {
    BOTTOM,
    TOP,
}

/**
 * Свойства options и value.
 *
 * @prop {string} value Значение option.
 * @prop {React.ReactNode} label Название option.
 */
export interface ISelectOption
    extends Omit<IDropdownListItemProps, 'active' | 'onSelect' | 'selected' | 'keyCodesForSelection' | 'className' | 'id' | 'key'> {
    value: string;
    label: React.ReactNode;
}

/**
 * Свойства Select.
 *
 * @prop {Function} onChange Обработчик выбора option.
 * @prop {ISelectOption[]} options Список option.
 * @prop {ESelectOrientation} [orientation] Направление открытия выпадающего списка.
 * @prop {ISelectOption} [value] Текущее выбранное значение.
 */
export interface ISelectProps
    extends Omit<ISelectExtendedProps, 'children' | 'onChange' | 'placeholder' | 'renderTarget'>,
        Pick<ISelectExtendedTargetProps, 'disabled' | 'error' | 'loading' | 'placeholder'>,
        TestProps {
    children?: never;
    onChange: (option: ISelectOption) => void;
    options: ISelectOption[];
    orientation?: ESelectOrientation;
    value?: ISelectOption;
}

/**
 * Компонент Select.
 * В качестве value и options принимает объекты типа ISelectOption.
 * Если требуется кастомизация options или другой формат value - создайте CustomSelect на основе SelectExtended.
 */
export class Select extends React.Component<ISelectProps> {
    public static defaultProps = {
        orientation: ESelectOrientation.BOTTOM,
    };

    public render(): JSX.Element {
        const {children, error, disabled, loading, onChange, options, orientation, placeholder, value, ...selectExtendedProps} = this.props;
        const dataTestId = this.props['data-test-id'];

        return (
            <SelectExtended renderTarget={this.renderTarget} {...selectExtendedProps}>
                {({className: dropdownClassName, ...dropdownProps}: ISelectExtendedDropdownProvideProps) =>
                    dropdownProps.opened ? (
                        <SelectExtended.Dropdown
                            className={classnames(dropdownClassName, 'cssClass[selectDropdown]', {
                                'cssClass[topOrientation]': orientation === ESelectOrientation.TOP,
                            })}
                            data-test-id={dataTestId && `${dataTestId}${TestIds.Select.dropdown}`}
                            opened={dropdownProps.opened}
                        >
                            <SelectExtended.Dropdown.List className="cssClass[selectDropdownList]" dropdownOpened={dropdownProps.opened}>
                                {options.map((option) => (
                                    <SelectExtended.Dropdown.List.Item
                                        {...option}
                                        className="cssClass[selectDropdownListItem]"
                                        id={option.value}
                                        key={option.value}
                                        selected={option.value === value?.value}
                                        onSelect={() => {
                                            onChange(option);
                                            dropdownProps.setOpened(false);
                                        }}
                                        data-test-id={dataTestId && `${dataTestId}${TestIds.Select.dropdown}${TestIds.Dropdown.listItem}`}
                                    >
                                        {option.label}
                                    </SelectExtended.Dropdown.List.Item>
                                ))}
                            </SelectExtended.Dropdown.List>
                        </SelectExtended.Dropdown>
                    ) : null
                }
            </SelectExtended>
        );
    }

    private renderTarget = (targetProps: ISelectExtendedTargetProvideProps) => {
        const {error, disabled, loading, placeholder, value} = this.props;
        const dataTestId = this.props['data-test-id'];

        return (
            <SelectExtended.Target
                error={error}
                disabled={disabled}
                label={value?.label}
                loading={loading}
                placeholder={placeholder}
                data-test-id={dataTestId && `${dataTestId}${TestIds.Select.target}`}
                {...targetProps}
            />
        );
    };
}
