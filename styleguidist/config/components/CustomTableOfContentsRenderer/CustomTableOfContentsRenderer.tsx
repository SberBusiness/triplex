import React, { useState } from 'react';
import TableOfContentsRenderer from 'react-styleguidist/lib/client/rsg-components/TableOfContents/TableOfContentsRenderer';

interface CustomTableOfContentsRendererProp {
    children?: React.ReactNode;
    searchTerm: string;
    onSearchTermChange(term: string): void;
}

const CustomTableOfContentsRenderer: React.FC<CustomTableOfContentsRendererProp> = ({onSearchTermChange, ...props}) => {
    const [searchValue, setSearchValue] = useState('');

    const handleChange = (term: string) => {
        setSearchValue(term);
        onSearchTermChange(term);
    }

    const handleBlur = () => {
        // @ts-ignore
        dataLayer.push({
            'event': 'search_field_blur',
            'search_input_value': searchValue,
        });
    }
    return <div onBlur={handleBlur}><TableOfContentsRenderer onSearchTermChange={handleChange} {...props} /></div>;
}

export default CustomTableOfContentsRenderer;
