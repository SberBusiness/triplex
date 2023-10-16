import React from 'react';
import './styles.less';

interface IParaProps {
    semantic?: 'p';
}

const ParaRenderer: React.FC<IParaProps> = ({semantic, children}) => {
    const Tag = semantic || 'div';

    return <Tag className="styleguide-para">{children}</Tag>;
};

export default ParaRenderer;
