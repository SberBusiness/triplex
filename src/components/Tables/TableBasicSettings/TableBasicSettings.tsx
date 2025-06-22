import React, {useRef} from 'react';
import {
    ButtonDropdownExtended,
    IButtonDropdownExtendedButtonProvideProps,
    IButtonDropdownExtendedDropdownProvideProps,
    IButtonDropdownExtendedProps,
} from '@sberbusiness/triplex/components/Button/ButtonDropdownExtended';
import {Link, ELinkSize, ELinkType} from '@sberbusiness/triplex/components/Link/Link';
import {TableBasicSettingsBody} from '@sberbusiness/triplex/components/Tables/TableBasicSettings/components/TableBasicSettingsBody';
import {TableBasicSettingsFooter} from '@sberbusiness/triplex/components/Tables/TableBasicSettings/components/TableBasicSettingsFooter';
import {TableBasicSettingsHeader} from '@sberbusiness/triplex/components/Tables/TableBasicSettings/components/TableBasicSettingsHeader';
import {ColumnSettings} from '@sberbusiness/triplex/components/Tables/TableBasicSettings/components/ColumnSettings';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

export interface ITableBasicSettingsProps extends Omit<IButtonDropdownExtendedProps, 'renderDropdown' | 'renderButton' | 'dropdownRef'> {
    /** Название кнопки. */
    linkTitle: string;
    children?: React.ReactNode;
}

interface ITableBasicSettingsFC extends React.FC<ITableBasicSettingsProps> {
    Body: typeof TableBasicSettingsBody;
    ColumnSettings: typeof ColumnSettings;
    Footer: typeof TableBasicSettingsFooter;
    Header: typeof TableBasicSettingsHeader;
}

/** Компонент панели под элементы фильтрации данных для таблицы. */
export const TableBasicSettings: ITableBasicSettingsFC = ({children, className, linkTitle, ...rest}) => {
    const targetRef = useRef<HTMLAnchorElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const renderButton = ({opened, setOpened}: IButtonDropdownExtendedButtonProvideProps) => (
        <Link
            href="#"
            linkType={ELinkType.TEXT}
            size={ELinkSize.LG}
            aria-haspopup="listbox"
            aria-controls="button-dropdown-extended-list"
            aria-expanded={opened}
            onClick={(event) => {
                event.preventDefault();
                setOpened(!opened);
            }}
            ref={targetRef}
        >
            {linkTitle}
        </Link>
    );

    const renderDropdown = ({className, ...dropdownProps}: IButtonDropdownExtendedDropdownProvideProps) => (
        <ButtonDropdownExtended.Dropdown
            className={classnames('cssClass[tableSettingsDropdown]', className)}
            {...dropdownProps}
            targetRef={targetRef}
            ref={dropdownRef}
        >
            {children}
        </ButtonDropdownExtended.Dropdown>
    );

    return (
        <ButtonDropdownExtended
            className={classnames('cssClass[tableSettingsLink]', className)}
            renderButton={renderButton}
            renderDropdown={renderDropdown}
            dropdownRef={dropdownRef}
            {...rest}
        />
    );
};

TableBasicSettings.displayName = 'TableBasicSettings';
TableBasicSettings.Body = TableBasicSettingsBody;
TableBasicSettings.ColumnSettings = ColumnSettings;
TableBasicSettings.Footer = TableBasicSettingsFooter;
TableBasicSettings.Header = TableBasicSettingsHeader;
