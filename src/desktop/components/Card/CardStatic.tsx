import * as React from 'react';
import {ICardProps} from '@sberbusiness/triplex/desktop/components/Card/types';
import {CardContent} from '@sberbusiness/triplex/desktop/components/Card/components/CardContent/CardContent';
import {CardMedia} from '@sberbusiness/triplex/desktop/components/Card/components/CardMedia';
import {mapCardRoundingSizeToCssClass} from '@sberbusiness/triplex/desktop/components/Card/utils';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {ECardRoundingSize} from '@sberbusiness/triplex/desktop/components/Card/enums';

/** Внутренние составляющие статичной карточки. */
interface ICardStaticComposition {
    /** Контент карточки. */
    Content: typeof CardContent;
    /** Медийный элемент карточки. */
    Media: typeof CardMedia;
}

/** Свойства статичной карточки. */
interface ICardStaticProps extends ICardProps {}

/** Компонент "Статичная карточка". */
export const CardStatic: React.FC<ICardStaticProps> & ICardStaticComposition = ({
    children,
    className,
    roundingSize = ECardRoundingSize.MD,
    ...rest
}) => (
    <div className={classnames('cssClass[card]', mapCardRoundingSizeToCssClass[roundingSize], className)} {...rest}>
        {children}
    </div>
);

CardStatic.Content = CardContent;
CardStatic.Media = CardMedia;
CardStatic.displayName = 'CardStatic';
