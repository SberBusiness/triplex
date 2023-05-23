import * as React from 'react';
import {ButtonIcon, IButtonIconProps} from '@sberbusiness/triplex/desktop/components/Button/ButtonIcon';
import {EButtonIconShape} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {CaretleftSrvxIcon24} from '@sberbusiness/icons/CaretleftSrvxIcon24';
import {CaretrightSrvxIcon24} from '@sberbusiness/icons/CaretrightSrvxIcon24';
import {ELinkSize, ELinkType, ILinkTextProps, Link} from '@sberbusiness/triplex/desktop/components/Link/Link';

/**
 * @prop {string} children Заголовок календаря.
 * @prop {Function} onNext Обработка нажатия на кнопку открытия следующей страницы.
 * @prop {Function} onPrev Обработка нажатия на кнопку открытия предыдущей страницы.
 * @prop {Function} [onChangeView] Обработка смены представления календаря (месяц-год-декада).
 * @prop {IButtonIconProps} [prevButtonProps] Пропсы кнопки переключения на следующую страницу (месяца, года, десятилетия).
 * @prop {IButtonIconProps} [nextButtonProps] Пропсы кнопки переключения на предыдущую страницу (месяца, года, десятилетия).
 * @prop {ILinkProps} [changeViewLinkProps] Пропсы ссылки для смены вида календаря (месяц, год, десятилетие).
 */
export interface ICalendarControlsProps {
    children: string;
    onNext(): void;
    onPrev(): void;
    onChangeView?(): void;
    prevButtonProps?: IButtonIconProps;
    nextButtonProps?: IButtonIconProps;
    changeViewLinkProps?: Omit<ILinkTextProps, 'linkType' | 'size'>;
}

/** Кнопки навигации календаря. */
export const CalendarControls: React.FC<ICalendarControlsProps> = ({
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
        <div className="cssClass[calendarHeaderDate]">
            {onChangeView ? (
                <Link linkType={ELinkType.TEXT} size={ELinkSize.LG} {...changeViewLinkProps} onClick={onChangeView}>
                    {children}
                </Link>
            ) : (
                <div className="cssClass[calendarHeaderText]">{children}</div>
            )}
        </div>
        <ButtonIcon {...nextButtonProps} onClick={onNext} shape={EButtonIconShape.CIRCLE}>
            <CaretrightSrvxIcon24 />
        </ButtonIcon>
    </div>
);

CalendarControls.displayName = 'CalendarControls';
