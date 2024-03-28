import React from 'react';
import {Spinner} from '@sberbusiness/triplex/components/Spinner/Spinner';
import {ESpinnerSize} from '@sberbusiness/triplex/components/Spinner/enum';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента SpinnerWidget. */
export interface ISpinnerWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Размер спиннера. */
    size?: ESpinnerSize;
}

/** Спиннер виждет, закрывает контент и отображает спиннер в середине своей области. */
export const SpinnerWidget: React.FC<ISpinnerWidgetProps> = ({children, className, size, ...htmlDivAttributes}) => (
    <div className={classnames(className, 'cssClass[globalSpinnerWidget]')} {...htmlDivAttributes}>
        <Spinner size={size}>{children}</Spinner>
    </div>
);

SpinnerWidget.displayName = 'SpinnerWidget';
