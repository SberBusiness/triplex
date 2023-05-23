import React from 'react';
import {Dropdown, IDropdownProps} from '@sberbusiness/triplex/desktop/components/Dropdown/Dropdown';
import {MultiselectDropdownHeader} from '@sberbusiness/triplex/desktop/components/Multiselect/components/MultiselectDropdownHeader';
import {MultiselectDropdownContent} from '@sberbusiness/triplex/desktop/components/Multiselect/components/MultiselectDropdownContent';
import {MultiselectDropdownFooter} from '@sberbusiness/triplex/desktop/components/Multiselect/components/MultiselectDropdownFooter';
import {ISelectExtendedDropdownProvideProps} from '@sberbusiness/triplex/desktop/components/SelectExtended/SelectExtended';

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
export const MultiselectDropdown: IMultiselectDropdownFC = ({children, forwardedRef, ...rest}) => (
    <Dropdown fixedWidth={true} {...rest} forwardedRef={forwardedRef}>
        {children}
    </Dropdown>
);

MultiselectDropdown.Header = MultiselectDropdownHeader;
MultiselectDropdown.Content = MultiselectDropdownContent;
MultiselectDropdown.Footer = MultiselectDropdownFooter;
MultiselectDropdown.displayName = 'MultiselectDropdown';
