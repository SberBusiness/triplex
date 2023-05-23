import * as React from 'react';
import {CardContentBody} from '@sberbusiness/triplex/desktop/components/Card/components/CardContent/components/CardContentBody';
import {CardContentHeader} from '@sberbusiness/triplex/desktop/components/Card/components/CardContent/components/CardContentHeader';
import {CardContentFooter} from '@sberbusiness/triplex/desktop/components/Card/components/CardContent/components/CardContentFooter';
import {ECardContentPaddingSize} from '@sberbusiness/triplex/desktop/components/Card/enums';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

/** Внутренние составляющие контента карточки. */
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

/** Свойства контента карточки. */
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
