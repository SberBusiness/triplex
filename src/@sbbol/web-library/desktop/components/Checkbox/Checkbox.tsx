import * as React from 'react';
import {ICheckboxProps} from '@sbbol/web-library/desktop/components/Checkbox/types';
import {CheckboxbulkStsIcon16} from '@sberbusiness/icons/CheckboxbulkStsIcon16';
import {CheckboxtickStsIcon16} from '@sberbusiness/icons/CheckboxtickStsIcon16';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

/**
 * Компонент "Чекбокс". Используется как одиночный чекбокс с описанием.
 */
export const Checkbox = React.forwardRef<HTMLInputElement, ICheckboxProps>((props, ref) => {
    const {children, className, bulk, labelAttributes, ...inputAttributes} = props;
    const labelClassName = classnames(labelAttributes?.className, 'cssClass[checkboxLabel]', {'cssClass[notEmpty]': Boolean(children)});

    return (
        <label className={labelClassName} htmlFor={inputAttributes.id} {...labelAttributes}>
            <input {...inputAttributes} ref={ref} className={classnames(className, 'cssClass[checkbox]')} type="checkbox" />
            <span className="cssClass[checkboxIcon]" />
            {children && <span className="cssClass[content]">{children}</span>}
            {bulk ? <CheckboxbulkStsIcon16 className="cssClass[checkmarkIcon]" /> : <CheckboxtickStsIcon16 className="cssClass[checkmarkIcon]" />}
        </label>
    );
});

Checkbox.displayName = 'Checkbox';
