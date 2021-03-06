import React from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

interface IMultiselectDropdownContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MultiselectDropdownContent: React.FC<IMultiselectDropdownContentProps> = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames('cssClass[multiselectContentWrapper]', className)} {...htmlDivAttributes}>
        <div tabIndex={-1} className="cssClass[multiselectContent]">
            {children}
        </div>
    </div>
);
