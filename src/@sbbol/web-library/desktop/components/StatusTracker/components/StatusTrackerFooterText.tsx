import * as React from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

/**
 * Интерфейс компонента текста для подвала статус трекера.
 * @prop {string} children Текстовая строка.
 */
export interface IStatusTrackerFooterTextProps extends React.HTMLAttributes<HTMLDivElement> {
    children: string;
}

/**
 * Компонент текста в подвале статус трекера.
 */
export const StatusTrackerFooterText: React.FC<IStatusTrackerFooterTextProps> = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames(className, 'cssClass[StatusTrackerFooterText]')} {...htmlDivAttributes}>
        {children}
    </div>
);
