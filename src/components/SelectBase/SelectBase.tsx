import React, {useState, useRef} from 'react';
import {
    ISelectExtendedDefaultOption,
    ISelectExtendedDropdownProvideProps,
    ISelectExtendedProps,
    ISelectExtendedTargetProvideProps,
    SelectExtended,
} from '../SelectExtended/SelectExtended';
import {ISelectExtendedTargetProps} from '@sberbusiness/triplex/components/SelectExtended/components/SelectExtendedTarget';
import {DropdownListContext} from '@sberbusiness/triplex/components/Dropdown/DropdownListContext';
import {TestProps} from '@sberbusiness/triplex/types/CoreTypes';
import {TestIds} from '@sberbusiness/triplex/dataTestIds/dataTestIds';
import {uniqueId} from '@sberbusiness/triplex/utils/uniqueId';
import {SelectExtendedDropdownDefault} from '@sberbusiness/triplex/components/SelectExtended/components/SelectExtendedDropdownDefault';

/** Свойства опции списка. */
export interface ISelectBaseOption extends ISelectExtendedDefaultOption {}

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
    /** Свойства, передающиеся в SelectExtended.Target. */
    targetProps?: Omit<ISelectExtendedTargetProps, 'opened' | 'setOpened'>;
    /** ClassName передающийся в DropdownListItem. */
    dropdownListItemClassName?: string;
    /** Название Select отображающееся в мобильном режиме. */
    mobileTitle?: React.ReactNode;
}

/** Базовый компонент Select, на его основе строятся Select и FormFieldSelect. */
export const SelectBase = React.forwardRef<HTMLDivElement, ISelectBaseProps>((props, ref) => {
    const {
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
        targetProps,
        ...rest
    } = props;

    const [activeDescendant, setActiveDescendant] = useState<string>();
    const targetRef = useRef<HTMLDivElement | null>(null);
    const instanceId = useRef(uniqueId());

    const setRef = (node: HTMLInputElement | null) => {
        targetRef.current = node;
        if (typeof ref === 'function') {
            ref(node);
        } else if (ref) {
            ref.current = node;
        }
    };

    const renderTarget = (props: ISelectExtendedTargetProvideProps) => (
        <SelectExtended.Target
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
            ref={setRef}
            {...targetProps}
            {...props}
        />
    );

    const renderDropdown = (props: ISelectExtendedDropdownProvideProps) => (
        <DropdownListContext.Provider value={{activeDescendant, setActiveDescendant}}>
            <SelectExtendedDropdownDefault
                {...props}
                dataTestId={dataTestId}
                loading={loading}
                listId={instanceId.current}
                mobileTitle={mobileTitle}
                onChange={onChange}
                options={options}
                value={value}
            />
        </DropdownListContext.Provider>
    );

    return (
        <SelectExtended className={className} data-test-id={dataTestId} renderTarget={renderTarget} closeOnTab={true} {...rest}>
            {renderDropdown}
        </SelectExtended>
    );
});

SelectBase.displayName = 'SelectBase';
