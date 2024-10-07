import React, {useRef, useState} from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {ETextSize} from '@sberbusiness/triplex/components/Typography/enums';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {uniqueId} from '@sberbusiness/triplex/utils/uniqueId';
import {
    ButtonDropdownExtended,
    IButtonDropdownExtendedButtonProvideProps,
    IButtonDropdownExtendedDropdownProvideProps,
} from '@sberbusiness/triplex/components/Button/ButtonDropdownExtended';
import {isKey} from '@sberbusiness/triplex/utils/keyboard';
import {DropdownListContext} from '@sberbusiness/triplex/components/Dropdown/DropdownListContext';
import {
    DropdownMobileBody,
    DropdownMobileClose,
    DropdownMobileHeader,
    DropdownMobileList,
    DropdownMobileListItem,
} from '@sberbusiness/triplex/components/Dropdown/mobile';
import {DropdownList} from '@sberbusiness/triplex/components/Dropdown/desktop/DropdownList';
import {IButtonDropdownProps} from '@sberbusiness/triplex/components/Button/ButtonDropdown';
import {
    IListItemControlsButtonProps,
    ListItemControlsButton,
} from '@sberbusiness/triplex/components/List/components/ListItemControlsButton';

interface IListItemControlsButtonDropdownProps extends Omit<IButtonDropdownProps, 'size'>, Pick<IListItemControlsButtonProps, 'icon'> {}

/** Кнопка-дропдаун listItem для области под свайпом. */
export const ListItemControlsButtonDropdown = React.forwardRef<HTMLButtonElement, IListItemControlsButtonDropdownProps>((props, ref) => {
    const {buttonAttributes, children, className, icon, options, selected, disabled, ...rest} = props;
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [activeDescendant, setActiveDescendant] = useState<string>();
    const instanceId = useRef(uniqueId());

    const renderButton = ({opened, setOpened}: IButtonDropdownExtendedButtonProvideProps) => {
        const classNames = classnames('hoverable', {
            'cssClass[active]': opened,
        });

        return (
            <ListItemControlsButton
                className={classNames}
                onKeyDown={handleKeyDown({opened, setOpened})}
                onClick={handleClick({opened, setOpened})}
                disabled={disabled}
                aria-haspopup="menu"
                aria-expanded={opened}
                aria-controls={instanceId.current}
                aria-activedescendant={activeDescendant}
                icon={icon}
                {...buttonAttributes}
                ref={setRef}
            >
                {children}
            </ListItemControlsButton>
        );
    };

    const handleClick =
        ({opened, setOpened}: IButtonDropdownExtendedButtonProvideProps) =>
        () =>
            setOpened(!opened);

    const handleKeyDown =
        ({opened, setOpened}: IButtonDropdownExtendedButtonProvideProps) =>
        (event: React.KeyboardEvent<HTMLButtonElement>) => {
            const {key} = event;

            if (isKey(key, 'SPACE') || isKey(key, 'ARROW_UP') || isKey(key, 'ARROW_DOWN')) {
                event.preventDefault();
            }
            if (!opened && (isKey(key, 'ARROW_UP') || isKey(key, 'ARROW_DOWN'))) {
                setOpened(true);
            }
        };

    const renderDropdown = ({opened, setOpened, className}: IButtonDropdownExtendedDropdownProvideProps) => {
        const classNames = classnames('cssClass[buttonDropdownMenu]', className);

        return (
            <DropdownListContext.Provider value={{activeDescendant, setActiveDescendant}}>
                <ButtonDropdownExtended.Dropdown
                    className={classNames}
                    opened={opened}
                    setOpened={setOpened}
                    targetRef={buttonRef}
                    ref={dropdownRef}
                    mobileViewProps={{
                        children: (
                            <>
                                <DropdownMobileHeader>
                                    <Text tag="div" size={ETextSize.B1}>
                                        {children}
                                    </Text>
                                    <DropdownMobileClose onClick={() => setOpened(false)} />
                                </DropdownMobileHeader>
                                <DropdownMobileBody>
                                    <DropdownMobileList>
                                        {options.map((option) => (
                                            <DropdownMobileListItem
                                                {...option}
                                                key={option.id}
                                                selected={option.id === selected?.id}
                                                onSelect={() => {
                                                    option.onSelect?.();
                                                    setOpened(false);
                                                }}
                                            >
                                                {option.label}
                                            </DropdownMobileListItem>
                                        ))}
                                    </DropdownMobileList>
                                </DropdownMobileBody>
                            </>
                        ),
                    }}
                >
                    <DropdownList dropdownOpened={opened} id={instanceId.current}>
                        {options.map((option) => (
                            <DropdownList.Item
                                {...option}
                                className="cssClass[buttonDropdownMenuItem]"
                                key={option.id}
                                selected={option.id === selected?.id}
                                onSelect={() => {
                                    option.onSelect?.();
                                    setOpened(false);
                                }}
                            >
                                {option.label}
                            </DropdownList.Item>
                        ))}
                    </DropdownList>
                </ButtonDropdownExtended.Dropdown>
            </DropdownListContext.Provider>
        );
    };

    /** Функция для хранения ссылки. */
    const setRef = (instance: HTMLButtonElement | null) => {
        buttonRef.current = instance;
        if (typeof ref === 'function') {
            ref(instance);
        } else if (ref) {
            ref.current = instance;
        }
    };

    return (
        <ButtonDropdownExtended
            className={classnames('cssClass[listItemControlsButtonDropdown]', className)}
            renderButton={renderButton}
            renderDropdown={renderDropdown}
            dropdownRef={dropdownRef}
            closeOnTab
            {...rest}
        />
    );
});

ListItemControlsButtonDropdown.displayName = 'ListItemControlsButtonDropdown';
