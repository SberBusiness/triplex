import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {TestProps} from '@sberbusiness/triplex/types/CoreTypes';

/** Свойства TabsLineItem. */
export interface ITabsLineItemProps extends React.HTMLAttributes<HTMLButtonElement | HTMLDivElement>, TestProps {
    /** Таб выбран. */
    selected?: boolean;
    /** Идентификатор таба. */
    id: string;
    /** Отображаемое значение. */
    label: string;
    /** Флаг отображения значка новых уведомлений. */
    showNotificationIcon?: boolean;
}

/** Компонент TabsLineItem. */
export const TabsLineItem: React.FC<ITabsLineItemProps> = ({id, label, selected, showNotificationIcon, ...htmlButtonAttributes}) => (
    <button
        {...htmlButtonAttributes}
        key={id}
        className={classnames('cssClass[tab]', {'cssClass[active]': Boolean(selected)})}
        aria-pressed={selected}
        type="button"
    >
        {label}
        {showNotificationIcon && <span className="cssClass[notificationIcon]" />}
    </button>
);
