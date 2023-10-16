import React from 'react';
import cx from 'clsx';
import Heading from 'react-styleguidist/lib/client/rsg-components/Heading';
import './styles.less';

interface SectionHeadingRendererProps {
    toolbar?: React.ReactNode;
    id: string;
    href?: string;
    depth: number;
    deprecated?: boolean;
}

const SectionHeadingRenderer: React.FC<SectionHeadingRendererProps> = ({children, toolbar, id, href, depth, deprecated}) => {
    const headingLevel = Math.min(6, depth);

    return (
        <div className="styleguide-section-heading">
            <Heading level={headingLevel} id={id}>
                <a className={cx('styleguide-section-heading-link', {deprecated: Boolean(deprecated)})} href={href}>
                    {children}
                </a>
            </Heading>
            <div className="styleguide-section-heading-toolbar">{toolbar}</div>
        </div>
    );
};

export default SectionHeadingRenderer;
