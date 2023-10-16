import React from 'react';
import cx from 'clsx';
import './styles.less';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    level: number;
}

const HeadingRenderer: React.FC<HeadingProps> = ({children, className, level, ...restProps}) => {
    const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

    return (
        <Tag className={cx('styleguide-heading', `heading-level-${level}`, className)} {...restProps}>
            {children}
        </Tag>
    );
};

export default HeadingRenderer;
