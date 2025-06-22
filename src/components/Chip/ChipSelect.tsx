import React from 'react';
import {
    ISelectExtendedDropdownProvideProps,
    ISelectExtendedTargetProvideProps,
    SelectExtended,
} from '@sberbusiness/triplex/components/SelectExtended/SelectExtended';
import {Chip, ChipClearButton, ChipDropdownArrow} from '@sberbusiness/triplex/components/Chip/index';
import {ISelectBaseProps} from '@sberbusiness/triplex/components/SelectBase/SelectBase';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {SelectExtendedDropdownDefault} from '@sberbusiness/triplex/components/SelectExtended/components/SelectExtendedDropdownDefault';

export interface IChipSelectProps extends Omit<ISelectBaseProps, 'targetProps' | 'placeholder'> {
    /** Функция отмены выбора. */
    clearSelected: () => void;
    /** Название поля. */
    label?: React.ReactNode;
    /** Лейбл, отображаемый вместо выбранного значения. */
    displayedValue?: React.ReactNode;
}

/**
 * Компонент выбора одного значения из списка.
 * Выбранное значение отображается компонентом Chip.
 */
export const ChipSelect = React.forwardRef<HTMLDivElement, IChipSelectProps>(
    ({children, className, clearSelected, disabled, label, displayedValue, onChange, options, value, ...rest}, ref) => {
        const handleClickClearButton = (event: React.MouseEvent<HTMLButtonElement>) => {
            // Предотвращение нажатия на родительский элемент Chip.
            event.stopPropagation();

            clearSelected();
        };

        const renderTarget = ({opened, setOpened}: ISelectExtendedTargetProvideProps) => (
            <Chip
                aria-expanded={opened}
                disabled={disabled}
                onClick={() => setOpened(true)}
                postfix={value ? <ChipClearButton onClick={handleClickClearButton} /> : <ChipDropdownArrow rotated={opened} />}
                role="combobox"
                ref={ref}
                selected={Boolean(value)}
            >
                {value ? displayedValue ?? value.label : label}
            </Chip>
        );

        const renderDropdown = (props: ISelectExtendedDropdownProvideProps) => (
            <SelectExtendedDropdownDefault
                {...props}
                mobileTitle={label}
                onChange={onChange}
                options={options}
                value={value}
                fixedWidth={false}
            />
        );

        return (
            <SelectExtended className={classnames('cssClass[chipGroupItem]', className)} renderTarget={renderTarget} {...rest}>
                {renderDropdown}
            </SelectExtended>
        );
    }
);

ChipSelect.displayName = 'ChipSelect';
