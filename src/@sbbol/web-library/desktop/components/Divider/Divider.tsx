import * as React from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

/**
 * Компонент Divider.
 */
export const Divider: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({className, ...htmlDivAttributes}) => (
    <hr className={classnames(className, 'cssClass[divider]')} {...htmlDivAttributes} />
);

Divider.displayName = 'Divider';
