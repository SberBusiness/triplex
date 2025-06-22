import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {ServicesetupScrsystIllustration128} from '@sberbusiness/illustrations/ServicesetupScrsystIllustration128';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';

/** Свойства компонента NoColumns. */
export interface INoColumnsProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Компонент отображающий информацию, когда скрыты все колонки таблицы. */
export const NoColumns: React.FC<INoColumnsProps> = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames('cssClass[noColumns]', className)} {...htmlDivAttributes}>
        <ServicesetupScrsystIllustration128 />

        <Gap size={24} />

        <div className="cssClass[content]">{children}</div>
    </div>
);

NoColumns.displayName = 'NoColumns';
