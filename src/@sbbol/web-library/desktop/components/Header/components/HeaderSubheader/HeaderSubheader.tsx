import * as React from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

/**
 * Третий уровень Header. Содержит в себе произвольный контент.
 */
export const HeaderSubheader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames(className, 'cssClass[headerSubheader]')} {...htmlDivAttributes}>
        {children}
    </div>
);
HeaderSubheader.displayName = 'HeaderSubheader';
