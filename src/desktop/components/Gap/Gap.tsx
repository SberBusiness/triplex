import * as React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

/**
 * Возможные размеры Gap.
 */
export type TGapSize = 4 | 8 | 12 | 16 | 24 | 32 | 64 | 128;

/**
 * Свойства компонента Gap.
 *
 * @prop {number} size Размер отступа, совпадает c размером отступа в пикселях.
 */
interface IGapProps extends React.HTMLAttributes<HTMLDivElement> {
    size: TGapSize;
}

/**
 * Компонент - разделитель. Добавляет пустое вертикальное пространство между компонентами.
 */
export const Gap: React.FC<IGapProps> = ({className, size, ...htmlDivAttributes}) => (
    <div className={classnames(className, 'cssClass[gap]')} data-gap-size={size} {...htmlDivAttributes} />
);
