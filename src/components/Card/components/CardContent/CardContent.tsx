import React from 'react';
import {CardContentBody} from '@sberbusiness/triplex/components/Card/components/CardContent/components/CardContentBody';
import {CardContentHeader} from '@sberbusiness/triplex/components/Card/components/CardContent/components/CardContentHeader';
import {CardContentFooter} from '@sberbusiness/triplex/components/Card/components/CardContent/components/CardContentFooter';
import {ECardContentPaddingSize} from '@sberbusiness/triplex/components/Card/enums';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Внутренние составляющие компонента CardContent. */
export interface ICardContentComposition {
    /** Тело карточки. */
    Body: typeof CardContentBody;
    /** Заголовок карточки. */
    Header: typeof CardContentHeader;
    /** Подвал карточки. */
    Footer: typeof CardContentFooter;
}

/** Соответствие размера внутреннего отступа карточки стилевому классу. */
const mapCardContentPaddingSizeToCssClass = {
    [ECardContentPaddingSize.MD]: 'cssClass[paddingMD]',
    [ECardContentPaddingSize.SM]: 'cssClass[paddingSM]',
};

/** Свойства компонента CardContent. */
export interface ICardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Размер внутреннего отступа контента карточки. */
    paddingSize?: ECardContentPaddingSize;
}

/** Контент карточки. */
export const CardContent: React.FC<ICardContentProps> & ICardContentComposition = ({
    children,
    className,
    paddingSize = ECardContentPaddingSize.MD,
    ...rest
}) => (
    <div className={classnames('cssClass[cardContent]', mapCardContentPaddingSizeToCssClass[paddingSize], className)} {...rest}>
        {children}
    </div>
);

CardContent.Body = CardContentBody;
CardContent.Header = CardContentHeader;
CardContent.Footer = CardContentFooter;
CardContent.displayName = 'CardContent';
