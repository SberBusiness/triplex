import React, {useContext, useEffect, useRef} from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {FormFieldContext} from '../FormFieldContext';

/** Свойства компонента FormFieldPrefix. */
interface IFormFieldPrefixProps extends React.HTMLAttributes<HTMLSpanElement> {}

/** Контейнер элементов, отображающихся в левой части FormField. */
export const FormFieldPrefix = React.forwardRef<HTMLSpanElement, IFormFieldPrefixProps>(
    ({children, className, ...htmlSpanAttributes}, ref) => {
        const classNames = classnames('cssClass[formFieldPrefix]', className);
        const {prefixWidth, setPrefixWidth} = useContext(FormFieldContext);

        const innerRef = useRef<HTMLSpanElement | null>();

        const setRef = (instance: HTMLButtonElement | null) => {
            innerRef.current = instance;
            if (typeof ref === 'function') {
                ref(instance);
            } else if (ref) {
                ref.current = instance;
            }
        };

        useEffect(() => {
            if (!innerRef.current) {
                return;
            }
            const {width} = innerRef.current.getBoundingClientRect();

            if (width !== prefixWidth) {
                setPrefixWidth(width);
            }
        });

        return (
            <span className={classNames} ref={setRef} {...htmlSpanAttributes}>
                {children}
            </span>
        );
    }
);

FormFieldPrefix.displayName = 'FormFieldPrefix';
