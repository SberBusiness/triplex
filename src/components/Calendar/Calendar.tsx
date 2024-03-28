import React from 'react';
import moment, {Moment} from 'moment';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {dateFormatYYYYMMDD, globalLimitRange, MONTHS_SET} from '@sberbusiness/triplex/consts/DateConst';
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
import {CalendarViewYears} from '@sberbusiness/triplex/components/Calendar/components/CalendarViewYears';
import {CalendarViewDays} from '@sberbusiness/triplex/components/Calendar/components/CalendarViewDays';
import {CalendarViewMonths} from '@sberbusiness/triplex/components/Calendar/components/CalendarViewMonths';
import {ECalendarPickType, ECalendarViewMode, ECalendarPageDirection} from '@sberbusiness/triplex/components/Calendar/enums';
import {CalendarRange} from '@sberbusiness/triplex/components/Calendar/CalendarRange';
import {formatDate, getHeader, isCalendarRange, parsePickedDate} from '@sberbusiness/triplex/components/Calendar/utils';
import {uniqueId} from '@sberbusiness/triplex/utils/uniqueId';

/** Общие свойства компонента календаря. */
export interface ICalendarCommonProps extends ICalendarNestedProps {
    /** Отображаемая по умолчанию дата. */
    defaultViewDate?: string | Moment;
    /** Формат для значения. */
    format?: string;
    /** Вариант выбора даты. */
    pickType?: ECalendarPickType;
    /** Ограничение выбираемого периода. */
    limitRange?: IDateLimitRange;
    /** Отмеченные дни. */
    markedDays?: string[];
    /** Отключённые дни. */
    disabledDays?: string[];
    /** Обратный порядок выбора даты. */
    reversedPick?: boolean;
    /** Обработчик потери фокуса. */
    onBlur?: () => void;
    /** Обработчик изменения страницы. */
    onChangePage?: (date: Moment, mode: ECalendarViewMode, direction: ECalendarPageDirection) => void;
    /** Обработчик выбора месяца. */
    onSetMonth?: (date: Moment) => void;
}

/** Свойства обычного календаря. */
export interface ICalendarSingleProps extends ICalendarCommonProps {
    /** Выбранная дата. */
    pickedDate: TPickedDateProp;
    /** Обработчик изменения даты. */
    onChangeDate: (date: Moment) => void;
    /** Адаптированный режим. */
    adaptiveMode?: boolean;
}

/** Свойства календаря для выбора периода. */
export interface ICalendarRangeProps extends ICalendarCommonProps {
    /** Выбранный период. */
    pickedDate: TPickedRangeProp;
    /** Обработчик изменения периода. */
    onChangeDate: (date: TPickedRange) => void;
    /** Дата календаря по умолчанию. */
    defaultDate?: TPickedDateProp;
}

/** Свойства компонента Calendar. */
export type TCalendarProps = ICalendarSingleProps | ICalendarRangeProps;

/** Состояния компонента Calendar. */
interface ICalendarState {
    /** Дата является курсором, для навигации по интерфейсу. */
    viewDate: Moment;
    /** Выбранная дата в формате Moment. */
    pickedDate: TPickedDate;
    /** Заголовок календаря. */
    header: string;
    /** Текущий вид. */
    currentView: ECalendarViewMode;
    /** День, доступный для фокусировки в при навигации с клавиатуры. */
    tabbableDay?: Moment;
    /** День, находящийся в фокусе в текущий момент. */
    focusedDay?: Moment;
}

/** Календарь. */
export class Calendar extends React.PureComponent<TCalendarProps, ICalendarState> {
    public static Range = CalendarRange;

    public static defaultProps = {
        format: dateFormatYYYYMMDD,
        pickType: ECalendarPickType.datePick,
    };

    // Уникальный идентификатор для связи периода с таблицей.
    private periodId = `calendar-period-${uniqueId()}`;

    constructor(props: Readonly<TCalendarProps>) {
        super(props);

        const {defaultViewDate, format, pickType, reversedPick} = this.props;
        const pickedDateState = isCalendarRange(this.props)
            ? parsePickedDate(this.props.defaultDate, format!)
            : parsePickedDate(this.props.pickedDate, format!);

        let viewDate = moment();

        if (pickedDateState && pickedDateState.isValid()) {
            viewDate = pickedDateState.clone();
        } else if (defaultViewDate) {
            const parsedDefaultViewDate = defaultViewDate && parsePickedDate(defaultViewDate, format!);

            if (parsedDefaultViewDate && parsedDefaultViewDate.isValid()) {
                viewDate = parsedDefaultViewDate.clone();
            }
        }

        const currentTab = reversedPick
            ? ECalendarViewMode.YEARS
            : pickType === ECalendarPickType.monthYearPick
              ? ECalendarViewMode.MONTHS
              : ECalendarViewMode.DAYS;
        const header = reversedPick
            ? formatDate(viewDate, ECalendarViewMode.YEARS)!
            : pickType === ECalendarPickType.monthYearPick
              ? formatDate(viewDate, ECalendarViewMode.MONTHS)!
              : getHeader(viewDate);

        this.state = {
            currentView: currentTab,
            header,
            pickedDate: pickedDateState,
            viewDate,
        };
    }

    public componentDidMount(): void {
        this.setAvailableToFocusDay();
    }

    public componentDidUpdate(prevProps: TCalendarProps, prevState: ICalendarState): void {
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

            if (viewDate && !viewDate.isSame(pickedDateState, 'month')) {
                newDateContext = {
                    currentTab: ECalendarViewMode.DAYS,
                    header: getHeader(resultDate),
                    viewDate: resultDate!.clone(),
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
            (viewDate && prevViewDate && !viewDate.isSame(prevViewDate, 'month'))
        ) {
            // Сменился период отображения.
            this.setAvailableToFocusDay();
        }

        if ((focusedDay && !prevFocusedDay) || (focusedDay && prevFocusedDay && !focusedDay.isSame(prevFocusedDay, 'day'))) {
            // Сменился день, на котором установлен фокус.
            this.setState({
                tabbableDay: focusedDay,
            });
        }
    }

    public render() {
        const classNames = classnames('cssClass[calendar]', {
            'cssClass[adaptive]': !isCalendarRange(this.props) && !!this.props.adaptiveMode,
        });

        return (
            <div className={classNames}>
                {this.renderCalendarControls()}
                {this.renderCalendarView()}
            </div>
        );
    }

    /** Возвращает первый доступный для выбора день месяца или undefined, если все дни задисейблены. */
    private getFirstEnabledDayInMonth = (date: Moment): Moment | undefined => {
        // Количество дней в текущем месяце.
        const daysInMonth = moment(date).daysInMonth();
        // Первый день месяца.
        const firstDay = moment(date).startOf('month');
        // Первый доступный для выбора день месяца.
        let enabledDay;

        if (this.checkDisabled(firstDay)) {
            for (let i = 1; i < daysInMonth; i++) {
                firstDay.add(1, 'day');
                enabledDay = firstDay;
                if (!this.checkDisabled(firstDay)) {
                    enabledDay = firstDay;
                    break;
                }
            }
        } else {
            enabledDay = firstDay;
        }

        return enabledDay;
    };

    /** Устанавливает значение availableToFocusDay. Это или выбранная дата, или первый день месяца. */
    private setAvailableToFocusDay = () => {
        const {pickedDate, viewDate} = this.state;
        let nextAvailableToFocusDay;

        // Есть выбранная дата и выбранная дата в отображаемом месяце.
        if (pickedDate && pickedDate.isSame(viewDate, 'month')) {
            // Выбранный день.
            nextAvailableToFocusDay = pickedDate;
        } else {
            // Первый доступный день месяца.
            nextAvailableToFocusDay = this.getFirstEnabledDayInMonth(viewDate);
        }

        if (nextAvailableToFocusDay) {
            this.setState({
                tabbableDay: nextAvailableToFocusDay,
            });
        }
    };

    /** Проверяет, является ли дата отключённой. */
    private checkDisabled = (date: Moment): boolean => {
        const {disabledDays} = this.props;
        return Boolean(disabledDays?.includes(date.format(dateFormatYYYYMMDD)));
    };

    /** Обработчик перемещения фокуса на другой день. */
    private handleChangeFocusedDay = (day: Moment | undefined, byKeyDown?: boolean) => {
        const {focusedDay, viewDate} = this.state;

        if (!day) {
            if (focusedDay) {
                this.setState({
                    focusedDay: undefined,
                });
            }

            return;
        }

        // Фокус изменен при навигации с клавиатуры.
        if (byKeyDown) {
            // Фокус переместился на день предыдущего месяца.
            if (day.isBefore(viewDate, 'month')) {
                this.changeCalendarPageToBack();
            } else if (day.isAfter(viewDate, 'month')) {
                // Фокус переместился на день следующего месяца.
                this.changeCalendarPageToForward();
            }
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

    /** Задать отображаемый год. */
    private setViewYear = (year: number) => {
        const {viewDate, pickedDate} = this.state;
        const viewDateNew: Moment = this.getSafeDate(viewDate).set('year', year);

        this.setState({
            currentView: ECalendarViewMode.MONTHS,
            header: formatDate(viewDateNew, ECalendarViewMode.MONTHS) || getHeader(pickedDate),
            viewDate: viewDateNew,
        });
    };

    /** Задать отображаемый месяц. */
    private setViewMonth = (month: number) => {
        const {viewDate} = this.state;
        const viewDateNew: Moment = this.getSafeDate(viewDate).month(month);

        this.props.onSetMonth?.(viewDateNew);

        if (this.props.pickType === ECalendarPickType.monthYearPick) {
            this.handleClick(viewDateNew.date(1));
        } else {
            this.setState({
                currentView: ECalendarViewMode.DAYS,
                header: formatDate(viewDateNew, ECalendarViewMode.DAYS) || getHeader(viewDateNew),
                viewDate: viewDateNew,
            });
        }
    };

    /** Обработчик выбора даты. */
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

    /** Отрисовка таблицы с выбором года. */
    private renderViewYears = (): JSX.Element => {
        const {viewDate, pickedDate} = this.state;
        const {limitRange, yearHtmlAttributes} = this.props;

        return (
            <CalendarViewYears
                viewDate={this.getSafeDate(viewDate)}
                pickedDate={pickedDate}
                limitRange={limitRange}
                yearHtmlAttributes={yearHtmlAttributes}
                onClick={this.setViewYear}
            />
        );
    };

    /** Отрисовка таблицы с выбором месяца. */
    private renderViewMonths = (): JSX.Element => {
        const {viewDate, pickedDate} = this.state;
        const {limitRange, monthHtmlAttributes} = this.props;

        return (
            <CalendarViewMonths
                viewDate={this.getSafeDate(viewDate)}
                pickedDate={pickedDate}
                limitRange={limitRange}
                monthHtmlAttributes={monthHtmlAttributes}
                onClick={this.setViewMonth}
            />
        );
    };

    /** Отрисовка таблицы с выбором дня. */
    private renderViewDays = (): JSX.Element => {
        const {tabbableDay, focusedDay, viewDate, pickedDate} = this.state;
        const {format, limitRange, markedDays, disabledDays, dayHtmlAttributes} = this.props;
        let pickedRange;

        if (isCalendarRange(this.props)) {
            pickedRange = [
                parsePickedDate(this.props.pickedDate[0], format!),
                parsePickedDate(this.props.pickedDate[1], format!),
            ] as TPickedRange;
        }

        return (
            <CalendarViewDays
                viewDate={viewDate}
                pickedDate={pickedDate}
                pickedRange={pickedRange}
                limitRange={limitRange}
                dayHtmlAttributes={dayHtmlAttributes}
                tabbableDay={tabbableDay}
                focusedDay={focusedDay}
                markedDays={markedDays}
                disabledDays={disabledDays}
                periodId={this.periodId}
                onClick={this.handleClick}
                onChangeFocusedDay={this.handleChangeFocusedDay}
            />
        );
    };

    /** Отрисовка элементов управления календаря. */
    private renderCalendarControls = (): JSX.Element => {
        const {header, currentView, viewDate, pickedDate} = this.state;
        const {prevButtonProps, nextButtonProps, changeViewLinkProps} = this.props;

        const nextView = {
            [ECalendarViewMode.DAYS]: ECalendarViewMode.MONTHS,
            [ECalendarViewMode.MONTHS]: ECalendarViewMode.YEARS,
            [ECalendarViewMode.YEARS]: undefined,
        }[currentView] as Exclude<ECalendarViewMode, ECalendarViewMode.DAYS> | undefined;

        const handleChangeView =
            nextView &&
            (() => {
                this.setState({
                    currentView: nextView,
                    header: formatDate(viewDate, nextView) || getHeader(pickedDate),
                });
            });

        const prevInRange = this.isInRange(this.getSafeDate(viewDate).add(-this.getOffset(), this.getPage()));
        const nextInRange = this.isInRange(this.getSafeDate(viewDate).add(this.getOffset(), this.getPage()));

        const prevDisabled = !prevInRange || prevButtonProps?.disabled;
        const nextDisabled = !nextInRange || nextButtonProps?.disabled;

        return (
            <CalendarControls
                periodId={this.periodId}
                onPrev={this.changeCalendarPageToBack}
                onNext={this.changeCalendarPageToForward}
                onChangeView={handleChangeView}
                prevButtonProps={{...prevButtonProps, disabled: prevDisabled} as IButtonIconProps}
                nextButtonProps={{...nextButtonProps, disabled: nextDisabled} as IButtonIconProps}
                changeViewLinkProps={changeViewLinkProps}
            >
                {header}
            </CalendarControls>
        );
    };

    /** Отрисовка текущей вкладки календаря. */
    private renderCalendarView = (): React.ReactNode => {
        const {currentView} = this.state;

        switch (currentView) {
            case ECalendarViewMode.YEARS:
                return this.renderViewYears();
            case ECalendarViewMode.MONTHS:
                return this.renderViewMonths();
            case ECalendarViewMode.DAYS:
                return this.renderViewDays();
        }
    };

    /** Получить изменяемую страницу в формате Moment. */
    private getPage = () => (this.state.currentView === ECalendarViewMode.DAYS ? 'month' : 'year');

    /** Получить текущий offset. */
    private getOffset = (): number => (this.state.currentView === ECalendarViewMode.YEARS ? 12 : 1);

    private isInRange = (viewDate: Moment): boolean => {
        const {currentView} = this.state;
        const {dateFrom, dateTo} = globalLimitRange;

        return (
            viewDate.isBetween(dateFrom, dateTo) ||
            (currentView === ECalendarViewMode.YEARS &&
                MONTHS_SET.some((offset) => viewDate.clone().add(offset, this.getPage()).isBetween(dateFrom, dateTo)))
        );
    };

    /** Обработчик смены страницы. */
    private handlePageChange = (direction: ECalendarPageDirection) => {
        const {viewDate, currentView} = this.state;
        const {onChangePage} = this.props;

        onChangePage?.(viewDate, currentView, direction);
    };

    /** Обработка листания календаря назад. */
    private changeCalendarPageToBack = () => {
        const {pickedDate} = this.state;

        this.setState(
            (prevState): ICalendarState => {
                const viewDate: Moment = this.getSafeDate(prevState.viewDate).add(-this.getOffset(), this.getPage());
                const isInRange = this.isInRange(viewDate);

                let changedStateElements = {};

                if (isInRange) {
                    changedStateElements = {
                        header: formatDate(viewDate, prevState.currentView) || getHeader(pickedDate),
                        viewDate: viewDate,
                    };
                }
                return {
                    ...prevState,
                    ...changedStateElements,
                    focusedDay: undefined,
                };
            },
            () => {
                this.handlePageChange(ECalendarPageDirection.BACKWARD);
            }
        );
    };

    /** Обработка листания календаря вперёд. */
    private changeCalendarPageToForward = () => {
        const {pickedDate} = this.state;

        this.setState(
            (prevState): ICalendarState => {
                const viewDate: Moment = this.getSafeDate(prevState.viewDate).add(this.getOffset(), this.getPage());
                const isInRange = this.isInRange(viewDate);

                let changedStateElements = {};

                if (isInRange) {
                    changedStateElements = {
                        header: formatDate(viewDate, prevState.currentView) || getHeader(pickedDate),
                        viewDate,
                    };
                }
                return {
                    ...prevState,
                    ...changedStateElements,
                    focusedDay: undefined,
                };
            },
            () => {
                this.handlePageChange(ECalendarPageDirection.FORWARD);
            }
        );
    };
}
