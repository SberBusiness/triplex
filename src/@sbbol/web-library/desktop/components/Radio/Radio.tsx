import {IRadioProps} from '@sbbol/web-library/desktop/components/Radio/types';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import * as React from 'react';

/**
 * Компонент Radio. Радио-кнопка.
 */
export const Radio = React.forwardRef<HTMLInputElement, IRadioProps>((props, ref) => {
    const {children, className, labelAttributes, ...inputAttributes} = props;
    const labelClassName = classnames(labelAttributes?.className, 'cssClass[radio]');

    return (
        // eslint-disable-next-line jsx-a11y/label-has-for
        <label className={labelClassName} {...labelAttributes}>
            <input {...inputAttributes} ref={ref} className={classnames(className, 'cssClass[input]')} type="radio" />
            <span className="cssClass[content]">{children}</span>
        </label>
    );
});

Radio.displayName = 'Radio';
