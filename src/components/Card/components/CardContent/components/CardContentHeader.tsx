import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства CardContentHeader. */
interface ICardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Заголовок контента карточки. */
export const CardContentHeader: React.FC<ICardHeaderProps> = ({children, className, ...rest}) => (
    <div className={classnames('cssClass[cardContentHeader]', className)} {...rest}>
        {children}
    </div>
);

CardContentHeader.displayName = 'CardContentHeader';
