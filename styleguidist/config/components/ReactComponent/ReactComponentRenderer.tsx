import React from 'react';
import Pathline from 'react-styleguidist/lib/client/rsg-components/Pathline';
import './styles.less';

interface ReactComponentRendererProps {
    name: string;
    heading: React.ReactNode;
    filepath?: string;
    slug?: string;
    pathLine?: string;
    tabButtons?: React.ReactNode;
    tabBody?: React.ReactNode;
    description?: React.ReactNode;
    docs?: React.ReactNode;
    examples?: React.ReactNode;
    isolated?: boolean;
}

const ReactComponentRenderer: React.FC<ReactComponentRendererProps> = ({
    heading,
    pathLine,
    description,
    docs,
    examples,
    tabButtons,
    tabBody,
}) => {
    return (
        <div className="styleguide-react-component">
            <header className="styleguide-react-component-header">
                {heading}
                {pathLine && <Pathline>{pathLine}</Pathline>}
            </header>
            {(description || docs) && (
                <div className="styleguide-react-component-docs">
                    {description}
                    {docs}
                </div>
            )}
            {tabButtons && (
                <div className="styleguide-react-component-tabs">
                    <div className="styleguide-react-component-tab-buttons">{tabButtons}</div>
                    <div className="styleguide-react-component-tab-body">{tabBody}</div>
                </div>
            )}
            {examples}
        </div>
    );
};

export default ReactComponentRenderer;
