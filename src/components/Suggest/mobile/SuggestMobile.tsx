import React, {useState, useEffect, useRef} from 'react';
import {ISuggestMobileTarget, SuggestMobileTarget} from '@sberbusiness/triplex/components/Suggest/mobile/SuggestMobileTarget';
import {ISuggestMobileDropdown, SuggestMobileDropdown} from '@sberbusiness/triplex/components/Suggest/mobile/SuggestMobileDropdown';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {EInputGroupPosition} from '@sberbusiness/triplex/components/InputGroup/InputGroup';

export interface ISuggestMobileProps
    extends Omit<ISuggestMobileDropdown, 'opened' | 'setOpened'>,
        Pick<ISuggestMobileTarget, 'className' | 'disabled' | 'error' | 'onFocus' | 'placeholder'> {
    /** Позиция внутри компонента InputGroup. */
    groupPosition?: EInputGroupPosition;
    /** Рендер-функция Target элемента. */
    renderTarget?: (props: ISuggestMobileTargetProvideProps) => React.ReactNode;
}

export interface ISuggestMobileTargetProvideProps {
    /** Обработчик получения фокуса. */
    onFocus: (event: React.FocusEvent<HTMLElement>) => void;
    /** Флаг, показывающий состояние dropdown - открыт/закрыт. */
    opened: boolean;
    /** Ref на элемент. */
    targetRef: React.MutableRefObject<HTMLElement | null>;
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
export const SuggestMobile: React.FC<ISuggestMobileProps> = ({
    className,
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
    renderTarget,
    saveFilterOnFocus,
    dropdownHint,
    value,
    groupPosition,
}) => {
    const [dropdownOpened, setDropdownOpened] = useState(false);
    const targetRef = useRef<HTMLInputElement>(null);
    // Предыдущее состояние dropdownOpened.
    const prevDropdownOpened = useRef<boolean>(false);
    const classNames = classnames(
        'cssClass[suggest]',
        'hoverable',
        {'cssClass[grouped]': !!groupPosition},
        groupPosition && mapInputGroupPositionToCSSClass[groupPosition],
        className
    );

    const handleFocusTarget = (event: React.FocusEvent<HTMLElement>) => {
        // Когда target получает фокус, открывается Dropdown.
        setDropdownOpened(true);
        onFocus?.(event as React.FocusEvent<HTMLInputElement>);
        event.preventDefault();
    };

    useEffect(() => {
        // Дропдаун закрылся.
        if (prevDropdownOpened.current && !dropdownOpened && targetRef.current) {
            // Обратный скролл к инпуту тк при открытии Dropdown в iOS страница скроллится вверх.
            targetRef.current.scrollIntoView({block: 'center'});
        }
        prevDropdownOpened.current = dropdownOpened;
    }, [dropdownOpened]);

    return (
        <div className={classNames}>
            {renderTarget ? (
                renderTarget({onFocus: handleFocusTarget, opened: dropdownOpened, targetRef})
            ) : (
                <SuggestMobileTarget
                    value={value}
                    disabled={disabled}
                    error={error}
                    onFocus={handleFocusTarget}
                    placeholder={placeholder}
                    ref={targetRef}
                />
            )}

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
