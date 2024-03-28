import React, {useState, useEffect, useRef} from 'react';
import cx from 'clsx';
import Logo from 'react-styleguidist/lib/client/rsg-components/Logo';
import {MediaMaxWidth} from '@sberbusiness/triplex/components/MediaWidth/MediaMaxWidth';
import {EScreenWidth} from '@sberbusiness/triplex/enums/EScreenWidth';

interface StyleGuideSidebarProps {
    title: string;
    toc?: React.ReactNode;
}

export const StyleGuideSidebar: React.FC<StyleGuideSidebarProps> = ({title, toc}) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('click', handleOutsideClick);

            return () => {
                document.removeEventListener('click', handleOutsideClick);
            };
        }
    }, [open]);

    const renderSidebar = (adaptive: boolean): React.ReactElement => (
        <div className="styleguide-sidebar" ref={ref}>
            {(!adaptive || open) && renderSidebarContents()}
            {adaptive && renderSidebarBurger()}
        </div>
    );

    const renderSidebarContents = () => (
        <>
            <header className="styleguide-sidebar-logo">
                <Logo>{title}</Logo>
            </header>
            {toc}
        </>
    );

    const renderSidebarBurger = () => (
        <button className={cx('styleguide-sidebar-burger', {expanded: open})} onClick={toggleSidebar} aria-expanded={open}>
            <div className="styleguide-sidebar-burger-slice" />
            <div className="styleguide-sidebar-burger-slice" />
            <div className="styleguide-sidebar-burger-slice" />
        </button>
    );

    const toggleSidebar = () => {
        setOpen(!open);
    };

    return (
        <MediaMaxWidth maxWidth={EScreenWidth.MD_MAX} fallback={renderSidebar(false)}>
            {renderSidebar(true)}
        </MediaMaxWidth>
    );
};
