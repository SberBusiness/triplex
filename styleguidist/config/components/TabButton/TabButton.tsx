import React from 'react';
import cx from 'clsx';
import './styles.less';

interface TabButtonProps {
    children: React.ReactNode;
    className?: string;
    name: string;
    active?: boolean;
    onClick: (event: React.MouseEvent) => void;
}

const TabButton: React.FC<TabButtonProps> = ({children, className, name, active, onClick}) => (
    <button
        className={cx('styleguide-tab-button', {active: Boolean(active)}, className)}
        type="button"
        name={name}
        aria-pressed={active}
        onClick={onClick}
    >
        {children}
    </button>
);

export default TabButton;
