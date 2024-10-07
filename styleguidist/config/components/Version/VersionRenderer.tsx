import React from 'react';
import './styles.less';

export interface IVersionRendererProps {
    children: string;
}

const VersionRenderer: React.FC<IVersionRendererProps> = ({children}) => (
    <div className="styleguide-version" aria-label="version">
        {`Release v.${children}`}
    </div>
);

export default VersionRenderer;
