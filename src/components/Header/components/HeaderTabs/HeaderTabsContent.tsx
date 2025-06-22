import React from 'react';
import {Tabs} from '@sberbusiness/triplex/components/Tabs/Tabs';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента HeaderTabsContent. */
export interface IHeaderTabsContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Контейнер табов. */
export const HeaderTabsContent = Object.assign(
    React.forwardRef<HTMLDivElement, IHeaderTabsContentProps>(function HeaderTabsContent({children, className, ...rest}, ref) {
        return (
            <div className={classnames('cssClass[headerTabsContent]', className)} {...rest} ref={ref}>
                {children}
            </div>
        );
    }),
    {
        Tabs: Tabs,
    }
);

HeaderTabsContent.displayName = 'HeaderTabsContent';
