import {dateFormatYYYYMMDD, globalLimitRange, YEARS_SET} from '@sberbusiness/triplex/consts/DateConst';
import {ECalendarMomentPeriodType, ECalendarTab} from '@sberbusiness/triplex/enums/EDatePeriod';
import {IButtonIconProps} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {
    ICalendarNestedProps,
    TPickedDate,
    TPickedDateProp,
    TPickedRange,
    TPickedRangeProp,
} from '@sberbusiness/triplex/components/Calendar/types';
import {IDateLimitRange} from '@sberbusiness/triplex/types/DateTypes';
import {CalendarControls} from '@sberbusiness/triplex/components/Calendar/components/CalendarControls';
import {Decade} from '@sberbusiness/triplex/components/Calendar/components/Decade';
import {Month} from '@sberbusiness/triplex/components/Calendar/components/Month';
import {Year} from '@sberbusiness/triplex/components/Calendar/components/Year';
import {EChangePageDirection, EPickType} from '@sberbusiness/triplex/components/Calendar/enums';
import {CalendarRange} from '@sberbusiness/triplex/components/Calendar/CalendarRange';
import moment, {Moment} from 'moment';
import React from 'react';
import {formatDate, getHeader, isCalendarRange, parsePickedDate} from '@sberbusiness/triplex/components/Calendar/utils';
import {uniqueId} from '@sberbusiness/triplex/utils/uniqueId';

/** Общие свойства компонента календаря. */
export interface ICalendarCommonProps extends ICalendarNestedProps {
    /** Отображаемая по умолчанию дата. */
    defaultViewDate?: string | Moment;
    /** Отключённые дни. */
    disabledDays?: string[];
    /** Формат для значения. */
    format?: string;
    /** Ограничение выбираемого периода. */
    limitRange?: IDateLimitRange;
    /** Отмеченные дни. */
    markedDays?: string[];
    /** Обработчик потери фокуса. */
    onBlur?: () => void;
    /** Обработчик изменения страницы. */
    onChangePage?: (date: Moment, tab: ECalendarTab, direction: EChangePageDirection) => void;
    /** Обработчик выбора месяца. */
    onSetMonth?: (date: Moment) => void;
    /** Вариант выбора даты. */
    pickType?: EPickType;
    /** Обратный порядок выбора даты. */
    reversedPick?: boolean;
}

/** Свойства обычного календаря. */
export interface ICalendarSingleProps extends ICalendarCommonProps {
    /** Обработчик изменения даты. */
    onChangeDate: (date: Moment) => void;
    /** Выбранная дата. */
    pickedDate: TPickedDateProp;
}

/** Свойства календаря для выбора периода. */
export interface ICalendarRangeProps extends ICalendarCommonProps {
    /** Дата календаря по умолчанию. */
    defaultDate?: TPickedDateProp;
    /** Обработчик изменения периода. */
    onChangeDate: (date: TPickedRange) => void;
    /** Выбранный период. */
    pickedDate: TPickedRangeProp;
}

/** Свойства компонента календаря. */
export type TCalendarProps = ICalendarSingleProps | ICalendarRangeProps;

interface IState {
    /** День, доступный для фокусировки в текущий момент при навигации с клавиатуры. Элемент с этой датой имеет tabIndex=0, остальные даты -1. */
    availableToFocusDay?: Moment;
    /** День, находящийся в фокусе в текущий момент при навигации с клавиатуры. */
    focusedDay?: Moment;
    /** Выбранная дата в формате Moment. */
    pickedDate: TPickedDate;
    /** Дата является курсором, для навигации по интерфейсу. */
    viewDate: Moment;
    /** Текущая вкладка. */
    currentTab: ECalendarTab;
    /** Заголовок календаря. */
    header: string;
}

/** Компонент календаря. */
export class Calendar extends React.PureComponent<TCalendarProps, IState> {
    public static Range = CalendarRange;

    public static defaultProps = {
        format: dateFormatYYYYMMDD,
        pickType: EPickType.datePick,
    };

    // Уникальный id, для передачи a11y aria-атрибутов в Month и CalendarControls.
    private periodId = `calendar-period-${uniqueId()}`;

    constructor(props: Readonly<TCalendarProps>) {
        super(props);

        const {defaultViewDate, format, pickType, reversedPick} = this.props;
        const pickedDateState = isCalendarRange(this.props)
            ? parsePickedDate(this.props.defaultDate, format!)
            : parsePickedDate(this.props.pickedDate, format!);

        let viewDate = moment();

        if (pickedDateState && pickedDateState.isValid) {
            viewDate = pickedDateState.clone();
        } else if (defaultViewDate) {
            const parsedDefaultViewDate = defaultViewDate && parsePickedDate(defaultViewDate, format!);

            if (parsedDefaultViewDate && parsedDefaultViewDate.isValid) {
                viewDate = parsedDefaultViewDate.clone();
            }
        }

        const currentTab = reversedPick
            ? ECalendarTab.DECADE
            : pickType === EPickType.monthYearPick
            ? ECalendarTab.YEAR
            : ECalendarTab.MONTH;
        const header = reversedPick
            ? formatDate(viewDate, ECalendarTab.DECADE)!
            : pickType === EPickType.monthYearPick
            ? formatDate(viewDate, ECalendarTab.YEAR)!
            : getHeader(viewDate);

        this.state = {
            viewDate,
            currentTab,
            header,
            pickedDate: pickedDateState,
        };
    }

    public componentDidMount(): void {
        this.setAvailableToFocusDay();
    }

    public componentDidUpdate(prevProps: TCalendarProps, prevState: IState): void {
        const {format} = this.props;
        const {viewDate, focusedDay} = this.state;
        const {focusedDay: prevFocusedDay, viewDate: prevViewDate} = prevState;

        const pickedDateState = isCalendarRange(this.props)
            ? parsePickedDate(this.state.viewDate, format!)
            : parsePickedDate(this.props.pickedDate, format!);
        const pickedDateValid = pickedDateState?.isValid();
        const resultDate = pickedDateValid ? pickedDateState : prevViewDate;

        const prevPickedDate = isCalendarRange(prevProps)
            ? parsePickedDate(prevState.viewDate, format!)
            : parsePickedDate(prevProps.pickedDate, format!);

        if (!(!pickedDateValid || prevPickedDate?.isSame(resultDate, 'day'))) {
            let newDateContext = {};

            if (viewDate && !viewDate.isSame(pickedDateState, ECalendarMomentPeriodType.MONTH)) {
                newDateContext = {
                    viewDate: resultDate!.clone(),
                    currentTab: ECalendarTab.MONTH,
                    header: getHeader(resultDate),
                };
            }

            this.setState({
                ...newDateContext,
                pickedDate: pickedDateState,
            });
        }

        if (
            (!viewDate && prevViewDate) ||
            (viewDate && !prevViewDate) ||
            (viewDate && prevViewDate && !viewDate.isSame(prevViewDate, ECalendarMomentPeriodType.MONTH))
        ) {
            // Сменился период отображения.
            this.setAvailableToFocusDay();
        }

        if ((focusedDay && !prevFocusedDay) || (focusedDay && prevFocusedDay && !focusedDay.isSame(prevFocusedDay, 'day'))) {
            // Сменился день, на котором установлен фокус.
            this.setState({
                availableToFocusDay: focusedDay,
            });
        }
    }

    public render(): JSX.Element {
        return (
            <div className="cssClass[globalCalendar]">
                {this.renderCalendarControls()}
                {this.renderCalendarItem()}
            </div>
        );
    }

    /** Устанавливает значение availableToFocusDay. Это или выбранная дата или первый день месяца. */
    private setAvailableToFocusDay = () => {
        const {pickedDate, viewDate} = this.state;
        let nextAvailableToFocusDay;

        // Есть выбранная дата и выбранная дата в отображаемом месяце.
        if (pickedDate && pickedDate.isSame(viewDate, 'month')) {
            // Выбранный день.
            nextAvailableToFocusDay = pickedDate;
        } else {
            // Первый день месяца.
            nextAvailableToFocusDay = moment(viewDate).startOf('month');
        }

        if (nextAvailableToFocusDay) {
            this.setState({
                availableToFocusDay: nextAvailableToFocusDay,
            });
        }
    };

    /**
     * Проверяет, является ли дата отключённой.
     * @param {Moment} date Проверяемая дата.
     */
    private checkDisabled = (date: Moment): boolean => {
        const {disabledDays} = this.props;
        return Boolean(disabledDays?.includes(date.format(dateFormatYYYYMMDD)));
    };

    /** Обработчик перемещения фокуса на другой день. */
    private handleChangeFocusedDay = (day: Moment | undefined) => {
        const {focusedDay, viewDate} = this.state;

        if (!day) {
            if (focusedDay) {
                this.setState({
                    focusedDay: undefined,
                });
            }

            return;
        }

        // Фокус переместился на день предыдущего месяца.
        if (day.isBefore(viewDate, 'month')) {
            this.changeCalendarPageToBack();
        } else if (day.isAfter(viewDate, 'month')) {
            // Фокус переместился на день следующего месяца.
            this.changeCalendarPageToForward();
        }

        if (!this.checkDisabled(day)) {
            if (!focusedDay || !focusedDay.isSame(day, 'day')) {
                this.setState({
                    focusedDay: day,
                });
            }
        }
    };

    /** Если дата отсутствует - вернётся текущая. */
    private getSafeDate = (date: TPickedDate): Moment => date?.clone() || moment();

    /**
     * Задать отображаемый год
     * @param {number} year Год.
     */
    private setViewYear = (year: number) => {
        const {viewDate, pickedDate} = this.state;
        const viewDateNew: Moment = this.getSafeDate(viewDate).set(ECalendarMomentPeriodType.YEAR, year);

        this.setState({
            viewDate: viewDateNew,
            currentTab: ECalendarTab.YEAR,
            header: formatDate(viewDateNew, ECalendarTab.YEAR) || getHeader(pickedDate),
        });
    };

    /**
     * Задать отображаемый месяц
     * @param {number} month Месяц.
     */
    private setViewMonth = (month: number) => {
        const {viewDate} = this.state;
        const viewDateNew: Moment = this.getSafeDate(viewDate).month(month);

        this.props.onSetMonth?.(viewDateNew);

        if (this.props.pickType === EPickType.monthYearPick) {
            this.handleClick(viewDateNew.date(1));
        } else {
            this.setState({
                viewDate: viewDateNew,
                currentTab: ECalendarTab.MONTH,
                header: formatDate(viewDateNew, ECalendarTab.MONTH) || getHeader(viewDateNew),
            });
        }
    };

    /**
     * Обработчик выбора даты.
     * @param {Moment} date Выбранная дата.
     */
    private handleClick = (date: Moment) => {
        const {format} = this.props;
        if (isCalendarRange(this.props)) {
            let newRange: TPickedRange;
            if (this.props.pickedDate[0] && !this.props.pickedDate[1]) {
                const firstDate = parsePickedDate(this.props.pickedDate[0], format!);
                newRange = date.isBefore(firstDate) ? [date, firstDate] : [firstDate, date];
            } else {
                newRange = [date, null];
            }
            this.props.onChangeDate(newRange);
        } else {
            this.props.onChangeDate(date);
        }
    };

    /** Отрисовка года. */
    private renderYear = (): JSX.Element => {
        const {viewDate, pickedDate} = this.state;
        const {pickType, limitRange, monthHtmlAttributes} = this.props;

        return (
            <Year
                viewDate={this.getSafeDate(viewDate)}
                onClick={this.setViewMonth}
                pickedDate={pickedDate}
                limitRange={pickType === EPickType.monthYearPick ? limitRange : undefined}
                monthHtmlAttributes={monthHtmlAttributes}
            />
        );
    };

    /** Отрисовка месяца. */
    private renderMonth = (): JSX.Element => {
        const {availableToFocusDay, focusedDay, viewDate, pickedDate} = this.state;
        const {format, limitRange, markedDays, disabledDays, dayHtmlAttributes} = this.props;

        let pickedRange;
        if (isCalendarRange(this.props)) {
            pickedRange = [
                parsePickedDate(this.props.pickedDate[0], format!),
                parsePickedDate(this.props.pickedDate[1], format!),
            ] as TPickedRange;
        }

        return (
            <Month
                periodId={this.periodId}
                availableToFocusDay={availableToFocusDay}
                focusedDay={focusedDay}
                onChangeFocusedDay={this.handleChangeFocusedDay}
                limitRange={limitRange}
                markedDays={markedDays}
                disabledDays={disabledDays}
                pickedDate={pickedDate}
                viewDate={viewDate}
                pickedRange={pickedRange}
                onClick={this.handleClick}
                onPickNextMonth={this.changeCalendarPageToBack}
                onPickPreviousMonth={this.changeCalendarPageToForward}
                dayHtmlAttributes={dayHtmlAttributes}
            />
        );
    };

    /** Отрисовка элементов управления календаря. */
    private renderCalendarControls = (): JSX.Element => {
        const {header, currentTab, viewDate, pickedDate} = this.state;
        const {prevButtonProps, nextButtonProps, changeViewLinkProps} = this.props;

        const nextTab: ECalendarTab = currentTab - 1;
        const changeCalendarView =
            nextTab > 0
                ? () => {
                      this.setState({
                          currentTab: nextTab,
                          header: formatDate(viewDate, nextTab) || getHeader(pickedDate),
                      });
                  }
                : undefined;

        const prevInRange = this.isInRange(this.getSafeDate(viewDate).add(-this.getOffset(), this.getPage()));
        const nextInRange = this.isInRange(this.getSafeDate(viewDate).add(this.getOffset(), this.getPage()));

        const prevDisabled = !prevInRange || prevButtonProps?.disabled;
        const nextDisabled = !nextInRange || nextButtonProps?.disabled;

        return (
            <CalendarControls
                periodId={this.periodId}
                onPrev={this.changeCalendarPageToBack}
                onNext={this.changeCalendarPageToForward}
                onChangeView={changeCalendarView}
                prevButtonProps={{...prevButtonProps, disabled: prevDisabled} as IButtonIconProps}
                nextButtonProps={{...nextButtonProps, disabled: nextDisabled} as IButtonIconProps}
                changeViewLinkProps={changeViewLinkProps}
            >
                {header}
            </CalendarControls>
        );
    };

    /** Отрисовка текущей вкладки календаря. */
    private renderCalendarItem = (): React.ReactNode => {
        const {pickedDate, currentTab, viewDate} = this.state;
        const {yearHtmlAttributes} = this.props;

        switch (currentTab) {
            case ECalendarTab.DECADE:
                return (
                    <Decade
                        viewDate={viewDate}
                        onClick={this.setViewYear}
                        pickedDate={pickedDate}
                        yearHtmlAttributes={yearHtmlAttributes}
                    />
                );
            case ECalendarTab.YEAR:
                return this.renderYear();
            case ECalendarTab.MONTH:
                return this.renderMonth();
            default:
                return null;
        }
    };

    /** Получить изменяемую страницу в формате Moment. */
    private getPage = (): ECalendarMomentPeriodType =>
        this.state.currentTab === ECalendarTab.MONTH ? ECalendarMomentPeriodType.MONTH : ECalendarMomentPeriodType.YEAR;

    /** Получить текущий offset. */
    private getOffset = (): number => (this.state.currentTab === ECalendarTab.DECADE ? 12 : 1);

    private isInRange = (viewDate: Moment): boolean => {
        const {currentTab} = this.state;
        const {dateFrom, dateTo} = globalLimitRange;

        return (
            viewDate.isBetween(dateFrom, dateTo) ||
            (currentTab === ECalendarTab.DECADE &&
                YEARS_SET.some((offset) => viewDate.clone().add(offset, this.getPage()).isBetween(dateFrom, dateTo)))
        );
    };

    /**
     * Обработчик смены страницы.
     *
     * @param {EChangePageDirection} direction Направление смены.
     */
    private handlePageChange = (direction: EChangePageDirection) => {
        const {viewDate, currentTab} = this.state;
        const {onChangePage} = this.props;

        onChangePage?.(viewDate, currentTab, direction);
    };

    /** Обработка листания календаря назад. */
    private changeCalendarPageToBack = () => {
        const {pickedDate} = this.state;

        this.setState(
            (prevState): IState => {
                const viewDate: Moment = this.getSafeDate(prevState.viewDate).add(-this.getOffset(), this.getPage());
                const isInRange = this.isInRange(viewDate);

                let changedStateElements = {};

                if (isInRange) {
                    changedStateElements = {
                        viewDate: viewDate,
                        header: formatDate(viewDate, prevState.currentTab) || getHeader(pickedDate),
                    };
                }
                return {
                    ...prevState,
                    ...changedStateElements,
                    focusedDay: undefined,
                };
            },
            () => {
                this.handlePageChange(EChangePageDirection.BACKWARD);
            }
        );
    };

    /** Обработка листания календаря вперёд. */
    private changeCalendarPageToForward = () => {
        const {pickedDate} = this.state;

        this.setState(
            (prevState): IState => {
                const viewDate: Moment = this.getSafeDate(prevState.viewDate).add(this.getOffset(), this.getPage());
                const isInRange = this.isInRange(viewDate);

                let changedStateElements = {};

                if (isInRange) {
                    changedStateElements = {
                        viewDate,
                        header: formatDate(viewDate, prevState.currentTab) || getHeader(pickedDate),
                    };
                }
                return {
                    ...prevState,
                    ...changedStateElements,
                    focusedDay: undefined,
                };
            },
            () => {
                this.handlePageChange(EChangePageDirection.FORWARD);
            }
        );
    };
}
