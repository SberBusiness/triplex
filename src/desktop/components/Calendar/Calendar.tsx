import {dateFormatYYYYMMDD, globalLimitRange, YEARS_SET} from '@sberbusiness/triplex/desktop/common/consts/DateConst';
import {ECalendarMomentPeriodType, ECalendarTab} from '@sberbusiness/triplex/desktop/common/enums/EDatePeriod';
import {IButtonIconProps} from '@sberbusiness/triplex/desktop/components/Button/ButtonIcon';
import {
    ICalendarNestedProps,
    TPickedDate,
    TPickedDateProp,
    TPickedRange,
    TPickedRangeProp,
} from '@sberbusiness/triplex/desktop/components/Calendar/types';
import {IDateLimitRange} from '@sberbusiness/triplex/desktop/common/types/DateTypes';
import {CalendarControls} from '@sberbusiness/triplex/desktop/components/Calendar/components/CalendarControls';
import {Decade} from '@sberbusiness/triplex/desktop/components/Calendar/components/Decade';
import {Month} from '@sberbusiness/triplex/desktop/components/Calendar/components/Month';
import {Year} from '@sberbusiness/triplex/desktop/components/Calendar/components/Year';
import {EChangePageDirection, EPickType} from '@sberbusiness/triplex/desktop/components/Calendar/enums';
import {CalendarRange} from '@sberbusiness/triplex/desktop/components/Calendar/CalendarRange';
import {EVENT_KEYS} from '@sberbusiness/triplex/desktop/utils/keyboard';
import moment, {Moment} from 'moment';
import * as React from 'react';
import {formatDate, getHeader, isCalendarRange, parsePickedDate} from '@sberbusiness/triplex/desktop/components/Calendar/utils';

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

/**
 * @prop pickedDate Выбранная дата в формате Moment.
 * @prop viewDate Дата является курсором, для навигации по интерфейсу.
 * @prop currentTab Текущая вкладка.
 * @prop header Заголовок календаря.
 */
interface IState {
    pickedDate: TPickedDate;
    viewDate: Moment;
    currentTab: ECalendarTab;
    header: string;
}

/** Компонент календаря. */
export class Calendar extends React.PureComponent<TCalendarProps, IState> {
    public static Range = CalendarRange;

    public static defaultProps = {
        format: dateFormatYYYYMMDD,
        pickType: EPickType.datePick,
    };

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
        document.addEventListener('keydown', this.handleKeyDown);
    }

    public componentDidUpdate(prevProps: TCalendarProps, prevState: IState): void {
        const {format} = this.props;
        const {viewDate} = this.state;

        const pickedDateState = isCalendarRange(this.props)
            ? parsePickedDate(this.state.viewDate, format!)
            : parsePickedDate(this.props.pickedDate, format!);
        const pickedDateValid = pickedDateState?.isValid();
        const resultDate = pickedDateValid ? pickedDateState : prevState.viewDate;

        const prevPickedDate = isCalendarRange(prevProps)
            ? parsePickedDate(prevState.viewDate, format!)
            : parsePickedDate(prevProps.pickedDate, format!);

        if (!pickedDateValid || prevPickedDate?.isSame(resultDate!, 'day')) {
            return;
        }

        let newDateContext = {};

        if (viewDate && !viewDate.isSame(pickedDateState!, ECalendarMomentPeriodType.MONTH)) {
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

    public componentWillUnmount(): void {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    public render(): JSX.Element {
        return (
            <div className="cssClass[globalCalendar]">
                {this.renderCalendarControls()}
                {this.renderCalendarItem()}
            </div>
        );
    }
    /** Если дата отсутствует - вернётся текущая. */
    private getSafeDate = (date: TPickedDate): Moment => date?.clone() || moment();

    /**
     * Обработчик нажатия с клавиатуры.
     * @param {KeyboardEvent} event Событие нажатия клавиши.
     */
    private handleKeyDown = (event: KeyboardEvent) => {
        const {onBlur} = this.props;

        if (EVENT_KEYS.TAB.includes(event.key) && typeof onBlur === 'function') {
            onBlur();
        }
    };

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
                newRange = date.isBefore(firstDate!) ? [date, firstDate] : [firstDate, date];
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
        const {viewDate, pickedDate} = this.state;
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
                YEARS_SET.some((offset) =>
                    viewDate
                        .clone()
                        .add(offset, this.getPage())
                        .isBetween(dateFrom, dateTo)
                ))
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
                };
            },
            () => {
                this.handlePageChange(EChangePageDirection.FORWARD);
            }
        );
    };
}
