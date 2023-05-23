import React, {useState, useRef} from 'react';
import {
    ISelectExtendedDropdownProvideProps,
    ISelectExtendedProps,
    ISelectExtendedTargetProvideProps,
    SelectExtended,
} from '../SelectExtended/SelectExtended';
import {ISelectExtendedTargetProps} from '../SelectExtended/components/SelectExtendedTarget';
import {IDropdownListItemProps} from '@sberbusiness/triplex/desktop/components/Dropdown/components/DropdownListItem';
import {DropdownListContext} from '@sberbusiness/triplex/desktop/components/Dropdown/DropdownListContext';
import {uniqueId} from '@sberbusiness/triplex/common/utils/uniqueId';
import {TestProps} from '../../common/types/CoreTypes';
import {TestIds} from '../../../common/dataTestIds/dataTestIds';

/** Свойства опции списка. */
export interface ISelectBaseOption
    extends Omit<IDropdownListItemProps, 'active' | 'onSelect' | 'selected' | 'keyCodesForSelection' | 'className' | 'id' | 'key'> {
    /** Значение опции. */
    value: string;
    /** Название опции. */
    label: React.ReactNode;
}

export interface ISelectBaseProps
    extends Omit<ISelectExtendedProps, 'children' | 'onChange' | 'placeholder' | 'renderTarget'>,
        Pick<ISelectExtendedTargetProps, 'disabled' | 'error' | 'loading' | 'placeholder'>,
        TestProps {
    children?: never;
    /** Текущее выбранное значение. */
    value?: ISelectBaseOption;
    /** Список опций. */
    options: ISelectBaseOption[];
    /** Обработчик изменения значения. */
    onChange: (option: ISelectBaseOption) => void;
    /** ClassName передающийся в SelectExtended.Target. */
    targetClassName?: string;
    /** ClassName передающийся в DropdownListItem. */
    dropdownListItemClassName?: string;
}

/** Базовый компонент Select, на его основе строятся Select и FormFieldSelect. */
export const SelectBase: React.FC<ISelectBaseProps> = ({
    children,
    className,
    value,
    options,
    onChange,
    placeholder,
    loading,
    error,
    disabled,
    'aria-labelledby': ariaLabelledby,
    'data-test-id': dataTestId,
    dropdownListItemClassName,
    targetClassName,
    ...rest
}) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const [activeDescendant, setActiveDescendant] = useState<string>();
    const instanceId = useRef(uniqueId());

    const renderTarget = (props: ISelectExtendedTargetProvideProps) => (
        <SelectExtended.Target
            className={targetClassName}
            label={value?.label}
            placeholder={placeholder}
            loading={loading}
            error={error}
            disabled={disabled}
            role="combobox"
            aria-controls={instanceId.current}
            aria-activedescendant={activeDescendant}
            aria-labelledby={ariaLabelledby}
            data-test-id={dataTestId && `${dataTestId}${TestIds.Select.target}`}
            ref={targetRef}
            {...props}
        />
    );

    return (
        <SelectExtended className={className} data-test-id={dataTestId} renderTarget={renderTarget} {...rest}>
            {({opened, setOpened, dropdownRef, ...restDropdownProps}: ISelectExtendedDropdownProvideProps) =>
                opened && !loading ? (
                    <DropdownListContext.Provider value={{activeDescendant, setActiveDescendant}}>
                        <SelectExtended.Dropdown
                            {...restDropdownProps}
                            data-test-id={dataTestId && `${dataTestId}${TestIds.Select.dropdown}`}
                            opened={opened}
                            targetRef={targetRef}
                            forwardedRef={dropdownRef}
                            fixedWidth={true}
                        >
                            <SelectExtended.Dropdown.List id={instanceId.current} dropdownOpened={opened}>
                                {options.map((option) => {
                                    const {label, ...restOption} = option;

                                    return (
                                        <SelectExtended.Dropdown.List.Item
                                            {...restOption}
                                            className={dropdownListItemClassName}
                                            id={option.value}
                                            key={option.value}
                                            selected={option.value === value?.value}
                                            onSelect={() => {
                                                onChange(option);
                                                setOpened(false);
                                            }}
                                            data-test-id={
                                                dataTestId && `${dataTestId}${TestIds.Select.dropdown}${TestIds.Dropdown.listItem}`
                                            }
                                        >
                                            {label}
                                        </SelectExtended.Dropdown.List.Item>
                                    );
                                })}
                            </SelectExtended.Dropdown.List>
                        </SelectExtended.Dropdown>
                    </DropdownListContext.Provider>
                ) : null
            }
        </SelectExtended>
    );
};
