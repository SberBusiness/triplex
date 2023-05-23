import * as React from 'react';
import {ITypographyProps} from '@sberbusiness/triplex/desktop/components/Typography/types';
import {EFontType, EFontWeight, ELineType, ETextSize} from '@sberbusiness/triplex/desktop/components/Typography/enums';
import {
    mapFontTypeToCssClass,
    mapFontWeightToCssClass,
    mapLineTypeToCssClass,
    mapTextSizeToCssClass,
} from '@sberbusiness/triplex/desktop/components/Typography/utils';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

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
        mapTextSizeToCssClass[size],
        mapFontTypeToCssClass[type],
        mapFontWeightToCssClass[weight],
        mapLineTypeToCssClass[line],
        {
            'cssClass[underline]': !!underline,
            'cssClass[strikethrough]': !!strikethrough,
        },
        className
    );

    return React.createElement(tag, {className: classes, ...props}, children);
}

Text.displayName = 'Text';
