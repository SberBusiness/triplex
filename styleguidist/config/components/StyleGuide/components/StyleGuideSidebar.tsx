import React, {useEffect, useRef, useContext} from 'react';
import cx from 'clsx';
import Logo from 'react-styleguidist/lib/client/rsg-components/Logo';
import {MediaMaxWidth} from '@sberbusiness/triplex/components/MediaWidth/MediaMaxWidth';
import {EScreenWidth} from '@sberbusiness/triplex/enums/EScreenWidth';
import {StyleGuideContext} from '../../StyleGuideContext';

interface StyleGuideSidebarProps {
    title: string;
    toc?: React.ReactNode;
}

export const StyleGuideSidebar: React.FC<StyleGuideSidebarProps> = ({title, toc}) => {
    const {sidebarOpen, setSidebarOpen} = useContext(StyleGuideContext);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setSidebarOpen(false);
            }
        };

        if (sidebarOpen) {
            document.addEventListener('click', handleOutsideClick);

            return () => {
                document.removeEventListener('click', handleOutsideClick);
            };
        }
    }, [sidebarOpen]);

    const renderSidebar = (adaptive: boolean): React.ReactElement => (
        <div className="styleguide-sidebar" ref={ref}>
            {(!adaptive || sidebarOpen) && renderSidebarContents()}
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
        <button className={cx('styleguide-sidebar-burger', {expanded: sidebarOpen})} onClick={toggleSidebar} aria-expanded={sidebarOpen}>
            <div className="styleguide-sidebar-burger-slice" />
            <div className="styleguide-sidebar-burger-slice" />
            <div className="styleguide-sidebar-burger-slice" />
        </button>
    );

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <MediaMaxWidth maxWidth={EScreenWidth.MD_MAX} fallback={renderSidebar(false)}>
            {renderSidebar(true)}
        </MediaMaxWidth>
    );
};
