import React from 'react';
import cx from 'clsx';
import './styles.less';

interface LinkProps {
    children: React.ReactNode;
    className?: string;
    href?: string;
    target?: string;
    onClick?: () => void;
}

const LinkRenderer: React.FC<LinkProps> = ({children, className, href, target, onClick}) => (
    <a className={cx('styleguide-link', className)} href={href} target={target} onClick={onClick}>
        {children}
    </a>
);

export default LinkRenderer;
