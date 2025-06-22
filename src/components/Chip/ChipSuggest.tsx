import React from 'react';
import {Chip, ChipClearButton, ChipDropdownArrow} from '@sberbusiness/triplex/components/Chip';
import {
    ISuggestMobileProps,
    ISuggestMobileTargetProvideProps,
    SuggestMobile,
} from '@sberbusiness/triplex/components/Suggest/mobile/SuggestMobile';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

export interface IChipSuggestProps extends Omit<ISuggestMobileProps, 'renderTarget'> {
    /** Функция отмены выбора. */
    clearSelected: () => void;
    /** Название поля, когда не выбрано значение. */
    label: React.ReactNode;
    /** Лейбл, отображаемый вместо выбранного значения. */
    displayedValue?: React.ReactNode;
}

/**
 * Компонент выбора одного значения из списка с возможностью фильтрации.
 * Выбранное значение отображается компонентом Chip.
 * Кастомизированный компонент SuggestMobile.
 * Работает только на мобильном устройстве.
 */
export const ChipSuggest: React.FC<IChipSuggestProps> = ({children, clearSelected, disabled, label, displayedValue, value, ...rest}) => {
    const handleClickClearButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        // Предотвращение нажатия на родительский элемент Chip.
        event.stopPropagation();

        clearSelected();
    };

    const handleFocusClearButton = (event: React.FocusEvent<HTMLButtonElement>) => {
        // Предотвращение всплытия на родительский элемент Chip.
        event.stopPropagation();
    };

    const renderTarget = ({onFocus, opened, targetRef}: ISuggestMobileTargetProvideProps) => (
        <Chip
            aria-expanded={opened}
            disabled={disabled}
            onFocus={onFocus}
            postfix={
                value ? (
                    // tabIndex={0} обязателен, иначе на iOS не вызовется handleFocusClearButton.
                    <ChipClearButton onFocus={handleFocusClearButton} onClick={handleClickClearButton} tabIndex={0} />
                ) : (
                    <ChipDropdownArrow rotated={opened} />
                )
            }
            ref={targetRef}
            role="combobox"
            selected={Boolean(value)}
        >
            {value ? displayedValue ?? value.label : label}
        </Chip>
    );

    return (
        <SuggestMobile
            className={classnames('cssClass[chipGroupItem]', 'cssClass[chipSuggest]')}
            renderTarget={renderTarget}
            disabled={disabled}
            value={value}
            {...rest}
        />
    );
};

ChipSuggest.displayName = 'ChipSuggest';
