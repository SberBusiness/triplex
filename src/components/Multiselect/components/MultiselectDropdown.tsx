import React, {useEffect, useState} from 'react';
import FocusTrap from 'focus-trap-react';
import {Dropdown, IDropdownProps} from '@sberbusiness/triplex/components/Dropdown/Dropdown';
import {MultiselectDropdownHeader} from '@sberbusiness/triplex/components/Multiselect/components/MultiselectDropdownHeader';
import {MultiselectDropdownContent} from '@sberbusiness/triplex/components/Multiselect/components/MultiselectDropdownContent';
import {MultiselectDropdownFooter} from '@sberbusiness/triplex/components/Multiselect/components/MultiselectDropdownFooter';
import {ISelectExtendedDropdownProvideProps} from '@sberbusiness/triplex/components/SelectExtended/SelectExtended';

export interface IMultiselectDropdownProvideProps extends ISelectExtendedDropdownProvideProps {}

/** Свойства компонента MultiselectDropdown. */
interface IMultiselectDropdownProps extends IDropdownProps {
    forwardedRef?: React.RefObject<HTMLDivElement>;
}

export interface IMultiselectDropdownFC extends React.FC<IMultiselectDropdownProps> {
    Header: typeof MultiselectDropdownHeader;
    Content: typeof MultiselectDropdownContent;
    Footer: typeof MultiselectDropdownFooter;
}

/** Компонент выпадающего блока мильти-списка. */
export const MultiselectDropdown: IMultiselectDropdownFC = ({children, opened, targetRef, forwardedRef, ...rest}) => {
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
        <FocusTrap active={trapActive}>
            <Dropdown opened={opened} fixedWidth={true} targetRef={targetRef} {...rest} ref={forwardedRef}>
                {children}
            </Dropdown>
        </FocusTrap>
    );
};

MultiselectDropdown.Header = MultiselectDropdownHeader;
MultiselectDropdown.Content = MultiselectDropdownContent;
MultiselectDropdown.Footer = MultiselectDropdownFooter;
MultiselectDropdown.displayName = 'MultiselectDropdown';
