import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента HeaderSubheader. */
interface IHeaderSubheaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Свойство отключающее padding. */
    withoutPaddings?: boolean;
}

/** Третий уровень Header. Содержит в себе произвольный контент. */
export const HeaderSubheader: React.FC<IHeaderSubheaderProps> = ({children, className, withoutPaddings, ...htmlDivAttributes}) => (
    <div
        className={classnames(className, 'cssClass[headerSubheader]', {'cssClass[withoutPaddings]': Boolean(withoutPaddings)})}
        {...htmlDivAttributes}
    >
        {children}
    </div>
);

HeaderSubheader.displayName = 'HeaderSubheader';
