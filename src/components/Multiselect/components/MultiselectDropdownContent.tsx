import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента MultiselectDropdownContent. */
interface IMultiselectDropdownContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MultiselectDropdownContent: React.FC<IMultiselectDropdownContentProps> = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames('cssClass[multiselectContentWrapper]', className)} {...htmlDivAttributes}>
        <div tabIndex={-1} className="cssClass[multiselectContent]">
            {children}
        </div>
    </div>
);
