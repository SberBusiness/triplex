import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {MobileView} from '@sberbusiness/triplex/components/MobileView/MobileView';

/** Свойства компонента TooltipLink. */
export interface ITooltipLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

/** Гиперссылка в Tooltip. */
export const TooltipLink = React.forwardRef<HTMLAnchorElement, ITooltipLinkProps>(({children, className, ...rest}, ref) => {
    /** Рендер десктоп версии. */
    const renderDesktopLink = () => (
        <a
            className={classnames('cssClass[tooltipLink]', 'cssClass[desktop]', className)}
            {...rest}
            data-tx={process.env.npm_package_version}
            ref={ref}
        >
            {children}
        </a>
    );

    return (
        <MobileView fallback={renderDesktopLink()}>
            <a
                className={classnames('cssClass[tooltipLink]', 'cssClass[mobile]', className)}
                {...rest}
                data-tx={process.env.npm_package_version}
                ref={ref}
            >
                {children}
            </a>
        </MobileView>
    );
});

TooltipLink.displayName = 'TooltipLink';
