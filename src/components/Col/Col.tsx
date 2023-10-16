import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {cssClass} from '@sberbusiness/triplex/utils/cssClass';
import React from 'react';

export type TColumnSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type TOffsetSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

/** Свойства Col. */
export interface IColProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Ширина колонки. */
    children?: React.ReactNode;
    /** Ширина колонки. */
    size?: TColumnSize;
    /** Ширина колонки Sm. */
    sizeSm?: TColumnSize;
    /** Ширина колонки Md. */
    sizeMd?: TColumnSize;
    /** Ширина колонки Lg. */
    sizeLg?: TColumnSize;
    /** Ширина колонки. Xl*/
    sizeXl?: TColumnSize;
    /** Ширина отступа слева. */
    offset?: TOffsetSize;
    /** Ширина отступа слева Sm. */
    offsetSm?: TOffsetSize;
    /** Ширина отступа слева Md. */
    offsetMd?: TOffsetSize;
    /** Ширина отступа слева Lg. */
    offsetLg?: TOffsetSize;
    /** Ширина отступа слева Xl. */
    offsetXl?: TOffsetSize;
    /** Колонка скрыта. */
    hidden?: boolean;
    /** Колонка скрыта Sm. */
    hiddenSm?: boolean;
    /** Колонка скрыта Md. */
    hiddenMd?: boolean;
    /** Колонка скрыта Lg. */
    hiddenLg?: boolean;
    /** Колонка скрыта Xl. */
    hiddenXl?: boolean;
    /** Колонка показана. */
    block?: boolean;
    /** Колонка показана Sm. */
    blockSm?: boolean;
    /** Колонка показана Md. */
    blockMd?: boolean;
    /** Колонка показана Lg. */
    blockLg?: boolean;
    /** Колонка показана Xl. */
    blockXl?: boolean;
}

interface IGetClasses {
    // Колонка показана.
    block?: boolean;
    // Колонка скрыта.
    hidden?: boolean;
    // Ширина отступа слева.
    offset?: TOffsetSize;
    // Префикс css-класса.
    prefix?: string;
    // Ширина колонки.
    size?: TColumnSize;
}

/**
 * Возвращает css-классы.
 */
const getClasses = ({block, hidden, offset, prefix, size}: IGetClasses): string => {
    const classes: string[] = [];
    const prefixAsPart = prefix ? `${prefix}-` : '';
    const prefixVisibility = prefix ? `-${prefix}` : '';

    if (block !== undefined) {
        classes.push(cssClass(`d-block${prefixVisibility}`));
    }

    if (hidden !== undefined) {
        classes.push(cssClass(`d-none${prefixVisibility}`));
    }

    if (offset !== undefined) {
        classes.push(cssClass(`offset-${prefixAsPart}${offset}`));
    }

    if (size) {
        classes.push(cssClass(`col-${prefixAsPart}${size}`));
    }

    return classnames(...classes);
};

/**
 * Компонент Col. Колонка по бутстраповским гридам.
 */
const Col: React.FC<IColProps> = ({
    children,
    className,
    hidden,
    hiddenSm,
    hiddenMd,
    hiddenLg,
    hiddenXl,
    block,
    blockSm,
    blockMd,
    blockLg,
    blockXl,
    size = 12,
    sizeSm,
    sizeMd,
    sizeLg,
    sizeXl,
    offset,
    offsetSm,
    offsetMd,
    offsetLg,
    offsetXl,
    ...props
}) => {
    const classNameXs = getClasses({block, hidden, offset, size});
    const classNameSm = getClasses({block: blockSm, hidden: hiddenSm, offset: offsetSm, prefix: 'sm', size: sizeSm});
    const classNameMd = getClasses({block: blockMd, hidden: hiddenMd, offset: offsetMd, prefix: 'md', size: sizeMd});
    const classNameLg = getClasses({block: blockLg, hidden: hiddenLg, offset: offsetLg, prefix: 'lg', size: sizeLg});
    const classNameXl = getClasses({block: blockXl, hidden: hiddenXl, offset: offsetXl, prefix: 'xl', size: sizeXl});

    return (
        <div {...props} className={classnames(className, classNameXs, classNameSm, classNameMd, classNameLg, classNameXl)}>
            {children}
        </div>
    );
};

Col.displayName = 'Col';

export {Col};
