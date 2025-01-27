import React from 'react';
import ToolbarButton from 'react-styleguidist/lib/client/rsg-components/ToolbarButton';
import {IsolateButtonProps} from 'react-styleguidist/lib/client/rsg-components/slots/IsolateButton';
import getUrl from 'react-styleguidist/lib/client/utils/getUrl';
import './styles.less';

const IsolateButton: React.FC<IsolateButtonProps> = ({href, name, example, isolated}) => {
    if (isolated && !href) {
        // Если адрес страницы содержит больше 2 уровней вложенности, регулярное выражение извлекает два уровня пути. Иначе - только первый уровень
        const regEx = /!\/[^\/]+\/.*/.test(window.location.hash) ? /!\/([^\/]+\/[^\/]+).*/ : /!\/([^\/]+)\/.*/;
        href = window.location.hash.replace(regEx, '/$1');
    }

    if (isolated) {
        return (
            <ToolbarButton href={href} title="Show all components">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16 8H12V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M4 8H8V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M4 12H8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M16 12H12V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </ToolbarButton>
        );
    }

    return (
        <ToolbarButton href={getUrl({name, example, isolated: true})} title="Open isolated">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12 4H16V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M8 4H4V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M8 16H4V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M12 16H16V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        </ToolbarButton>
    );
};

export default IsolateButton;
