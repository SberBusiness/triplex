import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента CardContentFooter. */
interface ICardContentFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Подвал контента карточки. */
export const CardContentFooter: React.FC<ICardContentFooterProps> = ({children, className, ...rest}) => (
    <div className={classnames('cssClass[cardContentFooter]', className)} {...rest}>
        {children}
    </div>
);

CardContentFooter.displayName = 'CardContentFooter';
