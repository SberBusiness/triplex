import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента FormGroupLine. */
interface IFormGroupLineProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Flex режим. */
    flex?: boolean;
}

/** Горизонтальный контейнер FormGroup. */
export const FormGroupLine = React.forwardRef<HTMLDivElement, IFormGroupLineProps>(
    ({children, className, flex, ...htmlDivAttributes}, ref) => {
        const classNames = classnames(
            'cssClass[formGroupLine]',
            {
                'cssClass[flex]': Boolean(flex),
            },
            className
        );
        return (
            <div className={classNames} ref={ref} {...htmlDivAttributes}>
                {children}
            </div>
        );
    }
);

FormGroupLine.displayName = 'FormGroupLine';
