import React from 'react';
import {
    ISelectExtendedDefaultOption,
    ISelectExtendedDropdownProvideProps,
    SelectExtended,
} from '@sberbusiness/triplex/components/SelectExtended/SelectExtended';
import {TestIds} from '@sberbusiness/triplex/dataTestIds/dataTestIds';
import {
    DropdownMobileBody,
    DropdownMobileClose,
    DropdownMobileHeader,
    DropdownMobileList,
    DropdownMobileListItem,
} from '@sberbusiness/triplex/components/Dropdown/mobile';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {ETextSize} from '@sberbusiness/triplex/components/Typography/enums';

export interface ISelectExtendedDropdownDefaultProps extends ISelectExtendedDropdownProvideProps {
    /** Фиксированная ширина по управляющему элементу. */
    fixedWidth?: boolean;
    /** Тестовый атрибут. */
    dataTestId?: string;
    /** ClassName для модификации SelectExtended.Dropdown.List.Item. */
    dropdownListItemClassName?: string;
    /** Состояние загрузки. В этот момент Dropdown закрыт, Target отображает loader. */
    loading?: boolean;
    /** Id SelectExtended.Dropdown.List. Нужен для связи с Target. */
    listId?: string;
    /** Название Select отображающееся в мобильном режиме. */
    mobileTitle?: React.ReactNode;
    /** Список опций. */
    options: ISelectExtendedDefaultOption[];
    /** Обработчик изменения значения. */
    onChange: (option: ISelectExtendedDefaultOption) => void;
    /** Текущее выбранное значение. */
    value?: ISelectExtendedDefaultOption;
}

/**
 * Дефолтный рендер Dropdown для SelectExtended.
 * Вынесено в отдельный компонент для переиспользования внутри компонентов Triplex.
 */
export const SelectExtendedDropdownDefault: React.FC<ISelectExtendedDropdownDefaultProps> = ({
    dataTestId,
    dropdownRef,
    dropdownListItemClassName,
    fixedWidth,
    loading,
    listId,
    mobileTitle,
    onChange,
    opened,
    options,
    setOpened,
    targetRef,
    value,
}) => {
    return (
        <SelectExtended.Dropdown
            data-test-id={dataTestId && `${dataTestId}${TestIds.Select.dropdown}`}
            opened={opened && !loading}
            forwardedRef={dropdownRef}
            fixedWidth={typeof fixedWidth === 'undefined' ? true : fixedWidth}
            setOpened={setOpened}
            targetRef={targetRef}
            mobileViewProps={{
                children: (
                    <>
                        <DropdownMobileHeader closeButton={() => <DropdownMobileClose onClick={() => setOpened(false)} />}>
                            <Text tag="div" size={ETextSize.B1}>
                                {mobileTitle}
                            </Text>
                        </DropdownMobileHeader>
                        <DropdownMobileBody>
                            <DropdownMobileList>
                                {options.map((option) => {
                                    const {label, ...restOption} = option;

                                    return (
                                        <DropdownMobileListItem
                                            {...restOption}
                                            className={dropdownListItemClassName}
                                            id={option.id}
                                            key={option.id}
                                            selected={option.id === value?.id}
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
            <SelectExtended.Dropdown.List id={listId} dropdownOpened={opened}>
                {options.map((option) => {
                    const {label, ...restOption} = option;

                    return (
                        <SelectExtended.Dropdown.List.Item
                            {...restOption}
                            className={dropdownListItemClassName}
                            id={option.id}
                            key={option.id}
                            selected={option.id === value?.id}
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
    );
};
