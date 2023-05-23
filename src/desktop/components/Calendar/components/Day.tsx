import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import * as React from 'react';

/**
 * @prop {string} dayNumber Номер дня в месяце.
 * @prop {boolean | null} [active] true, если день является границей периода.
 * @prop {boolean} [marked] true, если это отмеченный день.
 * @prop {boolean} [muted] true, если активно, но не относится к этому месяцу.
 * @prop {boolean} [disabled] true, если день неактивен для выбора.
 * @prop {boolean} [isCurrentDate] true, если сегодняшний день.
 * @prop {Function} onClick Обработчик клика на элемент.
 * @prop {boolean} [isLeftBorder] true, если день - левая граница выбранного периода.
 * @prop {boolean} [isRightBorder] true, если день - правая граница выбранного периода.
 * @prop {boolean} [inRange] true, если день входит в выбранный период.
 */
export interface IDayProps extends React.HTMLAttributes<HTMLDivElement> {
    dayNumber: number;
    active: boolean;
    marked: boolean;
    muted: boolean;
    disabled: boolean;
    isCurrentDate: boolean;
    onClick(event?: React.MouseEvent<HTMLDivElement>): void;
    isLeftBorder: boolean;
    isRightBorder: boolean;
    inRange: boolean;
}

/** Компонент "День" для календаря. */
export class Day extends React.PureComponent<IDayProps> {
    public static defaultProps = {
        active: false,
        disabled: false,
        isCurrentDate: false,
        marked: false,
        muted: false,
        isLeftBorder: false,
        isRightBorder: false,
        inRange: false,
    };

    public render(): JSX.Element {
        const {
            dayNumber,
            active,
            marked,
            muted,
            disabled,
            isCurrentDate,
            onClick,
            isLeftBorder,
            isRightBorder,
            inRange,
            ...htmlDivAttributes
        } = this.props;

        const classNameDay = classnames(
            'cssClass[calendarDay]',
            {'cssClass[calendarDayCurrent]': isCurrentDate},
            {'cssClass[calendarDayMarked]': marked},
            {'cssClass[calendarDayMuted]': muted},
            'cssClass[calendarTableItem]',
            {'cssClass[calendarTableItemActive]': !muted && active},
            {'cssClass[calendarTableItemDisabled]': disabled}
        );

        return (
            <td
                className={classnames(
                    'cssClass[calendarDayWrapper]',
                    {'cssClass[calendarDayInRangeWrapper]': inRange},
                    {'cssClass[calendarLeftBorderDay]': isLeftBorder},
                    {'cssClass[calendarRightBorderDay]': isRightBorder}
                )}
            >
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                <div {...htmlDivAttributes} onClick={disabled ? undefined : onClick} className={classNameDay}>
                    {dayNumber}
                </div>
            </td>
        );
    }
}
