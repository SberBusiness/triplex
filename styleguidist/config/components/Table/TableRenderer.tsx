import React from 'react';
import './styles.less';

interface ITableRendererProps {
    columns: {
        caption: string;
        render(row: any): React.ReactNode;
    }[];
    rows: any[];
    getRowKey(row: any): string;
}

const TableRenderer: React.FC<ITableRendererProps> = ({columns, rows, getRowKey}) => (
    <table className="styleguide-table">
        <thead className="styleguide-table-head">
            <tr className="styleguide-table-row">
                {columns.map(({caption}) => (
                    <th key={caption} className="styleguide-table-header">
                        {caption}
                    </th>
                ))}
            </tr>
        </thead>
        <tbody>
            {rows.map((row) => (
                <tr className="styleguide-table-row" key={getRowKey(row)}>
                    {columns.map(({render}, index) => (
                        <td key={index} className="styleguide-table-data">
                            {render(row)}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
);

export default TableRenderer;
