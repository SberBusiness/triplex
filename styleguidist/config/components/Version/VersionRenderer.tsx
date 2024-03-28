import React from 'react';
import './styles.less';

export interface IVersionRendererProps {
    children: React.ReactNode;
}
const VersionRenderer: React.FC<IVersionRendererProps> = ({children}) => (
    <header className="styleguide-version" aria-label="version">
        {`Release v.${children as string}`}
    </header>
);

export default VersionRenderer;
