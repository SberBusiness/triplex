import React, {useEffect, useRef} from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {TDayHtmlAttributes} from '@sberbusiness/triplex/components/Calendar/types';

/** Свойства компонента CalendarDay. */
export interface ICalendarDay extends React.HTMLAttributes<HTMLTableCellElement> {
    /** День доступен для фокусировки при навигации с клавиатуры. */
    tabbable: boolean;
    /** День находится в состоянии фокуса. */
    focused: boolean;
    /** День не относится к текущему месяцу. */
    muted: boolean;
    /** День является сегодняшним. */
    current: boolean;
    /** День является активным. */
    active: boolean;
    /** День является отмеченным. */
    marked: boolean;
    /** День является отключенным. */
    disabled: boolean;
    /** День является началом выбранного периода. */
    rangeStart: boolean;
    /** День является концом выбранного периода. */
    rangeEnd: boolean;
    /** День находится между началом/концом выбранного периода. */
    rangeBetween: boolean;
    /** HTML атрибуты. */
    htmlAttributes?: TDayHtmlAttributes;
}

/** Календарный день. */
export const CalendarDay: React.FC<ICalendarDay> = ({
    children,
    tabbable,
    focused,
    muted,
    current,
    active,
    marked,
    disabled,
    rangeStart,
    rangeEnd,
    rangeBetween,
    htmlAttributes = {},
    onClick,
    onKeyDown,
}) => {
    const ref = useRef<HTMLTableCellElement>(null);
    const selected = active && !muted;
    const {className, ...restAttributes} = typeof htmlAttributes === 'function' ? htmlAttributes({marked}) : htmlAttributes;
    const classNames = classnames(
        'cssClass[calendarDay]',
        {
            'cssClass[marked]': marked,
            'cssClass[rangeStart]': rangeStart,
            'cssClass[rangeEnd]': rangeEnd,
            'cssClass[rangeBetween]': rangeBetween,
        },
        className
    );

    useEffect(() => {
        if (focused && ref.current) {
            ref.current.focus();
        }
    }, [focused]);

    /** Отрисовка номера дня. */
    const renderDayNumber = () => {
        const classNames = classnames('cssClass[calendarDayNumber]', {
            'cssClass[muted]': muted,
            'cssClass[current]': current,
            'cssClass[selected]': selected,
            'cssClass[disabled]': disabled,
        });

        return (
            <div className={classNames} onClick={disabled ? undefined : onClick}>
                {children}
            </div>
        );
    };

    return (
        <td
            className={classNames}
            tabIndex={tabbable ? 0 : -1}
            aria-selected={selected}
            {...restAttributes}
            onKeyDown={disabled ? undefined : onKeyDown}
            ref={ref}
        >
            {renderDayNumber()}
        </td>
    );
};
