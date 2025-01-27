import React, {useState, useRef} from 'react';
import cx from 'clsx';
import {IIconProps} from './types';
import {SVGPreviewSectionItem} from './SVGPreviewSectionItem';
import './styles/SVGPreviewSection.less';

/** Свойства компонента SVGPreviewSection. */
interface ISVGModuleSectionProps {
    size: number;
    icons: IIconProps[];
}

/** Секция в компоненте SVGPreview. */
export const SVGPreviewSection: React.FC<ISVGModuleSectionProps> = ({icons, size}) => {
    const [collapsed, setCollapsed] = useState(false);
    const gridRef = useRef<HTMLDivElement>(null);
    const itemNodes: (HTMLButtonElement | null)[] = [];

    const toggleGrid = () => {
        setCollapsed(!collapsed);
    };

    const renderSpoilerCaret = () => (
        <svg
            className={cx('svg-preview-section-spoiler-caret', {rotated: !collapsed})}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
        >
            <path xmlns="http://www.w3.org/2000/svg" d="M5 8L10 12L15 8" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );

    return (
        <div key={`icon-size-block-${size}`} className="svg-preview-section">
            <button className={cx('svg-preview-section-spoiler', {collapsed})} onClick={toggleGrid}>
                {size}
                {renderSpoilerCaret()}
            </button>
            <div className={cx('svg-preview-section-grid', {collapsed})} ref={gridRef}>
                {icons.map((icon, index) => (
                    <SVGPreviewSectionItem
                        key={`svg-preview-grid-block-item-{${index}`}
                        icon={icon}
                        ref={(node) => (itemNodes[index] = node)}
                    />
                ))}
            </div>
        </div>
    );
};
