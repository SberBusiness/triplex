import React from 'react';
import './style.less';

/**
 * Компонент - обертка демонстрационного компонента.
 */
const ComponentPreview: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, ...htmlAttributes}) => {
    return (
        <div {...htmlAttributes} className="component-preview" data-test-id="component-preview">
            {children}
        </div>
    );
};

export default ComponentPreview;
