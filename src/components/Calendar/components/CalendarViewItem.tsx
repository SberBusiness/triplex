import React, {useEffect, useContext, useRef} from 'react';
import moment from 'moment';
import {ECalendarDateMarkType} from '@sberbusiness/triplex/components/Calendar/enums';
import {CalendarViewContext} from '@sberbusiness/triplex/components/Calendar/CalendarViewContext';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {isKey} from '@sberbusiness/triplex/utils/keyboard';

/** Свойства компонента CalendarViewItem. */
export interface ICalendarViewItemProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    /** Дата. */
    date: moment.Moment;
    /** Единица измерения. */
    unit: 'day' | 'month' | 'year';
    /** Дата является активной. */
    active: boolean;
    /** Дата является отключенной. */
    disabled: boolean;
    /** Дата может получить фокус при навигации. */
    tabbable: boolean;
    /** Дата не относится к текущему месяцу. */
    muted?: boolean;
    /** Тип отметки. */
    markType?: ECalendarDateMarkType;
    /** Функция, вызывающаяся при выборе даты. */
    onDateSelect: (date: moment.Moment) => void;
}

/** Соответствие типа отметки имени класса. */
const markTypeToClassNameMap = {
    [ECalendarDateMarkType.BASIC]: 'cssClass[basicMark]',
    [ECalendarDateMarkType.STANDARD]: 'cssClass[standardMark]',
    [ECalendarDateMarkType.ATTENTION]: 'cssClass[attentionMark]',
    [ECalendarDateMarkType.CRITICAL]: 'cssClass[criticalMark]',
};

/** Соответствие единицы измерения имени класса. */
const unitToClassNameMap = {
    ['day']: 'cssClass[unitDay]',
    ['month']: 'cssClass[unitMonth]',
    ['year']: 'cssClass[unitYear]',
};

/** Элемент таблицы CalendarView[Days/Months/Years]. */
export const CalendarViewItem: React.FC<ICalendarViewItemProps> = ({
    children,
    className,
    date,
    unit,
    tabbable,
    active,
    disabled,
    muted,
    markType,
    onFocus,
    onBlur,
    onKeyDown,
    onDateSelect,
    ...rest
}) => {
    const {viewItemFocusedRef} = useContext(CalendarViewContext);
    const ref = useRef<HTMLTableCellElement | null>(null);

    useEffect(() => {
        if (tabbable && viewItemFocusedRef.current) {
            ref.current?.focus();
        }
    }, [tabbable, viewItemFocusedRef]);

    /** Обработчик получения фокуса. */
    const handleFocus = (event: React.FocusEvent<HTMLTableCellElement>) => {
        viewItemFocusedRef.current = true;

        onFocus?.(event);
    };

    /** Обработчик потери фокуса. */
    const handleBlur = (event: React.FocusEvent<HTMLTableCellElement>) => {
        viewItemFocusedRef.current = false;

        onBlur?.(event);
    };

    /** Обработчик нажатия клавиши. */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLTableCellElement>) => {
        const key = event.code || event.keyCode;

        if (isKey(key, 'ENTER') || isKey(key, 'SPACE')) {
            event.preventDefault();
            onDateSelect(date);
        }

        onKeyDown?.(event);
    };

    return (
        <td
            className={classnames('cssClass[calendarViewItem]', {'cssClass[disabled]': disabled}, className)}
            tabIndex={tabbable ? 0 : -1}
            aria-selected={active ? true : undefined}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            {...rest}
            ref={ref}
        >
            <div
                className={classnames(
                    'cssClass[calendarViewItemLabel]',
                    unitToClassNameMap[unit],
                    {
                        'cssClass[disabled]': disabled,
                        'cssClass[marked]': markType !== undefined,
                        'cssClass[muted]': !!muted,
                        'cssClass[selected]': active,
                    },
                    markType !== undefined ? markTypeToClassNameMap[markType] : undefined
                )}
                onClick={() => onDateSelect(date)}
            >
                {children}
            </div>
        </td>
    );
};
