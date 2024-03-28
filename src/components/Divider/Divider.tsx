import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {cssClass} from '@sberbusiness/triplex/utils/cssClass';

/** Возможные размеры отступов.  */
export type TDividerMarginSize = 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32;

/** Свойства компонента Divider. */
export interface IDividerProps extends React.HTMLAttributes<HTMLHRElement> {
    /** Отступ сверху. */
    marginTopSize?: TDividerMarginSize;
    /** Отступ снизу. */
    marginBottomSize?: TDividerMarginSize;
}

/** Разделитель. */
export const Divider: React.FC<IDividerProps> = (props) => {
    const {className, marginTopSize, marginBottomSize, ...htmlDivAttributes} = props;
    const classNames = classnames(
        'cssClass[divider]',
        marginTopSize && cssClass(`marginTopSize-${marginTopSize}`),
        marginBottomSize && cssClass(`marginBottomSize-${marginBottomSize}`),
        className
    );

    return <hr className={classNames} {...htmlDivAttributes} />;
};

Divider.displayName = 'Divider';
