import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {FooterDescription} from '@sberbusiness/triplex/components/Footer/components/FooterDescription';
import {TableFooterSummary} from '@sberbusiness/triplex/components/Tables/TableFooter/components/TableFooterSummary';
import {FooterDescriptionControls} from '@sberbusiness/triplex/components/Footer/components/FooterDescriptionControls';

/** Свойства компонента TableFooter. */
interface ITableFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

interface ITableFooterFC extends React.FC<ITableFooterProps> {
    Summary: typeof TableFooterSummary;
    Controls: typeof FooterDescriptionControls;
}

/** Компонент подвала таблицы. */
export const TableFooter: ITableFooterFC = ({children, className, ...rest}) => (
    <div className={classnames('cssClass[tableFooterWrapper]', className)} {...rest}>
        <div className="cssClass[tableFooter]">
            <FooterDescription>{children}</FooterDescription>
        </div>
    </div>
);

TableFooter.displayName = 'TableFooter';
TableFooter.Summary = TableFooterSummary;
TableFooter.Controls = FooterDescriptionControls;
