import React from 'react';
import './styles.less';

const VersionRenderer: React.FC = ({children}) => (
    <header className="styleguide-version" aria-label="version">
        {`Release v.${children as string}`}
    </header>
);

export default VersionRenderer;
