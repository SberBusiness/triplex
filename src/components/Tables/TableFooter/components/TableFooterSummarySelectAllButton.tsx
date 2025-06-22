import React from 'react';
import {ELinkSize, ELinkType, ILinkTextProps, Link} from '@sberbusiness/triplex/components/Link/Link';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента TableFooterSummarySelectAllButton. */
export interface ITableFooterSummarySelectAllButtonProps extends Omit<ILinkTextProps, 'linkType' | 'size'> {}

/** Кнопка в подвале таблицы, для выбора всех элементов списка. */
export const TableFooterSummarySelectAllButton: React.FC<ITableFooterSummarySelectAllButtonProps> = ({
    children,
    className,
    onClick,
    ...rest
}) => {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        onClick?.(event);
    };
    return (
        <Link
            {...rest}
            href="#"
            className={classnames('cssClass[tableFooterSummarySelectAllButton]', className)}
            linkType={ELinkType.TEXT}
            size={ELinkSize.LG}
            onClick={handleClick}
        >
            {children}
        </Link>
    );
};

TableFooterSummarySelectAllButton.displayName = 'TableFooterSummarySelectAllButton';
