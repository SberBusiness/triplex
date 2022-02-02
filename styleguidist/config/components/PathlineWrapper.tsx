import React, {useState} from 'react';
import Pathline from 'react-styleguidist/lib/client/rsg-components/Pathline/PathlineRenderer';
import ComponentStylesDependency from '../../common/components/ComponentStylesDependency/ComponentStylesDependency';

const regExpSlash = /\\/g;
const regExpPath = /src\/(@[\w\/-]+)\/(\w+).tsx/g;

const PathlineWrapper: React.FC<any> = ({children, ...props}) => {
    const [themeId, setThemeId] = useState('default');
    let nextChildren = children;
    if (typeof children === 'string') {
        nextChildren = children.replace(regExpSlash, '/').replace(regExpPath, "import {$2} from '$1/$2';");
    }

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
            <Pathline {...props}>{nextChildren}</Pathline>
            {renderStylesDependency()}
            {/* Выбор темы, когда их будет несколько. */}
            {/*<div>*/}
            {/*    Theme:&nbsp;*/}
            {/*    <select*/}
            {/*        onChange={(e) => {*/}
            {/*            setThemeId(e.target.value as EGlobalTheme);*/}
            {/*            const event = new CustomEvent('changeTheme', {detail: e.target.value});*/}
            {/*            window.dispatchEvent(event);*/}
            {/*        }}*/}
            {/*        value={themeId}*/}
            {/*    >*/}
            {/*        {Object.values(EGlobalTheme).map((themeName) => (*/}
            {/*            <option key={themeName} value={themeName}>*/}
            {/*                {themeName}*/}
            {/*            </option>*/}
            {/*        ))}*/}
            {/*    </select>*/}
            {/*</div>*/}
        </div>
    );
};

export default PathlineWrapper;
