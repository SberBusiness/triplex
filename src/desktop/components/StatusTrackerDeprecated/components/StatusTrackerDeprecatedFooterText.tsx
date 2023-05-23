import * as React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

/**
 * Интерфейс компонента текста для подвала статус трекера.
 * @prop {string} children Текстовая строка.
 */
export interface IStatusTrackerDeprecatedFooterTextProps extends React.HTMLAttributes<HTMLDivElement> {
    children: string;
}

/**
 * Компонент текста в подвале статус трекера.
 */
export const StatusTrackerDeprecatedFooterText: React.FC<IStatusTrackerDeprecatedFooterTextProps> = ({
    children,
    className,
    ...htmlDivAttributes
}) => (
    <div className={classnames(className, 'cssClass[StatusTrackerDeprecatedFooterText]')} {...htmlDivAttributes}>
        {children}
    </div>
);
