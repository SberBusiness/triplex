import * as React from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

/** Свойства тела содержимого карточки. */
interface ICardContentBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Тело контента карточки. */
export const CardContentBody: React.FC<ICardContentBodyProps> = ({children, className, ...rest}) => (
    <div className={classnames('cssClass[cardContentBody]', className)} {...rest}>
        {children}
    </div>
);

CardContentBody.displayName = 'CardContentBody';
