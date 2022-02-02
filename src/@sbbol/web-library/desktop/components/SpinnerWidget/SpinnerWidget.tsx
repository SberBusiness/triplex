import {Spinner} from '@sbbol/web-library/desktop/components/Spinner/Spinner';
import * as React from 'react';
import {ESpinnerSize} from '@sbbol/web-library/desktop/components/Spinner/enum';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

export interface ISpinnerWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Размер спиннера. */
    size?: ESpinnerSize;
}

/**
 * Спиннер виждет, закрывает контент и отображает спиннер в середине своей области.
 *
 */
export const SpinnerWidget: React.FC<ISpinnerWidgetProps> = ({className, size, ...htmlDivAttributes}) => (
    <div className={classnames(className, 'cssClass[globalSpinnerWidget]')} {...htmlDivAttributes}>
        <Spinner size={size} />
    </div>
);

SpinnerWidget.displayName = 'SpinnerWidget';
