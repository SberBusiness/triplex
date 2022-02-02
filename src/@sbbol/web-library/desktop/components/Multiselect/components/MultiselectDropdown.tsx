import React from 'react';
import {Dropdown, IDropdownProps} from '@sbbol/web-library/desktop/components/Dropdown/Dropdown';
import {MultiselectDropdownHeader} from '@sbbol/web-library/desktop/components/Multiselect/components/MultiselectDropdownHeader';
import {MultiselectDropdownContent} from '@sbbol/web-library/desktop/components/Multiselect/components/MultiselectDropdownContent';
import {MultiselectDropdownFooter} from '@sbbol/web-library/desktop/components/Multiselect/components/MultiselectDropdownFooter';
import {ISelectExtendedDropdownProvideProps} from '@sbbol/web-library/desktop/components/Select/SelectExtended';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

export interface IMultiselectDropdownProvideProps extends ISelectExtendedDropdownProvideProps {}

/**
 * Свойства компонента MultiselectDropdown.
 *
 * @prop {boolean} [topOrientation] Раскрытие вверх.
 */
interface IMultiselectDropdownProps extends IDropdownProps {
    topOrientation?: boolean;
}

export interface IMultiselectDropdownType extends React.FC<IMultiselectDropdownProps> {
    Header: typeof MultiselectDropdownHeader;
    Content: typeof MultiselectDropdownContent;
    Footer: typeof MultiselectDropdownFooter;
}

/** Компонент выпадающего блока мильти-списка. */
export const MultiselectDropdown: IMultiselectDropdownType = ({children, topOrientation, className, ...restProps}) => {
    const classNameWrapper = classnames(className, 'cssClass[multiselectDropdownWrapper]', {
        'cssClass[topOrientation]': Boolean(topOrientation),
    });

    return (
        <Dropdown {...restProps} className={classNameWrapper}>
            {children}
        </Dropdown>
    );
};

MultiselectDropdown.Header = MultiselectDropdownHeader;
MultiselectDropdown.Content = MultiselectDropdownContent;
MultiselectDropdown.Footer = MultiselectDropdownFooter;
