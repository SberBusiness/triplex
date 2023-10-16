import React from 'react';
import cx from 'clsx';
import './styles.less';

interface IToolbarButtonProps {
    className?: string;
    href?: string;
    onClick?: () => void;
    title?: string;
    small?: boolean;
    testId?: string;
}

const ToolbarButton: React.FC<IToolbarButtonProps> = ({children, className, onClick, href, title}) => {
    if (href != undefined) {
        return (
            <a className={cx('styleguide-toolbar-button', className)} href={href} title={title} aria-label={title}>
                {children}
            </a>
        );
    }

    return (
        <button className={cx('styleguide-toolbar-button', className)} type="button" title={title} aria-label={title} onClick={onClick}>
            {children}
        </button>
    );
};

export default ToolbarButton;
