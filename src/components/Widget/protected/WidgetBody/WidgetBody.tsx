import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {IWidgetBodyProvideProps} from '../../types';

/** Свойства компонента WidgetBody. */
export interface IWidgetBodyProps extends IWidgetBodyProvideProps, React.HTMLAttributes<HTMLDivElement> {}

export const WidgetBody: React.FC<IWidgetBodyProps> = ({
    animating,
    children,
    widgetWithoutFooter,
    toggle,
    isOpen,
    className,
    ...htmlDivAttributes
}) => (
    <div
        {...htmlDivAttributes}
        className={classnames(className, 'cssClass[widgetBody]', {
            'cssClass[widgetBodyWithoutFooter]': widgetWithoutFooter,
        })}
    >
        {children}
    </div>
);

WidgetBody.displayName = 'WidgetBody';
