import React from 'react';
import {FooterDescription} from '@sberbusiness/triplex/components/Footer/components/FooterDescription';
import {TableFooterSummaryAmount} from '@sberbusiness/triplex/components/Tables/TableFooter/components/TableFooterSummaryAmount';
import {TableFooterSummarySelectedCount} from '@sberbusiness/triplex/components/Tables/TableFooter/components/TableFooterSummarySelectedCount';

/** Свойства компонента TableFooterSummary. */
interface ITableFooterSummaryProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Компонент суммарной информации в подвале таблицы. */
export class TableFooterSummary extends React.PureComponent<ITableFooterSummaryProps> {
    public static displayName = 'TableFooterSummary';

    public static Amount = TableFooterSummaryAmount;
    public static SelectedCount = TableFooterSummarySelectedCount;

    render(): JSX.Element {
        const {children, ...htmlDivAttributes} = this.props;

        return (
            <FooterDescription.Content {...htmlDivAttributes}>
                <div className="cssClass[tableFooterSummary]">{children}</div>
            </FooterDescription.Content>
        );
    }
}
