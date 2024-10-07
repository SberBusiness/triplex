import React, {useEffect, useState} from 'react';
import FocusTrap from 'focus-trap-react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {Dropdown, IDropdownProps} from '@sberbusiness/triplex/components/Dropdown/Dropdown';
import {MultiselectDropdownHeader} from '@sberbusiness/triplex/components/Multiselect/components/MultiselectDropdownHeader';
import {MultiselectDropdownContent} from '@sberbusiness/triplex/components/Multiselect/components/MultiselectDropdownContent';
import {MultiselectDropdownFooter} from '@sberbusiness/triplex/components/Multiselect/components/MultiselectDropdownFooter';

/** Свойства компонента MultiselectDropdown. */
interface IMultiselectDropdownProps extends IDropdownProps {
    /** Свойства FocusTrap. Используется npm-пакет focus-trap-react. */
    focusTrapProps?: FocusTrap.Props;
    forwardedRef?: React.RefObject<HTMLDivElement>;
}

export interface IMultiselectDropdownFC extends React.FC<IMultiselectDropdownProps> {
    Header: typeof MultiselectDropdownHeader;
    Content: typeof MultiselectDropdownContent;
    Footer: typeof MultiselectDropdownFooter;
}

/** Компонент выпадающего блока мильти-списка. */
export const MultiselectDropdown: IMultiselectDropdownFC = ({children, focusTrapProps, opened, targetRef, forwardedRef, mobileViewProps, ...rest}) => {
    const [trapActive, setTrapActive] = useState(false);

    useEffect(() => {
        if (opened) {
            setTimeout(() => setTrapActive(true));
        } else {
            setTrapActive(false);
        }
    }, [opened]);

    if (!opened) {
        return null;
    }

    return (
        <FocusTrap
            active={trapActive}
            {...focusTrapProps}
            focusTrapOptions={{clickOutsideDeactivates: true, preventScroll: true, ...focusTrapProps?.focusTrapOptions}}
        >
            <Dropdown
                fixedWidth
                mobileViewProps={{
                    ...mobileViewProps,
                    className: classnames('cssClass[globalMultiselectDropdownMobileWrapper]', mobileViewProps?.className),
                }}
                targetRef={targetRef}
                opened={opened}
                {...rest}
                ref={forwardedRef}
            >
                {children}
            </Dropdown>
        </FocusTrap>
    );
};

MultiselectDropdown.Header = MultiselectDropdownHeader;
MultiselectDropdown.Content = MultiselectDropdownContent;
MultiselectDropdown.Footer = MultiselectDropdownFooter;
MultiselectDropdown.displayName = 'MultiselectDropdown';
