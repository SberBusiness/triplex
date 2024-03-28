import React, {useState, useEffect, useRef} from 'react';
import {ISuggestMobileTarget, SuggestMobileTarget} from '@sberbusiness/triplex/components/Suggest/mobile/SuggestMobileTarget';
import {ISuggestMobileDropdown, SuggestMobileDropdown} from '@sberbusiness/triplex/components/Suggest/mobile/SuggestMobileDropdown';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {EInputGroupPosition} from '@sberbusiness/triplex/components/InputGroup/InputGroup';

export interface ISuggestMobile
    extends Omit<ISuggestMobileDropdown, 'opened' | 'setOpened'>,
        Pick<ISuggestMobileTarget, 'disabled' | 'error' | 'onFocus' | 'placeholder'> {
    /** Позиция внутри компонента InputGroup. */
    groupPosition?: EInputGroupPosition;
}

const mapInputGroupPositionToCSSClass = {
    [EInputGroupPosition.LEFT]: 'cssClass[left]',
    [EInputGroupPosition.INTERMEDIATE]: 'cssClass[intermediate]',
    [EInputGroupPosition.RIGHT]: 'cssClass[right]',
};

/**
 * Мобильный Suggest.
 * Отображает поле ввода (target). При получении полем ввода фокуса - отображает мобильный Dropdown.
 */
export const SuggestMobile: React.FC<ISuggestMobile> = ({
    disabled,
    error,
    loadingDropdownInput,
    onFilter,
    onFocus,
    onScrollEnd,
    onSelect,
    options,
    placeholder,
    loadingDropdownList,
    saveFilterOnFocus,
    dropdownHint,
    value,
    groupPosition,
}) => {
    const [dropdownOpened, setDropdownOpened] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    // Предыдущее состояние dropdownOpened.
    const prevDropdownOpened = useRef<boolean>(false);
    const classNames = classnames(
        'cssClass[suggest]',
        'hoverable',
        {'cssClass[grouped]': !!groupPosition},
        groupPosition && mapInputGroupPositionToCSSClass[groupPosition]
    );

    const handleFocusTarget = (event: React.FocusEvent<HTMLInputElement>) => {
        // Когда target получает фокус, открывается Dropdown.
        setDropdownOpened(true);
        onFocus?.(event);
        event.preventDefault();
    };

    useEffect(() => {
        // Дропдаун закрылся.
        if (prevDropdownOpened.current && !dropdownOpened && inputRef.current) {
            // Обратный скролл к инпуту тк при открытии Dropdown в iOS страница скроллится вверх.
            inputRef.current.scrollIntoView({block: 'center'});
        }
        prevDropdownOpened.current = dropdownOpened;
    }, [dropdownOpened]);

    return (
        <div className={classNames}>
            <SuggestMobileTarget
                value={value}
                disabled={disabled}
                error={error}
                onFocus={handleFocusTarget}
                placeholder={placeholder}
                ref={inputRef}
            />

            <SuggestMobileDropdown
                opened={dropdownOpened}
                loadingDropdownInput={loadingDropdownInput}
                loadingDropdownList={loadingDropdownList}
                onFilter={onFilter}
                onScrollEnd={onScrollEnd}
                onSelect={onSelect}
                options={options}
                placeholder={placeholder}
                saveFilterOnFocus={saveFilterOnFocus}
                setOpened={setDropdownOpened}
                dropdownHint={dropdownHint}
                value={value}
            />
        </div>
    );
};
