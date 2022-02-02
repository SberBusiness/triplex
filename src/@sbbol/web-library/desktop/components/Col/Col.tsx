import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {cssClass} from '@sbbol/web-library/desktop/utils/cssClass';
import * as React from 'react';

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
}

/**
 * Собираем стилевые классы на основе переданных пропсов.
 * @param {TColumnSize} [size] Ширина колонки.
 * @param {TOffsetSize} [offset] Ширина отступа слева.
 * @param {string} [prefix] Префикс css-класса.
 * @return {string} строка с названиями стилевых классов.
 */
const getClasses = (size?: TColumnSize, offset?: TOffsetSize, prefix?: string): string => {
    const classes: string[] = [];
    const prefixAsPart = prefix ? `${prefix}-` : '';

    if (size) {
        classes.push(cssClass(`col-${prefixAsPart}${size}`));
    }

    if (offset !== undefined) {
        classes.push(cssClass(`offset-${prefixAsPart}${offset}`));
    }

    return classnames(...classes);
};

/**
 * Компонент Col. Колонка по бутстраповским гридам.
 */
const Col: React.FC<IColProps> = ({
    children,
    className,
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
    const classNameXs = getClasses(size, offset);
    const classNameSm = getClasses(sizeSm, offsetSm, 'sm');
    const classNameMd = getClasses(sizeMd, offsetMd, 'md');
    const classNameLg = getClasses(sizeLg, offsetLg, 'lg');
    const classNameXl = getClasses(sizeXl, offsetXl, 'xl');

    return (
        <div {...props} className={classnames(className, classNameXs, classNameSm, classNameMd, classNameLg, classNameXl)}>
            {children}
        </div>
    );
};

Col.displayName = 'Col';

export {Col};
