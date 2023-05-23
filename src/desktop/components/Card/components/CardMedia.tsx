import * as React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

/** Свойства медийного элемента. */
export interface ICardMediaProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Медийный элемент карточки. */
export const CardMedia: React.FC<ICardMediaProps> = ({children, className, ...attributes}) => {
    const classNames = classnames('cssClass[cardMedia]', className);

    return (
        <div className={classNames} {...attributes}>
            {children}
        </div>
    );
};

CardMedia.displayName = 'CardMedia';
