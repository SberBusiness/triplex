import React from 'react';
import cx from 'clsx';
import './styles.less';

const SectionsRenderer: React.FC = ({children}) => {
    const count = React.Children.count(children);

    return (
        <section className={cx('styleguide-sections', {multi: count > 1})}>
            {React.Children.map(children, (child, index) => {
                if (index + 1 < count) {
                    return (
                        <>
                            {child}
                            <div className="styleguide-section-divider" />
                        </>
                    );
                }

                return child;
            })}
        </section>
    );
};

export default SectionsRenderer;
