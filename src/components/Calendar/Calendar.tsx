import React from 'react';
import moment, {Moment} from 'moment';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {dateFormatYYYYMMDD, globalLimitRange} from '@sberbusiness/triplex/consts/DateConst';
import {
    ICalendarNestedProps,
    TPickedDate,
    TPickedDateProp,
    TPickedRange,
    TPickedRangeProp,
} from '@sberbusiness/triplex/components/Calendar/types';
import {IDateLimitRange} from '@sberbusiness/triplex/types/DateTypes';
import {CalendarControls} from '@sberbusiness/triplex/components/Calendar/components/CalendarControls';
import {CalendarView} from '@sberbusiness/triplex/components/Calendar/components/CalendarView';
import {ECalendarPickType, ECalendarViewMode} from '@sberbusiness/triplex/components/Calendar/enums';
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
    /** Обработчик изменения страницы. */
    onPageChange?: (viewDate: Moment, viewMode: ECalendarViewMode) => void;
    /** Обработчик изменения вида. */
    onViewChange?: (viewDate: Moment, viewMode: ECalendarViewMode) => void;
}

/** Свойства обычного календаря. */
export interface ICalendarSingleProps extends ICalendarCommonProps {
    /** Выбранная дата. */
    pickedDate: TPickedDateProp;
    /** Адаптированный режим. */
    adaptiveMode?: boolean;
    /** Обработчик изменения даты. */
    onDateChange: (date: Moment) => void;
}

/** Свойства календаря для выбора периода. */
export interface ICalendarRangeProps extends ICalendarCommonProps {
    /** Выбранный период. */
    pickedDate: TPickedRangeProp;
    /** Дата календаря по умолчанию. */
    defaultDate?: TPickedDateProp;
    /** Обработчик изменения периода. */
    onDateChange: (date: TPickedRange) => void;
}

/** Свойства компонента Calendar. */
export type TCalendarProps = ICalendarSingleProps | ICalendarRangeProps;

/** Состояния компонента Calendar. */
interface ICalendarState {
    /** Вид отображения. */
    viewMode: ECalendarViewMode;
    /** Дата, являющая курсором для навигации по интерфейсу. */
    viewDate: moment.Moment;
    /** Выбранная дата в формате Moment. */
    pickedDate: TPickedDate;
    /** Заголовок календаря. */
    header: string;
}

/** Календарь. */
export class Calendar extends React.PureComponent<TCalendarProps, ICalendarState> {
    public static Range = CalendarRange;

    public static defaultProps = {
        format: dateFormatYYYYMMDD,
        limitRange: globalLimitRange,
        pickType: ECalendarPickType.datePick,
    };

    // Уникальный идентификатор для связи периода с таблицей.
    private periodId = `calendar-period-${uniqueId()}`;

    constructor(props: Readonly<TCalendarProps>) {
        super(props);

        const {format, pickType, reversedPick} = this.props;
        const pickedDate = isCalendarRange(this.props)
            ? parsePickedDate(this.props.defaultDate, format!)
            : parsePickedDate(this.props.pickedDate, format!);
        const viewDate = this.getInitialViewDate(pickedDate);

        let viewMode: ECalendarViewMode;

        if (reversedPick) {
            viewMode = ECalendarViewMode.YEARS;
        } else if (pickType == ECalendarPickType.monthYearPick) {
            viewMode = ECalendarViewMode.MONTHS;
        } else {
            viewMode = ECalendarViewMode.DAYS;
        }

        const header = formatDate(viewDate, viewMode);

        this.state = {
            header,
            pickedDate,
            viewDate,
            viewMode,
        };
    }

    /** Получить изначальную дату для навигации. */
    private getInitialViewDate(pickedDate: TPickedDate) {
        const {defaultViewDate, format, limitRange} = this.props;

        if (pickedDate && pickedDate.isValid()) {
            return pickedDate.clone();
        }

        if (defaultViewDate) {
            const parsedDate = parsePickedDate(defaultViewDate, format!);

            if (parsedDate && parsedDate.isValid()) {
                return parsedDate.clone();
            }
        }

        const todayDate = moment().startOf('day');

        if (limitRange) {
            if (limitRange.dateFrom && todayDate.isBefore(limitRange.dateFrom)) {
                return limitRange.dateFrom.clone();
            } else if (limitRange.dateTo && todayDate.isAfter(limitRange.dateTo)) {
                return limitRange.dateTo.clone();
            }
        }

        return todayDate;
    }

    public componentDidUpdate(prevProps: TCalendarProps, prevState: ICalendarState): void {
        const {format} = this.props;
        const {viewDate} = this.state;
        const {viewDate: prevViewDate} = prevState;

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
    }

    public render() {
        const {format, pickType, limitRange, disabledDays, markedDays, prevButtonProps, nextButtonProps, viewButtonProps} = this.props;
        const {viewMode, viewDate, header} = this.state;
        const classNames = classnames('cssClass[calendar]', {
            'cssClass[adaptive]': !isCalendarRange(this.props) && !!this.props.adaptiveMode,
        });

        let pickedDate;
        let pickedRange;

        if (isCalendarRange(this.props)) {
            pickedRange = [
                parsePickedDate(this.props.pickedDate[0], format!),
                parsePickedDate(this.props.pickedDate[1], format!),
            ] as TPickedRange;
        } else {
            pickedDate = parsePickedDate(this.props.pickedDate, format!);
        }

        return (
            <div className={classNames} data-tx={process.env.npm_package_version}>
                <CalendarControls
                    viewDate={viewDate}
                    viewMode={viewMode}
                    periodId={this.periodId}
                    limitRange={limitRange!}
                    prevButtonProps={prevButtonProps}
                    nextButtonProps={nextButtonProps}
                    viewButtonProps={viewButtonProps}
                    onPageChange={this.handlePageChange}
                    onViewChange={this.handleViewChange}
                >
                    {header}
                </CalendarControls>
                <CalendarView
                    viewMode={viewMode}
                    viewDate={viewDate}
                    pickedDate={pickedDate}
                    pickedRange={pickedRange}
                    format={format!}
                    pickType={pickType}
                    limitRange={limitRange!}
                    disabledDays={disabledDays}
                    markedDays={markedDays}
                    periodId={this.periodId}
                    onDateSelect={this.handleDateSelect}
                    onPageChange={this.handlePageChange}
                    onViewChange={this.handleViewChange}
                />
            </div>
        );
    }

    /** Обработчик выбора даты. */
    private handleDateSelect = (date: moment.Moment) => {
        if (isCalendarRange(this.props)) {
            let newRange: TPickedRange;
            if (this.props.pickedDate[0] && !this.props.pickedDate[1]) {
                const firstDate = parsePickedDate(this.props.pickedDate[0], this.props.format!);
                newRange = date.isBefore(firstDate) ? [date, firstDate] : [firstDate, date];
            } else {
                newRange = [date, null];
            }
            this.props.onDateChange(newRange);
        } else {
            this.props.onDateChange(date);
        }
    };

    /** Обработчик смены страницы. */
    private handlePageChange = (nextViewDate: moment.Moment, viewMode: ECalendarViewMode) => {
        const {onPageChange} = this.props;

        this.setState({
            header: formatDate(nextViewDate, viewMode),
            viewDate: nextViewDate,
        });

        onPageChange?.(nextViewDate, viewMode);
    };

    /** Обработчик изменения вида отображения. */
    private handleViewChange = (nextViewDate: moment.Moment, nextViewMode: ECalendarViewMode) => {
        const {onViewChange} = this.props;

        this.setState({
            header: formatDate(nextViewDate, nextViewMode),
            viewDate: nextViewDate,
            viewMode: nextViewMode,
        });

        onViewChange?.(nextViewDate, nextViewMode);
    };
}
