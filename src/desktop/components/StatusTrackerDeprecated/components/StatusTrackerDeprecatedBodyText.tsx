import * as React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

/**
 * Интерфейс компонента текста для тела статус трекера.
 * @prop {string} children Текстовая строка.
 */
export interface IStatusTrackerBodyTextProps extends React.HTMLAttributes<HTMLDivElement> {
    children: string;
}

/**
 * Компонент текста в теле статус трекера.
 */
export const StatusTrackerDeprecatedBodyText: React.FC<IStatusTrackerBodyTextProps> = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames(className, 'cssClass[statusTrackerDeprecatedBodyText]')} {...htmlDivAttributes}>
        {children}
    </div>
);
