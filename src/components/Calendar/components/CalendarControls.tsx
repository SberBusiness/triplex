import React from 'react';
import {ButtonIcon, IButtonIconProps} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {EButtonIconShape} from '@sberbusiness/triplex/components/Button/enums';
import {CaretleftSrvxIcon24} from '@sberbusiness/icons/CaretleftSrvxIcon24';
import {CaretrightSrvxIcon24} from '@sberbusiness/icons/CaretrightSrvxIcon24';
import {ELinkSize, ELinkType, ILinkTextProps, Link} from '@sberbusiness/triplex/components/Link/Link';

/** Свойства CalendarControls. */
export interface ICalendarControlsProps {
    /** Уникальный идентификатор для связи периода с таблицей. */
    periodId?: string;
    /** Пропсы кнопки переключения на предыдущую страницу (месяца, года, десятилетия). */
    prevButtonProps?: IButtonIconProps;
    /** Пропсы кнопки переключения на следующую страницу (месяца, года, десятилетия). */
    nextButtonProps?: IButtonIconProps;
    /** Пропсы ссылки для смены вида календаря (месяц, год, десятилетие). */
    changeViewLinkProps?: Omit<ILinkTextProps, 'linkType' | 'size'>;
    /** Обработка нажатия на кнопку открытия следующей страницы. */
    onNext(): void;
    /** Обработка нажатия на кнопку открытия предыдущей страницы. */
    onPrev(): void;
    /** Обработка смены вида календаря. */
    onChangeView?(): void;
}

/** Кнопки навигации календаря. */
export const CalendarControls: React.FC<ICalendarControlsProps> = ({
    periodId,
    children,
    onPrev,
    onNext,
    onChangeView,
    prevButtonProps,
    nextButtonProps,
    changeViewLinkProps,
}): JSX.Element => (
    <div className="cssClass[calendarHeader]">
        <ButtonIcon {...prevButtonProps} onClick={onPrev} shape={EButtonIconShape.CIRCLE}>
            <CaretleftSrvxIcon24 />
        </ButtonIcon>
        {onChangeView ? (
            <Link
                linkType={ELinkType.TEXT}
                size={ELinkSize.LG}
                {...changeViewLinkProps}
                onClick={onChangeView}
                tabIndex={-1}
                id={periodId}
                aria-live="polite"
            >
                {children}
            </Link>
        ) : (
            <span id={periodId} aria-live="polite">
                {children}
            </span>
        )}
        <ButtonIcon {...nextButtonProps} onClick={onNext} shape={EButtonIconShape.CIRCLE}>
            <CaretrightSrvxIcon24 />
        </ButtonIcon>
    </div>
);

CalendarControls.displayName = 'CalendarControls';
