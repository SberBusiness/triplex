import {FooterDescription} from '@sbbol/web-library/desktop/components/Footer/components/FooterDescription';
import {TableFooterSummaryAmount} from '@sbbol/web-library/desktop/components/Tables/TableFooter/components/TableFooterSummaryAmount';
import {TableFooterSummarySelectedCount} from '@sbbol/web-library/desktop/components/Tables/TableFooter/components/TableFooterSummarySelectedCount';
import * as React from 'react';

/** Компонент суммарной информации в подвале таблицы. */
export class TableFooterSummary extends React.PureComponent<React.HTMLAttributes<HTMLDivElement>> {
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
