import React from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

interface IMultiselectDropdownFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MultiselectDropdownFooter: React.FC<IMultiselectDropdownFooterProps> = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames('cssClass[multiselectFooter]', className)} {...htmlDivAttributes}>
        {children}
    </div>
);
