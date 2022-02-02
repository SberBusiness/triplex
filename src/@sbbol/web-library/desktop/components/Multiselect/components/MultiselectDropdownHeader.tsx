import React from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

interface IMultiselectDropdownHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MultiselectDropdownHeader: React.FC<IMultiselectDropdownHeaderProps> = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames('cssClass[multiselectHeader]', className)} {...htmlDivAttributes}>
        {children}
    </div>
);
