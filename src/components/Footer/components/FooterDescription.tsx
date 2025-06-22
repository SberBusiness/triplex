import React from 'react';
import {FooterDescriptionContent} from '@sberbusiness/triplex/components/Footer/components/FooterDescriptionContent';
import {FooterDescriptionControls} from '@sberbusiness/triplex/components/Footer/components/FooterDescriptionControls';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента FooterDescription. */
export interface IFooterDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Футер, основная часть. */
export const FooterDescription = Object.assign(
    React.forwardRef<HTMLDivElement, IFooterDescriptionProps>(function FooterDescription({children, className, ...rest}, ref) {
        return (
            <div className={classnames('cssClass[footerDescription]', className)} {...rest} ref={ref}>
                {children}
            </div>
        );
    }),
    {
        Content: FooterDescriptionContent,
        Controls: FooterDescriptionControls,
    }
);

FooterDescription.displayName = 'FooterDescription';
