import * as React from 'react';
import {ITypographyProps} from '@sbbol/web-library/desktop/components/Typography/types';
import {EFontType, EFontWeight, ELineType, ETextSize} from '@sbbol/web-library/desktop/components/Typography/enums';
import {
    mapFontTypeToCssClass,
    mapFontWeightToCssClass,
    mapLineTypeToCssClass,
    mapTextSizeToCssClass,
} from '@sbbol/web-library/desktop/components/Typography/utils';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

type TTextProps<T extends keyof JSX.IntrinsicElements> = {
    /** Размер текста. */
    size: ETextSize;
    /** Высота блока строки. */
    line?: ELineType;
} & ITypographyProps &
    JSX.IntrinsicElements[T];

export function Text<T extends keyof JSX.IntrinsicElements = 'span'>({
    children,
    className,
    size,
    tag = 'span',
    type = EFontType.GENERAL,
    weight = EFontWeight.REGULAR,
    line = ELineType.NORMAL,
    underline,
    strikethrough,
    ...props
}: TTextProps<T>): JSX.Element {
    const classes = classnames(
        className,
        'cssClass[typography]',
        mapTextSizeToCssClass[size],
        mapFontTypeToCssClass[type],
        mapFontWeightToCssClass[weight],
        mapLineTypeToCssClass[line],
        {
            'cssClass[underline]': !!underline,
            'cssClass[strikethrough]': !!strikethrough,
        }
    );

    return React.createElement(tag, {className: classes, ...props}, children);
}

Text.displayName = 'Text';
