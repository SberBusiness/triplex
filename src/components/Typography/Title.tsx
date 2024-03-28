import React from 'react';
import {ITypographyProps} from '@sberbusiness/triplex/components/Typography/types';
import {EFontType, EFontWeight, ETitleSize} from '@sberbusiness/triplex/components/Typography/enums';
import {mapTitleSizeToCssClass, mapFontTypeToCssClass, mapFontWeightToCssClass} from '@sberbusiness/triplex/components/Typography/utils';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента Title. */
type TTitleProps<T extends keyof JSX.IntrinsicElements> = {
    /** Размер текста. */
    size: ETitleSize;
} & ITypographyProps &
    JSX.IntrinsicElements[T];

/** Заголовок (типографика). */
export function Title<T extends keyof JSX.IntrinsicElements = `h1`>({
    children,
    className,
    size,
    tag = `h${size}`,
    type = EFontType.GENERAL,
    weight = EFontWeight.SEMIBOLD,
    underline,
    strikethrough,
    ...props
}: TTitleProps<T>): JSX.Element {
    const classes = classnames(
        'cssClass[title]',
        mapTitleSizeToCssClass[size],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        mapFontTypeToCssClass[type],
        mapFontWeightToCssClass[weight],
        {
            'cssClass[strikethrough]': !!strikethrough && !underline,
            'cssClass[underline]': !!underline && !strikethrough,
            'cssClass[underlineStrikethrough]': !!strikethrough && !!underline,
        },
        className
    );

    return React.createElement(tag, {className: classes, ...props}, children);
}

Title.displayName = 'Title';
