import React, {useRef} from 'react';
import copy from 'clipboard-copy';
import ToolbarButton from 'react-styleguidist/lib/client/rsg-components/ToolbarButton';
import './styles.less';

const PathlineRenderer: React.FC = ({children}) => {
    const timeoutId = useRef<number>();

    const renderPath = (children: React.ReactNode) => {
        if (typeof children == 'string') {
            return '@sberbusiness/triplex' + children.replace(/(^src)|(\.tsx$)/g, '');
        }

        return children;
    };

    const triggerMessage = (pathline: HTMLElement) => {
        pathline.classList.add('copied');
        clearTimeout(timeoutId.current);
        timeoutId.current = window.setTimeout(() => pathline.classList.remove('copied'), 500);
    };

    const handleCopy = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (children) {
            if (event.currentTarget.parentElement) {
                triggerMessage(event.currentTarget.parentElement);
            }
            return copy(children.toString());
        }
    };

    const renderIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" focusable={false}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.49805 3.74353C5.49805 2.63896 6.39348 1.74353 7.49805 1.74353H10.8713C11.4021 1.74353 11.911 1.95447 12.2861 2.32991L17.4519 7.50004V13C17.4519 14.1046 16.5565 15 15.4519 15H7.49805C6.39348 15 5.49805 14.1046 5.49805 13V3.74353Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
            <path
                d="M17.3726 7.39998L13.8726 7.40006C12.768 7.40006 11.8726 6.50463 11.8726 5.40006V1.89998"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
            <path
                d="M12.7002 18H4.7002C3.59563 18 2.7002 17.1046 2.7002 16V6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );

    return (
        <span className="styleguide-pathline">
            {renderPath(children)}
            <ToolbarButton className="styleguide-pathline-copy-button" onClick={handleCopy}>
                {renderIcon()}
            </ToolbarButton>
        </span>
    );
};

export default PathlineRenderer;
