import React from 'react';
import './styles.less';

interface IParaRendererProps {
    children: React.ReactNode;
    semantic?: 'p';
}

const ParaRenderer: React.FC<IParaRendererProps> = ({semantic, children}) => {
    const Tag = semantic || 'div';

    return <Tag className="styleguide-para">{children}</Tag>;
};

export default ParaRenderer;
