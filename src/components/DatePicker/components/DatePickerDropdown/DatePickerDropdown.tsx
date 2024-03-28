import React from 'react';
import FocusTrap from 'focus-trap-react';
import {Dropdown, IDropdownProps} from '@sberbusiness/triplex/components/Dropdown/Dropdown';
import {DropdownMobileHeader} from '@sberbusiness/triplex/components/Dropdown/mobile/DropdownMobileHeader';
import {DropdownMobileBody} from '@sberbusiness/triplex/components/Dropdown/mobile/DropdownMobileBody';
import {DropdownMobileClose} from '@sberbusiness/triplex/components/Dropdown/mobile/DropdownMobileClose';
import {
    DropdownMobileMaskedInput,
    IDropdownMobileMaskedInputProps,
} from '@sberbusiness/triplex/components/Dropdown/mobile/DropdownMobileMaskedInput';

/** Свойства компонента DatePickerDropdown. */
export interface IDatePickerDropdownProps extends IDropdownProps {
    /** Свойства FocusTrap. Используется npm-пакет focus-trap-react. */
    focusTrapProps?: FocusTrap.Props;
    /** Функция отрисовки календаря. */
    renderCalendar: (displayMode: boolean) => React.ReactNode;
    /** Пользователь использует клавиатуру для навигации. */
    keyboardNavigation: boolean;
    /** Свойства поля ввода (в адаптивном режиме). */
    inputProps: Omit<IDropdownMobileMaskedInputProps, 'type' | 'mask'>;
}

/** Выпадающее меню компонента DatePicker. */
export const DatePickerDropdown = React.forwardRef<HTMLDivElement, IDatePickerDropdownProps>(
    ({children, focusTrapProps, opened, setOpened, renderCalendar, keyboardNavigation, onFocus, inputProps, ...rest}, ref) => {
        /** Отрисовка содержимого в мобильном режиме. */
        const renderMobileContent = () => {
            const {placeholderMask = DropdownMobileMaskedInput.presets.placeholderMasks.date} = inputProps;
            const mask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];

            return (
                <>
                    <DropdownMobileHeader>
                        <DropdownMobileMaskedInput {...inputProps} mask={mask} placeholderMask={placeholderMask} />
                        <DropdownMobileClose onClick={() => setOpened(false)} />
                    </DropdownMobileHeader>
                    <DropdownMobileBody>{renderCalendar(true)}</DropdownMobileBody>
                </>
            );
        };

        return (
            <Dropdown opened={opened} setOpened={setOpened} mobileViewProps={{children: renderMobileContent()}} {...rest} ref={ref}>
                <FocusTrap
                    {...focusTrapProps}
                    focusTrapOptions={{
                        initialFocus: keyboardNavigation && 'td[tabIndex="0"]',
                        clickOutsideDeactivates: true,
                        returnFocusOnDeactivate: keyboardNavigation,
                        ...focusTrapProps?.focusTrapOptions,
                    }}
                >
                    <div role="presentation">{renderCalendar(false)}</div>
                </FocusTrap>
            </Dropdown>
        );
    }
);

DatePickerDropdown.displayName = 'DatePickerDropdown';
