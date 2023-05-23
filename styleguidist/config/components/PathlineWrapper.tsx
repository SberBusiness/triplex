import React from 'react';
import Pathline from 'react-styleguidist/lib/client/rsg-components/Pathline/PathlineRenderer';
import ComponentStylesDependency from '../../common/components/ComponentStylesDependency/ComponentStylesDependency';

const regExpSlash = /\\/g;
const regExpPath = /src\/(@[\w\/-]+)\/(\w+).tsx/g;

const PathlineWrapper: React.FC = ({children, ...rest}) => {
    const nextChildren =
        typeof children === 'string' ? children.replace(regExpSlash, '/').replace(regExpPath, "import {$2} from '$1/$2';") : children;

    // Рендер блока зависимых стилей.
    const renderStylesDependency = () => {
        if (typeof children === 'string') {
            const match = regExpPath.exec(children);

            if (!match) {
                return null;
            }

            return (
                <ComponentStylesDependency
                    className="margin-top-24"
                    componentTitle={match[2]}
                    isMobileComponent={children.includes('mobile')}
                />
            );
        }

        return null;
    };

    return (
        <div>
            <Pathline {...rest}>{nextChildren}</Pathline>
            {renderStylesDependency()}
        </div>
    );
};

export default PathlineWrapper;
