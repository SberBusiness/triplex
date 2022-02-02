import * as React from 'react';
import {ITypographyProps} from '@sbbol/web-library/desktop/components/Typography/types';
import {EFontType, EFontWeight, ETitleSize} from '@sbbol/web-library/desktop/components/Typography/enums';
import {
    mapTitleSizeToCssClass,
    mapFontTypeToCssClass,
    mapFontWeightToCssClass,
} from '@sbbol/web-library/desktop/components/Typography/utils';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

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
        className,
        'cssClass[typography]',
        mapTitleSizeToCssClass[size],
        mapFontTypeToCssClass[type],
        mapFontWeightToCssClass[weight],
        {
            'cssClass[underline]': !!underline,
            'cssClass[strikethrough]': !!strikethrough,
        }
    );

    return React.createElement(tag, {className: classes, ...props}, children);
}

Title.displayName = 'Title';
