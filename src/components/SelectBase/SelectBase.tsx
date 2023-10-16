import React, {useState, useRef} from 'react';
import {
    ISelectExtendedDropdownProvideProps,
    ISelectExtendedProps,
    ISelectExtendedTargetProvideProps,
    SelectExtended,
} from '../SelectExtended/SelectExtended';
import {ISelectExtendedTargetProps} from '@sberbusiness/triplex/components/SelectExtended/components/SelectExtendedTarget';
import {IDropdownListItemProps} from '@sberbusiness/triplex/components/Dropdown/desktop/DropdownListItem';
import {DropdownListContext} from '@sberbusiness/triplex/components/Dropdown/DropdownListContext';
import {TestProps} from '@sberbusiness/triplex/types/CoreTypes';
import {TestIds} from '@sberbusiness/triplex/dataTestIds/dataTestIds';
import {uniqueId} from '@sberbusiness/triplex/utils/uniqueId';
import {DropdownMobileHeader} from '@sberbusiness/triplex/components/Dropdown/mobile/DropdownMobileHeader';
import {DropdownMobileBody} from '@sberbusiness/triplex/components/Dropdown/mobile/DropdownMobileBody';
import {DropdownMobileList} from '@sberbusiness/triplex/components/Dropdown/mobile/DropdownMobileList';
import {DropdownMobileListItem} from '@sberbusiness/triplex/components/Dropdown/mobile/DropdownMobileListItem';
import {DropdownMobileClose} from '@sberbusiness/triplex/components/Dropdown/mobile/DropdownMobileClose';

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
    /** Название Select отображающееся в мобильном режиме. */
    mobileTitle?: string;
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
    mobileTitle,
    targetClassName,
    ...rest
}) => {
    const [activeDescendant, setActiveDescendant] = useState<string>();
    const targetRef = useRef<HTMLDivElement>(null);
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

    const renderDropdown = ({opened, setOpened, dropdownRef, ...rest}: ISelectExtendedDropdownProvideProps) => (
        <DropdownListContext.Provider value={{activeDescendant, setActiveDescendant}}>
            <SelectExtended.Dropdown
                {...rest}
                data-test-id={dataTestId && `${dataTestId}${TestIds.Select.dropdown}`}
                opened={opened && !loading}
                targetRef={targetRef}
                forwardedRef={dropdownRef}
                fixedWidth
                setOpened={setOpened}
                mobileViewProps={{
                    children: (
                        <>
                            <DropdownMobileHeader closeButton={() => <DropdownMobileClose onClick={() => setOpened(false)} />}>
                                {mobileTitle}
                            </DropdownMobileHeader>
                            <DropdownMobileBody>
                                <DropdownMobileList>
                                    {options.map((option) => {
                                        const {label, ...restOption} = option;

                                        return (
                                            <DropdownMobileListItem
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
                                            </DropdownMobileListItem>
                                        );
                                    })}
                                </DropdownMobileList>
                            </DropdownMobileBody>
                        </>
                    ),
                }}
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
                                data-test-id={dataTestId && `${dataTestId}${TestIds.Select.dropdown}${TestIds.Dropdown.listItem}`}
                            >
                                {label}
                            </SelectExtended.Dropdown.List.Item>
                        );
                    })}
                </SelectExtended.Dropdown.List>
            </SelectExtended.Dropdown>
        </DropdownListContext.Provider>
    );

    return (
        <SelectExtended className={className} data-test-id={dataTestId} renderTarget={renderTarget} closeOnTab={true} {...rest}>
            {renderDropdown}
        </SelectExtended>
    );
};
