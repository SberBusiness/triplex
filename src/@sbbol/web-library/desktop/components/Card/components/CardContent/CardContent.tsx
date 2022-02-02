import * as React from 'react';
import {CardContentBody} from '@sbbol/web-library/desktop/components/Card/components/CardContent/components/CardContentBody';
import {CardContentHeader} from '@sbbol/web-library/desktop/components/Card/components/CardContent/components/CardContentHeader';
import {CardContentFooter} from '@sbbol/web-library/desktop/components/Card/components/CardContent/components/CardContentFooter';
import {ECardContentPaddingSize} from '@sbbol/web-library/desktop/components/Card/enums';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

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
