import * as React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

interface IHeaderSubheaderProps extends React.HTMLAttributes<HTMLDivElement> {
    // Свойство отключающее padding.
    withoutPaddings?: boolean;
}

/**
 * Третий уровень Header. Содержит в себе произвольный контент.
 */
export const HeaderSubheader: React.FC<IHeaderSubheaderProps> = ({children, className, withoutPaddings, ...htmlDivAttributes}) => (
    <div
        className={classnames(className, 'cssClass[headerSubheader]', {'cssClass[withoutPaddings]': Boolean(withoutPaddings)})}
        {...htmlDivAttributes}
    >
        {children}
    </div>
);

HeaderSubheader.displayName = 'HeaderSubheader';
