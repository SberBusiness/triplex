import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import React, {useEffect, useRef} from 'react';

/** Свойства Day. */
export interface IDayProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Номер дня в месяце. */
    dayNumber: number;
    /** True, если день является границей периода. */
    active: boolean;
    /** True, если это отмеченный день. */
    marked: boolean;
    /** True, если день находится в фокусе. */
    focused?: boolean;
    /** True, если активно, но не относится к этому месяцу. */
    muted: boolean;
    /** True, если день неактивен для выбора. */
    disabled: boolean;
    /** True, если сегодняшний день. */
    isCurrentDate: boolean;
    /** Обработчик клика на элемент. */
    onClick(event?: React.MouseEvent<HTMLDivElement>): void;
    /** True, если день - левая граница выбранного периода. */
    isLeftBorder: boolean;
    /** True, если день - правая граница выбранного периода. */
    isRightBorder: boolean;
    /** True, если день входит в выбранный период. */
    inRange: boolean;
}

/** Компонент "День" для календаря. */
export const Day: React.FC<IDayProps> = ({
    dayNumber,
    active,
    focused,
    marked,
    muted,
    disabled,
    isCurrentDate,
    onClick,
    isLeftBorder,
    isRightBorder,
    inRange,
    ...htmlDivAttributes
}) => {
    const dayRef = useRef<HTMLDivElement>(null);

    const classNameDay = classnames(
        'cssClass[calendarDay]',
        {'cssClass[calendarDayCurrent]': isCurrentDate},
        {'cssClass[calendarDayMarked]': marked},
        {'cssClass[calendarDayMuted]': muted},
        'cssClass[calendarTableItem]',
        {'cssClass[calendarTableItemActive]': !muted && active},
        {'cssClass[calendarTableItemDisabled]': disabled}
    );

    useEffect(() => {
        if (focused && dayRef.current) {
            dayRef.current.focus();
        }
    }, [focused]);

    return (
        <td
            className={classnames(
                'cssClass[calendarDayWrapper]',
                {'cssClass[calendarDayInRangeWrapper]': inRange},
                {'cssClass[calendarLeftBorderDay]': isLeftBorder},
                {'cssClass[calendarRightBorderDay]': isRightBorder}
            )}
            aria-selected={!muted && active ? true : undefined}
        >
            <div {...htmlDivAttributes} onClick={disabled ? undefined : onClick} className={classNameDay} ref={dayRef}>
                {dayNumber}
            </div>
        </td>
    );
};
