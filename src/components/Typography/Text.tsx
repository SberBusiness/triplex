import React from 'react';
import {ITypographyProps} from '@sberbusiness/triplex/components/Typography/types';
import {EFontType, EFontWeight, ELineType, ETextSize} from '@sberbusiness/triplex/components/Typography/enums';
import {
    mapFontTypeToCssClass,
    mapFontWeightToCssClass,
    mapLineTypeToCssClass,
    mapTextSizeToCssClass,
} from '@sberbusiness/triplex/components/Typography/utils';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента Text. */
type TTextProps<T extends keyof JSX.IntrinsicElements> = {
    /** Размер текста. */
    size: ETextSize;
    /** Высота блока строки. */
    line?: ELineType;
} & ITypographyProps &
    JSX.IntrinsicElements[T];

/** Текст (типографика). */
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
        'cssClass[text]',
        mapTextSizeToCssClass[size],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        mapFontTypeToCssClass[type],
        mapFontWeightToCssClass[weight],
        mapLineTypeToCssClass[line],
        {
            'cssClass[underline]': !!underline && !strikethrough,
            'cssClass[strikethrough]': !!strikethrough && !underline,
            'cssClass[underlineStrikethrough]': !!strikethrough && !!underline,
        },
        className
    );

    return React.createElement(tag, {className: classes, ...props}, children);
}

Text.displayName = 'Text';
