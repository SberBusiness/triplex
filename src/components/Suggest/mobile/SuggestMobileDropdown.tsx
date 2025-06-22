import React, {useState, useEffect, useRef} from 'react';
import {isEqual} from 'lodash';
import {SpinnersmallAniIcon20} from '@sberbusiness/icons/SpinnersmallAniIcon20';
import {Dropdown} from '@sberbusiness/triplex/components/Dropdown/Dropdown';
import {DropdownMobileInput} from '@sberbusiness/triplex/components/Dropdown/mobile/DropdownMobileInput';
import {DropdownMobileHeader} from '@sberbusiness/triplex/components/Dropdown/mobile/DropdownMobileHeader';
import {DropdownMobileClose} from '@sberbusiness/triplex/components/Dropdown/mobile/DropdownMobileClose';
import {DropdownMobileBody} from '@sberbusiness/triplex/components/Dropdown/mobile/DropdownMobileBody';
import {DropdownMobileList} from '@sberbusiness/triplex/components/Dropdown/mobile/DropdownMobileList';
import {DropdownMobileListItem} from '@sberbusiness/triplex/components/Dropdown/mobile/DropdownMobileListItem';
import {SuggestMobileDropdownHint} from '@sberbusiness/triplex/components/Suggest/mobile/SuggestMobileDropdownHint';
import {ISuggestOption} from '@sberbusiness/triplex/components/Suggest/types';

export interface ISuggestMobileDropdown {
    // Флаг для отображения лоадера в инпуте в Dropdown. Показывается, когда не загружен ни один элемент списка.
    loadingDropdownInput?: boolean;
    // Флаг для отображения лоадера в списке Dropdown. Показывается для подгрузки новых данных.
    loadingDropdownList?: boolean;
    // Обработчик выбора элемента из списка.
    onSelect: (item: ISuggestOption | undefined, e?: Event) => void;
    // Обработчик окончания скролла списка (доступные в данный момент элементы закончились). Используется для подгрузки длинных списков.
    onScrollEnd?: () => void;
    // Dropdown открыт.
    opened: boolean;
    // Список значений.
    options: ISuggestOption[];
    // Обработчик фильтрации значений.
    onFilter: (value: string) => void;
    // Плейсхолдер для input.
    placeholder?: string;
    // Флаг для изменения поведения при клике на компонент с заполненным value (true - сохранит введённую строку фильтра).
    saveFilterOnFocus?: boolean;
    // Обработчик изменения свойства opened.
    setOpened: (opened: boolean) => void;
    // Текст подсказки. Например - "Ничего не найдено" или "Введите более 3 символов". Подсказка отображается на месте списка выбора.
    dropdownHint: string;
    // Выбранное значение.
    value?: ISuggestOption;
}

/**
 * Отображает мобильный dropdown с полем ввода и списком для выбора.
 */
export const SuggestMobileDropdown = React.forwardRef<HTMLDivElement, ISuggestMobileDropdown>(
    (
        {
            onFilter,
            onScrollEnd,
            onSelect,
            loadingDropdownInput,
            loadingDropdownList,
            opened,
            options,
            placeholder,
            saveFilterOnFocus,
            setOpened,
            dropdownHint,
            value,
        },
        ref
    ) => {
        const listRef = useRef<HTMLDivElement>(null);
        // Не используется в мобильном Dropdown, нужен как обязательное свойство Dropdown.
        const targetRef = useRef<HTMLDivElement>(null);
        const inputRef = useRef<HTMLInputElement>(null);
        // Значение инпута.
        const [query, setQuery] = useState(value ? value.label : '');

        useEffect(() => {
            setQuery(value ? value.label : '');
        }, [value]);

        useEffect(() => {
            if (opened && inputRef.current) {
                // Установка фокуса в dropdown при открытии.
                inputRef.current?.focus();
            }
        }, [opened]);

        const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
            const {value} = event.target;
            setQuery(value);
            onFilter(value);
        };

        const handleClickCloseButton = () => {
            setOpened(false);
            onSelect(value);
        };

        const handleInputFocus = () => {
            if (saveFilterOnFocus) {
                setQuery(value ? value.label : '');
            } else {
                setQuery('');
            }
        };

        const handleScrollList = (event: React.UIEvent<HTMLDivElement> & {target: HTMLDivElement & EventTarget}) => {
            if (!onScrollEnd) {
                return;
            }
            const {clientHeight, scrollHeight, scrollTop} = event.target;

            if (scrollHeight - scrollTop === clientHeight) {
                onScrollEnd();
            }
        };

        const handleChangeDropdownOpened = (opened: boolean) => {
            setOpened(opened);
            if (!opened) {
                onSelect(value);
            }
        };

        return (
            <Dropdown
                setOpened={handleChangeDropdownOpened}
                opened={opened}
                targetRef={targetRef}
                ref={ref}
                mobileViewProps={{
                    children: (
                        <>
                            <DropdownMobileHeader closeButton={() => <DropdownMobileClose onClick={handleClickCloseButton} />}>
                                <DropdownMobileInput
                                    onChange={handleChangeInput}
                                    onFocus={handleInputFocus}
                                    placeholder={placeholder}
                                    ref={inputRef}
                                    value={query}
                                />

                                {loadingDropdownInput && (
                                    <div className="cssClass[dropdownInputSpinnerWrapper]">
                                        <SpinnersmallAniIcon20 className="cssClass[globalSpin]" />
                                    </div>
                                )}
                            </DropdownMobileHeader>

                            <DropdownMobileBody className="cssClass[suggestMobileBody]" onScroll={handleScrollList}>
                                {dropdownHint ? (
                                    <SuggestMobileDropdownHint>{dropdownHint}</SuggestMobileDropdownHint>
                                ) : (
                                    <DropdownMobileList ref={listRef}>
                                        {options.map((option) => (
                                            <DropdownMobileListItem
                                                selected={isEqual(value, option)}
                                                key={option.id || option.label}
                                                onSelect={() => {
                                                    onSelect(option);
                                                    setOpened(false);
                                                }}
                                                id={option.id || option.label}
                                            >
                                                {option.labelReactNode || option.label}
                                            </DropdownMobileListItem>
                                        ))}

                                        {loadingDropdownList && (
                                            <div className="cssClass[dropdownListSpinnerWrapper]">
                                                <SpinnersmallAniIcon20 className="cssClass[globalSpin]" />
                                            </div>
                                        )}
                                    </DropdownMobileList>
                                )}
                            </DropdownMobileBody>
                        </>
                    ),
                }}
            />
        );
    }
);

SuggestMobileDropdown.displayName = 'SuggestMobileDropdown';
