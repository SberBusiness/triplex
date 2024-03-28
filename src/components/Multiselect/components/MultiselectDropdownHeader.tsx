import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента MultiselectDropdownHeader. */
interface IMultiselectDropdownHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MultiselectDropdownHeader: React.FC<IMultiselectDropdownHeaderProps> = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames('cssClass[multiselectHeader]', className)} {...htmlDivAttributes}>
        {children}
    </div>
);
