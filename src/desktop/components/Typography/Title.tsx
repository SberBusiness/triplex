import * as React from 'react';
import {ITypographyProps} from '@sberbusiness/triplex/desktop/components/Typography/types';
import {EFontType, EFontWeight, ETitleSize} from '@sberbusiness/triplex/desktop/components/Typography/enums';
import {
    mapTitleSizeToCssClass,
    mapFontTypeToCssClass,
    mapFontWeightToCssClass,
} from '@sberbusiness/triplex/desktop/components/Typography/utils';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

type TTitleProps<T extends keyof JSX.IntrinsicElements> = {
    /** Размер текста. */
    size: ETitleSize;
} & ITypographyProps &
    JSX.IntrinsicElements[T];

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
        mapTitleSizeToCssClass[size],
        mapFontTypeToCssClass[type],
        mapFontWeightToCssClass[weight],
        {
            'cssClass[underline]': !!underline,
            'cssClass[strikethrough]': !!strikethrough,
        },
        className
    );

    return React.createElement(tag, {className: classes, ...props}, children);
}

Title.displayName = 'Title';
