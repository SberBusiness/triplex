import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

export enum ESkeletonType {
    DARK,
    LIGHT,
}

export interface ISkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Тип скелетона - темный или светлый.
     */
    type?: ESkeletonType;
}

/**
 * Элемент для визуализации содержимого, которое еще не загрузилось.
 */
export const Skeleton: React.FC<ISkeletonProps> = ({className, type = ESkeletonType.DARK, ...htmlDivAttributes}) => (
    <div
        className={classnames('cssClass[skeleton]', className, {
            'cssClass[dark]': type === ESkeletonType.DARK,
            'cssClass[light]': type === ESkeletonType.LIGHT,
        })}
        {...htmlDivAttributes}
    />
);
