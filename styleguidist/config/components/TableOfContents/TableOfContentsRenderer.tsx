import React from 'react';
import {SearchSrvIcon20} from '@sberbusiness/icons/SearchSrvIcon20';
import './styles.less';

interface TableOfContentsRendererProps {
    children: React.ReactNode;
    searchTerm: string;
    onSearchTermChange(term: string): void;
}

const TableOfContentsRenderer: React.FC<TableOfContentsRendererProps> = ({children, searchTerm, onSearchTermChange}) => (
    <nav className="styleguide-table-of-contents">
        <div className="styleguide-search">
            <input
                value={searchTerm}
                className="styleguide-search-input"
                placeholder="Filter by name"
                aria-label="Filter by name"
                onChange={(event) => onSearchTermChange(event.target.value)}
            />
            <SearchSrvIcon20 className="styleguide-search-input-icon" />
        </div>
        {children}
    </nav>
);

export default TableOfContentsRenderer;
